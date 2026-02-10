"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Sample = {
  id: string;
  title: string;
  demoUrl: string;
};

type CinemaKit = {
  title: string;
  subtitle?: string;
  samples: Sample[];
};

const CINEMA_PRICE_LABEL = "$169 cinema bundle";
const BUY_BUTTON_LABEL = "Buy — $169";

const CINEMA_BUNDLE_DESCRIPTION_TITLE = "Cinema Bundle – Film & Trailer Music";
const CINEMA_BUNDLE_DESCRIPTION =
  "Professionally crafted cinematic music bundles designed for film, trailers, TV, and branded visual content. Includes cinematic-ready cues with clean endings, tension builds, and flexible usage for visual storytelling.";

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeSlug(input: string) {
  const s = safeDecodeURIComponent((input ?? "").trim());
  return s
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\s+/g, "-");
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Single, consistent slug key generator (for metadata)
function slugify(input: string) {
  return (input || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ✅ The ONLY place you edit kits & demo URLs
const CINEMA_KITS: Record<string, CinemaKit> = {
  "cinematic-reveal-toolkit-vol1": {
    title: "Cinematic Reveal Toolkit Vol. 1",
    samples: [
      {
        id: "titan-build",
        title: "Titan Build",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Titan%20Build/Titan%20Build_Sample_2.mp3",
      },
      {
        id: "tension-pulse",
        title: "Tension Pulse",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Tension-Pulse/Tension-Pulse-30sample_2.mp3",
      },
      {
        id: "neon-trailer",
        title: "Neon Trailer",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Neon%20Trailer/Neon-Trailer-Sample_2.mp3",
      },
      {
        id: "midnight-lift",
        title: "Midnight Lift",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Midnight%20Lift/Midnight%20Lift_Sample_2.mp3",
      },
      {
        id: "halo-reveal",
        title: "Halo Reveal",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Halo-Reveal/Halo-Reveal_30Second.mp3",
      },
      {
        id: "gravity-rise",
        title: "Gravity Rise",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Gravity-Rise/Gravity%20Rise%20%E2%80%94%2060sec.mp3",
      },
      {
        id: "final-horizon",
        title: "Final Horizon",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Final%20Horizon/Final%20Horizon_Sample_2.mp3",
      },
      {
        id: "climax-stinger",
        title: "Climax Stinger",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Climax%20Stinger/Climax%20Stinger_Sample_1.mp3",
      },
    ],
  },

  "cinematic-reveal-toolkit-vol2": {
    title: "Cinematic Reveal Toolkit Vol. 2",
    subtitle: "Built for Sci-Fi, Thriller, and Suspense theatrical themes.",
    samples: [
      {
        id: "event-horizon-protocol",
        title: "Event Horizon Protocol",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Event-Horizon-Protocol/Event%20Horizon%20Protocol_60secSample.mp3",
      },
      {
        id: "event-horizon-protocolv2",
        title: "Event Horizon Protocol v2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Event-Horizon-Protocol/Event%20Horizon%20Protocol%20(Ver_2)60secSample.mp3",
      },
      {
        id: "neural-lockdown",
        title: "Neural Lockdown",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Neural-Lockdown/Neural%20Lockdown_60secSample.mp3",
      },
      {
        id: "neural-lockdownv2",
        title: "Neural Lockdown V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Neural-Lockdown/Neural%20Lockdown%20(Ver_2)60secSample.mp3",
      },
      {
        id: "dark-matter-rising",
        title: "Dark Matter Rising",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Dark-Matter-Rising/Dark%20Matter%20Rising_60secSample.mp3",
      },
      {
        id: "dark-matter-rising-v2",
        title: "Dark Matter Rising V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Dark-Matter-Rising/Dark%20Matter%20Rising%20(Ver_2)60secSample.mp3",
      },
      {
        id: "red-signal-from-orion",
        title: "Red Signal From Orion",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Red-Signal-From-Orion/Red%20Signal%20From%20Orion_60secSample.mp3",
      },
      {
        id: "red-signal-from-orion-v2",
        title: "Red Signal From Orion V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Red-Signal-From-Orion/Red%20Signal%20From%20Orion%20(Ver_2)60secSample.mp3",
      },
    ],
  },

  "cinematic-reveal-toolkit-vol3": {
    title: "Cinematic Reveal Toolkit Vol. 3",
    samples: [
      {
        id: "synthetic-heartbeat",
        title: "Synthetic Heartbeat",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Synthetic-Heartbeat/Synthetic%20Heartbeat_60secSample.mp3",
      },
      {
        id: "synthetic-heartbeat-v2",
        title: "Synthetic Heartbeat V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Synthetic-Heartbeat/Synthetic%20Heartbeat%20(Ver_2)60secSample.mp3",
      },
      {
        id: "blacksite-countdown",
        title: "Blacksite Countdown",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Blacksite-Countdown/Blacksite%20Countdown_60secSample.mp3",
      },
      {
        id: "blacksite-countdown-v2",
        title: "Blacksite Countdown V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Blacksite-Countdown/Blacksite%20Countdown%20(Ver_2)60secSample.mp3",
      },
      {
        id: "containment-breach",
        title: "Containment Breach",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Containment-Breach/Containment%20Breach_60secSample.mp3",
      },
      {
        id: "containment-breach-v2",
        title: "Containment Breach V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Containment-Breach/Containment%20Breach%20(Ver_2)60secSample.mp3",
      },
      {
        id: "no-safe-extraction",
        title: "No Safe Extraction",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/No-Safe-Extraction/No%20Safe%20Extraction_60secSample.mp3",
      },
      {
        id: "no-safe-extraction-v2",
        title: "No Safe Extraction V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/No-Safe-Extraction/No%20Safe%20Extraction%20(Ver_2)_60secSample.mp3",
      },
    ],
  },

  "cinematic-reveal-toolkit-vol4": {
    title: "Cinematic Reveal Toolkit Vol. 4",
    samples: [
      {
        id: "velocity-of-fear",
        title: "Velocity of Fear",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Velocity-of-Fear/Velocity%20of%20Fear_60secSample.mp3",
      },
      {
        id: "velocity-of-fear-v2",
        title: "Velocity of Fear V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Velocity-of-Fear/Velocity%20of%20Fear%20(Ver_2)60secSample.mp3",
      },
      {
        id: "trigger-point-zero",
        title: "Trigger Point Zero",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Trigger-Point-Zero/Trigger%20Point%20Zero_60secSample.mp3",
      },
      {
        id: "trigger-point-zero-v2",
        title: "Trigger Point Zero V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Trigger-Point-Zero/Trigger%20Point%20Zero%20(Ver_2)60secSample.mp3",
      },
      {
        id: "after-the-firestorm",
        title: "After the Firestorm",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/After-the-Firestorm/After%20the%20Firestorm_60secSample.mp3",
      },
      {
        id: "after-the-firestorm-v2",
        title: "After the Firestorm V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/After-the-Firestorm/After%20the%20Firestorm%20(Ver_2)60secSample.mp3",
      },
      {
        id: "silent-before-the-strike",
        title: "Silent Before the Strike",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Silent-Before-the-Strike/Silent%20Before%20the%20Strike_60secSample.mp3",
      },
      {
        id: "silent-before-the-strike-v2",
        title: "Silent Before the Strike V2",
        demoUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Silent-Before-the-strike/Silent%20Before%20the%20Strike%20(Ver_2)60secSample.mp3",
      },
    ],
  },
};

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-neutral-900">{value}</div>
    </div>
  );
}

