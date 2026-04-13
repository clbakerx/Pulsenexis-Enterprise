import { NextRequest, NextResponse } from "next/server";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY!;

async function uploadToImgBB(base64Image: string): Promise<string> {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const form = new FormData();
  form.append("key", IMGBB_API_KEY);
  form.append("image", base64Data);
  form.append("expiration", "600");
  const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: form });
  const json = await res.json();
  if (!json.success) throw new Error("ImgBB upload failed: " + (json.error?.message ?? "unknown"));
  return json.data.url;
}

export async function POST(req: NextRequest) {
  try {
    if (!HEYGEN_API_KEY) return NextResponse.json({ error: "HEYGEN_API_KEY not set" }, { status: 500 });
    if (!IMGBB_API_KEY) return NextResponse.json({ error: "IMGBB_API_KEY not set" }, { status: 500 });

    const { imageBase64, audioUrl } = await req.json();
    if (!imageBase64) return NextResponse.json({ error: "Missing imageBase64" }, { status: 400 });
    if (!audioUrl) return NextResponse.json({ error: "Missing audioUrl" }, { status: 400 });

    const imageUrl = await uploadToImgBB(imageBase64);
    console.log("[route] Photo URL:", imageUrl);

    const res = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "x-api-key": HEYGEN_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        video_inputs: [{
          character: {
            type: "talking_photo",
            talking_photo_url: imageUrl,
          },
          voice: {
            type: "audio",
            audio_url: audioUrl,
          },
          background: {
            type: "color",
            value: "#000000",
          },
        }],
        dimension: { width: 720, height: 1280 },
        aspect_ratio: null,
      }),
    });

    const text = await res.text();
    console.log("[HeyGen POST raw]", text);

    let json;
    try { json = JSON.parse(text); }
    catch { return NextResponse.json({ error: "HeyGen returned invalid JSON: " + text.slice(0, 200) }, { status: 500 }); }

    if (json.error) return NextResponse.json({ error: json.error.message ?? JSON.stringify(json.error) }, { status: 400 });
    const videoId = json.data?.video_id;
    if (!videoId) return NextResponse.json({ error: "No video_id in response: " + text.slice(0, 200) }, { status: 500 });

    return NextResponse.json({ id: videoId });
  } catch (err: any) {
    console.error("[POST error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
      headers: {
        "accept": "application/json",
        "x-api-key": HEYGEN_API_KEY,
      },
    });

    const text = await res.text();
    console.log("[HeyGen GET raw]", text);

    let json;
    try { json = JSON.parse(text); }
    catch { return NextResponse.json({ error: "HeyGen returned invalid JSON" }, { status: 500 }); }

    const status = json.data?.status;
    const resultUrl = json.data?.video_url ?? null;
    const normalized = status === "completed" ? "done" : status === "failed" ? "error" : "pending";

    return NextResponse.json({ status: normalized, resultUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
