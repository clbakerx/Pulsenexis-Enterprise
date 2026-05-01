import { NextRequest, NextResponse } from "next/server";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, audioUrl } = await req.json();

    if (!imageBase64 || !audioUrl) {
      return NextResponse.json({ error: "Missing imageBase64 or audioUrl" }, { status: 400 });
    }

    // Strip the data URL prefix to get raw base64
    const base64Data = imageBase64.split(",")[1];
    if (!base64Data) {
      return NextResponse.json({ error: "Invalid imageBase64 format" }, { status: 400 });
    }

    // 1. Upload the image to HeyGen to get a talking photo asset
    const uploadRes = await fetch("https://upload.heygen.com/v1/talking_photo", {
      method: "POST",
      headers: {
        "X-Api-Key": HEYGEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Data }),
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok || !uploadData.data?.talking_photo_id) {
      console.error("HeyGen upload failed:", uploadData);
      return NextResponse.json(
        { error: uploadData.message || "Failed to upload photo to HeyGen" },
        { status: 500 }
      );
    }

    const talkingPhotoId = uploadData.data.talking_photo_id;

    // 2. Create the video generation job
    const createRes = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": HEYGEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: "talking_photo",
              talking_photo_id: talkingPhotoId,
            },
            voice: {
              type: "audio",
              audio_url: audioUrl,
            },
          },
        ],
        dimension: { width: 720, height: 1280 }, // portrait for social
      }),
    });

    const createData = await createRes.json();

    if (!createRes.ok || !createData.data?.video_id) {
      console.error("HeyGen create failed:", createData);
      return NextResponse.json(
        { error: createData.message || "Failed to start video generation" },
        { status: 500 }
      );
    }

    // Frontend expects { id }
    return NextResponse.json({ id: createData.data.video_id });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const statusRes = await fetch(
      `https://api.heygen.com/v1/video_status.get?video_id=${id}`,
      {
        headers: { "X-Api-Key": HEYGEN_API_KEY },
        cache: "no-store",
      }
    );

    const statusData = await statusRes.json();
    const video = statusData.data;

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    if (video.status === "completed") {
      // Frontend expects { status: "done", resultUrl }
      return NextResponse.json({ status: "done", resultUrl: video.video_url });
    }

    if (video.status === "failed") {
      console.error("HeyGen video failed:", video.error);
      // Frontend expects { status: "error" }
      return NextResponse.json({ status: "error", error: video.error });
    }

    // Still processing — frontend keeps polling
    return NextResponse.json({ status: "processing" });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}