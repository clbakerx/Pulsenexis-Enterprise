// components/HotRightNow.tsx
import Link from "next/link";

type HotTrack = {
  title: string;
  href: string;      // landing page route (ex: "/bring-the-snow")
  vibe: string;      // short hook line
  note?: string;     // optional micro-copy
  previewSrc?: string; // optional preview file in /public
};

const HOT_TRACKS: HotTrack[] = [
  {
    title: "Bring the Snow (Slide We Ride)",
    href: "/bring-the-snow",
    vibe: "Smooth, late-night R&B built for motion, confidence, and intimate moments.",
    note: "Best for: drive scenes • lifestyle • romantic visuals",
    // Optional: if you add a preview mp3 file later:
    // previewSrc: "/audio/bring-the-snow-preview.mp3",
  },
  // Add more featured tracks like this:
  // {
  //   title: "Another Track Title",
  //   href: "/another-track",
  //   vibe: "One-sentence emotional promise.",
  //   note: "Best for: ...",
  //   previewSrc: "/audio/another-track-preview.mp3",
  // },
];

export default function HotRightNow() {
  return (
    <section
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "28px 18px",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 14, letterSpacing: 0.2, opacity: 0.75 }}>
          🔥 Hot Right Now on PulseNexis
        </div>
        <h2 style={{ fontSize: 26, margin: "6px 0 0" }}>
          Start with the tracks creators are feeling this week
        </h2>
        <p style={{ marginTop: 10, opacity: 0.82, lineHeight: 1.5 }}>
          Quick previews + clean landing pages so you can decide fast and buy with confidence.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
          marginTop: 14,
        }}
      >
        {HOT_TRACKS.map((t) => (
          <article
            key={t.href}
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 18,
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 16 }}>{t.title}</div>
            <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.5 }}>
              {t.vibe}
            </p>
            {t.note ? (
              <p style={{ marginTop: 10, fontSize: 13, opacity: 0.75 }}>
                {t.note}
              </p>
            ) : null}

            {/* Optional preview (only if you add previewSrc files) */}
            {t.previewSrc ? (
              <audio controls preload="none" style={{ width: "100%", marginTop: 12 }}>
                <source src={t.previewSrc} type="audio/mpeg" />
              </audio>
            ) : (
              <div
                style={{
                  marginTop: 12,
                  borderRadius: 14,
                  padding: 12,
                  background: "rgba(0,0,0,0.04)",
                  fontSize: 13,
                  opacity: 0.8,
                }}
              >
                Add a short preview later (optional) — the landing page already sells it.
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <Link
                href={t.href}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "12px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.18)",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                View Track →
              </Link>

              <Link
                href={t.href + "#buy"}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "12px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontWeight: 700,
                  textDecoration: "none",
                  opacity: 0.92,
                }}
              >
                Buy Now
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
