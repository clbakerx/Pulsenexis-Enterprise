"use client";
// app/grown-and-sexy/GrownAndSexy.jsx
// Client component: embedded player + tap-to-seek tracklist + all page styling.

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "O-0DXj6XHPI";

const TRACKS = [
  { n: 1, name: "When You Are Mine", t: 0, label: "0:00" },
  { n: 2, name: "What She Needs", t: 264, label: "4:24" },
  { n: 3, name: "Traces of You", t: 552, label: "9:12" },
  { n: 4, name: "Touch Like That", t: 823, label: "13:43" },
  { n: 5, name: "The Only Way I Be", t: 1023, label: "17:03" },
  { n: 6, name: "Tell Me", t: 1255, label: "20:55" },
  { n: 7, name: "Somebody Else\u2019s Man", t: 1499, label: "24:59" },
  { n: 8, name: "Simple Heart", t: 1721, label: "28:41" },
  { n: 9, name: "Saving Myself", t: 2015, label: "33:35" },
  { n: 10, name: "Pull Up On You", t: 2315, label: "38:35" },
  { n: 11, name: "Pieces Of Me", t: 2558, label: "42:38" },
  { n: 12, name: "Perfect Eye\u2019s", t: 2885, label: "48:05" },
  { n: 13, name: "No Way No How", t: 3089, label: "51:29" },
  { n: 14, name: "No Halfway Love", t: 3347, label: "55:47" },
  { n: 15, name: "No Exit Plan", t: 3634, label: "1:00:34" },
  { n: 16, name: "More Than Friends", t: 3839, label: "1:03:59" },
  { n: 17, name: "Love Like This", t: 4107, label: "1:08:27" },
  { n: 18, name: "Let Me Be", t: 4401, label: "1:13:21" },
  { n: 19, name: "Emergency", t: 4664, label: "1:17:44" },
  { n: 20, name: "Comfortable Stranger", t: 4837, label: "1:20:37" },
  { n: 21, name: "3 AM Again", t: 5127, label: "1:25:27" },
];

// To wire a Related card to a real upload, drop its watch?v= ID into `id`.
// While `id` is null the card links to the channel and hides its thumbnail.
const RELATED = [
  { tag: "Smooth R&B · Soul", name: "Landslide", id: null },
  { tag: "Grown & Sexy R&B", name: "Las Vegas Night\u2019s", id: null },
  { tag: "Late Night R&B", name: "Browse the Catalog", id: null },
];

const CHANNEL = "https://www.youtube.com/@pulsenexis";

