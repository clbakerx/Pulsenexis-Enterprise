import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const photo = formData.get("photo");
    const songId = formData.get("songId");

    if (!(photo instanceof File)) {
      return NextResponse.json({ error: "Missing uploaded photo" }, { status: 400 });
    }

    if (typeof songId !== "string" || !songId) {
      return NextResponse.json({ error: "Missing songId" }, { status: 400 });
    }

    const videoId = `demo_${Date.now()}`;

    return NextResponse.json({
      videoId,
      status: "processing",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const videoId = req.nextUrl.searchParams.get("videoId");

    if (!videoId) {
      return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
    }

    return NextResponse.json({
      status: "completed",
      videoUrl: "/demos/Leave-it-to-Me.mp4",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}