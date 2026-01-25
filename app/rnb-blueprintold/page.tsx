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
  src: string;
};

/**
 * ✅ IMPORTANT:
 * Your real filedn structure is:
 * /Packs/R&B-Blueprint-Pack/<Track-Folder>/samples/<File>.mp3
 *
 * So we point the root at:
 * .../Packs/R%26B-Blueprint-Pack/
 * and then safely encode each segment we append.
 */
const AUDIO_PACK_ROOT =
  "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-&-B-Blueprint-Pack/";

/** Safely join URL segments (encodes spaces, &, etc.) */
const join = (...parts: string[]) =>
  AUDIO_PACK_ROOT + parts.map(encodeURIComponent).join("/");

/**
 * ✅ Replace these file names with the exact ones on filedn.
 * The Heart-on-Read one is confirmed by your working URL.
 */
const PREVIEWS: Preview[] = [
  {
    id: "heart-on-read",
    title: "Heart On Read",
    mood: "Smooth",
    bpm: 76,
    key: "B♭",
    // ✅ matches your working link pattern
    src: join("Heart-on-Read", "samples", "Heart-on-Read-16Bar.mp3"),
  },
  {
    id: "late-night-drive",
    title: "Late Night Drive",
    mood: "Romantic",
    bpm: 74,
    key: "A♭",
    // ⚠️ Update folder + filename to match EXACTLY on filedn
    src: join("Late-Night-Drive", "samples", "Late-Night-Drive-16Bar.mp3"),
  },
  {
    id: "after-hours",
    title: "After Hours",
    mood: "Emotional",
    bpm: 72,
    key: "C minor",
    // ⚠️ Update folder + filename to match EXACTLY on filedn
    src: join("After-Hours", "samples", "After-Hours-16Bar.mp3"),
  },
  {
    id: "pillow-talk",
    title: "Pillow Talk",
    mood: "Warm",
    bpm: 78,
    key: "F",
    // ⚠️ Update folder + filename to match EXACTLY on filedn
    src: join("Pillow-Talk", "samples", "Pillow-Talk-16Bar.mp3"),
  },
  {
    id: "midnight-promise",
    title: "Midnight Promise",
    mood: "Soulful",
    bpm: 70,
    key: "E♭",
    // ⚠️ Update folder + filename to match EXACTLY on filedn
    src: join("Midnight-Promise", "samples", "Midnight-Promise-16Bar.mp3"),
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

function PreviewCard({
  item,
  isActive,
  onButtonPlay,
  onButtonPause,
  onNativePlay,
  onNativePause,
  audioRef,
}: {
  item: Preview;
  isActive: boolean;
  onButtonPlay: () => void;
  onButtonPause: () => void;
  onNativePlay: () => void;
  onNativePause: () => void;
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
            Short preview • grown, warm, and emotional
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={isActive ? onButtonPause : onButtonPlay}
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
          preload="metadata"
          controls
          className="h-10 w-full"
          // ✅ Native controls should NOT trigger el.play() again — just update state
          onPlay={onNativePlay}
          onPause={onNativePause}
          onError={() => {
            console.error("Audio failed to load:", item.src);
          }}
        />
      </div>
    </div>
  );
}

export default function RnBBlueprintPackPage() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const audioMap = React.useRef<Record<string, HTMLAudioElement | null>>({});
  const [toast, setToast] = React.useState<string | null>(null);

  const showToast = React.useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout((showToast as any)._t);
    (showToast as any)._t = window.setTimeout(() => setToast(null), 2500);
  }, []);

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

  /**
   * ✅ Button Play: we call el.play()
   */
  const buttonPlay = React.useCallback(
    async (id: string) => {
      stopAllExcept(id);
      setActiveId(id);

      const el = audioMap.current[id];
      if (!el) return;

      try {
        await el.play();
      } catch (err) {
        console.warn("Play failed (autoplay restriction or load issue):", err);
        showToast("Tap the player controls to start audio (autoplay blocked).");
      }
    },
    [stopAllExcept, showToast]
  );

  /**
   * ✅ Button Pause
   */
  const buttonPause = React.useCallback((id: string) => {
    const el = audioMap.current[id];
    if (el) {
      try {
        el.pause();
      } catch {}
    }
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  /**
   * ✅ Native play/pause: update state only (no el.play() call)
   */
  const nativePlay = React.useCallback(
    (id: string) => {
      stopAllExcept(id);
      setActiveId(id);
    },
    [stopAllExcept]
  );

  const nativePause = React.useCallback((id: string) => {
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  React.useEffect(() => {
    return () => {
      for (const el of Object.values(audioMap.current)) {
        if (!el) continue;
        try {
          el.pause();
        } catch {}
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* Top nav */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/catalog/packs"
            className="text-sm font-semibold text-neutral-900 hover:underline"
          >
            ← Back to Packs
          </Link>

          <div className="flex items-center gap-2">
            <Badge>Fan Favorite</Badge>
            <Badge>Instant Download</Badge>
          </div>
        </div>

        {/* HERO */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                R&amp;B Blueprint Pack
              </h1>

              <p className="text-lg font-semibold text-neutral-800 md:text-xl">
                Grown &amp; soulful. Ready for love scenes and late-night vibes.
              </p>

              <p className="max-w-2xl text-neutral-600">
                A complete R&amp;B creation system for producers, artists, and creators who
                want emotional, professional-quality records — fast.
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
                  Play Previews
                </a>
                <a
                  href="#start-order"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  Start Order
                </a>
              </div>

              <div className="text-xs text-neutral-500">
                If a preview won’t load, check the console for the exact URL that failed. Filedn is case-sensitive.
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

                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Questions? Contact us
                  </Link>

                  <div className="text-center text-xs text-neutral-500">
                    Confirmed sample path pattern: <span className="font-semibold">Track/samples/File.mp3</span>
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
            desc="Short clips to show the pocket and emotional tone. Only one preview plays at a time."
          />

          <div className="mt-6 grid gap-4">
            {PREVIEWS.map((p) => (
              <PreviewCard
                key={p.id}
                item={p}
                isActive={activeId === p.id}
                onButtonPlay={() => buttonPlay(p.id)}
                onButtonPause={() => buttonPause(p.id)}
                onNativePlay={() => nativePlay(p.id)}
                onNativePause={() => nativePause(p.id)}
                audioRef={(el) => {
                  audioMap.current[p.id] = el;
                }}
              />
            ))}
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
                  Instant download after checkout.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/checkout?rnb_blueprint_pack=1"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:opacity-90"
                >
                  Go to Checkout
                </Link>

                <Link
                  href="/custom-music-kits#intake"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Start Order Form
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} PulseNexis • Honey Drip Records
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-lg">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