function getSlugFromParams(params: ReturnType<typeof useParams>): string {
  const raw = (params as unknown as { slug?: string | string[] })?.slug;
  if (Array.isArray(raw)) return raw[0] || "";
  return raw || "";
}

export default function CinemaKitPage() {
  const params = useParams();

  const slug = React.useMemo(() => normalizeSlug(getSlugFromParams(params)), [params]);

  const kit = React.useMemo(() => {
    const normalizedMap: Record<string, CinemaKit> = {};
    for (const [key, val] of Object.entries(CINEMA_KITS)) {
      normalizedMap[normalizeSlug(key)] = val;
    }
    return normalizedMap[slug];
  }, [slug]);

  const availableSlugs = React.useMemo(
    () => Object.keys(CINEMA_KITS).map((k) => normalizeSlug(k)),
    []
  );

  const audioRef = React.useRef<Record<string, HTMLAudioElement>>({});
  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const stopAllExcept = React.useCallback((keepKey: string) => {
    for (const [key, el] of Object.entries(audioRef.current)) {
      if (!el) continue;
      if (key !== keepKey) {
        try {
          el.pause();
          el.currentTime = 0;
        } catch {
          // ignore
        }
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
        el.load();
      } catch {
        // ignore
      }

      el.play().catch(() => {
        // ignore
      });
    },
    [stopAllExcept]
  );

  const handlePause = React.useCallback((key: string) => {
    const el = audioRef.current[key];
    if (el) {
      try {
        el.pause();
      } catch {
        // ignore
      }
    }
    setActiveKey((cur) => (cur === key ? null : cur));
  }, []);

  const checkoutCinema = React.useCallback(async () => {
    if (!kit) return;

    try {
      setErrorMsg(null);
      setBusy(true);

      const res = await fetch("/api/checkout/cinema", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kit: kit.title, // human title
          productId: slug, // slug id (recommended)
          note: note.trim(),
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed.");
      }

      window.location.href = data.url;
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : typeof e === "string" ? e : "Checkout failed.";
      setErrorMsg(msg);
    } finally {
      setBusy(false);
    }
  }, [kit, note, slug]);

  if (!kit) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Link
            href="/cinema"
            className="text-sm font-semibold text-neutral-700 hover:underline"
          >
            ← Back to Cinema
          </Link>

          <div className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <h1 className="text-2xl font-semibold text-neutral-900">Kit not found</h1>
            <p className="mt-2 text-sm text-neutral-600">
              This cinema kit slug does not exist:{" "}
              <span className="font-mono">{slug || "(missing)"}</span>
            </p>

            <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
              <div className="font-semibold text-neutral-900">Available slugs</div>
              <div className="mt-1 font-mono text-xs text-neutral-600">
                {availableSlugs.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const bundlePairs = React.useMemo(() => chunk(kit.samples ?? [], 2), [kit.samples]);

  const sampleCount = kit.samples?.length ?? 0;
  const bundleCount = bundlePairs.length;

  const pageThemeLine =
    kit.subtitle?.trim() ||
    "Cinematic-ready cues with tension builds, clean endings, and trailer-forward energy.";

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top nav */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/cinema"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50"
          >
            ← Back to Cinema
          </Link>
          <div />
        </div>

        {/* Hero */}
        <header className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  {CINEMA_PRICE_LABEL}
                </div>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                  {kit.title}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                  <span className="font-semibold text-neutral-900">
                    {CINEMA_BUNDLE_DESCRIPTION_TITLE}:
                  </span>{" "}
                  {CINEMA_BUNDLE_DESCRIPTION}
                </p>

                <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Page Theme
                  </div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">
                    {pageThemeLine}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <StatPill label="Bundles" value={bundleCount || 0} />
                  <StatPill label="Samples" value={sampleCount} />
                  <StatPill label="Per Card" value="2 tracks" />
                </div>

                {/* Checkout note */}
                <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Checkout note (optional)
                  </label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Example: "Bundle 2" or "Vol 2 for IG ads"'
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                  />
                  <p className="mt-2 text-[11px] text-neutral-500">
                    <span className="font-semibold text-neutral-700">Important:</span> To
                    ensure proper product delivery, please enter your{" "}
                    <span className="font-semibold text-neutral-700">bundle selection</span>{" "}
                    (example: <span className="font-mono">Bundle 2</span> or{" "}
                    <span className="font-mono">Vol 2</span>). This note is sent to Stripe
                    with your order.
                  </p>
                </div>

                {errorMsg ? <p className="mt-3 text-sm text-red-600">{errorMsg}</p> : null}
              </div>

              {/* Sidebar info only */}
              <div className="w-full md:max-w-sm">
                <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-neutral-900">
                    License this bundle
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    One-time purchase. Built for film, trailers, TV, and branded visuals.
                  </p>

                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
                      <span className="font-semibold text-neutral-900">Price</span>
                      <span className="font-semibold text-neutral-900">$169</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
                      <span className="font-semibold text-neutral-900">Delivery</span>
                      <span className="text-neutral-700">Instant access</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
                      <span className="font-semibold text-neutral-900">Use cases</span>
                      <span className="text-neutral-700">Film • Trailer • TV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stream previews bar */}
        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-neutral-900">Stream Previews</div>
          <p className="mt-1 text-sm text-neutral-600">
            Each card contains <span className="font-semibold">2 samples</span>. Only one
            preview plays at a time.
          </p>
        </div>

        {/* Cards */}
        {sampleCount === 0 ? (
          <div className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
            No samples added yet for this kit.
          </div>
        ) : (
          <section className="mt-8 grid gap-6 md:grid-cols-2">
            {bundlePairs.map((pair, idx) => {
              const bundleId = `b${idx + 1}`;
              const bundleName = `Bundle ${idx + 1}`;

              // A stable "which bundle they clicked" identifier (goes into the note automatically)
              const bundleSelection = `${bundleName}`;

              const checkoutThisBundle = async () => {
                // Auto-append selection if they didn't type anything
                const current = note.trim();
                const nextNote =
                  current.length > 0 ? `${current} | ${bundleSelection}` : bundleSelection;
                setNote(nextNote);
                await checkoutCinema();
              };

              return (
                <div
                  key={bundleId}
                  className="rounded-3xl border border-neutral-200 bg-white shadow-sm"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold leading-5 text-neutral-900">
                          {bundleName} — {pair.map((s) => s.title).join(" + ")}
                        </div>
                        <div className="mt-1 text-xs text-neutral-500">
                          Film & Trailer Ready • 2-track bundle • {CINEMA_PRICE_LABEL}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={checkoutThisBundle}
                        disabled={busy}
                        className="shrink-0 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
                      >
                        {busy ? "Opening…" : BUY_BUTTON_LABEL}
                      </button>
                    </div>

                    <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Demo Samples
                    </div>

                    <div className="mt-3 grid gap-3">
                      {pair.map((s) => {
                        const key = `${slug}:${bundleId}:${s.id}`;
                        const isActive = activeKey === key;
                        const src = (s.demoUrl || "").trim();

                        return (
                          <div
                            key={s.id}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
                          >
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-neutral-900">
                                {s.title}
                              </div>
                              <div className="mt-0.5 text-[11px] text-neutral-500">
                                streaming preview • FileDN
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
                                  : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
                              )}
                              disabled={!src}
                              title={!src ? "Missing audio URL" : undefined}
                            >
                              {isActive ? "Pause" : "Play"}
                            </button>

                            <audio
                              ref={(el) => {
                                if (el) audioRef.current[key] = el;
                                else delete audioRef.current[key];
                              }}
                              preload="none"
                              onEnded={() =>
                                setActiveKey((cur) => (cur === key ? null : cur))
                              }
                              onError={() => console.error("Audio failed:", src)}
                            >
                              <source src={src} type="audio/mpeg" />
                            </audio>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={checkoutThisBundle}
                        disabled={busy}
                        className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
                      >
                        {busy ? "Opening Checkout…" : "Buy Cinema Bundle — $169"}
                      </button>

                      <div className="mt-2 text-center text-[11px] text-neutral-500">
                        One-time license • Film & trailer ready
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Footer */}
        <div className="mt-12 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <div className="text-sm font-semibold text-neutral-900">
            Need a custom trailer cue?
          </div>
          <div className="mt-1 text-sm text-neutral-600">
            Contact PulseNexis for custom cinematic kits, alt versions, and stems.
          </div>
          <div className="mt-4 text-xs text-neutral-500">
            © {new Date().getFullYear()} PulseNexis • Honey Drip Records
          </div>
        </div>
      </div>
    </main>
  );
}
