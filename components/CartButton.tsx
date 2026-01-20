"use client";

import * as React from "react";
import { useCart } from "../providers";

export function CartButton({ onOpen }: { onOpen: () => void }) {
  const { count } = useCart();

  return (
    <button
      onClick={onOpen}
      className="relative rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
    >
      Cart
      {count > 0 && (
        <span className="ml-2 inline-flex min-w-[22px] justify-center rounded-full bg-black px-2 py-0.5 text-xs text-white">
          {count}
        </span>
      )}
    </button>
  );
}
