// app/bring-the-snow/page.tsx

export const metadata = {
  title: "Bring the Snow (Slide We Ride) | PulseNexis",
  description:
    "Smooth R&B • Late-Night Drive • Intimate & Confident. Preview and buy instantly via Stripe.",
};

const STRIPE_LINK = "https://buy.stripe.com/eVqcN5gaTeTR1uh8lv4ZG0z";
const PREVIEW_MP3 =
  "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Bring-The-Snow/Bring%20the%20Snow%20(Slide%20We%20Ride).mp3";

export default function BringTheSnowPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "32px 18px" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 34, lineHeight: 1.1, margin: 0 }}>
          Bring the Snow (Slide We Ride)
        </h1>
        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Smooth R&amp;B • Late-Night Drive • Intimate &amp; Confident
        </p>
      </header>

      {/* BUY SECTION (anchor target for /bring-the-snow#buy) */}
      <section
        id="buy"
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 18,
          padding: 16,
          marginBottom: 22,
          scrollMarginTop: 90, // helps if you have a sticky header
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 10 }}>
          🎧 Preview the glide that sets the mood
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
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Music made for movement</h2>
        <p style={{ opacity: 0.85, lineHeight: 1.55 }}>
          Bring the Snow (Slide We Ride) is a smooth, grown R&amp;B record built
          for late-night motion and quiet confidence. It plays when the city
          lights blur past the windshield and the moment doesn’t need explaining.
          Nothing forced. Nothing rushed. It just rides.
        </p>
      </section>

      <section style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>
          Why creators use this track
        </h2>
        <ul style={{ opacity: 0.85, lineHeight: 1.7 }}>
          <li>Confident male lead with a relaxed, grown presence</li>
          <li>Smooth pacing that supports visuals and dialogue</li>
          <li>Luxurious late-night energy without overpowering the scene</li>
          <li>Easy to place under edits, montages, or transitions</li>
        </ul>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Perfect for</h2>
        <ul style={{ opacity: 0.85, lineHeight: 1.7 }}>
          <li>Late-night drive scenes</li>
          <li>Romantic or sensual visuals</li>
          <li>Lifestyle &amp; luxury content</li>
          <li>Short films, reels, and edits</li>
          <li>Podcast intros or transitions</li>
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
          These pair perfectly if you want the same late-night energy:
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          {/* Until you create more song pages, point these to your homepage “Hot Right Now” area */}
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
            <div style={{ fontWeight: 700 }}>Late-Night Ride R&amp;B</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
              Explore what’s hot right now →
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
            <div style={{ fontWeight: 700 }}>Grown &amp; Confident Soul</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
              Explore featured tracks →
            </div>
          </a>

          {/* Optional third card */}
          <a
            href="/catalog"
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              padding: 14,
              textDecoration: "none",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700 }}>Browse the Catalog</div>
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
