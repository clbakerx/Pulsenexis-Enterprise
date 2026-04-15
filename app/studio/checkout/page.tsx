import Link from "next/link";

const TIERS = [
  {
    id: "single",
    label: "1 AI Video",
    price: "$9.99",
    unit: "per video",
    href: "https://buy.stripe.com/4gM8wPgaT131c8V45f4ZG0I",
    description: "Perfect for a one-time creation — your photo, your music, your story.",
    features: [
      "1 personalized AI video",
      "Choose from all PulseNexis tracks",
      "HD 720×1280 portrait format",
      "Instant delivery after generation",
    ],
    popular: false,
    cta: "Buy 1 Video",
  },
  {
    id: "pack3",
    label: "3 AI Videos",
    price: "$24",
    unit: "pack of 3",
    href: "https://buy.stripe.com/28EdR90bV5jha0NeJT4ZG0J",
    description: "Try different songs or create videos for multiple moments.",
    features: [
      "3 personalized AI videos",
      "Mix and match any tracks",
      "HD 720×1280 portrait format",
      "Use over time — no expiry",
    ],
    popular: true,
    cta: "Buy 3-Pack",
  },
  {
    id: "pack10",
    label: "10 AI Videos",
    price: "$59",
    unit: "pack of 10",
    href: "https://buy.stripe.com/7sY7sLbUDh1Zeh31X74ZG0K",
    description: "For creators, couples, or anyone with a lot to share.",
    features: [
      "10 personalized AI videos",
      "Full track library access",
      "HD 720×1280 portrait format",
      "Use over time — no expiry",
    ],
    popular: false,
    cta: "Buy 10-Pack",
  },
];

export default function StudioCheckoutPage() {
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
        </div>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "3.5rem 1.5rem 0", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "#9b8ecf", marginBottom: "1rem",
          background: "rgba(155,142,207,0.08)",
          padding: "6px 16px", borderRadius: 20,
          border: "0.5px solid #2a2535",
        }}>
          AI Video Studio · Pricing
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 400, color: "#f0ece8",
          lineHeight: 1.2, marginBottom: "0.75rem",
        }}>
          Your photo.<br />
          <em style={{ fontStyle: "italic", color: "#c4a8ff" }}>Our music. Your video.</em>
        </h1>
        <p style={{ fontSize: 15, color: "#7a7572", lineHeight: 1.6 }}>
          Choose how many AI videos you want to create. Each video uses your photo and a PulseNexis track.
        </p>
      </div>

      {/* Pricing cards */}
      <div style={{
        maxWidth: 960,
        margin: "3rem auto 0",
        padding: "0 1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1rem",
      }}>
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            style={{
              borderRadius: 20,
              border: tier.popular ? "1px solid #6a4fcf" : "0.5px solid #1e1b28",
              background: tier.popular ? "rgba(106,79,207,0.08)" : "#0f0d18",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {tier.popular && (
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: "#6a4fcf", color: "#fff", fontSize: 10,
                fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "4px 14px", borderRadius: 20,
                whiteSpace: "nowrap",
              }}>
                Most Popular
              </div>
            )}

            <div style={{ fontSize: 13, fontWeight: 600, color: "#c4a8ff", marginBottom: "0.5rem" }}>
              {tier.label}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: "#f0ece8" }}>{tier.price}</span>
              <span style={{ fontSize: 13, color: "#5a5560" }}>{tier.unit}</span>
            </div>
            <p style={{ fontSize: 13, color: "#7a7572", lineHeight: 1.55, marginBottom: "1.25rem" }}>
              {tier.description}
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
              {tier.features.map((f) => (
                <li key={f} style={{ fontSize: 13, color: "#a09ab0", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span style={{ color: "#6a4fcf", marginTop: 1, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={tier.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                padding: "13px 0",
                borderRadius: 14,
                background: tier.popular ? "#6a4fcf" : "rgba(255,255,255,0.06)",
                color: tier.popular ? "#fff" : "#c4a8ff",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Back link */}
      <div style={{ textAlign: "center", marginTop: "2.5rem", paddingBottom: "3rem" }}>
        <Link href="/studio" style={{ fontSize: 13, color: "#5a5560", textDecoration: "none" }}>
          ← Back to Studio
        </Link>
      </div>

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
