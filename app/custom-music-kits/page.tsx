"use client";

import Link from "next/link";

type UseCaseCard = {
  name: string;
  description: string;
  highlights: string[];
  href: string;
  cta: string;
  tag?: string;
};

const useCases: UseCaseCard[] = [
  {
    name: "YouTube & Shorts",
    description: "Fast hooks, emotional beds, clean mixes. Most popular.",
    highlights: ["9:16 / loop-first friendly", "Monetization allowed", "No Content ID stress"],
    href: "/shorts",
    cta: "Browse Shorts & Jingles",
    tag: "Most popular",
  },
  {
    name: "Instagram / TikTok Reels",
    description: "Punchy vibes that fit 9:16 edits.",
    highlights: ["Punchy, edit-friendly energy", "Built for VO + text overlays", "Perpetual licensing"],
    href: "/shorts",
    cta: "Browse Reels-ready bundles",
  },
  {
    name: "Weddings & Love Stories",
    description: "Romantic, cinematic, heartfelt moments.",
    highlights: ["Romance-forward packs", "Clean mixes for ceremonies", "Perpetual license"],
    href: "/packs",
    cta: "Browse Packs",
  },
  {
    name: "Film & Cinematic",
    description: "Big emotion for trailers & scenes.",
    highlights: ["Trailer beds + reveal moments", "Tension / lifts / stingers", "One-time license kits"],
    href: "/cinema",
    cta: "View Cinema Kits",
  },
  {
    name: "Ads & Brand Content",
    description: "Commercial-ready tracks for campaigns.",
    highlights: ["Brand-safe, commercial-ready", "Clean structure for edits", "Perpetual license"],
    href: "/packs",
    cta: "Browse Commercial Packs",
  },
  {
    name: "Podcasts & Voiceover",
    description: "Supportive beds that don’t fight dialogue.",
    highlights: ["VO-friendly arrangements", "Subtle beds + clean mixes", "Perpetual license"],
    href: "/packs",
    cta: "Browse VO-friendly packs",
  },
];

export default function CustomMusicKitsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Find music for your project</h1>
      <p className="mt-2 opacity-80">
        Choose a use-case to jump into the best-fit packs, cinema kits, or Shorts bundles — all licensed once,
        used forever.
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link className="underline" href="/packs">
          View all packs
        </Link>
        <span className="opacity-60">•</span>
        <Link className="underline" href="/shorts">
          Shorts & Jingles
        </Link>
        <span className="opacity-60">•</span>
        <Link className="underline" href="/cinema">
          Cinema
        </Link>
        <span className="opacity-60">•</span>
        <Link className="underline" href="/licensing">
          How licensing works
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {useCases.map((c) => (
          <div key={c.name} className="rounded-2xl border p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm opacity-70">{c.name}</div>
              {c.tag ? (
                <span className="rounded-full border px-2 py-0.5 text-xs opacity-80">{c.tag}</span>
              ) : null}
            </div>

            <div className="mt-2 text-sm opacity-85">{c.description}</div>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm opacity-85">
              {c.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <Link
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
              href={c.href}
            >
              {c.cta}
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border p-5">
        <h2 className="text-lg font-semibold">Not sure where to start?</h2>
        <p className="mt-1 text-sm opacity-80">
          Start with <span className="font-medium">Packs</span> — it’s the fastest path to licensing. If you’re
          doing Shorts/Reels, head straight to <span className="font-medium">Shorts & Jingles</span>.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-xl border px-4 py-2 text-sm" href="/packs">
            Browse Packs
          </Link>
          <Link className="rounded-xl border px-4 py-2 text-sm" href="/shorts">
            Browse Shorts & Jingles
          </Link>
          <Link className="rounded-xl border px-4 py-2 text-sm" href="/licensing">
            Read Licensing
          </Link>
        </div>
      </section>
    </main>
  );
}