export default function GrownAndSexy() {
  const playerRef = useRef(null);
  const initedRef = useRef(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    function init() {
      if (initedRef.current) return;
      initedRef.current = true;
      playerRef.current = new window.YT.Player("gs-ytplayer");
    }

    if (window.YT && window.YT.Player) {
      init();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev();
        init();
      };
    }
  }, []);

  function jump(track) {
    setActive(track.n);
    const p = playerRef.current;
    if (p && typeof p.seekTo === "function") {
      p.seekTo(track.t, true);
      p.playVideo();
      document.getElementById("listen")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.open(`https://www.youtube.com/watch?v=${VIDEO_ID}&t=${track.t}s`, "_blank");
    }
  }

  return (
    <div className="gs-page">
      <div className="wrap">
        {/* ===== TOP BAR ===== */}
        <header className="bar">
          <div className="brand">
            Pulse<span>Nexis</span>
          </div>
          <nav className="bar-links">
            <a href="#listen">Listen</a>
            <a href="#tracklist">Tracklist</a>
            <a href="#related">More Releases</a>
          </nav>
        </header>

        {/* ===== HERO ===== */}
        <div className="hero">
          <div className="cover-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
              alt="Grown & Sexy — Late Night R&B Mix cover art"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;
              }}
            />
          </div>
          <div className="hero-copy">
            <div className="eyebrow">PulseNexis · Late Night R&B</div>
            <h1>
              Grown <em>&amp;</em> Sexy
            </h1>
            <div className="subtitle">89 minutes of smooth slow jams for late nights</div>
            <p className="lede">
              A Quiet Storm set built for after hours — neo-soul warmth, slow-burning grooves, and
              that grown &amp; sexy pocket from front to back. Twenty-one original PulseNexis
              tracks, one continuous mood.
            </p>
            <div className="stats">
              <div className="stat">
                <div className="n">21</div>
                <div className="l">Tracks</div>
              </div>
              <div className="stat">
                <div className="n">1:29:27</div>
                <div className="l">Runtime</div>
              </div>
              <div className="stat">
                <div className="n">2026</div>
                <div className="l">Released</div>
              </div>
            </div>
            <div className="hero-cta">
              <a className="yt-btn" href={CHANNEL} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
                  />
                </svg>
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>

        {/* ===== GENRE PILLS / METADATA TARGETING ===== */}
        <div className="pills">
          {["Quiet Storm", "Smooth R&B", "Slow Jams", "Soul Music", "Late Night R&B"].map((g) => (
            <span className="pill" key={g}>
              {g}
            </span>
          ))}
        </div>

        {/* ===== EMBEDDED VIDEO ===== */}
        <section id="listen">
          <h2 className="sec-title">
            Press <em>Play</em>
          </h2>
          <p className="sec-sub">Dim the lights. The full mix, uninterrupted.</p>
          <div className="video-shell">
            <iframe
              id="gs-ytplayer"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&rel=0&modestbranding=1`}
              title="Grown & Sexy — Late Night R&B Mix"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        {/* ===== TRACKLIST ===== */}
        <section id="tracklist">
          <h2 className="sec-title">
            The <em>Tracklist</em>
          </h2>
          <p className="sec-sub">Twenty-one original cuts</p>
          <p className="hint">Tap any track to jump the player to that moment.</p>
          <div className="tracks">
            {TRACKS.map((tr) => (
              <div
                key={tr.n}
                className={`track${active === tr.n ? " playing" : ""}`}
                onClick={() => jump(tr)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && jump(tr)}
              >
                <span className="num">{tr.n}</span>
                <span className="name">{tr.name}</span>
                <span className="time">{tr.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== RELATED RELEASES ===== */}
        <section id="related">
          <h2 className="sec-title">
            More From <em>PulseNexis</em>
          </h2>
          <p className="sec-sub">Stay in the pocket</p>
          <div className="rel-grid">
            {RELATED.map((r, i) => (
              <a
                key={i}
                className="rel-card"
                href={r.id ? `https://www.youtube.com/watch?v=${r.id}` : `${CHANNEL}/videos`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.id && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="rel-thumb"
                    alt={`${r.name} release`}
                    src={`https://img.youtube.com/vi/${r.id}/hqdefault.jpg`}
                  />
                )}
                <div className="rel-body">
                  <div className="rel-tag">{r.tag}</div>
                  <div className="rel-name">{r.name}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer>
          <div className="f-brand">PulseNexis</div>
          <div className="f-line">Late-night R&B stories for real situations.</div>
          <div className="f-line">
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            &nbsp;·&nbsp;
            <a href="https://pulsenexis.com" target="_blank" rel="noopener noreferrer">
              pulsenexis.com
            </a>
          </div>
          <div className="f-meta">Chris Baker · © 2026 PulseNexis Music · ASCAP</div>
        </footer>
      </div>

      <style jsx>{`
        .gs-page {
          --midnight: #080a18;
          --deep: #0e1230;
          --blue: #1b2a5e;
          --violet: #2a1f4d;
          --gold: #d8b25e;
          --gold-bright: #f2d486;
          --cream: #f4eee0;
          --muted: #9aa0c0;
          --line: rgba(216, 178, 94, 0.16);
          --display: var(--font-display), Georgia, serif;
          --body: var(--font-body), system-ui, sans-serif;

          font-family: var(--body);
          color: var(--cream);
          background: radial-gradient(1200px 600px at 80% -10%, rgba(43, 31, 77, 0.55), transparent 60%),
            radial-gradient(1000px 700px at -10% 20%, rgba(27, 42, 94, 0.45), transparent 55%),
            linear-gradient(180deg, var(--midnight) 0%, var(--deep) 45%, var(--midnight) 100%);
          min-height: 100vh;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow-x: hidden;
        }
        .gs-page::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 28px;
          position: relative;
          z-index: 2;
        }
        .bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 26px 0 22px;
          border-bottom: 1px solid var(--line);
        }
        .brand {
          font-family: var(--display);
          font-size: 1.55rem;
          letter-spacing: 0.06em;
          color: var(--gold);
          font-weight: 600;
        }
        .brand span {
          color: var(--cream);
        }
        .bar-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.82rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-left: 26px;
          transition: color 0.25s;
        }
        .bar-links a:hover {
          color: var(--gold-bright);
        }
        .hero {
          display: grid;
          grid-template-columns: minmax(0, 360px) 1fr;
          gap: 54px;
          align-items: center;
          padding: 64px 0 40px;
        }
        .cover-frame {
          position: relative;
          animation: rise 0.9s ease both;
        }
        .cover-frame img {
          width: 100%;
          border-radius: 6px;
          display: block;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px var(--line);
        }
        .cover-frame::before {
          content: "";
          position: absolute;
          inset: -14px;
          border: 1px solid var(--line);
          border-radius: 10px;
          pointer-events: none;
        }
        .eyebrow {
          font-size: 0.74rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
          animation: rise 0.9s 0.05s ease both;
        }
        h1 {
          font-family: var(--display);
          font-weight: 500;
          font-size: clamp(3rem, 7vw, 5.4rem);
          line-height: 0.98;
          letter-spacing: 0.01em;
          margin-bottom: 8px;
          animation: rise 0.9s 0.1s ease both;
        }
        h1 em {
          font-style: italic;
          color: var(--gold-bright);
        }
        .subtitle {
          font-family: var(--display);
          font-style: italic;
          font-size: 1.5rem;
          color: var(--muted);
          margin-bottom: 26px;
          animation: rise 0.9s 0.15s ease both;
        }
        .lede {
          max-width: 46ch;
          color: #cfd2e6;
          font-weight: 300;
          font-size: 1.04rem;
          margin-bottom: 30px;
          animation: rise 0.9s 0.2s ease both;
        }
        .stats {
          display: flex;
          gap: 34px;
          animation: rise 0.9s 0.25s ease both;
        }
        .hero-cta {
          margin-top: 30px;
          animation: rise 0.9s 0.3s ease both;
        }
        .yt-btn {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          font-family: var(--body);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--midnight);
          background: linear-gradient(180deg, var(--gold-bright), var(--gold));
          padding: 13px 24px;
          border-radius: 40px;
          transition: transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 12px 30px -12px rgba(216, 178, 94, 0.6);
        }
        .yt-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -12px rgba(216, 178, 94, 0.7);
        }
        .yt-btn svg {
          flex: none;
        }
        .stat .n {
          font-family: var(--display);
          font-size: 2rem;
          color: var(--gold-bright);
          line-height: 1;
        }
        .stat .l {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 4px;
        }
        .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 18px 0 8px;
          animation: rise 0.9s 0.3s ease both;
        }
        .pill {
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid var(--line);
          border-radius: 40px;
          padding: 8px 16px;
          background: rgba(216, 178, 94, 0.04);
          transition: 0.25s;
        }
        .pill:hover {
          background: rgba(216, 178, 94, 0.12);
          color: var(--gold-bright);
        }
        section {
          padding: 54px 0;
          border-top: 1px solid var(--line);
        }
        .sec-title {
          font-family: var(--display);
          font-size: 2.2rem;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .sec-title em {
          font-style: italic;
          color: var(--gold);
        }
        .sec-sub {
          color: var(--muted);
          font-size: 0.86rem;
          letter-spacing: 0.06em;
          margin-bottom: 30px;
        }
        .video-shell {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 24px 70px -24px rgba(0, 0, 0, 0.85);
          border: 1px solid var(--line);
          background: #000;
        }
        .video-shell :global(iframe) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .tracks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px 40px;
        }
        .track {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 12px 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          border: 1px solid transparent;
        }
        .track:hover {
          background: rgba(216, 178, 94, 0.06);
          border-color: var(--line);
          transform: translateX(3px);
        }
        .track .num {
          font-family: var(--display);
          font-size: 1.05rem;
          color: var(--gold);
          width: 26px;
          flex: none;
          font-variant-numeric: tabular-nums;
          text-align: right;
        }
        .track .name {
          flex: 1;
          font-weight: 400;
          font-size: 1rem;
        }
        .track .time {
          font-size: 0.82rem;
          color: var(--muted);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
          flex: none;
        }
        .track:hover .time {
          color: var(--gold-bright);
        }
        .track.playing {
          background: rgba(216, 178, 94, 0.1);
          border-color: var(--line);
        }
        .track.playing .name {
          color: var(--gold-bright);
        }
        .hint {
          font-size: 0.8rem;
          color: var(--muted);
          margin-bottom: 22px;
          font-style: italic;
        }
        .rel-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .rel-card {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.015);
          transition: 0.3s;
        }
        .rel-card:hover {
          transform: translateY(-5px);
          border-color: rgba(216, 178, 94, 0.4);
          box-shadow: 0 20px 50px -22px rgba(0, 0, 0, 0.8);
        }
        .rel-thumb {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          background: linear-gradient(135deg, var(--blue), var(--violet));
        }
        .rel-body {
          padding: 16px 18px;
        }
        .rel-tag {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .rel-name {
          font-family: var(--display);
          font-size: 1.3rem;
          margin-top: 4px;
          line-height: 1.15;
        }
        footer {
          padding: 50px 0 70px;
          border-top: 1px solid var(--line);
          text-align: center;
        }
        .f-brand {
          font-family: var(--display);
          font-size: 1.6rem;
          color: var(--gold);
          letter-spacing: 0.06em;
        }
        .f-line {
          color: var(--muted);
          font-size: 0.82rem;
          margin-top: 10px;
          letter-spacing: 0.04em;
        }
        .f-line :global(a) {
          color: var(--gold);
          text-decoration: none;
        }
        .f-meta {
          color: var(--muted);
          font-size: 0.72rem;
          margin-top: 20px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (max-width: 820px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 34px;
            padding: 40px 0 20px;
          }
          .cover-frame {
            max-width: 340px;
          }
          .bar-links {
            display: none;
          }
        }
        @media (max-width: 760px) {
          .tracks {
            grid-template-columns: 1fr;
          }
          .rel-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}