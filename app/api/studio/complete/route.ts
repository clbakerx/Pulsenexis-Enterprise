// app/api/studio/complete/route.ts
// Called after video is done — saves to DB and sends delivery email

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function sendDeliveryEmail(email: string, videoUrl: string, songTitle: string) {
  if (!process.env.RESEND_API_KEY) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    "PulseNexis <noreply@pulsenexis.com>",
      to:      email,
      subject: `🎬 Your PulseNexis video is ready — ${songTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #0a0a0f; color: #e8e4df; border-radius: 16px;">
          <h1 style="font-size: 24px; color: #f0ece8; margin-bottom: 8px;">Your video is ready! 🎬</h1>
          <p style="color: #7a7572; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            Your personalized AI music video for <strong style="color: #c4a8ff;">${songTitle}</strong> has been created and is saved to your account.
          </p>
          <a href="${videoUrl}" style="display: inline-block; margin-bottom: 24px; padding: 14px 28px; background: #6a4fcf; color: white; text-decoration: none; border-radius: 50px; font-size: 15px; font-weight: 600;">
            Download My Video →
          </a>
          <p style="color: #5a5560; font-size: 13px; margin-bottom: 8px;">
            This is a permanent link — your video is saved to your PulseNexis account and won't expire.
          </p>
          <p style="color: #5a5560; font-size: 13px;">
            Share it on TikTok, Instagram Reels, or YouTube Shorts!
          </p>
          <hr style="border: none; border-top: 1px solid #1e1b28; margin: 24px 0;" />
          <p style="color: #3d3a40; font-size: 12px;">
            PulseNexis · Las Vegas, NV · 
            <a href="https://pulsenexis.com/studio/videos" style="color: #3d3a40;">View all my videos</a> · 
            <a href="https://pulsenexis.com/support" style="color: #3d3a40;">Support</a>
          </p>
        </div>
      `,
    }),
  });

  console.log(`[email] Delivery sent to ${email} for ${songTitle}`);
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { songId, songTitle, videoUrl, storagePath } = await req.json();
    if (!videoUrl) return NextResponse.json({ error: "Missing videoUrl" }, { status: 400 });

    // Get or create user record
    let { data: user } = await supabaseAdmin
      .from("users")
      .select("id, credits, email")
      .eq("clerk_user_id", userId)
      .single();

    if (!user) {
      // Create user if doesn't exist
      const { data: newUser } = await supabaseAdmin
        .from("users")
        .insert({ clerk_user_id: userId, credits: 0 })
        .select("id, credits, email")
        .single();
      user = newUser;
    }

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if ((user.credits ?? 0) < 1) return NextResponse.json({ error: "No credits" }, { status: 402 });

    // Decrement credit
    await supabaseAdmin
      .from("users")
      .update({ credits: user.credits - 1 })
      .eq("id", user.id);

    // Save video record with permanent URL
    await supabaseAdmin.from("videos").insert({
      user_id:       user.id,
      song_id:       songId,
      song_title:    songTitle,
      video_url:     videoUrl,
      permanent_url: videoUrl,
      storage_path:  storagePath ?? null,
    });

    // Send delivery email if we have their email
    if (user.email && videoUrl) {
      await sendDeliveryEmail(user.email, videoUrl, songTitle || "your song");
    }

    console.log(`[complete] Video saved for user ${userId} — ${songTitle}`);

    return NextResponse.json({
      ok: true,
      creditsRemaining: user.credits - 1,
      videoUrl,
    });

  } catch (err: any) {
    console.error("[complete error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
