import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export default async function MyVideosPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/studio/videos");

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, credits")
    .eq("clerk_user_id", userId)
    .single();

  const videos = user
    ? (await supabaseAdmin
        .from("videos")
        .select("id, song_title, video_url, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
      ).data ?? []
    : [];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
      {/* Top bar */}
      <div style={{
        borderBottom: "0.5px solid #1e1b28",
        padding: "0 1.5rem",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "#0a0a0f",
        zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: "#f0ece8", letterSpacing: "0.02em" }}>
            Pulse<span style={{ color: "#9b8ecf" }}>Nexis</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/studio" style={{ fontSize: 13, color: "#c4a8ff", textDecoration: "none" }}>← Back to Studio</Link>
          <Link href="/studio/checkout" style={{
            fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none",
            background: "#6a4fcf", padding: "6px 16px", borderRadius: 20,
          }}>
            Buy Credits
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9b8ecf", marginBottom: "0.5rem" }}>
              AI Video Studio
            </div>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 600, color: "#f0ece8", margin: 0 }}>
              My Videos
            </h1>
          </div>
          <div style={{ fontSize: 13, color: "#5a5560" }}>
            Credits remaining: <span style={{ color: "#c4a8ff", fontWeight: 600 }}>{user?.credits ?? 0}</span>
          </div>
        </div>

        {videos.length === 0 ? (
          <div style={{
            borderRadius: 20, border: "0.5px solid #1e1b28", background: "#0f0d18",
            padding: "3rem", textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: "1rem" }}>🎬</div>
            <div style={{ fontSize: 15, color: "#7a7572", marginBottom: "1.5rem" }}>
              You haven't created any videos yet.
            </div>
            <Link href="/studio" style={{
              display: "inline-block", background: "#6a4fcf", color: "#fff",
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              padding: "12px 28px", borderRadius: 14,
            }}>
              Create your first video
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {videos.map((v: any) => (
              <div key={v.id} style={{
                borderRadius: 20, border: "0.5px solid #1e1b28", background: "#0f0d18",
                overflow: "hidden",
              }}>
                <video
                  src={v.video_url}
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", display: "block", background: "#000" }}
                />
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f0ece8" }}>{v.song_title ?? "Custom Video"}</div>
                  <div style={{ fontSize: 11, color: "#5a5560", marginTop: "0.25rem" }}>
                    {new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
