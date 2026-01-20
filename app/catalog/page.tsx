"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ✅ FileDN base (MUST end with /)
const AUDIO_BASE_URL = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

// -------------------------
// Types
// -------------------------
type Track = {
  id: string;
  title: string;
  artist?: string | null;
  mood?: string;
  bpm?: number;
  key?: string;

  /**
   * ✅ Use ONE of these:
   * - Relative path: "Packs/Heart-on-Read/samples/Heart-on-Read-16Bar.mp3"
   * - Or full URL: "https://filedn.com/.../file.mp3"
   */
  previewSrc?: string;
};

type Deliverable = "loops" | "alt" | "stems";

type CartItem = {
  id: string;
  trackId: string;
  title: string;
  deliverable: Deliverable;
};

// -------------------------
// Data (EDIT THESE PATHS)
// -------------------------
const TRACKS: Track[] = [
  { id: "t1", title: "Come Get This Love", artist: "PulseNexis", mood: "Grown & soulful", bpm: 76, key: "E minor", previewSrc: "Come Get This Love.mp3" },
  { id: "t2", title: "Dream Lover", artist: "PulseNexis", mood: "Smooth tension", bpm: 76, key: "E minor", previewSrc: "Dream Lover.mp3" },
  { id: "t3", title: "Here at Your Beck n Call", artist: "PulseNexis", mood: "Night vibes", bpm: 76, key: "E minor", previewSrc: "Here at Your Beck n Call.mp3" },
  { id: "t4", title: "How I Love You", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "How I Love You.mp3" },

  { id: "t5", title: "Ill Never Love Another", artist: "PulseNexis", mood: "Trap-soul", bpm: 76, key: "A♭", previewSrc: "Ill Never Love Another.mp3" },
  { id: "t6", title: "IF IT'S REAL", artist: "PulseNexis", mood: "Trap-soul", bpm: 76, key: "A♭", previewSrc: "IF IT'S REAL.mp3" },
  { id: "t7", title: "Lead The Way", artist: "PulseNexis", mood: "Cinematic", bpm: 76, key: "E minor", previewSrc: "Lead The Way.mp3" },
  { id: "t8", title: "Made For Me", artist: "PulseNexis", mood: "Late night", bpm: 78, key: "E minor", previewSrc: "Made For Me.mp3" },
  { id: "t9", title: "Louder Than Words", artist: "PulseNexis", mood: "Late night", bpm: 78, key: "E minor", previewSrc: "Louder Than Words.mp3" },
  { id: "t10", title: "Love Scene", artist: "PulseNexis", mood: "Late night", bpm: 78, key: "E minor", previewSrc: "Love Scene.mp3" },

  { id: "t11", title: "No Greater Love", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "No Greater Love.mp3" },
  { id: "t12", title: "Choose My Heart", artist: "PulseNexis", mood: "Grown & soulful", bpm: 76, key: "E minor", previewSrc: "Choose My Heart.mp3" },
  { id: "t13", title: "Deeper Than Me", artist: "PulseNexis", mood: "Smooth tension", bpm: 76, key: "E minor", previewSrc: "Deeper Than Me.mp3" },
  { id: "t14", title: "East to West (Your Beauty)", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "East to West (Your Beauty).mp3" },
  { id: "t15", title: "High Stakes Love (Remix)", artist: "PulseNexis", mood: "Cinematic", bpm: 76, key: "E minor", previewSrc: "High Stakes Love (Remix).mp3" },
  { id: "t16", title: "How Will I Know", artist: "PulseNexis", mood: "Romantic", bpm: 76, key: "A♭", previewSrc: "How Will I Know.mp3" },

  { id: "t17", title: "I Adore You (Remix)", artist: "PulseNexis", mood: "Grown & soulful", bpm: 76, key: "E minor", previewSrc: "I Adore You (Remix).mp3" },
  { id: "t18", title: "Loud and Clear", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "Loud and Clear.mp3" },
  { id: "t19", title: "Love Scene", artist: "PulseNexis", mood: "Late night", bpm: 78, key: "E minor", previewSrc: "Love Scene.mp3" },

  { id: "t20", title: "Last Night", artist: "PulseNexis", mood: "Trap-soul", bpm: 76, key: "A♭", previewSrc: "Last Night.mp3" },
  { id: "t21", title: "Louder Than Words", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "Louder Than Words.mp3" },
  { id: "t22", title: "Made to Love You", artist: "PulseNexis", mood: "Grown & soulful", bpm: 76, key: "E minor", previewSrc: "Made to Love You.mp3" },
  { id: "t23", title: "This is What I Love", artist: "PulseNexis", mood: "Smooth tension", bpm: 76, key: "E minor", previewSrc: "This is What I Love.mp3" },
  { id: "t24", title: "Time to Let Him Go", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "Time to Let Him Go.mp3" },
  { id: "t25", title: "Turn On To Love", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "Turn On To Love.mp3" },
  { id: "t26", title: "HUMAN ANYWAY (Still Loving You)", artist: "PulseNexis", mood: "Grown & soulful", bpm: 76, key: "E minor", previewSrc: "HUMAN ANYWAY (Still Loving You).mp3" },

  { id: "t27", title: "Breakin' Me Down.", artist: "PulseNexis", mood: "Smooth tension", bpm: 76, key: "E minor", previewSrc: "Breakin' Me Down.mp3" },
  { id: "t28", title: "Brown Sugar Skin", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "Brown Sugar Skin.mp3" },
  { id: "t29", title: "Something New", artist: "PulseNexis", mood: "Grown & soulful", bpm: 76, key: "E minor", previewSrc: "Something New.mp3" },
  { id: "t30", title: "Every Inch of You", artist: "PulseNexis", mood: "Romantic", bpm: 78, key: "E minor", previewSrc: "Every Inch of You.mp3" },
  { id: "t31", title: "Captain Save a Heart", artist: "PulseNexis", mood: "Late night", bpm: 78, key: "E minor", previewSrc: "Captain Save a Heart.mp3" },
  { id: "t32", title: "Dont Play Boogee With Me", artist: "PulseNexis", mood: "Trap-soul", bpm: 76, key: "A♭", previewSrc: "Dont Play Boogee With Me.mp3" },
  { id: "t33", title: "When You are Mine", artist: "PulseNexis", mood: "Trap-soul", bpm: 76, key: "A♭", previewSrc: "When You are Mine.mp3" },
];

