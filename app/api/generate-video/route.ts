import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!;
const IMGBB_API_KEY  = process.env.IMGBB_API_KEY!;

// Upload photo to ImgBB → public URL
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

// Upload image to HeyGen → talking_photo_id
async function uploadToHeyGen(imageUrl: string): Promise<string> {
  const imgRes      = await fetch(imageUrl);
  const imgBuffer   = await imgRes.arrayBuffer();
  const contentType = imgRes.headers.get("content-type") || "image/jpeg";

  const res = await fetch("https://upload.heygen.com/v1/talking_photo", {
    method: "POST",
    headers: { "x-api-key": HEYGEN_API_KEY, "content-type": contentType },
    body: imgBuffer,
  });

  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); }
  catch { throw new Error("HeyGen upload invalid JSON: " + text.slice(0, 300)); }

  if (json.error) throw new Error("HeyGen upload error: " + (json.error.message ?? JSON.stringify(json.error)));

  const id = json.data?.talking_photo_id ?? json.talking_photo_id;
  if (!id) throw new Error("No talking_photo_id: " + text.slice(0, 300));
  return id as string;
}

// Download video from HeyGen and upload to Supabase Storage
async function saveToSupabase(heygenUrl: string, userId: string, songId: string): Promise<{ permanentUrl: string; storagePath: string }> {
  console.log("[storage] Downloading video from HeyGen...");
  const videoRes = await fetch(heygenUrl);
  if (!videoRes.ok) throw new Error("Failed to download video from HeyGen");

  const videoBuffer = await videoRes.arrayBuffer();
  const fileName    = `${userId}/${songId}-${Date.now()}.mp4`;

  console.log("[storage] Uploading to Supabase Storage...");
  const { data, error } = await supabaseAdmin.storage
    .from("videos")
    .upload(fileName, videoBuffer, {
      contentType: "video/mp4",
      upsert: false,
    });

  if (error) throw new Error("Supabase Storage upload failed: " + error.message);

  const { data: urlData } = supabaseAdmin.storage
    .from("videos")
    .getPublicUrl(fileName);

  console.log("[storage] Permanent URL:", urlData.publicUrl);
  return { permanentUrl: urlData.publicUrl, storagePath: fileName };
}

// POST — generate video
export async function POST(req: NextRequest) {
  try {
    if (!HEYGEN_API_KEY) return NextResponse.json({ error: "HEYGEN_API_KEY not set" }, { status: 500 });
    if (!IMGBB_API_KEY)  return NextResponse.json({ error: "IMGBB_API_KEY not set" },  { status: 500 });

    const { imageBase64, audioUrl } = await req.json();
    if (!imageBase64) return NextResponse.json({ error: "Missing imageBase64" }, { status: 400 });
    if (!audioUrl)    return NextResponse.json({ error: "Missing audioUrl" },    { status: 400 });

    console.log("[route] Step 1: Uploading to ImgBB...");
    const imageUrl = await uploadToImgBB(imageBase64);
    console.log("[route] ImgBB URL:", imageUrl);

    console.log("[route] Step 2: Uploading to HeyGen...");
    const talkingPhotoId = await uploadToHeyGen(imageUrl);
    console.log("[route] talking_photo_id:", talkingPhotoId);

    console.log("[route] Step 3: Generating video...");
    const res = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "accept":       "application/json",
        "x-api-key":    HEYGEN_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        video_inputs: [{
          character: { type: "talking_photo", talking_photo_id: talkingPhotoId },
          voice:     { type: "audio", audio_url: audioUrl },
          background: { type: "color", value: "#000000" },
        }],
        dimension: { width: 720, height: 1280 },
      }),
    });

    const text = await res.text();
    let json: any;
    try { json = JSON.parse(text); }
    catch { return NextResponse.json({ error: "HeyGen invalid JSON: " + text.slice(0, 300) }, { status: 500 }); }

    if (json.error) return NextResponse.json({ error: json.error.message ?? JSON.stringify(json.error) }, { status: 400 });

    const videoId = json.data?.video_id ?? json.video_id;
    if (!videoId) return NextResponse.json({ error: "No video_id: " + text.slice(0, 300) }, { status: 500 });

    return NextResponse.json({ id: videoId });

  } catch (err: any) {
    console.error("[POST error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET — poll status + save to Supabase when done
export async function GET(req: NextRequest) {
  try {
    const id     = req.nextUrl.searchParams.get("id");
    const userId = req.nextUrl.searchParams.get("userId");
    const songId = req.nextUrl.searchParams.get("songId") || "unknown";

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
      headers: { "accept": "application/json", "x-api-key": HEYGEN_API_KEY },
    });

    const text = await res.text();
    let json: any;
    try { json = JSON.parse(text); }
    catch { return NextResponse.json({ error: "HeyGen status invalid JSON" }, { status: 500 }); }

    const status    = json.data?.status;
    const heygenUrl = json.data?.video_url ?? null;
    const normalized = status === "completed" ? "done" : status === "failed" ? "error" : "pending";

    // When done — save to Supabase Storage for permanent URL
    if (normalized === "done" && heygenUrl && userId) {
      try {
        const { permanentUrl, storagePath } = await saveToSupabase(heygenUrl, userId, songId);
        return NextResponse.json({ status: "done", resultUrl: permanentUrl, storagePath, heygenUrl });
      } catch (storageErr: any) {
        console.error("[storage error]", storageErr);
        // Fall back to HeyGen URL if storage fails
        return NextResponse.json({ status: "done", resultUrl: heygenUrl, heygenUrl });
      }
    }

    return NextResponse.json({ status: normalized, resultUrl: heygenUrl });

  } catch (err: any) {
    console.error("[GET error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
