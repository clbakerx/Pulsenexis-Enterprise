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

const TIERS = [
  {
    id: "single",
    label: "1 Video",
    price: "$9.99",
    unit: "one time",
    href: "https://buy.stripe.com/4gM8wPgaT13lc8V45f4ZG0I",
    features: ["1 personalized AI video", "Any PulseNexis track", "HD portrait format", "Delivered to your email"],
    popular: false,
    cta: "Buy 1 Video",
  },
  {
    id: "pack3",
    label: "3 Videos",
    price: "$24",
    unit: "pack of 3",
    href: "/api/checkout/studio?tier=pack3",
    features: ["3 personalized AI videos", "Mix any tracks", "HD portrait format", "No expiry"],
    popular: true,
    cta: "Buy 3-Pack",
  },
  {
    id: "pack10",
    label: "10 Videos",
    price: "$59",
    unit: "pack of 10",
    href: "/api/checkout/studio?tier=pack10",
    features: ["10 personalized AI videos", "Full track library", "HD portrait format", "No expiry"],
    popular: false,
    cta: "Buy 10-Pack",
  },
];

export default function StudioPage() {
  const { isSignedIn } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Top bar */}
      <div style={{ borderBottom: "0.5px solid #1e1b28", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0a0a0f", zIndex: 50 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "#f0ece8", letterSpacing: "0.02em" }}>
            Pulse<span style={{ color: "#9b8ecf" }}>Nexis</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/sample" style={{ fontSize: 13, color: "#9b8ecf", textDecoration: "none" }}>Free Sample</Link>
          <Link href="/singles" style={{ fontSize: 13, color: "#5a5560", textDecoration: "none" }}>Singles</Link>
          <Link href="/packs" style={{ fontSize: 13, color: "#5a5560", textDecoration: "none" }}>Packs</Link>
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

      {/* Hero */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "3.5rem 1.5rem 0", textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9b8ecf", marginBottom: "1rem", background: "rgba(155,142,207,0.08)", padding: "6px 16px", borderRadius: 20, border: "0.5px solid #2a2535" }}>
          AI Video Studio
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#f0ece8", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          Your face.<br />
          <em style={{ fontStyle: "italic", color: "#c4a8ff" }}>My songs.</em>
        </h1>
        <p style={{ fontSize: 15, color: "#7a7572", lineHeight: 1.6 }}>
          Upload your photo, choose a PulseNexis track, and create a personalized AI music video in minutes.
        </p>
      </div>

      {/* How it works — 3 steps with icons */}
      <div style={{ maxWidth: 700, margin: "2.5rem auto 0", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          {[
            { icon: "📸", step: "1", label: "Upload your photo", desc: "Clear front-facing photo works best" },
            { icon: "🎵", step: "2", label: "Pick a song", desc: "Choose from the PulseNexis catalog" },
            { icon: "🎬", step: "3", label: "Get your video", desc: "HD portrait MP4 delivered to you" },
          ].map((item) => (
            <div key={item.step} style={{ textAlign: "center", padding: "1.25rem 1rem", border: "0.5px solid #1e1b28", borderRadius: 16, background: "rgba(255,255,255,0.01)" }}>
              <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>{item.icon}</div>
              <div style={{ fontSize: 11, color: "#9b8ecf", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Step {item.step}</div>
              <div style={{ fontSize: 13, color: "#c8c4d0", fontWeight: 500, marginBottom: "0.35rem" }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "#5a5560" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing cards */}
      <div style={{ maxWidth: 900, margin: "3rem auto 0", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5560", marginBottom: "0.5rem" }}>Choose your plan</p>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", fontWeight: 400, color: "#f0ece8", fontFamily: "'Playfair Display', serif" }}>
            Pick a package · then create
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              style={{ borderRadius: 20, border: tier.popular ? "1px solid #6a4fcf" : "0.5px solid #1e1b28", background: tier.popular ? "rgba(106,79,207,0.08)" : "#0f0d18", padding: "1.75rem", display: "flex", flexDirection: "column", position: "relative" }}
            >
              {tier.popular && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#6a4fcf", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>
                  Best Value
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 600, color: "#c4a8ff", marginBottom: "0.5rem" }}>{tier.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: 38, fontWeight: 700, color: "#f0ece8" }}>{tier.price}</span>
                <span style={{ fontSize: 12, color: "#5a5560" }}>{tier.unit}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: 13, color: "#a09ab0", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <span style={{ color: "#6a4fcf", flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                style={{ display: "block", width: "100%", padding: "13px 0", borderRadius: 14, background: tier.popular ? "#6a4fcf" : "rgba(255,255,255,0.06)", color: tier.popular ? "#fff" : "#c4a8ff", fontSize: 14, fontWeight: 600, textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#3d3a40", marginTop: "1.25rem" }}>
          Not sure yet?{" "}
          <Link href="/sample" style={{ color: "#9b8ecf", textDecoration: "none" }}>Try the free sample first →</Link>
        </p>
      </div>

      {/* Demo video */}
      <div style={{ maxWidth: 360, margin: "3rem auto 0", padding: "0 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5560", marginBottom: "0.75rem" }}>
          Example output
        </div>
        <video
          src="/demos/Leave-it-to-Me.mp4"
          autoPlay
          loop
          controls
          playsInline
          style={{ width: "100%", borderRadius: 20, border: "0.5px solid #2a2535", background: "#0f0d18", display: "block" }}
        />
      </div>

      {/* Divider before generator */}
      <div style={{ maxWidth: 700, margin: "3rem auto 0", padding: "0 1.5rem" }}>
        <div style={{ height: "0.5px", background: "#1e1b28" }} />
        <p style={{ textAlign: "center", fontSize: 13, color: "#5a5560", marginTop: "1.5rem" }}>
          Already have credits?{" "}
          <span style={{ color: "#9b8ecf" }}>Upload your photo below and start creating.</span>
        </p>
      </div>

      {/* Video Generator */}
      <VideoGenerator />

      {/* Footer */}
      <div style={{ borderTop: "0.5px solid #1e1b28", padding: "2rem 1.5rem", textAlign: "center", color: "#3d3a40", fontSize: 12 }}>
        © {new Date().getFullYear()} PulseNexis ·{" "}
        <Link href="/terms" style={{ color: "#3d3a40", textDecoration: "none" }}>Terms</Link> ·{" "}
        <Link href="/support" style={{ color: "#3d3a40", textDecoration: "none" }}>Support</Link>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="repeat(auto-fit, minmax(240px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
