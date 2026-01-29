"use client";

import * as React from "react";

export type Deliverable = "loops" | "samples" | "stems" | "complete";

export type CartItem = {
  key: string;            // `${trackId}:${deliverable}`
  trackId: string;
  packSlug?: string;
  title: string;
  artist?: string;
  label?: string;
  deliverable: Deliverable;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

const STORAGE_KEY = "pn_catalog_cart_v1";

function clampQty(v: unknown) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.floor(n)));
}

function isCartItemArray(x: unknown): x is CartItem[] {
  return (
    Array.isArray(x) &&
    x.every((it) => {
      const o = it as any;
      return (
        o &&
        typeof o.key === "string" &&
        typeof o.trackId === "string" &&
        typeof o.title === "string" &&
        (o.deliverable === "loops" ||
          o.deliverable === "samples" ||
          o.deliverable === "stems" ||
          o.deliverable === "complete") &&
        typeof o.qty === "number"
      );
    })
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (isCartItemArray(parsed)) setItems(parsed);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = React.useCallback((item: Omit<CartItem, "qty">, qty: number = 1) => {
    const q = clampQty(qty);

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.key === item.key);

      if (idx === -1) return [...prev, { ...item, qty: q }];

      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: clampQty(copy[idx].qty + q) };
      return copy;
    });
  }, []);

  const removeItem = React.useCallback((key: string) => {
    setItems((prev) => prev.filter((x) => x.key !== key));
  }, []);

  const setQty = React.useCallback((key: string, qty: number) => {
    const q = clampQty(qty);
    setItems((prev) => prev.map((x) => (x.key === key ? { ...x, qty: q } : x)));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const value = React.useMemo<CartContextValue>(
    () => ({ items, addItem, removeItem, setQty, clear }),
    [items, addItem, removeItem, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider> (wrap in app/catalog/layout.tsx)");
  return ctx;
}