// app/packs/rnb-blueprint/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";

type Preview = {
  id: string;
  title: string;
  mood: string;
  bpm: number;
  key: string;
  // Put a short mp3 preview here (20–30s)
  src: string;
};

const AUDIO_BASE_URL = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/"; // ← change if needed (must end with /)

const PREVIEWS: Preview[] = [
  {
    id: "late-night-drive",
    title: "Late Night Drive",
    mood: "Romantic",
    bpm: 74,
    key: "A♭",
    src: `${AUDIO_BASE_URL}previews/late-night-drive-30s.mp3`,
  },
  {
    id: "heart-on-read",
    title: "Heart On Read",
    mood: "Smooth",
    bpm: 76,
    key: "B♭",
    src: `${AUDIO_BASE_URL}previews/heart-on-read-30s.mp3`,
  },
  {
    id: "after-hours",
    title: "After Hours",
    mood: "Emotional",
    bpm: 72,
    key: "C minor",
    src: `${AUDIO_BASE_URL}previews/after-hours-30s.mp3`,
  },
  {
    id: "pillow-talk",
    title: "Pillow Talk",
    mood: "Warm",
    bpm: 78,
    key: "F",
    src: `${AUDIO_BASE_URL}previews/pillow-talk-30s.mp3`,
  },
  {
    id: "midnight-promise",
    title: "Midnight Promise",
    mood: "Soulful",
    bpm: 70,
    key: "E♭",
    src: `${AUDIO_BASE_URL}previews/midnight-promise-30s.mp3`,
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
      {children}
    </span>
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
      {desc ? <p className="max-w-2xl text-neutral-600">{desc}</p> : null}
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-white">
        ✓
      </span>
      <span className="text-neutral-700">{children}</span>
    </li>
  );
}

