"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";

const VideoGenerator = dynamic(() => import("@/components/VideoGenerator"), {
  ssr: false,
  loading: () => (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#5a5560", fontSize: 14 }}>
      Loading studio...
    </div>
  ),
});

export default function StudioPage() {
  const { isSignedIn } = useAuth();
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
          <Link href="/singles" style={{ fontSize: 13, color: "#5a5560", textDecoration: "none" }}>Singles</Link>
          <Link href="/packs" style={{ fontSize: 13, color: "#5a5560", textDecoration: "none" }}>Packs</Link>
          <Link href="/studio" style={{
            fontSize: 13, color: "#c4a8ff", textDecoration: "none",
            background: "rgba(106,79,207,0.12)", padding: "6px 14px",
            borderRadius: 20, border: "0.5px solid #3a3245",
          }}>
            Studio
          </Link>
          <Link href="/studio/checkout" style={{
            fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none",
            background: "#6a4fcf", padding: "6px 16px",
            borderRadius: 20,
          }}>
            Buy Credits
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/studio">
              <button style={{ fontSize: 13, color: "#c4a8ff", background: "transparent", border: "0.5px solid #3a3245", padding: "6px 14px", borderRadius: 20, cursor: "pointer" }}>
                Sign in
              </button>
            </SignInButton>
          )}
        </div>
      </div>

      {/* Hero banner above generator */}
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "3rem 1.5rem 0",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "#9b8ecf", marginBottom: "1rem",
          background: "rgba(155,142,207,0.08)",
          padding: "6px 16px", borderRadius: 20,
          border: "0.5px solid #2a2535",
        }}>
          AI Video Studio
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 400, color: "#f0ece8",
          lineHeight: 1.15, marginBottom: "0.75rem",
        }}>
          Make it personal.<br />
          <em style={{ fontStyle: "italic", color: "#c4a8ff" }}>Make it yours.</em>
        </h1>
        <p style={{ fontSize: 15, color: "#7a7572", lineHeight: 1.6, marginBottom: 0 }}>
          Upload your photo, choose a PulseNexis track, and create a personalized AI music video in minutes.
        </p>
      </div>

      {/* Pricing nudge */}
      <div style={{ maxWidth: 700, margin: "1.5rem auto 0", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "#5a5560" }}>From $9 per video · HD portrait format · instant delivery</span>
        <Link href="/studio/checkout" style={{
          fontSize: 13, fontWeight: 600, color: "#c4a8ff", textDecoration: "none",
          background: "rgba(106,79,207,0.15)", padding: "5px 14px",
          borderRadius: 20, border: "0.5px solid #3a3245",
          whiteSpace: "nowrap",
        }}>
          View pricing →
        </Link>
      </div>

      {/* Demo video */}
      <div style={{ maxWidth: 420, margin: "2.5rem auto 0", padding: "0 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5560", marginBottom: "0.75rem" }}>
          Example output
        </div>
        <video
          src="/demos/Leave-it-to-Me.mp4"
          autoPlay
          loop
          controls
          playsInline
          style={{
            width: "100%",
            borderRadius: 20,
            border: "0.5px solid #2a2535",
            background: "#0f0d18",
            display: "block",
          }}
        />
      </div>

      {/* Video Generator */}
      <VideoGenerator />

      {/* Footer */}
      <div style={{
        borderTop: "0.5px solid #1e1b28",
        padding: "2rem 1.5rem",
        textAlign: "center",
        color: "#3d3a40",
        fontSize: 12,
      }}>
        © {new Date().getFullYear()} PulseNexis · <Link href="/terms" style={{ color: "#3d3a40", textDecoration: "none" }}>Terms</Link> · <Link href="/support" style={{ color: "#3d3a40", textDecoration: "none" }}>Support</Link>
      </div>

    </div>
  );
}
