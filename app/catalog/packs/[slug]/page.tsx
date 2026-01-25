"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { buildSampleUrl, getPackBySlug, type Preview } from "@/lib/packsCatalog";

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

export default function PackPage() {
  const params = useParams();
  const slug = String((params as any)?.slug || "");
  const pack = React.useMemo(() => getPackBySlug(slug), [slug]);

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const audioMap = React.useRef<Record<string, HTMLAudioElement | null>>({});

  // optional multi-source fallback index
  const [srcIndex, setSrcIndex] = React.useState<Record<string, number>>({});

  const getCandidates = React.useCallback(
    (p: Preview) => {
      if (!pack) return [];
      const primary = buildSampleUrl(pack.packRoot, p.trackFolder, p.fileName);
      const extra = p.sources?.filter(Boolean) ?? [];
      return Array.from(new Set([primary, ...extra]));
    },
    [pack]
  );

  const getSrc = React.useCallback(
    (p: Preview) => {
      const candidates = getCandidates(p);
      const idx = srcIndex[p.id] ?? 0;
      return candidates[idx] || "";
    },
    [getCandidates, srcIndex]
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

  const retryNextSource = React.useCallback(
    async (p: Preview) => {
      const candidates = getCandidates(p);
      const cur = srcIndex[p.id] ?? 0;
      const next = cur + 1;

      if (next >= candidates.length) {
        console.error("All sources failed for:", p.id, candidates);
        return;
      }

      setSrcIndex((s) => ({ ...s, [p.id]: next }));

      if (activeId !== p.id) return;

      requestAnimationFrame(async () => {
        const el = audioMap.current[p.id];
        const src = candidates[next];
        if (!el || !src) return;
        el.src = src;
        try {
          await el.play();
        } catch {}
      });
    },
    [activeId, getCandidates, srcIndex]
  );

  const play = React.useCallback(
    async (p: Preview) => {
      stopAllExcept(p.id);
      setActiveId(p.id);

      const el = audioMap.current[p.id];
      if (!el || !pack) return;

      const src = getSrc(p);
      if (!src) return;

      if (el.src !== src) el.src = src;

      el.onerror = () => void retryNextSource(p);
      el.onended = () => setActiveId((cur) => (cur === p.id ? null : cur));

      try {
        await el.play();
      } catch (err) {
        console.warn("Play failed:", err);
      }
    },
    [getSrc, pack, retryNextSource, stopAllExcept]
  );

  const pause = React.useCallback((id: string) => {
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
            No pack exists for slug: <span className="font-mono">{slug}</span>
          </p>
          <Link href="/catalog/packs" className="mt-6 inline-block underline">
            Back to packs
          </Link>
        </div>
      </main>
    );
  }

  const nowPlaying = pack.previews.find((p) => p.id === activeId);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-6 text-sm text-neutral-500">
          <Link href="/catalog/packs" className="hover:underline">
            Packs
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-700">{pack.name}</span>
        </div>

        {/* HERO */}
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {pack.badge ? <Badge>{pack.badge}</Badge> : null}
                <Badge>{pack.name}</Badge>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                {pack.tagline}
              </h1>

              <p className="max-w-2xl text-neutral-600">{pack.description}</p>

              <ul className="mt-4 space-y-3">
                {pack.bullets.map((b) => (
                  <CheckItem key={b}>{b}</CheckItem>
                ))}
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

              {nowPlaying ? (
                <div className="text-xs text-neutral-500">
                  Now playing:{" "}
                  <span className="font-semibold text-neutral-900">{nowPlaying.title}</span>
                </div>
              ) : (
                <div className="text-xs text-neutral-500">
                  Tap Play to hear each sample. Only one plays at a time.
                </div>
              )}
            </div>

            <aside className="w-full md:w-[380px]">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="text-sm font-semibold text-neutral-900">Quick actions</div>
                <div className="mt-4 space-y-3">
                  <a
                    href="#start-order"
                    className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Start Order
                  </a>
                  <Link
                    href="/catalog/packs"
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Back to Packs
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* PREVIEWS */}
        <section id="previews" className="mt-10 md:mt-14">
          <SectionTitle
            kicker="Listen first"
            title="Audio previews"
            desc="Cinema-style player: Play/Pause buttons with hidden audio elements."
          />

          <div className="mt-6 grid gap-4">
            {pack.previews.map((p) => {
              const isActive = activeId === p.id;
              const src = getSrc(p);

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
                        <Badge>{p.mood}</Badge>
                        <Badge>{p.bpm} BPM</Badge>
                        <Badge>{p.key}</Badge>
                      </div>
                      <div className="mt-1 text-sm text-neutral-600">
                        preview • loop-clean • content-ready
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!src}
                      onClick={() => (isActive ? pause(p.id) : void play(p))}
                      className={cx(
                        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                        !src
                          ? "cursor-not-allowed border border-neutral-200 bg-neutral-50 text-neutral-400"
                          : isActive
                          ? "bg-neutral-900 text-white hover:opacity-90"
                          : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                      )}
                      title={!src ? "Missing audio URL" : undefined}
                    >
                      {isActive ? "Pause" : "Play"}
                    </button>
                  </div>

                  {/* Hidden audio element */}
                  <audio
                    ref={(el) => {
                      audioMap.current[p.id] = el;
                    }}
                    preload="metadata"
                    className="hidden"
                    onError={() => void retryNextSource(p)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* START ORDER */}
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
                  Instant delivery after checkout (or use your custom order form).
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
                  href="/catalog/packs"
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
