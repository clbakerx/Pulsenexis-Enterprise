"use client";

import * as React from "react";

type Track = {
  id: string | number;
  title: string;
  artist?: string | null;
};

export type LicenseModalProps = {
  open: boolean;
  onClose: () => void;
  track: Track | null;
  onAddLoop?: () => void;
  onAddAlt?: () => void;
  onAddStems?: () => void;
  onOpenCart?: () => void;
};

export function LicenseModal(props: LicenseModalProps) {
  const { open, onClose, track, onAddLoop, onAddAlt, onAddStems, onOpenCart } = props;

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !track) return null;

  const safeAddLoop = onAddLoop ?? (() => alert("Add Loops: hook not wired yet"));
  const safeAddAlt = onAddAlt ?? (() => alert("Add Alt: hook not wired yet"));
  const safeAddStems = onAddStems ?? (() => alert("Add Stems: hook not wired yet"));
  const safeOpenCart = onOpenCart ?? (() => alert("Cart: hook not wired yet"));

  return (
    <div className="fixed inset-0 z-[100]">
      <button aria-label="Close modal" onClick={onClose} className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto mt-10 w-[92vw] max-w-3xl">
        <div className="rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
          <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-6">
            <div className="min-w-0">
              <div className="text-sm text-neutral-500 truncate">{track.artist ?? "PulseNexis"}</div>
              <h2 className="mt-1 text-2xl font-semibold text-neutral-900 truncate">{track.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Add deliverables to your cart, then checkout in one place.
              </p>
            </div>

            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-sm font-semibold text-neutral-900">Loops</div>
                <div className="mt-2 text-sm text-neutral-600">8-bar / 16-bar loop exports for quick use.</div>
                <button
                  onClick={safeAddLoop}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-900"
                >
                  Add Loops to Cart
                </button>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-sm font-semibold text-neutral-900">Alternate Versions</div>
                <div className="mt-2 text-sm text-neutral-600">No-drums, drums-only, shorter edits, etc.</div>
                <button
                  onClick={safeAddAlt}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-900"
                >
                  Add Alt Version
                </button>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-sm font-semibold text-neutral-900">Stems</div>
                <div className="mt-2 text-sm text-neutral-600">Full track stems for mixing + placements.</div>
                <button
                  onClick={safeAddStems}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-900"
                >
                  Add Stems to Cart
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-neutral-500">
                Track ID: <span className="font-mono">{track.id}</span>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={safeOpenCart}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  View Cart
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-900"
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-neutral-200 p-6">
            <button
              onClick={onClose}
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