// -------------------------
// Helpers
// -------------------------
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

function deliverableLabel(d: Deliverable) {
  if (d === "loops") return "Loops";
  if (d === "alt") return "Samples (8/16 Bar)";
  return "Stems";
}

// -------------------------
// Page
// -------------------------
export default function CatalogPage() {
  // ✅ Four songs per card
  const cards = React.useMemo(() => chunk(TRACKS, 4), []);

  // ✅ Show only 4 cards per page (so 16 songs per page)
  const CARDS_PER_PAGE = 4;

  // Router params (?page=1,2,3...)
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

  // Cart
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState<CartItem[]>([]);

  // Per-track deliverable selection (default: Samples)
  const [deliverableByTrack, setDeliverableByTrack] = React.useState<Record<string, Deliverable>>({});

  const getDeliverable = React.useCallback(
    (trackId: string): Deliverable => deliverableByTrack[trackId] ?? "alt",
    [deliverableByTrack]
  );

  const setDeliverable = React.useCallback((trackId: string, d: Deliverable) => {
    setDeliverableByTrack((prev) => ({ ...prev, [trackId]: d }));
  }, []);

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

      if (!src) {
        alert(`No previewSrc set for "${t.title}". Add a FileDN path for this track.`);
        return;
      }

      if (nowPlayingId === t.id) {
        stopAudio();
        return;
      }

      stopAudio();

      const a = new Audio(src);
      audioRef.current = a;
      setNowPlayingId(t.id);

      a.play().catch(() => {
        setNowPlayingId(null);
        alert("Audio failed to play. Double-check the FileDN path.");
      });

      a.onended = () => setNowPlayingId(null);
    },
    [nowPlayingId, stopAudio]
  );

  React.useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  const addTrackToCart = React.useCallback(
    (track: Track) => {
      const deliverable = getDeliverable(track.id);

      setCart((prev) => [
        ...prev,
        {
          id: `${track.id}-${deliverable}-${Date.now()}`,
          trackId: track.id,
          title: track.title,
          deliverable,
        },
      ]);

      setCartOpen(true);
    },
    [getDeliverable]
  );

  const removeCartItem = React.useCallback((id: string) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearCart = React.useCallback(() => setCart([]), []);

  // -------------------------
  // ✅ Stripe Payment Links (Option #1)
  // -------------------------
  const STRIPE_LINKS = React.useMemo(
    () => ({
      loops_29: "https://buy.stripe.com/dRm6oH7En4fd6OBeJT4ZG0m",
      samples_49: "https://buy.stripe.com/5kQfZh0bVdPNc8V6dn4ZG0n", // (alt)
      stems_69: "https://buy.stripe.com/6oU28r0bVdPN1uhfNX4ZG0o",
    }),
    []
  );

  const checkoutTier = React.useMemo(() => {
    const hasStems = cart.some((c) => c.deliverable === "stems");
    const hasSamples = cart.some((c) => c.deliverable === "alt");
    const hasLoops = cart.some((c) => c.deliverable === "loops");

    if (hasStems) return { tier: "stems" as const, label: "Checkout — Stems ($69)", url: STRIPE_LINKS.stems_69 };
    if (hasSamples) return { tier: "samples" as const, label: "Checkout — Samples ($49)", url: STRIPE_LINKS.samples_49 };
    if (hasLoops) return { tier: "loops" as const, label: "Checkout — Loops ($29)", url: STRIPE_LINKS.loops_29 };

    return { tier: "samples" as const, label: "Checkout — Samples ($49)", url: STRIPE_LINKS.samples_49 };
  }, [cart, STRIPE_LINKS]);

  function checkoutWithPaymentLinks() {
    if (cart.length === 0) return;
    window.location.href = checkoutTier.url;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">PulseNexis Catalog</h1>
            <p className="text-sm text-neutral-600">Single Song License Purchases With Extra&apos;s At Checkout</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-600">
            Page <span className="font-semibold text-neutral-900">{safePage}</span> of{" "}
            <span className="font-semibold text-neutral-900">{totalPages}</span>
            <span className="ml-2 text-xs text-neutral-500">(PulseNexis)</span>
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

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {visibleCards.map((group, idx) => {
            const cardNumber = start + idx + 1; // global card index
            return (
              <div key={`${safePage}-${idx}`} className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <div className="border-b border-neutral-200 p-6">
                  <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    HONEY DRIP RECORDS • CARD {cardNumber}
                  </div>
                  <div className="mt-3 text-sm text-neutral-600">A 4 Track Sample Preview, then license deliverables.</div>
                </div>

                <div className="space-y-3 p-6">
                  {group.map((t) => {
                    const playable = Boolean(t.previewSrc && normalizeSrc(t.previewSrc));

                    return (
                      <div
                        key={t.id}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 p-4"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-neutral-900">{t.title}</div>
                          <div className="truncate text-xs text-neutral-600">
                            {(t.artist ?? "PulseNexis") +
                              (t.mood ? ` · ${t.mood}` : "") +
                              (t.bpm ? ` · ${t.bpm} BPM` : "") +
                              (t.key ? ` · ${t.key}` : "")}
                          </div>

                          {!playable && (
                            <div className="mt-1 text-[11px] text-amber-600">
                              Missing previewSrc — add a FileDN path to enable playback
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

                          <select
                            value={getDeliverable(t.id)}
                            onChange={(e) => setDeliverable(t.id, e.target.value as Deliverable)}
                            className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                            aria-label="Select deliverable"
                          >
                            <option value="loops">{deliverableLabel("loops")}</option>
                            <option value="alt">{deliverableLabel("alt")}</option>
                            <option value="stems">{deliverableLabel("stems")}</option>
                          </select>

                          <button
                            onClick={() => addTrackToCart(t)}
                            className="rounded-full bg-black px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-900"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 pb-6">
                  <div className="text-xs text-neutral-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom pagination */}
        <div className="mt-8 flex items-center justify-between">
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
            Prev Page
          </button>

          <div className="text-sm text-neutral-600">
            Page <span className="font-semibold text-neutral-900">{safePage}</span> of{" "}
            <span className="font-semibold text-neutral-900">{totalPages}</span>
          </div>

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
            Next Page
          </button>
        </div>
      </div>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[110]">
          <button aria-label="Close cart" onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/60" />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 p-5">
              <div className="font-semibold text-neutral-900">Cart</div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm hover:bg-neutral-50"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 p-5">
              {cart.length === 0 ? (
                <div className="text-sm text-neutral-600">Your cart is empty.</div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-neutral-200 p-4">
                      <div className="text-sm font-semibold text-neutral-900">{item.title}</div>
                      <div className="mt-1 text-xs text-neutral-600">
                        Deliverable: {deliverableLabel(item.deliverable)}
                      </div>
                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="mt-3 text-xs font-semibold text-neutral-700 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={clearCart}
                      className="w-full rounded-full border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                    >
                      Clear Cart
                    </button>

                    <button
                      onClick={checkoutWithPaymentLinks}
                      className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-900"
                    >
                      {checkoutTier.label}
                    </button>
                  </div>

                  <div className="text-[11px] text-neutral-500">
                    Note: This checkout uses one payment link based on the highest tier in your cart (Stems &gt; Samples &gt; Loops).
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
