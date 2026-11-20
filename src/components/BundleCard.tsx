"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, toCents, formatCents } from "@/lib/money";
import { lineForBundle } from "@/lib/cartLines";
import { getProduct } from "@/lib/catalog";
import type { Bundle } from "@/data/products";
import { ProductImage } from "./ProductImage";
import { Badge } from "./Badge";

export function BundleCard({ bundle, full = false }: { bundle: Bundle; full?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const saving = toCents(bundle.separatePrice) - toCents(bundle.price);
  return (
    <article className={`flex overflow-hidden rounded-2xl bg-white shadow-soft ${full ? "flex-col md:flex-row" : "flex-col"}`}>
      <div className={`relative bg-sage ${full ? "aspect-[4/3] md:aspect-auto md:w-2/5" : "aspect-[4/3]"}`}>
        <ProductImage src={bundle.images[0]} name={bundle.name} className="h-full w-full" />
        {bundle.badge && <span className="absolute left-3 top-3"><Badge>{bundle.badge}</Badge></span>}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-xl text-forest">{bundle.name}</h3>
        <p className="text-sm text-charcoal/75">{bundle.short}</p>
        {full && (
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {bundle.contents.map((c) => <li key={c}>{c}</li>)}
          </ul>
        )}
        {full && bundle.note && <p className="text-sm italic text-charcoal/70">{bundle.note}</p>}
        <div className="mt-auto">
          <p className="text-sm text-charcoal/60">
            Bought separately: <span className="line-through">{formatPrice(bundle.separatePrice)}</span>
          </p>
          <p className="text-2xl font-semibold text-forest">{formatPrice(bundle.price)}</p>
          <p className="text-sm font-medium text-jute">You save {formatCents(saving)}</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => { add(lineForBundle(bundle)); setAdded(true); setTimeout(() => setAdded(false), 1500); }}>
          {added ? "Added ✓" : "Add to cart"}
        </button>
        {!full && <Link href="/bundles" className="text-center text-sm text-forest underline">See what&rsquo;s inside</Link>}
        {full && (
          <p className="text-xs text-charcoal/60">Plants chosen for Ontario winters. Live plants ship within Ontario only.</p>
        )}
      </div>
    </article>
  );
}
