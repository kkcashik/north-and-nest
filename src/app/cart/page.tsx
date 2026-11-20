"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCents } from "@/lib/money";
import { ProductImage } from "@/components/ProductImage";
import { QuantitySelector } from "@/components/QuantitySelector";

export default function CartPage() {
  const { lines, setQty, remove, regularCents, savingsCents, subtotalCents, hasLivePlant, ready } = useCart();

  if (!ready) return <div className="section container-page"><h1 className="text-4xl">Your cart</h1></div>;
  if (lines.length === 0)
    return (
      <div className="section container-page text-center">
        <h1 className="text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-charcoal/75">Start with a bundle, or build your own set.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/bundles" className="btn-primary">Shop bundles</Link>
          <Link href="/shop" className="btn-secondary">Browse the shop</Link>
        </div>
      </div>
    );

  return (
    <div className="section container-page">
      <h1 className="text-4xl">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {lines.map((l) => (
            <li key={l.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft">
              <ProductImage src={l.image} name={l.name} className="h-24 w-20 shrink-0 rounded-xl" />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex justify-between gap-3">
                  <h2 className="font-serif text-lg leading-snug">
                    {l.slug ? <Link href={`/product/${l.slug}`}>{l.name}</Link> : l.name}
                  </h2>
                  <p className="font-semibold text-forest">{formatCents(l.unitCents * l.qty)}</p>
                </div>
                {l.variant && <p className="text-sm text-charcoal/65">{l.variant}</p>}
                {l.details && <ul className="list-disc pl-5 text-xs text-charcoal/70">{l.details.map((d) => <li key={d}>{d}</li>)}</ul>}
                {l.regularCents > l.unitCents && <p className="text-xs text-jute">Bundle saving: {formatCents((l.regularCents - l.unitCents) * l.qty)}</p>}
                <div className="mt-auto flex items-center justify-between pt-2">
                  <QuantitySelector value={l.qty} onChange={(n) => setQty(l.id, n)} label={`Quantity for ${l.name}`} />
                  <button type="button" onClick={() => remove(l.id)} className="text-sm text-charcoal/60 underline hover:text-forest">Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-2xl bg-sage p-5 lg:sticky lg:top-24">
          <h2 className="text-xl">Order summary</h2>
          <dl className="mt-3 space-y-1.5 text-sm">
            {savingsCents > 0 && <div className="flex justify-between"><dt>Items at regular price</dt><dd>{formatCents(regularCents)}</dd></div>}
            {savingsCents > 0 && <div className="flex justify-between text-jute"><dt>Bundle discount</dt><dd>−{formatCents(savingsCents)}</dd></div>}
            <div className="flex justify-between border-t border-forest/20 pt-2 text-lg font-semibold text-forest"><dt>Subtotal</dt><dd>{formatCents(subtotalCents)}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-charcoal/70">
            GTA pickup is free. {hasLivePlant ? "Ontario plant shipping is calculated at checkout (placeholder)." : "Shipping is calculated at checkout (placeholder)."} Taxes extra.
          </p>
          {hasLivePlant && <p className="mt-2 text-xs text-charcoal/70">Live plants ship within Ontario only, with a heat pack in an insulated box.</p>}
          <Link href="/checkout" className="btn-primary mt-4 w-full">Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
