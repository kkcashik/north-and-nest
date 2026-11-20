"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartLine {
  id: string; // unique per product+variant
  slug?: string; // link target (undefined for custom sets)
  name: string;
  variant?: string;
  details?: string[];
  image?: string;
  unitCents: number; // price actually charged per unit
  regularCents: number; // price if parts bought separately (== unitCents when no bundle saving)
  qty: number;
  live?: boolean; // contains a live plant
}

interface CartState {
  lines: CartLine[];
  count: number;
  regularCents: number;
  savingsCents: number;
  subtotalCents: number;
  hasLivePlant: boolean;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  ready: boolean;
}

const CartContext = createContext<CartState | null>(null);
const KEY = "wt-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === line.id);
      if (existing) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { ...line, qty }];
    });
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);
  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const regularCents = lines.reduce((n, l) => n + l.regularCents * l.qty, 0);
    const subtotalCents = lines.reduce((n, l) => n + l.unitCents * l.qty, 0);
    return {
      lines,
      count,
      regularCents,
      subtotalCents,
      savingsCents: regularCents - subtotalCents,
      hasLivePlant: lines.some((l) => l.live),
      add,
      setQty,
      remove,
      clear,
      ready,
    };
  }, [lines, add, setQty, remove, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
