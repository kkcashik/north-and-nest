"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/money";
import { lineForProduct } from "@/lib/cartLines";
import type { Product } from "@/data/products";
import { QuantitySelector } from "./QuantitySelector";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes?.[0]);
  const [colour, setColour] = useState(product.colours?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = size?.price ?? product.price;

  return (
    <div className="space-y-5">
      <p className="text-3xl font-semibold text-forest">{formatPrice(price)} <span className="text-sm font-normal text-charcoal/60">CAD</span></p>

      {product.sizes && (
        <fieldset>
          <legend className="label">Size</legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button key={s.label} type="button" aria-pressed={size?.label === s.label} onClick={() => setSize(s)}
                className={`rounded-xl border px-4 py-2 text-left text-sm ${size?.label === s.label ? "border-forest bg-forest text-cream" : "border-jute/60 bg-white hover:bg-sage"}`}>
                <span className="block font-medium">{s.label}</span>
                <span className="block text-xs opacity-80">{formatPrice(s.price)}</span>
              </button>
            ))}
          </div>
          {size?.note && <p className="mt-2 text-xs text-charcoal/65">{size.note}</p>}
        </fieldset>
      )}

      {product.colours && product.colours.length > 0 && (
        <fieldset>
          <legend className="label">Colour: <span className="font-normal">{colour?.label}</span></legend>
          <div className="flex flex-wrap gap-2">
            {product.colours.map((c) => (
              <button key={c.label} type="button" aria-pressed={colour?.label === c.label} aria-label={c.label} title={c.label} onClick={() => setColour(c)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${colour?.label === c.label ? "border-forest ring-2 ring-forest/30" : "border-jute/60"} bg-white`}>
                <span className="h-4 w-4 rounded-full border border-charcoal/20" style={{ backgroundColor: c.hex }} />
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {product.potSize && <p className="text-sm"><strong>Size:</strong> {product.potSize}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <QuantitySelector value={qty} onChange={setQty} />
        <button type="button" className="btn-primary flex-1 sm:flex-none sm:px-10"
          onClick={() => { add(lineForProduct(product, { size, colour }), qty); setAdded(true); setTimeout(() => setAdded(false), 1800); }}>
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
      <p className="text-sm" aria-live="polite">{added && <>Added to your cart. <Link href="/cart" className="underline">View cart</Link></>}</p>
    </div>
  );
}
