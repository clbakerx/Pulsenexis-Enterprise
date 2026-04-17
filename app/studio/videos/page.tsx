"use client";

import { useEffect, useState } from "react";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

type Video = {
  id: string;
  song_title: string;
  video_url: string;
  permanent_url: string;
  created_at: string;
};

export default function MyVideosPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [videos, setVideos]     = useState<Video[]>([]);
  const [credits, setCredits]   = useState<number | null>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!isSignedIn) { setLoading(false); return; }

    Promise.all([
      fetch("/api/studio/videos").then((r) => r.json()),
      fetch("/api/studio/credits").then((r) => r.json()),
    ]).then(([videosData, creditsData]) => {
      setVideos(videosData.videos ?? []);
      setCredits(creditsData.credits ?? 0);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [isSignedIn]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif", color: "#e8e4df" }}>

      {/* Top bar */}
      <div style={{ borderBottom: "0.5px solid #1e1b28", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0a0a0f", zIndex: 50 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "#f0ece8" }}>
            Pulse<span style={{ color: "#9b8ecf" }}>Nexis</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/studio" style={{ fontSize: 13, color: "#9b8ecf", textDecoration: "none", background: "rgba(106,79,207,0.12)", padding: "6px 14px", borderRadius: 20, border: "0.5px solid #3a3245" }}>
            🎬 Create New Video
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button style={{ fontSize: 13, color: "#c4a8ff", background: "transparent", border: "0.5px solid #3a3245", padding: "6px 14px", borderRadius: 20, cursor: "pointer" }}>
                Sign in
              </button>
            </SignInButton>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9b8ecf", marginBottom: "0.75rem" }}>
            My Account
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400, color: "#f0ece8", marginBottom: "0.5rem" }}>
            My Videos
          </h1>
          <p style={{ fontSize: 14, color: "#7a7572" }}>
            All your personalized AI music videos, saved permanently.
          </p>
        </div>

        {/* Not signed in */}
        {isLoaded && !isSignedIn && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", border: "0.5px solid #1e1b28", borderRadius: 20, background: "rgba(255,255,255,0.01)" }}>
            <div style={{ fontSize: 32, marginBottom: "1rem" }}>🔒</div>
            <p style={{ fontSize: 16, color: "#c8c4d0", marginBottom: "1.5rem" }}>Sign in to see your videos</p>
            <SignInButton mode="modal" forceRedirectUrl="/studio/videos">
              <button style={{ padding: "12px 28px", background: "#6a4fcf", color: "#fff", border: "none", borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        {/* Loading */}
        {isSignedIn && loading && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#5a5560", fontSize: 14 }}>
            Loading your videos...
          </div>
        )}

        {/* Credits + stats bar */}
        {isSignedIn && !loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", border: "0.5px solid #1e1b28", borderRadius: 16, background: "rgba(255,255,255,0.01)", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "2rem" }}>
              <div>
                <div style={{ fontSize: 11, color: "#5a5560", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Credits</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: credits && credits > 0 ? "#c4a8ff" : "#cf6f6f" }}>
                  {credits ?? 0}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#5a5560", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Videos Made</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#f0ece8" }}>{videos.length}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {credits === 0 && (
                <Link href="/studio" style={{ fontSize: 13, padding: "8px 18px", background: "#6a4fcf", color: "#fff", textDecoration: "none", borderRadius: 20, fontWeight: 600 }}>
                  Buy Credits →
                </Link>
              )}
              <Link href="/studio" style={{ fontSize: 13, padding: "8px 18px", border: "0.5px solid #3a3245", color: "#c4a8ff", textDecoration: "none", borderRadius: 20 }}>
                🎬 Create New
              </Link>
            </div>
          </div>
        )}

        {/* Empty state */}
        {isSignedIn && !loading && videos.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", border: "0.5px solid #1e1b28", borderRadius: 20, background: "rgba(255,255,255,0.01)" }}>
            <div style={{ fontSize: 40, marginBottom: "1rem" }}>🎬</div>
            <p style={{ fontSize: 16, color: "#c8c4d0", marginBottom: "0.5rem" }}>No videos yet</p>
            <p style={{ fontSize: 14, color: "#5a5560", marginBottom: "1.5rem" }}>Create your first personalized AI music video</p>
            <Link href="/studio" style={{ display: "inline-block", padding: "12px 28px", background: "#6a4fcf", color: "#fff", textDecoration: "none", borderRadius: 50, fontSize: 14, fontWeight: 600 }}>
              Go to Studio →
            </Link>
          </div>
        )}

        {/* Video grid */}
        {isSignedIn && !loading && videos.length > 0 && (
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {videos.map((video) => (
              <div
                key={video.id}
                style={{ border: "0.5px solid #1e1b28", borderRadius: 20, overflow: "hidden", background: "#0f0d18" }}
              >
                {/* Video player */}
                <div style={{ position: "relative", background: "#000" }}>
                  <video
                    src={video.permanent_url || video.video_url}
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", display: "block", maxHeight: 400, objectFit: "cover" }}
                  />
                </div>

                {/* Video info */}
                <div style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#c8c4d0", marginBottom: 2 }}>{video.song_title}</p>
                      <p style={{ fontSize: 11, color: "#3d3a40" }}>{formatDate(video.created_at)}</p>
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} title="Saved permanently" />
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a
                      href={video.permanent_url || video.video_url}
                      download={`pulsenexis-${video.song_title?.toLowerCase().replace(/\s+/g, "-")}.mp4`}
                      style={{ flex: 1, display: "block", padding: "10px 0", background: "#6a4fcf", color: "#fff", textDecoration: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, textAlign: "center" }}
                    >
                      ⬇ Download
                    </a>
                    <button
                      onClick={() => navigator.share?.({ title: "My PulseNexis Video", url: video.permanent_url || video.video_url }).catch(() => navigator.clipboard.writeText(video.permanent_url || video.video_url))}
                      style={{ flex: 1, padding: "10px 0", border: "0.5px solid #3a3245", background: "transparent", color: "#c4a8ff", borderRadius: 12, fontSize: 13, cursor: "pointer" }}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}
