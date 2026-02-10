import Link from "next/link";

const SHORTS_PRICE_LABEL = "$39";

// ✅ Send bundle choice into your Checkout Session route
const checkoutHrefForBundle = (bundleTitle: string) =>
  `/api/checkout/shorts?bundle=${encodeURIComponent(bundleTitle)}`;

type BundleSample = { name: string; previewUrl: string };
type ShortsBundle = { title: string; tag: string; samples: BundleSample[] };

const DELIVERABLES = [
  { title: "30s Main", desc: "All-purpose Shorts background." },
  { title: "12s Loop", desc: "Seamless loop for text + VO." },
  {
    title: "Stems",
    desc: "Full stems included for custom edits (melody, chords, bass, drums, FX).",
  },
];

const SHORTS_BUNDLES: ShortsBundle[] = [
  {
    title: "Love Sessions EP 01",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "All My Love – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_01/Love%20Sessions%20EP_01_30secSample.mp3",
      },
      {
        name: "All My Love V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_01/Love-Sessions-EP_01_Ver_2_30secSample.mp3",
      },
    ],
  },
  {
    title: "Love Sessions EP 02",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "Heartbeat – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_02/Heartbeat_30secSample.mp3",
      },
      {
        name: "Heartbeat V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_02/Heartbeat-V2_30secSample.mp3",
      },
    ],
  },
  {
    title: "Love Sessions EP 03",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "Right There – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_03/Right%20There_30secSample.mp3",
      },
      {
        name: "Right There V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_03/Right-ThereV2_30secSample.mp3",
      },
    ],
  },
  {
    title: "Love Sessions EP 04",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "Missing You – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_04/Love%20Sessions%20EP_04_30secSample.mp3",
      },
      {
        name: "Missing You V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_04/Love%20Sessions%20EP_04%20(V_2)_30secSample.mp3",
      },
    ],
  },
  {
    title: "Love Sessions EP 05",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "Love Sessions EP 05 – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_05/Love%20Sessions%20EP_05_30secSample.mp3",
      },
      {
        name: "Love Sessions EP 05 V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_05/Love%20Sessions%20EP_05%20(V2)_30secSample.mp3",
      },
    ],
  },
  {
    title: "Love Sessions EP 06",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "Love Sessions EP 06 – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_06/Love%20Sessions%20EP_06_30secSample.mp3",
      },
      {
        name: "Love Sessions EP 06 V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_06/Love%20Sessions%20EP_06_(V2)30secSample.mp3",
      },
    ],
  },
  {
    title: "Love Sessions EP 07",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "Love Sessions EP 07 – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_07/Love%20Sessions%20EP_07_30secSample.mp3",
      },
      {
        name: "Love Sessions EP 07 V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_07/Love%20Sessions%20EP_07(V2)30secSample.mp3",
      },
    ],
  },
  {
    title: "Love Sessions EP 08",
    tag: "Shorts Bundle",
    samples: [
      {
        name: "Love Sessions EP 08 – Warm Piano",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_08/Love%20Sessions%20EP_08_30secSample.mp3",
      },
      {
        name: "Love Sessions EP 08 V-2 – Soft Rhodes",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_08/Love%20Sessions%20EP_08(V2)30secSample.mp3",
      },
    ],
  },
  {
  title: "Love Sessions EP 09",
  tag: "Shorts Bundle",
  samples: [
    {
      name: "Love Sessions EP 09 – Street-Minded",
      previewUrl:
        "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_09/Love%20Sessions%20EP_09_30secSample.mp3",
    },
    {
      name: "Love Sessions EP 09 V-2 – Street-Minded",
      previewUrl:
        "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_09/Love%20Sessions%20EP_09%20(V2)30secSample.mp3",
    },
  ],
},
];

export default function ShortsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900 p-10 text-white">
        <div className="text-sm font-semibold tracking-wide opacity-90">
          PULSENEXIS • SHORTS &amp; JINGLES
        </div>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
          Music built for <span className="text-amber-300">Shorts</span>, Reels
          &amp; Brands
        </h1>

        <p className="mt-4 max-w-2xl text-slate-200">
          Loop-ready, creator-safe samples optimized for TikTok, Instagram Reels,
          and YouTube Shorts. Designed to support text overlays and voiceovers.
        </p>

        <ul className="mt-6 space-y-2 text-sm text-slate-200">
          <li>✅ 9:16 optimized • loop-first</li>
          <li>✅ Monetization allowed</li>
          <li>✅ No Content ID claims</li>
          <li>✅ One-time purchase • Perpetual license</li>
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#bundles"
            className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-300"
          >
            Choose a bundle
          </a>

          <Link
            href="/licensing"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            View License Terms
          </Link>

          <Link
            href="/"
            className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            Back Home
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-300">
          Pick a bundle below • Checkout opens in a new tab • No renewals • No
          Content ID
        </p>
      </section>

      {/* WHAT YOU GET */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">What you get</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Every bundle includes 30s, 12s loop, and stems.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((x) => (
            <div key={x.title} className="rounded-2xl border bg-white p-5">
              <div className="text-sm font-semibold">{x.title}</div>
              <p className="mt-2 text-sm opacity-80">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BUNDLES */}
      <section id="bundles" className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Shorts Bundles</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Each card includes two previews. Input Bundle Name in Optional at
              checkout.
            </p>
          </div>

          <Link
            href="/packs"
            className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            Browse all packs
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHORTS_BUNDLES.map((bundle) => (
            <div key={bundle.title} className="rounded-2xl border bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{bundle.title}</div>
                  <p className="mt-1 text-xs text-neutral-500">2-track preview</p>
                </div>

                <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                  {bundle.tag}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {bundle.samples.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1 text-xs font-medium text-neutral-700">
                      {s.name}
                    </div>
                    <audio controls preload="none" className="w-full">
                      <source src={s.previewUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={checkoutHrefForBundle(bundle.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  License Bundle — {SHORTS_PRICE_LABEL}
                </a>

                <Link
                  href="/licensing"
                  className="inline-flex w-full items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold hover:bg-neutral-50"
                >
                  View license terms
                </Link>

                <p className="mt-1 text-center text-xs text-neutral-500">
                  Opens checkout in a new tab • Perpetual license • Stems included
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NOTES */}
      <section className="mt-12 rounded-2xl border bg-white p-6">
        <h3 className="text-lg font-bold">Creator-safe notes</h3>
        <ul className="mt-3 space-y-2 text-sm opacity-80">
          <li>• No lyric vocals (safe for VO/text content).</li>
          <li>• Loop-first design to fit short edits cleanly.</li>
          <li>• License does not transfer ownership of the music.</li>
          <li>• No renewals required — license is perpetual.</li>
        </ul>
      </section>
    </main>
  );
}