function PreviewRow({
  item,
  isActive,
  onPlay,
  onPause,
  audioRef,
}: {
  item: Preview;
  isActive: boolean;
  onPlay: () => void;
  onPause: () => void;
  audioRef: (el: HTMLAudioElement | null) => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="truncate text-base font-semibold text-neutral-900">
              {item.title}
            </div>
            <Badge>{item.mood}</Badge>
            <Badge>{item.bpm} BPM</Badge>
            <Badge>{item.key}</Badge>
          </div>
          <div className="mt-1 text-sm text-neutral-600">
            20–30s preview • grown, warm, and emotional
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={isActive ? onPause : onPlay}
            className={cx(
              "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
              isActive
                ? "bg-neutral-900 text-white hover:opacity-90"
                : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
            )}
          >
            {isActive ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <audio
          ref={audioRef}
          src={item.src}
          preload="none"
          controls
          className="h-10 w-full"
          onPlay={onPlay}
          onPause={onPause}
        />
      </div>
    </div>
  );
}

export default function RnBBlueprintPackPage() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const audioMap = React.useRef<Record<string, HTMLAudioElement | null>>({});

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
    (id: string) => {
      stopAllExcept(id);
      setActiveId(id);
      const el = audioMap.current[id];
      if (el) {
        try {
          el.play();
        } catch {
          // Autoplay restrictions are common; user can press play on native controls.
        }
      }
    },
    [stopAllExcept]
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

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Top container */}
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* HERO */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Fan Favorite</Badge>
                <Badge>Instant Download</Badge>
                <Badge>Blueprint Pack</Badge>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                R&amp;B Blueprint Pack
              </h1>

              <p className="text-lg font-semibold text-neutral-800 md:text-xl">
                Grown &amp; soulful. Ready for love scenes and late-night vibes.
              </p>

              <p className="max-w-2xl text-neutral-600">
                A complete R&amp;B creation system for producers, artists, and creators who
                want emotional, professional-quality records — fast. You’ll get the
                chords, grooves, vocal structures, and songwriting formulas behind
                modern soul and classic R&amp;B — without guesswork.
              </p>

              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                <FeatureItem>Romantic + smooth tempos</FeatureItem>
                <FeatureItem>Clean loop points</FeatureItem>
                <FeatureItem>Best for reels + shorts</FeatureItem>
                <FeatureItem>3rd &amp; 5th harmony blueprint</FeatureItem>
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#previews"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Play Preview
                </a>

                <a
                  href="#start-order"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  Start Order
                </a>
              </div>

              <div className="text-xs text-neutral-500">
                Tip: Replace preview mp3 links in this file under <span className="font-semibold">PREVIEWS</span>.
              </div>
            </div>

            {/* Side card */}
            <div className="w-full md:w-[360px]">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="text-sm font-semibold text-neutral-900">
                  What you’ll create
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  Finished R&amp;B records with structure, emotion, and a clean modern pocket.
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Included
                    </div>
                    <ul className="mt-2 space-y-2 text-sm text-neutral-700">
                      <li>• Chord progression blueprints</li>
                      <li>• Drum groove templates</li>
                      <li>• Vocal arrangement maps</li>
                      <li>• Mix starter chains</li>
                      <li>• Project templates (FL / Logic / Ableton)</li>
                    </ul>
                  </div>

                  <a
                    href="#start-order"
                    className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Start Order
                  </a>

                  {/* Optional: Link back to packs list */}
                  <Link
                    href="/packs"
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Back to Packs
                  </Link>

                  <div className="text-center text-xs text-neutral-500">
                    Questions?{" "}
                    <Link className="underline" href="/contact">
                      Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEWS */}
        <div id="previews" className="mt-10 md:mt-14">
          <SectionTitle
            kicker="Listen first"
            title="Audio previews"
            desc="Hear the vibe before you start. These are short 20–30s clips meant to show the pocket and emotional tone."
          />

          <div className="mt-6 grid gap-4">
            {PREVIEWS.map((p) => (
              <PreviewRow
                key={p.id}
                item={p}
                isActive={activeId === p.id}
                onPlay={() => handlePlay(p.id)}
                onPause={() => handlePause(p.id)}
                audioRef={(el) => {
                  audioMap.current[p.id] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* WHAT'S INSIDE */}
        <div className="mt-12 md:mt-16">
          <SectionTitle
            kicker="Everything you need"
            title="What’s inside the pack"
            desc="Built to move fast without losing soul. Use it as a starter kit or a repeatable system for content and releases."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">🎼 Chord Blueprints</div>
              <p className="mt-2 text-sm text-neutral-600">
                Romantic • Smooth • Emotional • Late-Night progressions designed for quick writing.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">🥁 Drum Groove Templates</div>
              <p className="mt-2 text-sm text-neutral-600">
                Modern R&amp;B bounce, neo-soul swing, and slow-jam pockets with clean loop points.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">🎙 Vocal Arrangement System</div>
              <p className="mt-2 text-sm text-neutral-600">
                3rd &amp; 5th stacks, falsetto-led chorus options, background placement maps, ad-lib structure.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">🧠 Songwriting Framework</div>
              <p className="mt-2 text-sm text-neutral-600">
                Verse→Pre→Chorus formulas, emotional arc blueprint, hook crafting rules, bridge impact method.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">🎚 Mix Starter Chains</div>
              <p className="mt-2 text-sm text-neutral-600">
                Lead vocal polish chain, drum glue bus, low-end control template to keep it clean.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">🧬 Project Templates</div>
              <p className="mt-2 text-sm text-neutral-600">
                FL Studio • Logic • Ableton templates so you can open and start instantly.
              </p>
            </div>
          </div>
        </div>

        {/* WHO IT'S FOR + HOW IT WORKS */}
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <SectionTitle kicker="Built for" title="Who this is for" />
            <ul className="mt-4 space-y-2 text-neutral-700">
              <li>✓ R&amp;B producers</li>
              <li>✓ Independent artists</li>
              <li>✓ Content creators (reels + shorts)</li>
              <li>✓ Film / love-scene composers</li>
              <li>✓ Anyone building an emotional brand</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <SectionTitle kicker="Simple process" title="How it works" />
            <ol className="mt-4 space-y-2 text-neutral-700">
              <li>1) Download the pack</li>
              <li>2) Open a template</li>
              <li>3) Follow the blueprint</li>
              <li>4) Create real records in hours — not weeks</li>
            </ol>
          </div>
        </div>

        {/* OUTCOME */}
        <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:mt-16 md:p-10">
          <SectionTitle kicker="The outcome" title="From stuck to finished" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="text-sm font-semibold text-neutral-900">Before</div>
              <p className="mt-2 text-sm text-neutral-700">
                Stuck ideas, unfinished sessions, no clear direction, and “almost there” songs.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="text-sm font-semibold text-neutral-900">After</div>
              <p className="mt-2 text-sm text-neutral-700">
                Complete, emotional R&amp;B records with structure, soul, and clean modern pocket.
              </p>
            </div>
          </div>
        </div>

        {/* START ORDER */}
        <div id="start-order" className="mt-12 md:mt-16">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-sm md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Ready to build?
                </div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Start your R&amp;B Blueprint Pack order
                </h3>
                <p className="max-w-2xl text-sm text-white/80">
                  Instant download after checkout. If you want, you can also request a custom version of
                  this pack for your exact tempo/key vibe.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* OPTION A: If you already have a checkout page */}
                <Link
                  href="/checkout?rnb_blueprint_pack=1"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:opacity-90"
                >
                  Go to Checkout
                </Link>

                {/* OPTION B: If you use an intake/order form */}
                <Link
                  href="/custom-music-kits#intake"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Start Order Form
                </Link>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/75">
              <span className="rounded-full border border-white/20 px-3 py-1">Used in PulseNexis releases</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Designed by R&amp;B songwriter/producer</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Lifetime access</span>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} PulseNexis • Honey Drip Records
        </div>
      </div>
    </main>
  );
}
