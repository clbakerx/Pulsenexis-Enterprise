// app/api/studio/videos/route.ts
// Returns all videos for the signed-in user

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get user record
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (!user) return NextResponse.json({ videos: [] });

    // Get all videos for this user, newest first
    const { data: videos, error } = await supabaseAdmin
      .from("videos")
      .select("id, song_title, video_url, permanent_url, storage_path, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return NextResponse.json({ videos: videos ?? [] });

  } catch (err: any) {
    console.error("[videos route error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
