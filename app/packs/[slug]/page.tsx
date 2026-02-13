"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

/** -----------------------------
 * Types
 * ------------------------------ */
type Preview = {
  id: string;
  title: string;
  mood: string;
  bpm: number;
  key: string;
  sources?: string[];
  path?: string; // relative OR absolute; we normalize it
  src?: string;  // relative OR absolute; we normalize it
};

type Pack = {
  slug: string;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  bullets: string[];
  previews: Preview[];
};

/** -----------------------------
 * Audio URL helpers
 * ------------------------------ */
const AUDIO_BASE_URL =
  process.env.NEXT_PUBLIC_AUDIO_BASE_URL ||
  "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

// supports absolute + relative
function audioUrl(pathOrUrl: string) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl.replace(/^\//, ""), AUDIO_BASE_URL).toString();
}

function initialCandidates(p: Preview): string[] {
  const out: string[] = [];

  // 1) explicit sources
  if (p.sources?.length) out.push(...p.sources.filter(Boolean).map(audioUrl));

  // 2) src
  if (p.src) out.push(audioUrl(p.src));

  // 3) path
  if (p.path) out.push(audioUrl(p.path));

  // unique + keep order
  const seen = new Set<string>();
  return out.filter((x) => {
    if (!x) return false;
    if (seen.has(x)) return false;
    seen.add(x);
    return true;
  });
}

/** -----------------------------
 * Packs data (paste/keep yours)
 * ------------------------------ */
const PACKS: Record<string, Pack> = {
  "rnb-blueprint": {
    slug: "rnb-blueprint",
    name: "R&B Blueprint Pack",
    badge: "Fan Favorite",
    tagline: "Grown & soulful. Ready for love scenes and late-night vibes.",
    description:
      "A polished R&B starter pack with warm chords, smooth bass, and emotional bounce for content that needs heart.",
    bullets: ["Romantic + smooth tempos", "Clean loop points", "Best for reels + shorts"],
    previews: [
      {
        id: "late-night-drive",
        title: "Late Night Drive",
        mood: "Romantic",
        bpm: 74,
        key: "A♭",
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/Late-Night-Drive/samples/Late-Night-Drive-16Bar.mp3",
        ],
      },
      {
        id: "heart-on-read",
        title: "Heart On Read",
        mood: "Smooth",
        bpm: 76,
        key: "B♭",
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/Heart-on-Read/samples/Heart-on-Read-16Bar.mp3",
        ],
      },
      {
        id: "after-hours",
        title: "After Hours",
        mood: "Emotional",
        bpm: 72,
        key: "C minor",
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/After-Hours/samples/After-Hours-16Bar.mp3",
        ],
      },
      {
        id: "pillow-talk",
        title: "Pillow Talk",
        mood: "Warm",
        bpm: 78,
        key: "F",
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/Pillow-Talk/samples/Pillow-Talk-16Bar.mp3",
        ],
      },
    ],
  },

  "trap-soul": {
    slug: "trap-soul",
    name: "Trap Soul Pack",
    badge: "New",
    tagline: "Modern R&B with 808 weight.",
    description:
      "Dark-to-warm Trap Soul palette: 808s, airy keys, and tension chords that feel current and cinematic.",
    bullets: ["808 + ambient texture", "Hook-friendly grooves", "Best for story content"],
    previews: [
      {
        id: "midnight-808",
        title: "Midnight 808",
        mood: "Cinematic",
        bpm: 74,
        key: "F minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Midnight-808/samples/Midnight-808-16Bar.mp3",
      },
      {
        id: "drip-in-the-air",
        title: "Drip In The Air",
        mood: "Airy",
        bpm: 76,
        key: "A♭ minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Drip-in-the-Air/samples/Drip-in-the-Air-16Bar.mp3",
      },
      {
        id: "tension-love",
        title: "Tension Love",
        mood: "Dark/Warm",
        bpm: 72,
        key: "C minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Tension-Love/samples/Tension-Love-16Bar.mp3",
      },
      {
        id: "hook-season",
        title: "Hook Season",
        mood: "Hooky",
        bpm: 78,
        key: "E minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Hook-Season/samples/Hook-Season-16Bar.mp3",
      },
    ],
  },

  // ...keep the rest of your packs the same...
};

