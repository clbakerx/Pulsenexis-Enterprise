"use client";

import * as React from "react";

type Track = {
  id: string;
  title: string;
  demoUrl: string; // FULL URL (no building)
};

type PackCard = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  priceLabel?: string;
  tracks: Track[];
};

const BUNDLE_PRICE_LABEL = "$199 bundle";

const PACKS: PackCard[] = [
  {
    slug: "rnb-blueprint",
    title: "R&B Blueprint Pack",
    subtitle: "Bundle Pack (4 titles)",
    description:
      "Grown & soulful. Clean loop points and romantic late-night vibes — built for creators.",
    priceLabel: BUNDLE_PRICE_LABEL,
    tracks: [
      {
        id: "late-night-drive",
        title: "Late Night Drive",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-&-B-Blueprint-Pack/Late-Night-Drive/samples/Late-Night-Drive-16Bar.mp3",
      },
      {
        id: "heart-on-read",
        title: "Heart On Read",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-&-B-Blueprint-Pack/Heart-on-Read/samples/Heart-on-Read-16Bar.mp3",
      },
      {
        id: "after-hours",
        title: "After Hours",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-&-B-Blueprint-Pack/After-Hours/samples/After-Hours-16Bar.mp3",
      },
      {
        id: "pillow-talk",
        title: "Pillow Talk",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-&-B-Blueprint-Pack/Pillow-Talk/samples/Pillow-Talk-16Bar.mp3",
      },
    ],
  },
  {
    slug: "trap-soul",
    title: "Trap Soul Pack",
    subtitle: "New",
    description: "Modern R&B with 808 weight — dark-to-warm cinematic tension.",
    priceLabel: BUNDLE_PRICE_LABEL,
    tracks: [
      {
        id: "midnight-808",
        title: "Midnight 808",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Midnight-808/samples/Midnight-808-16Bar.mp3",
      },
      {
        id: "drip-in-the-air",
        title: "Drip In The Air",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Drip-in-the-Air/samples/Drip-in-the-Air-16Bar.mp3",
      },
      {
        id: "tension-love",
        title: "Tension Love",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Tension-Love/samples/Tension-Love-16Bar.mp3",
      },
      {
        id: "hook-season",
        title: "Hook Season",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Hook-Season/samples/Hook-Season-16Bar.mp3",
      },
    ],
  },
  {
    slug: "smooth-jazz",
    title: "Smooth Jazz Pack",
    subtitle: "Fan Favorite",
    description:
      "Luxury lounge energy for premium brand content & classy transitions.",
    priceLabel: BUNDLE_PRICE_LABEL,
    tracks: [
      {
        id: "after-hours-lounge",
        title: "After Hours Lounge",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Smooth-Jazz-Pack/After-Hours-Lounge/samples/After-Hours-Lounge-16Bar.mp3",
      },
      {
        id: "midnight-champagne",
        title: "Midnight Champagne",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Smooth-Jazz-Pack/Midnight-Champagne/samples/Midnight-Champagne-16Bar.mp3",
      },
      {
        id: "city-lights-velvet",
        title: "City Lights Velvet",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Smooth-Jazz-Pack/City-LightsVelvet/samples/City-Lights-Velvet-16Bar.mp3",
      },
      {
        id: "velvet-afterglow",
        title: "Velvet Afterglow",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Velvet-Afterglow/Velvet%20Afterglow_32secSample.mp3",
      },
    ],
  },
  {
    slug: "dance-pop",
    title: "Dance Pop Pack",
    subtitle: "Upbeat",
    description:
      "Bright, energetic tracks designed for motion content and product drops.",
    priceLabel: BUNDLE_PRICE_LABEL,
    tracks: [
      {
        id: "neon-spirit",
        title: "Neon Spirit",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Dance-Pop-Pack/Neon-Spirit/samples/Neon-Spirit-16Bar.mp3",
      },
      {
        id: "glow-runway",
        title: "Glow Runway",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Dance-Pop-Pack/Glow-Runway/samples/Glow-Runway-16Bar.mp3",
      },
      {
        id: "drop-city",
        title: "Drop City",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Dance-Pop-Pack/Drop-City/samples/Drop-City-16Bar.mp3",
      },
      {
        id: "pulse-lights",
        title: "Pulse Lights",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Pulse-Lights/Pulse%20Lights%20(Ver_2)30secSample.mp3",
      },
    ],
  },
  {
    slug: "hip-hop-drums",
    title: "Hip-Hop Drums Pack",
    subtitle: "New",
    description: "Knock, bounce, and pocket — built for voiceovers and fast edits.",
    priceLabel: BUNDLE_PRICE_LABEL,
    tracks: [
      {
        id: "pocket-pressure",
        title: "Pocket Pressure",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Hip-Hop-Drums-Pack/Pocket-Pressure/samples/Pocket-Pressure-16Bar.mp3",
      },
      {
        id: "bounce-loops",
        title: "Bounce Loops",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Hip-Hop-Drums-Pack/Bounce-Loops/samples/Bounce-Loop-16Bar.mp3",
      },
      {
        id: "after-the-noise",
        title: "After The Noise",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Hip-Hop-Drums-Pack/After-the-Noise/samples/After-the-Noise-16Bar.mp3",
      },
      {
        id: "snare-cinema",
        title: "Snare Cinema",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Snare-Cinema/Snare%20Cinema%20(Ver_2)30secSample.mp3",
      },
    ],
  },
  {
    slug: "cinematic",
    title: "Cinematic Pack",
    subtitle: "New",
    description: "Big emotion and trailer-style moments — builds, swells, reveals.",
    priceLabel: BUNDLE_PRICE_LABEL,
    tracks: [
      {
        id: "gravity-rise",
        title: "Gravity Rise",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Cinematic-Pack/Gravity-Rise/samples/Gravity-Rise-16Bar.mp3",
      },
      {
        id: "tension-thread",
        title: "Tension Thread",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Cinematic-Pack/Tension-Thread/samples/Tension-Thread-16Bar.mp3",
      },
      {
        id: "reveal-moment",
        title: "Reveal Moment",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Cinematic-Pack/Reveal-Moment/samples/Reveal-Moment-16Bar.mp3",
      },
      {
        id: "slow-reveal",
        title: "Slow Reveal",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Slow-Reveal/Slow%20Reveal_30secSample.mp3",
      },
    ],
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function PacksPage() {
  const audioRef = React.useRef<Record<string, HTMLAudioElement | null>>({});
  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  const [busySlug, setBusySlug] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const stopAllExcept = React.useCallback((keepKey: string) => {
    for (const [key, el] of Object.entries(audioRef.current)) {
      if (!el) continue;
      if (key !== keepKey) {
        try {
          el.pause();
          el.currentTime = 0;
        } catch {}
      }
    }
  }, []);

  const handlePlay = React.useCallback(
    (key: string) => {
      stopAllExcept(key);
      setActiveKey(key);

      const el = audioRef.current[key];
      if (!el) return;

      try {
        void el.play();
      } catch {}
    },
    [stopAllExcept]
  );

  const handlePause = React.useCallback((key: string) => {
    const el = audioRef.current[key];
    if (el) {
      try {
        el.pause();
      } catch {}
    }
    setActiveKey((cur) => (cur === key ? null : cur));
  }, []);

  const checkoutPack = React.useCallback(async (packSlug: string) => {
    setErrorMsg(null);
    setBusySlug(packSlug);

    try {
      const res = await fetch("/api/checkout/packs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packSlug }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed.");
      }

      window.location.href = data.url;
    } catch (e: any) {
      setErrorMsg(e?.message || "Checkout failed.");
    } finally {
      setBusySlug(null);
    }
  }, []);

  return (
    <main className="pn-page pn-packs min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">Packs</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Pick a pack below, then checkout.
          </p>
          {errorMsg ? (
            <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
          ) : null}
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {PACKS.map((pack) => (
            <div
              key={pack.slug}
              className="pn-card rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="p-6">
                <div className="min-w-0">
                  <div className="text-base font-semibold text-neutral-900">
                    {pack.title}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {pack.subtitle}
                    {pack.priceLabel ? ` • ${pack.priceLabel}` : ""}
                  </div>
                  <div className="mt-3 text-sm text-neutral-600">
                    {pack.description}
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Demo Tracks
                  </div>

                  <div className="mt-3 grid gap-2">
                    {pack.tracks.map((t) => {
                      const key = `${pack.slug}:${t.id}`;
                      const isActive = activeKey === key;

                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-neutral-900">
                              {t.title}
                            </div>
                            <div className="text-[11px] text-neutral-500">
                              16-bar demo • streaming preview
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              isActive ? handlePause(key) : handlePlay(key)
                            }
                            className={cx(
                              "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold",
                              isActive
                                ? "bg-neutral-900 text-white hover:opacity-90"
                                : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                            )}
                          >
                            {isActive ? "Pause" : "Play"}
                          </button>

                          <audio
                            ref={(el) => {
                              audioRef.current[key] = el;
                            }}
                            preload="none"
                            onEnded={() =>
                              setActiveKey((cur) => (cur === key ? null : cur))
                            }
                            onError={() =>
                              console.error("Audio failed:", t.demoUrl)
                            }
                          >
                            <source src={t.demoUrl} type="audio/mpeg" />
                          </audio>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={busySlug === pack.slug}
                      onClick={() => checkoutPack(pack.slug)}
                      className={cx(
                        "inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-white",
                        busySlug === pack.slug
                          ? "bg-neutral-400"
                          : "bg-neutral-900 hover:opacity-90"
                      )}
                    >
                      {busySlug === pack.slug
                        ? "Opening Checkout…"
                        : `Buy ${pack.title} — $199`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="mt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} PulseNexis • Honey Drip Records
        </div>
      </div>
    </main>
  );
}
