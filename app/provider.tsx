"use client";

import * as React from "react";

export type CartItem = {
  key: string;
  title: string;
  deliverable: string;
  qty: number;
  trackId?: string;
  packSlug?: string;
  artist?: string | null;
};

type CartCtx = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const addItem = React.useCallback((item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.key === item.key);
      if (i === -1) return [...prev, item];
      const next = [...prev];
      next[i] = { ...next[i], qty: (next[i].qty ?? 1) + (item.qty ?? 1) };
      return next;
    });
  }, []);

  const removeItem = React.useCallback((key: string) => {
    setItems((prev) => prev.filter((p) => p.key !== key));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const value = React.useMemo(() => ({ items, addItem, removeItem, clear }), [
    items,
    addItem,
    removeItem,
    clear,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider />");
  return ctx;
}
