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
  // ... keep your PACKS array exactly the same ...
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function PacksDebutPageClient() {
  // One audio at a time (global)
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
        // ✅ REMOVED note
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
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold text-neutral-900">Packs</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Pick a pack below, then checkout.
            </p>
            {errorMsg ? (
              <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
            ) : null}
          </div>
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
                            onError={() => console.error("Audio failed:", t.demoUrl)}
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
                      data-cta="buy"
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
