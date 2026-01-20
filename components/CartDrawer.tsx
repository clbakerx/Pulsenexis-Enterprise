"use client";

import * as React from "react";
import { useCart } from "../providers";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, setQty, clear } = useCart();

  // (Step 4 will wire this to Stripe)
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  async function checkout() {
    setErr(null);
    setLoading(true);
    try {
      // Placeholder until Step 4 (Stripe Checkout API)
      // For now just close the drawer (so you can see it working)
      onClose();
      setLoading(false);
      alert("Checkout will be wired to Stripe in Step 4.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout error");
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-[min(92vw,420px)] bg-white shadow-xl p-4 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Cart</div>
            <div className="text-xs text-slate-500">
              {items.length} item{items.length === 1 ? "" : "s"}
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-auto space-y-3">
          {items.length === 0 ? (
            <div className="text-sm text-slate-600">Your cart is empty.</div>
          ) : (
            items.map((it) => (
              <div key={it.key} className="rounded-2xl border p-3">
                <div className="text-sm font-semibold text-slate-900">
                  {it.title}
                </div>
                <div className="text-xs text-slate-600">
                  {it.artist} •{" "}
                  <span className="font-medium">{it.label}</span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <label className="text-xs text-slate-600">Qty</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={it.qty}
                    onChange={(e) => setQty(it.key, Number(e.target.value))}
                    className="w-20 rounded-lg border px-2 py-1 text-sm"
                  />

                  <button
                    onClick={() => removeItem(it.key)}
                    className="ml-auto rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {err && (
          <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-2">
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
            {loading ? "Redirecting…" : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