/** -----------------------------
 * UI helpers
 * ------------------------------ */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
      {children}
    </span>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm text-neutral-700">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-white">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="space-y-2">
      {kicker ? (
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {kicker}
        </div>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
        {title}
      </h2>
      {desc ? <p className="max-w-3xl text-neutral-600">{desc}</p> : null}
    </div>
  );
}

/** -----------------------------
 * Uniform Top Hero (screenshot style)
 * ------------------------------ */
function TopHero({
  eyebrow,
  highlightWord,
  descriptionLines,
  bullets,
  primaryLabel,
  primaryHref,
  secondaryHref,
  tertiaryHref,
  footnote,
}: {
  eyebrow: string;
  highlightWord: string; // the yellow word (e.g., "Packs" / "Cinema" / "Shorts")
  descriptionLines: string[];
  bullets: string[];
  primaryLabel: string;
  primaryHref: string;
  secondaryHref: string;
  tertiaryHref: string;
  footnote: string;
}) {
  return (
    <section className="rounded-[28px] border border-black/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-10 py-12 text-white shadow-sm">
      <div className="text-xs font-semibold tracking-widest text-white/70">
        {eyebrow}
      </div>

      <h1 className="mt-4 text-5xl font-extrabold leading-tight">
        Music built for{" "}
        <span className="text-amber-400">{highlightWord}</span>, Reels &amp; Brands
      </h1>

      <div className="mt-5 max-w-2xl space-y-1 text-sm leading-relaxed text-white/75">
        {descriptionLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <ul className="mt-6 space-y-2 text-sm text-white/80">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="text-emerald-400">✅</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-black hover:opacity-95"
        >
          {primaryLabel}
        </a>

        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
        >
          View License Terms
        </Link>

        <Link
          href={tertiaryHref}
          className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
        >
          Back Home
        </Link>
      </div>

      <div className="mt-4 text-xs text-white/55">{footnote}</div>
    </section>
  );
}

/** -----------------------------
 * Page
 * ------------------------------ */
export default function PackSlugPage() {
  const params = useParams();

  // Works for /packs/[slug]
  const raw = (params as any)?.slug as string | string[] | undefined;
  const slug = Array.isArray(raw) ? raw[0] : raw || "";

  const pack = slug ? PACKS[slug] : undefined;

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const audioMap = React.useRef<Record<string, HTMLAudioElement | null>>({});
  const [srcIndex, setSrcIndex] = React.useState<Record<string, number>>({});

  const candidatesFor = React.useCallback((p: Preview) => initialCandidates(p), []);

  const getSrcFor = React.useCallback(
    (p: Preview) => {
      const candidates = candidatesFor(p);
      const idx = srcIndex[p.id] ?? 0;
      return candidates[idx] || "";
    },
    [srcIndex, candidatesFor]
  );

  const bumpSrc = React.useCallback(
    (p: Preview) => {
      const candidates = candidatesFor(p);
      setSrcIndex((cur) => {
        const next = (cur[p.id] ?? 0) + 1;
        if (next >= candidates.length) return cur;
        return { ...cur, [p.id]: next };
      });
    },
    [candidatesFor]
  );

  const stopAllExcept = React.useCallback((keepId: string) => {
    for (const [id, el] of Object.entries(audioMap.current)) {
      if (!el) continue;
      if (id !== keepId) {
        try {
          el.pause();
          el.currentTime = 0;
        } catch {}
      }
    }
  }, []);

  const handlePlay = React.useCallback(
    (p: Preview) => {
      stopAllExcept(p.id);
      setActiveId(p.id);

      const el = audioMap.current[p.id];
      if (!el) return;

      const src = getSrcFor(p);
      if (src && el.src !== src) el.src = src;

      try {
        void el.play();
      } catch {}
    },
    [getSrcFor, stopAllExcept]
  );

  const handlePause = React.useCallback((id: string) => {
    const el = audioMap.current[id];
    if (el) {
      try {
        el.pause();
      } catch {}
    }
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  if (!pack) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto w-full max-w-4xl px-4 py-16">
          <h1 className="text-2xl font-semibold text-neutral-900">Pack not found</h1>
          <p className="mt-2 text-neutral-600">
            This pack slug does not exist:{" "}
            <span className="font-mono">{slug || "(missing)"}</span>
          </p>

          <Link href="/packs" className="mt-6 inline-block underline">
            Back to packs
          </Link>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
            <div className="font-semibold text-neutral-900">Available slugs</div>
            <div className="mt-1 font-mono">{Object.keys(PACKS).join(", ")}</div>
          </div>
        </div>
      </main>
    );
  }

  const nowPlaying = pack.previews.find((p) => p.id === activeId);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-neutral-500">
          <Link href="/packs" className="hover:underline">
            Packs
          </Link>{" "}
          <span className="mx-2">/</span>
          <span className="text-neutral-700">{pack.name}</span>
        </div>

        {/* ✅ Uniform top hero (screenshot style) */}
        <TopHero
          eyebrow="PULSENEXIS • PACKS"
          highlightWord={pack.name}
          descriptionLines={[
            pack.tagline,
            pack.description,
          ]}
          bullets={[
            ...pack.bullets,
            "Monetization allowed",
            "No Content ID claims",
            "One-time purchase • Perpetual license",
          ]}
          primaryLabel="Play Previews"
          primaryHref="#previews"
          secondaryHref="/licensing"
          tertiaryHref="/"
          footnote={
            nowPlaying
              ? `Now playing: ${nowPlaying.title}`
              : "Pick a preview below • No renewals • No Content ID"
          }
        />

        {/* Everything below remains the same */}
        <section id="previews" className="mt-10 md:mt-14">
          <SectionTitle
            kicker="Listen first"
            title="Audio previews"
            desc="Short clips so customers can hear the vibe before ordering."
          />

          <div className="mt-6 grid gap-4">
            {pack.previews.map((p) => {
              const src = getSrcFor(p);
              const candidates = candidatesFor(p);
              const idx = srcIndex[p.id] ?? 0;
              const isActive = activeId === p.id;

              return (
                <div
                  key={p.id}
                  className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm md:p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="truncate text-base font-semibold text-neutral-900">
                          {p.title}
                        </div>
                        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
                          {p.mood}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
                          {p.bpm} BPM
                        </span>
                        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
                          {p.key}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-neutral-600">
                        preview • loop-clean • content-ready
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => (isActive ? handlePause(p.id) : handlePlay(p))}
                      className={cx(
                        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "bg-neutral-900 text-white hover:opacity-90"
                          : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                      )}
                      disabled={!src}
                      title={!src ? "Missing audio URL" : undefined}
                    >
                      {isActive ? "Pause" : "Play"}
                    </button>
                  </div>

                  <audio
                    ref={(el) => {
                      audioMap.current[p.id] = el;
                    }}
                    key={`${p.id}-${idx}`}
                    src={src}
                    preload="none"
                    onEnded={() => setActiveId((cur) => (cur === p.id ? null : cur))}
                    onError={() => bumpSrc(p)}
                  />

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
                    {candidates.length > 1 ? (
                      <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5">
                        trying {Math.min(idx + 1, candidates.length)}/{candidates.length}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section id="start-order" className="mt-12 md:mt-16">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-sm md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Ready to order?
                </div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Start your {pack.name} order
                </h3>
                <p className="max-w-2xl text-sm text-white/80">
                  Instant download after checkout. Want a custom version in your exact key/tempo?
                  Use the order form option.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/custom-music-kits#intake"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:opacity-90"
                >
                  Start Order Form
                </Link>

                <Link
                  href="/packs"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Back to Packs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} PulseNexis • Honey Drip Records
        </div>
      </div>
    </main>
  );
}
