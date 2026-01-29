"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "./providers";
import { CartDrawer } from "../components/CartDrawer";
import { TRACKS, type Track } from "./tracks";

const AUDIO_BASE_URL = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function normalizeSrc(src?: string) {
  if (!src) return "";
  const s = src.trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  const clean = s.startsWith("/") ? s.slice(1) : s;
  const encoded = clean
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");

  return `${AUDIO_BASE_URL}${encoded}`;
}

export default function CatalogPage() {
  const { items, addItem } = useCart();
  const [cartOpen, setCartOpen] = React.useState(false);

  // ✅ IMPORTANT: recompute if TRACKS changes (don’t leave [] deps)
  const cards = React.useMemo(() => chunk(TRACKS, 4), []);
  const CARDS_PER_PAGE = 4;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const totalPages = Math.max(1, Math.ceil(cards.length / CARDS_PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  const visibleCards = cards.slice(start, end);

  const goPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    router.push(`/catalog?page=${next}`);
  };

  // Playback
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [nowPlayingId, setNowPlayingId] = React.useState<string | null>(null);

  const stopAudio = React.useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    audioRef.current = null;
    setNowPlayingId(null);
  }, []);

  const playPreview = React.useCallback(
    (t: Track) => {
      const src = normalizeSrc(t.previewSrc);
      if (!src) return;

      if (nowPlayingId === t.id) {
        stopAudio();
        return;
      }

      stopAudio();

      const a = new Audio(src);
      audioRef.current = a;
      setNowPlayingId(t.id);

      a.play().catch(() => setNowPlayingId(null));
      a.onended = () => setNowPlayingId(null);
    },
    [nowPlayingId, stopAudio]
  );

  React.useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  const addBundle = React.useCallback(
    (t: Track) => {
      addItem(
        {
          key: `${t.id}:complete`,
          trackId: t.id,
          title: t.title,
          artist: t.artist ?? "PulseNexis",
          deliverable: "complete",
          label: "Complete Bundle (Loops + Stems + Samples MP3/WAV)",
        },
        1
      );

      setCartOpen(true);
    },
    [addItem]
  );

  const cartCount = React.useMemo(() => items.length, [items]);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              PulseNexis Catalog
            </h1>
            <p className="text-sm text-neutral-600">
              Each song includes the{" "}
              <span className="font-semibold">Complete Bundle</span>: Loops +
              Stems + Samples (MP3 &amp; WAV) —{" "}
              <span className="font-semibold">$100</span>
            </p>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Cart ({cartCount})
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-600">
            Page{" "}
            <span className="font-semibold text-neutral-900">{safePage}</span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-900">{totalPages}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage <= 1}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold",
                safePage <= 1
                  ? "cursor-not-allowed border-neutral-200 text-neutral-400 opacity-60"
                  : "border-neutral-200 text-neutral-700 hover:bg-neutral-50",
              ].join(" ")}
            >
              Prev
            </button>
            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage >= totalPages}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold",
                safePage >= totalPages
                  ? "cursor-not-allowed border-neutral-200 text-neutral-400 opacity-60"
                  : "border-neutral-200 text-neutral-700 hover:bg-neutral-50",
              ].join(" ")}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {visibleCards.map((group, idx) => {
            const cardNumber = start + idx + 1;

            return (
              <div
                key={`${safePage}-${idx}`}
                className="rounded-3xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="border-b border-neutral-200 p-6">
                  <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    HONEY DRIP RECORDS • CARD {cardNumber}
                  </div>
                  <div className="mt-3 text-sm text-neutral-600">
                    Preview tracks, then add the{" "}
                    <span className="font-semibold">
                      Complete Bundle ($100)
                    </span>
                    .
                  </div>
                </div>

                <div className="space-y-3 p-6">
                  {group.map((t) => {
                    const playable = Boolean(
                      t.previewSrc && normalizeSrc(t.previewSrc)
                    );
                    const inCart = items.some(
                      (x) => x.key === `${t.id}:complete`
                    );

                    return (
                      <div
                        key={t.id}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 p-4"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-neutral-900">
                            {t.title}
                          </div>
                          <div className="truncate text-xs text-neutral-600">
                            {(t.artist ?? "PulseNexis") +
                              (t.mood ? ` · ${t.mood}` : "") +
                              (t.bpm ? ` · ${t.bpm} BPM` : "") +
                              (t.key ? ` · ${t.key}` : "")}
                          </div>

                          {!playable && (
                            <div className="mt-1 text-[11px] text-amber-600">
                              Missing previewSrc — add a FileDN path to enable
                              playback
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playPreview(t)}
                            disabled={!playable}
                            className={[
                              "rounded-full border px-3 py-2 text-xs font-semibold",
                              playable
                                ? "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                                : "cursor-not-allowed border-neutral-200 text-neutral-400 opacity-60",
                            ].join(" ")}
                          >
                            {nowPlayingId === t.id ? "Pause" : "Play"}
                          </button>

                          <button
                            onClick={() => addBundle(t)}
                            disabled={inCart}
                            className={[
                              "rounded-full px-3 py-2 text-xs font-semibold",
                              inCart
                                ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                                : "bg-black text-white hover:bg-neutral-900",
                            ].join(" ")}
                          >
                            {inCart ? "Added" : "Add Bundle"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 pb-6" />
              </div>
            );
          })}
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
