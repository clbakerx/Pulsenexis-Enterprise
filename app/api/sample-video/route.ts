// app/api/sample-video/route.ts
// Free sample generator — 1 per IP per day, no auth required

import { NextRequest, NextResponse } from "next/server";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!;
const IMGBB_API_KEY  = process.env.IMGBB_API_KEY!;

// Simple in-memory rate limit (resets on server restart)
// For production use Redis instead
const ipUsage = new Map<string, number>();

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const today = new Date().toDateString();
  const key   = `${ip}:${today}`;
  if (ipUsage.has(key)) return true;
  ipUsage.set(key, 1);
  // Clean up old entries every 100 requests
  if (ipUsage.size > 100) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    for (const k of ipUsage.keys()) {
      if (k.includes(yesterday)) ipUsage.delete(k);
    }
  }
  return false;
}

// Upload photo to ImgBB
async function uploadToImgBB(base64Image: string): Promise<string> {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const form = new FormData();
  form.append("key", IMGBB_API_KEY);
  form.append("image", base64Data);
  form.append("expiration", "3600");
  const res  = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: form });
  const json = await res.json();
  if (!json.success) throw new Error("ImgBB upload failed: " + JSON.stringify(json.error));
  return json.data.url as string;
}

// Upload to HeyGen to get talking_photo_id
async function uploadToHeyGen(imageUrl: string): Promise<string> {
  const imgRes      = await fetch(imageUrl);
  const imgBuffer   = await imgRes.arrayBuffer();
  const contentType = imgRes.headers.get("content-type") || "image/jpeg";

  const res = await fetch("https://upload.heygen.com/v1/talking_photo", {
    method: "POST",
    headers: {
      "x-api-key":    HEYGEN_API_KEY,
      "content-type": contentType,
    },
    body: imgBuffer,
  });

  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); }
  catch { throw new Error("HeyGen upload invalid JSON: " + text.slice(0, 200)); }

  if (json.error) throw new Error("HeyGen upload error: " + (json.error.message ?? JSON.stringify(json.error)));

  const id = json.data?.talking_photo_id ?? json.talking_photo_id;
  if (!id) throw new Error("No talking_photo_id: " + text.slice(0, 200));
  return id as string;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);

    // Check rate limit — 1 free sample per IP per day
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "You have already used your free sample today. Come back tomorrow or upgrade to the full studio!" },
        { status: 429 }
      );
    }

    const { imageBase64, audioUrl } = await req.json();
    if (!imageBase64) return NextResponse.json({ error: "Missing imageBase64" }, { status: 400 });
    if (!audioUrl)    return NextResponse.json({ error: "Missing audioUrl" },    { status: 400 });

    // Step 1 — Upload to ImgBB
    console.log("[sample] Uploading to ImgBB...");
    const imageUrl = await uploadToImgBB(imageBase64);

    // Step 2 — Upload to HeyGen
    console.log("[sample] Uploading to HeyGen...");
    const talkingPhotoId = await uploadToHeyGen(imageUrl);

    // Step 3 — Generate video (short clip — HeyGen auto-limits to audio length)
    console.log("[sample] Generating sample video...");
    const res = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "accept":       "application/json",
        "x-api-key":    HEYGEN_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        video_inputs: [{
          character: {
            type:             "talking_photo",
            talking_photo_id: talkingPhotoId,
          },
          voice: {
            type:      "audio",
            audio_url: audioUrl,
          },
          background: {
            type:  "color",
            value: "#000000",
          },
        }],
        dimension: { width: 720, height: 1280 },
      }),
    });

    const text = await res.text();
    let json: any;
    try { json = JSON.parse(text); }
    catch { return NextResponse.json({ error: "HeyGen invalid JSON: " + text.slice(0, 200) }, { status: 500 }); }

    if (json.error) return NextResponse.json({ error: json.error.message ?? JSON.stringify(json.error) }, { status: 400 });

    const videoId = json.data?.video_id ?? json.video_id;
    if (!videoId) return NextResponse.json({ error: "No video_id returned" }, { status: 500 });

    console.log("[sample] Video started:", videoId, "for IP:", ip);
    return NextResponse.json({ id: videoId });

  } catch (err: any) {
    console.error("[sample error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
