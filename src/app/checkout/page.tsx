"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useCart, type CartLine } from "@/context/CartContext";
import { formatCents } from "@/lib/money";

export default function CheckoutPage() {
  const { lines, subtotalCents, savingsCents, clear, hasLivePlant } = useCart();
  const [done, setDone] = useState<{ ref: string; lines: CartLine[]; total: number } | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const ref = `${siteConfig.referencePrefix}-${Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")}`;
    setDone({ ref, lines, total: subtotalCents });
    clear();
  };

  if (done)
    return (
      <div className="section container-page max-w-2xl text-center">
        <h1 className="text-4xl">Thank you — you&rsquo;re on the list</h1>
        <p className="mt-3 text-lg">Your reservation reference is</p>
        <p className="mt-2 inline-block rounded-xl bg-sage px-6 py-3 font-serif text-3xl text-forest">{done.ref}</p>
        <p className="mt-4 text-charcoal/80">
          This is a concept store, so nothing has been charged and no email has been sent. We&rsquo;ll be in touch when {siteConfig.name} opens for Christmas 2026.
        </p>
        <Link href="/" className="btn-primary mt-6">Back to home</Link>
      </div>
    );

  return (
    <div className="section container-page">
      <h1 className="text-4xl">Checkout opens soon</h1>
      <p className="mt-2 max-w-2xl text-charcoal/80">We&rsquo;re launching for Christmas 2026. Reserve your order by filling in the form — no payment is taken.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow-soft">
          <div><label htmlFor="name" className="label">Name</label><input id="name" required className="input" autoComplete="name" /></div>
          <div><label htmlFor="email" className="label">Email</label><input id="email" type="email" required className="input" autoComplete="email" /></div>
          <div><label htmlFor="phone" className="label">Phone (optional)</label><input id="phone" type="tel" className="input" autoComplete="tel" /></div>
          <fieldset>
            <legend className="label">Pickup or delivery</legend>
            <label className="mr-6 inline-flex items-center gap-2 text-sm"><input type="radio" name="method" defaultChecked /> GTA pickup (free)</label>
            <label className="inline-flex items-center gap-2 text-sm"><input type="radio" name="method" /> Delivery</label>
          </fieldset>
          <div><label htmlFor="notes" className="label">Notes</label><textarea id="notes" rows={3} className="input" /></div>
          <button type="submit" disabled={lines.length === 0} className="btn-primary w-full">Reserve my order</button>
          {lines.length === 0 && <p className="text-sm text-charcoal/70">Your cart is empty. <Link href="/shop" className="underline">Add something first.</Link></p>}
        </form>
        <aside className="h-fit rounded-2xl bg-sage p-5">
          <h2 className="text-xl">Order summary</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-3"><span>{l.qty} × {l.name}{l.variant ? ` (${l.variant})` : ""}</span><span>{formatCents(l.unitCents * l.qty)}</span></li>
            ))}
          </ul>
          {savingsCents > 0 && <p className="mt-2 text-sm text-jute">Includes bundle savings of {formatCents(savingsCents)}</p>}
          <p className="mt-3 flex justify-between border-t border-forest/20 pt-2 text-lg font-semibold text-forest"><span>Subtotal</span><span>{formatCents(subtotalCents)}</span></p>
          {hasLivePlant && <p className="mt-2 text-xs text-charcoal/70">Live plants ship within Ontario only, with a heat pack in an insulated box. GTA pickup available.</p>}
        </aside>
      </div>
    </div>
  );
}
