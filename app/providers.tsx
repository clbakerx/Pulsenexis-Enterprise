"use client";

import * as React from "react";

export type CartItem = {
  key: string;              // unique key: `${trackId}:${deliverable}` etc
  title: string;
  artist?: string | null;
  deliverable: string;      // "complete" | "loops" | etc
  qty: number;

  trackId?: string;
  packSlug?: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const addItem = React.useCallback((item: CartItem) => {
    setItems((prev) => {
      // merge by key (increase qty)
      const i = prev.findIndex((x) => x.key === item.key);
      if (i === -1) return [...prev, item];

      const copy = [...prev];
      copy[i] = { ...copy[i], qty: (copy[i].qty ?? 1) + (item.qty ?? 1) };
      return copy;
    });
  }, []);

  const removeItem = React.useCallback((key: string) => {
    setItems((prev) => prev.filter((x) => x.key !== key));
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
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>.");
  return ctx;
}
