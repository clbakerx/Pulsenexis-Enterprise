"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Preview = {
  id: string;
  title: string;
  mood: string;
  bpm: number;
  key: string;
  sources?: string[];
  path?: string;
  src?: string;
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

const AUDIO_BASE_URL =
  process.env.NEXT_PUBLIC_AUDIO_BASE_URL ||
  "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

function audioUrl(path: string) {
  return new URL(path.replace(/^\//, ""), AUDIO_BASE_URL).toString();
}

function initialCandidates(p: Preview): string[] {
  const out: string[] = [];
  if (p.sources?.length) out.push(...p.sources.filter(Boolean));
  if (p.src && /^https?:\/\//i.test(p.src)) out.push(p.src);
  if (p.path) out.push(audioUrl(p.path));
  if (p.src && !/^https?:\/\//i.test(p.src)) out.push(audioUrl(p.src));
  return Array.from(new Set(out));
}

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
        sources: ["https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Late-Night-Drive/samples/Late-Night-Drive-16Bar.mp3",
        ],
      },
      {
        id: "heart-on-read",
        title: "Heart On Read",
        mood: "Smooth",
        bpm: 76,
        key: "B♭",
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Heart-on-Read/samples/Heart-on-Read-16Bar.mp3",
        ],
      },
      { id: "after-hours", 
        title: "After Hours",
        mood: "Emotional", 
        bpm: 72, 
        key: "C minor", 
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/After-Hours/samples/After-Hours-16Bar.mp3",
          ] 
        },
      { id: "pillow-talk", 
        title: "Pillow Talk", 
        mood: "Warm", 
        bpm: 78, key: "F", 
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Pillow-Talk/samples/Pillow-Talk-16Bar.mp3",
        ] 
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
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Midnight-808/samples/Midnight-808-16Bar.mp3",
      },
      {
        id: "drip-in-the-air",
        title: "Drip In The Air",
        mood: "Airy",
        bpm: 76,
        key: "A♭ minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Drop-in-the-Air/samples/Drip-in-the-Air-16Bar.mp3",
      },
      {
        id: "tension-love",
        title: "Tension Love",
        mood: "Dark/Warm",
        bpm: 72,
        key: "C minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Tension-Love/samples/Tension-Love-16Bar.mp3",
      },
      {
        id: "hook-season",
        title: "Hook Season",
        mood: "Hooky",
        bpm: 78,
        key: "E minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Hook-Season/samples/Hook-Season-16Bar.mp3",
      },
    ],
  },

  "smooth-jazz": {
    slug: "smooth-jazz",
    name: "Smooth Jazz Pack",
    badge: "Fan Favorite",
    tagline: "Luxury lounge energy.",
    description:
      "Polished jazz chords and clean instrumentation crafted for premium brand content, elegant lounge scenes, and cinematic transitions.",
    bullets: [
      "Warm Rhodes + silky sax textures",
      "No harsh drums — pure smooth groove",
      "Best for luxury, lifestyle & fashion content",
    ],
    previews: [
      {
        id: "sj-1",
        title: "After Hours Lounge",
        mood: "Smooth / Elegant",
        bpm: 78,
        key: "C minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/After-Hours-Lounge/samples/After-Hours-Lounge-16Bar.mp3",
      },
      {
        id: "sj-2",
        title: "Midnight Champagne",
        mood: "Luxury / Chill",
        bpm: 82,
        key: "F minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Midnight-Champagne/samples/Midnight-Champagne-16Bar.mp3",
      },
      {
        id: "sj-3",
        title: "City Lights Velvet",
        mood: "Late Night / Classy",
        bpm: 75,
        key: "B♭ major",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/City-LightsVelvet/samples/City-Lights-Velvet-16Bar.mp3",
      },
    ],
  },

  "dance-pop": {
    slug: "dance-pop",
    name: "Dance Pop Pack",
    badge: "Upbeat",
    tagline: "Bright. Energetic. Movement-ready.",
    description:
      "Upbeat tracks designed for motion content: workouts, ads, product drops, and energetic intros.",
    bullets: ["High energy", "Clear drops", "Best for product + promo"],
    previews: [
      {
        id: "dp-01",
        title: "Neon Sprint",
        mood: "Bright / EDM Pop",
        bpm: 128,
        key: "A minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Neon-Spirit/samples/Neon-Spirit-16Bar.mp3",
      },
      {
        id: "dp-02",
        title: "Glow Runway",
        mood: "Happy / Uplift",
        bpm: 124,
        key: "C major",
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Glow-Runway/samples/Glow-Runway-16Bar.mp3",
        ],
      },
      {
        id: "dp-03",
        title: "Drop City",
        mood: "Big Drop",
        bpm: 126,
        key: "E minor",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Drop-City/samples/Drop-City-16Bar.mp3",
      },
    ],
  },

  "hip-hop-drums": {
    slug: "hip-hop-drums",
    name: "Hip-Hop Drums Pack",
    badge: "New",
    tagline: "Knock, bounce, and pocket.",
    description:
      "Hard-hitting drum loops and grooves built to sit under voiceovers, promos, and fast edits.",
    bullets: ["Punchy drums", "Clean transients", "Best for voiceover content"],
    previews: [
      {
        id: "hh-01",
        title: "Pocket Pressure",
        mood: "Punchy",
        bpm: 76,
        key: "N/A",
        // ✅ FIXED: must be a string. Use src for full URLs.
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Pocket-Pressure/samples/Pocket-Pressure-16Bar.mp3",
      },
      {
        id: "hh-02",
        title: "Bounce Loop",
        mood: "Bounce",
        bpm: 76,
        key: "N/A",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Bounce-Loops/samples/Bounce-Loop-16Bar.mp3",
      },
      {
        id: "hh-03",
        title: "After the Noise",
        mood: "Clean",
        bpm: 76,
        key: "N/A",
        src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/After-the-Noise/samples/After-the-Noise-16Bar.mp3",
      },
    ],
  },

  "cinematic": {
    slug: "cinematic",
    name: "Cinematic Pack",
    badge: "New",
    tagline: "Big emotion and trailer-style moments.",
    description:
      "Cinematic textures, swells, and tension builds for storytelling, documentary vibes, and dramatic reveals.",
    bullets: ["Builds + swells", "Emotional tension", "Best for trailers + reels"],
    previews: [
      { id: "cin-01", 
        title: "Gravity Rise", 
        mood: "Build / Swell", 
        bpm: 76, 
        key: "D minor", 
        path: "Packs/Gravity-Rise/samples/Gravity-Rise-16Bar.mp3",
       },
      { id: "cin-02", 
        title: "Tension Thread", 
        mood: "Tension", 
        bpm: 72, key: "E minor", 
        path: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Tensions-Thread/samples/Tension-Thread-16Bar.mp3",
       },
      { id: "cin-03", 
        title: "Reveal Moment", 
        mood: "Trailer Reveal", 
        bpm: 78, key: "C minor", 
        path: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Reveal-Moment/samples/Reveal-Moment-16Bar.mp3",
       },
    ],
  },
};

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

function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
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

export default function PackSlugPage() {
  const params = useParams();
  const raw = params?.slugs as string | string[] | undefined;
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

          <Link href="/catalog/packs" className="mt-6 inline-block underline">
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
        <div className="mb-6 text-sm text-neutral-500">
          <Link href="/catalog/packs" className="hover:underline">
            Packs
          </Link>{" "}
          <span className="mx-2">/</span>
          <span className="text-neutral-700">{pack.name}</span>
        </div>

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
                  Preview links are stored inside <span className="font-semibold">PACKS</span>.
                </div>
              )}
            </div>

            <aside className="w-full md:w-[380px]">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="text-sm font-semibold text-neutral-900">What you get</div>
                <p className="mt-2 text-sm text-neutral-600">
                  A repeatable system to create emotional, content-ready music fast.
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Included
                    </div>
                    <ul className="mt-2 space-y-2 text-sm text-neutral-700">
                      <li>• Chord progression blueprints</li>
                      <li>• Drum groove templates</li>
                      <li>• Vocal arrangement maps (3rd/5th)</li>
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
