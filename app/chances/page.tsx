// app/chances/page.tsx

export const metadata = {
  title: "Chances | PulseNexis",
  description:
    "Smooth R&B • Hopeful & heartfelt • Grown romance. Preview and buy instantly via Stripe.",
};

const STRIPE_LINK = "https://buy.stripe.com/6oU00j1fZ275a0NgS14ZG0B";
const PREVIEW_MP3 = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Chances/Chances_30secSample.mp3";

export default function ChancesPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "32px 18px" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 34, lineHeight: 1.1, margin: 0 }}>Chances</h1>
        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Smooth R&amp;B • Hopeful &amp; heartfelt • Grown romance
        </p>
      </header>

      {/* BUY SECTION (anchor target for /chances#buy) */}
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
          🎧 Preview the record that feels like a fresh start
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
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>A grown second chance</h2>
        <p style={{ opacity: 0.85, lineHeight: 1.55 }}>
          Chances is for the love that’s been tested — and still shows up. It’s
          smooth, romantic R&amp;B with that “let’s do this right” energy: calm,
          confident, and honest enough to heal what was shaky.
        </p>
      </section>

      <section style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>
          Why creators use this track
        </h2>
        <ul style={{ opacity: 0.85, lineHeight: 1.7 }}>
          <li>Warm emotional tone that supports love-forward visuals</li>
          <li>Steady groove that won’t overpower your scene</li>
          <li>Clean structure that cuts well for reels and shorts</li>
          <li>Feels romantic without being cheesy</li>
        </ul>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Perfect for</h2>
        <ul style={{ opacity: 0.85, lineHeight: 1.7 }}>
          <li>Couples content &amp; relationship stories</li>
          <li>Engagement, wedding, and anniversary edits</li>
          <li>Brand/lifestyle reels with warmth</li>
          <li>Short films, montages, and recap videos</li>
          <li>Creator intros and transitions</li>
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
          Keep the grown romance going with:
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
              Late-night glide energy →
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
