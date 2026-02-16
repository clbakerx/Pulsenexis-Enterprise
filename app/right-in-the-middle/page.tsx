// app/right-in-the-middle/page.tsx

export const metadata = {
  title: "Right in the Middle | PulseNexis",
  description:
    "Smooth R&B • Grown & emotional • Late-night tension. Preview and buy instantly via Stripe.",
};

const STRIPE_LINK = "https://buy.stripe.com/bJebJ19Mv7rpgpb59j4ZG0A";
const PREVIEW_MP3 = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Right-in-the-Middle/Right%20in%20the%20Middle_30secSample.mp3";

export default function RightInTheMiddlePage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "32px 18px" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 34, lineHeight: 1.1, margin: 0 }}>
          Right in the Middle
        </h1>
        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Smooth R&amp;B • Grown &amp; emotional • Late-night tension
        </p>
      </header>

      {/* BUY SECTION (anchor target for /right-in-the-middle#buy) */}
      <section
        id="buy"
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 18,
          padding: 16,
          marginBottom: 22,
          scrollMarginTop: 90,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 10 }}>
          🎧 Preview the moment you can’t ignore
        </div>

        <audio
          controls
          preload="none"
          style={{ width: "100%", marginBottom: 12 }}
        >
          <source src={PREVIEW_MP3} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <a
          href={STRIPE_LINK}
          style={{
            display: "block",
            textAlign: "center",
            padding: "14px 16px",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.18)",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Buy Now
        </a>

        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.75 }}>
          Secure Stripe checkout • Instant access after purchase • One-time payment
        </div>
      </section>

      <section style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>The feeling</h2>
        <p style={{ opacity: 0.85, lineHeight: 1.55 }}>
          Right in the Middle lives in that space where love isn’t over — but it
          isn’t safe either. It’s grown, honest R&amp;B for the moments when
          you’re trying to keep it together while your heart is pulling you back
          toward what you still want.
        </p>
      </section>

      <section style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>
          Why creators use this track
        </h2>
        <ul style={{ opacity: 0.85, lineHeight: 1.7 }}>
          <li>Emotion-forward tone that supports narrative visuals</li>
          <li>Strong pocket that sits under dialogue and VO</li>
          <li>Clean pacing for edits, transitions, and montages</li>
          <li>Modern grown R&amp;B without feeling “busy”</li>
        </ul>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Perfect for</h2>
        <ul style={{ opacity: 0.85, lineHeight: 1.7 }}>
          <li>Relationship stories &amp; emotional reels</li>
          <li>Late-night scenes / “what are we?” moments</li>
          <li>Short films, edits, and dramatic transitions</li>
          <li>Brand storytelling with a human feel</li>
          <li>Podcast intros or moody underscoring</li>
        </ul>
      </section>

      <section
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 18,
          padding: 16,
          marginBottom: 22,
        }}
      >
        <h2 style={{ fontSize: 18, marginTop: 0 }}>Similar Vibes</h2>
        <p style={{ opacity: 0.8, marginTop: 6 }}>
          If you like this lane, these pair perfectly:
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          <a
            href="/bring-the-snow"
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              padding: 14,
              textDecoration: "none",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700 }}>Bring the Snow (Slide We Ride)</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
              Smooth, late-night motion →
            </div>
          </a>

          <a
            href="/#hot"
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              padding: 14,
              textDecoration: "none",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700 }}>Hot Right Now</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
              Explore featured tracks →
            </div>
          </a>

          <a
            href="/singles"
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              padding: 14,
              textDecoration: "none",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700 }}>Browse the Singles</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
              Find more tracks for your project →
            </div>
          </a>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.10)",
          paddingTop: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Why PulseNexis</div>
        <ul
          style={{
            opacity: 0.85,
            lineHeight: 1.7,
            margin: 0,
            paddingLeft: 18,
          }}
        >
          <li>Built for creators</li>
          <li>Straightforward checkout</li>
          <li>Instant access</li>
          <li>Music with real emotion</li>
        </ul>
      </footer>
    </main>
  );
}
