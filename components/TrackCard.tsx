"use client";

import * as React from "react";
import { useCart } from "../providers";
import { LICENSE_LABELS, LICENSE_PRICES, type LicenseTier } from "@/lib/pricing";

export function LicenseToCart({
  songId,
  title,
  artist,
}: {
  songId: string;
  title: string;
  artist: string;
}) {
  const { addItem } = useCart();
  const [tier, setTier] = React.useState<LicenseTier>("samples");

  function add() {
    const key = `${songId}:${tier}`;
    addItem({
      key,
      songId,
      title,
      artist,
      tier,
      unitPrice: LICENSE_PRICES[tier],
      qty: 1,
      label: LICENSE_LABELS[tier],
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={tier}
        onChange={(e) => setTier(e.target.value as LicenseTier)}
        className="rounded-full border px-3 py-1 text-xs bg-white"
      >
        <option value="loops">Loops — $29</option>
        <option value="samples">Samples — $49</option>
        <option value="stems">Stems — $69</option>
      </select>

      <button
        onClick={add}
        className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white hover:bg-slate-900"
      >
        Add to Cart
      </button>
    </div>
  );
}
