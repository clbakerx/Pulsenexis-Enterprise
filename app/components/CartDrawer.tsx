"use client";

import * as React from "react";
import { useCart } from "@/app/catalog/providers";
import { COMPLETE_BUNDLE_PRICE } from "@/lib/pricing";

function clampQty(n: unknown) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 1;
  return Math.max(1, Math.min(99, Math.floor(v)));
}

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, clear } = useCart();
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const bundleCount = React.useMemo(
    () => items.reduce((sum, it) => sum + clampQty(it.qty), 0),
    [items]
  );

  const total = React.useMemo(
    () => bundleCount * COMPLETE_BUNDLE_PRICE,
    [bundleCount]
  );

  const checkout = React.useCallback(async () => {
    if (loading) return;

    setErr(null);
    setLoading(true);

    try {
      if (items.length === 0) throw new Error("Your cart is empty.");

      const cart = items.map((it) => ({
        title: it.title,
        deliverable: it.deliverable, // e.g. "complete"
        qty: clampQty(it.qty),
        trackId: it.trackId,
        packSlug: it.packSlug ?? "",
      }));

      const res = await fetch("/api/checkout/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data: any = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          typeof data?.error === "string" && data.error.trim()
            ? data.error
            : "Checkout failed.";
        throw new Error(msg);
      }

      if (!data?.url || typeof data.url !== "string") {
        throw new Error("Checkout session missing URL.");
      }

      onClose();
      window.location.assign(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout error");
    } finally {
      setLoading(false);
    }
  }, [items, loading, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 flex h-full w-[min(92vw,420px)] flex-col bg-white p-4 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Cart</div>
            <div className="text-xs text-slate-500">
              {bundleCount} song bundle{bundleCount === 1 ? "" : "s"} • ${total}
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 rounded-2xl border bg-slate-50 p-3">
          <div className="text-sm font-semibold text-slate-900">
            Complete Bundle — ${COMPLETE_BUNDLE_PRICE} / song
          </div>
          <div className="mt-1 text-xs text-slate-700">
            Includes: Loops + Stems + Samples (MP3 & WAV)
          </div>
        </div>

        <div className="mt-4 flex-1 space-y-3 overflow-auto">
          {items.length === 0 ? (
            <div className="text-sm text-slate-600">Your cart is empty.</div>
          ) : (
            items.map((it) => (
              <div key={it.key} className="rounded-2xl border p-3">
                <div className="text-sm font-semibold text-slate-900">
                  {it.title}
                </div>
                <div className="text-xs text-slate-600">
                  {it.artist ?? "PulseNexis"} • Complete Bundle
                </div>

                <button
                  onClick={() => removeItem(it.key)}
                  className="mt-2 rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {err && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {err}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={clear}
            disabled={items.length === 0 || loading}
            className="flex-1 rounded-xl border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Clear
          </button>

          <button
            onClick={checkout}
            disabled={items.length === 0 || loading}
            className="flex-1 rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-50"
          >
            {loading ? "Redirecting…" : `Checkout ($${total})`}
          </button>
        </div>
      </div>
    </div>
  );
}
