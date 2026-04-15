import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// POST — decrement a credit and save the video
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { songId, songTitle, videoUrl } = await req.json();
  if (!videoUrl) return NextResponse.json({ error: "Missing videoUrl" }, { status: 400 });

  // Get current user
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, credits")
    .eq("clerk_user_id", userId)
    .single();

  if (!user || user.credits < 1) {
    return NextResponse.json({ error: "No credits" }, { status: 402 });
  }

  // Decrement credit
  await supabaseAdmin
    .from("users")
    .update({ credits: user.credits - 1 })
    .eq("id", user.id);

  // Save video
  await supabaseAdmin.from("videos").insert({
    user_id: user.id,
    song_id: songId,
    song_title: songTitle,
    video_url: videoUrl,
  });

  return NextResponse.json({ ok: true, creditsRemaining: user.credits - 1 });
}
