"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, toCents } from "@/lib/money";
import { fromPrice } from "@/lib/catalog";
import type { Bundle, Product } from "@/data/products";
import { ProductImage } from "./ProductImage";
import { Badge } from "./Badge";
import { lineForProduct, lineForBundle } from "@/lib/cartLines";

export function ProductCard({ item }: { item: Product | Bundle }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const isBundle = "contents" in item;
  const href = isBundle ? "/bundles" : `/product/${item.slug}`;
  const hasOptions = !isBundle && ((item.sizes?.length ?? 0) > 1 || (item.colours?.length ?? 0) > 1);

  const quickAdd = () => {
    add(isBundle ? lineForBundle(item) : lineForProduct(item));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const price = isBundle ? item.price : fromPrice(item);
  const showFrom = !isBundle && item.sizes && item.sizes.length > 1;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-sage">
        <ProductImage src={item.images[0]} name={item.name} className="h-full w-full" />
        {item.badge && <span className="absolute left-3 top-3"><Badge>{item.badge}</Badge></span>}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-lg leading-snug text-forest">
          <Link href={href}>{item.name}</Link>
        </h3>
        <p className="text-sm text-charcoal/75">{item.short}</p>
        <p className="mt-auto pt-2 text-base font-semibold text-forest">
          {showFrom && <span className="mr-1 text-sm font-normal text-charcoal/60">from</span>}
          {formatPrice(price)}
          {isBundle && (
            <span className="ml-2 text-sm font-normal text-charcoal/55 line-through">{formatPrice(item.separatePrice)}</span>
          )}
        </p>
        {hasOptions ? (
          <Link href={href} className="btn-secondary text-center">Choose options</Link>
        ) : (
          <button type="button" onClick={quickAdd} className="btn-primary">
            {added ? "Added ✓" : "Add to cart"}
          </button>
        )}
        <span className="sr-only" aria-live="polite">{added ? `${item.name} added to cart` : ""}</span>
      </div>
    </article>
  );
}
