"use client";

import Link from "next/link";
import { useState } from "react";
import { containers, hangers, trees } from "@/data/products";
import { applyBuilderDiscount, formatCents, toCents } from "@/lib/money";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "@/components/ProductImage";

// Container choices: every single size (the 3-piece set is excluded — builder needs one container).
const containerOptions = containers.flatMap((c) =>
  (c.sizes ?? []).filter((s) => s.label !== "Set of 3").map((s) => ({
    key: `${c.slug}|${s.label}`,
    name: `${c.name.replace("Nested ", "")} — ${s.label}`,
    price: s.price,
    image: c.images[0],
  })),
);

export function BuildClient() {
  const { add } = useCart();
  const [treeSlug, setTreeSlug] = useState<string>();
  const [containerKey, setContainerKey] = useState<string>();
  const [hangerSlug, setHangerSlug] = useState<string>();
  const [colour, setColour] = useState<string>();
  const [added, setAdded] = useState(false);

  const tree = trees.find((t) => t.slug === treeSlug);
  const container = containerOptions.find((c) => c.key === containerKey);
  const hanger = hangers.find((h) => h.slug === hangerSlug);
  const colourLabel = colour ?? hanger?.colours?.[0]?.label;

  const separate = (tree ? toCents(tree.price) : 0) + (container ? toCents(container.price) : 0) + (hanger ? toCents(hanger.price) : 0);
  const final = applyBuilderDiscount(separate);
  const complete = tree && container && hanger;

  const card = (active: boolean) =>
    `flex flex-col overflow-hidden rounded-xl border-2 bg-white text-left transition ${active ? "border-forest shadow-soft" : "border-transparent hover:border-jute"}`;

  const addSet = () => {
    if (!tree || !container || !hanger) return;
    add({
      id: `custom|${tree.slug}|${container.key}|${hanger.slug}|${colourLabel}`,
      name: "Custom Set",
      details: [tree.name, container.name, `${hanger.name}${colourLabel ? ` (${colourLabel})` : ""}`],
      image: tree.images[0],
      unitCents: final,
      regularCents: separate,
      live: true,
    });
    setAdded(true);
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-10">
        <section aria-labelledby="s1">
          <h2 id="s1" className="text-2xl">Step 1 · Pick a tree</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {trees.map((t) => (
              <button key={t.slug} type="button" aria-pressed={treeSlug === t.slug} onClick={() => setTreeSlug(t.slug)} className={card(treeSlug === t.slug)}>
                <ProductImage src={t.images[0]} name={t.name} className="aspect-square w-full" />
                <span className="p-3 text-sm"><span className="block font-medium">{t.name}</span><span className="text-charcoal/65">{t.lightLabel} · ${t.price.toFixed(2)}</span></span>
              </button>
            ))}
          </div>
        </section>
        <section aria-labelledby="s2">
          <h2 id="s2" className="text-2xl">Step 2 · Pick a container</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {containerOptions.map((c) => (
              <button key={c.key} type="button" aria-pressed={containerKey === c.key} onClick={() => setContainerKey(c.key)} className={card(containerKey === c.key)}>
                <ProductImage src={c.image} name={c.name} className="aspect-[4/3] w-full" />
                <span className="p-3 text-sm"><span className="block font-medium">{c.name}</span><span className="text-charcoal/65">${c.price.toFixed(2)}</span></span>
              </button>
            ))}
          </div>
        </section>
        <section aria-labelledby="s3">
          <h2 id="s3" className="text-2xl">Step 3 · Pick a hanger</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {hangers.map((h) => (
              <button key={h.slug} type="button" aria-pressed={hangerSlug === h.slug} onClick={() => { setHangerSlug(h.slug); setColour(undefined); }} className={card(hangerSlug === h.slug)}>
                <ProductImage src={h.images[0]} name={h.name} className="aspect-square w-full" />
                <span className="p-3 text-sm"><span className="block font-medium">{h.name}</span><span className="text-charcoal/65">${h.price.toFixed(2)}</span></span>
              </button>
            ))}
          </div>
          {hanger?.colours && hanger.colours.length > 1 && (
            <fieldset className="mt-4">
              <legend className="label">Hanger colour</legend>
              <div className="flex flex-wrap gap-2">
                {hanger.colours.map((c) => (
                  <button key={c.label} type="button" aria-pressed={colourLabel === c.label} onClick={() => setColour(c.label)}
                    className={`flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm ${colourLabel === c.label ? "border-forest ring-2 ring-forest/30" : "border-jute/60"}`}>
                    <span className="h-4 w-4 rounded-full border border-charcoal/20" style={{ backgroundColor: c.hex }} />{c.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </section>
      </div>

      <aside className="h-fit rounded-2xl bg-sage p-5 lg:sticky lg:top-24" aria-label="Your set">
        <h2 className="text-xl">Your set</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex justify-between gap-2"><span>{tree ? tree.name : <em className="text-charcoal/50">Pick a tree</em>}</span>{tree && <span>{formatCents(toCents(tree.price))}</span>}</li>
          <li className="flex justify-between gap-2"><span>{container ? container.name : <em className="text-charcoal/50">Pick a container</em>}</span>{container && <span>{formatCents(toCents(container.price))}</span>}</li>
          <li className="flex justify-between gap-2"><span>{hanger ? `${hanger.name}${colourLabel && hanger.colours!.length > 1 ? ` (${colourLabel})` : ""}` : <em className="text-charcoal/50">Pick a hanger</em>}</span>{hanger && <span>{formatCents(toCents(hanger.price))}</span>}</li>
        </ul>
        <dl className="mt-4 space-y-1 border-t border-forest/20 pt-3 text-sm">
          <div className="flex justify-between"><dt>Bought separately</dt><dd>{formatCents(separate)}</dd></div>
          <div className="flex justify-between text-jute"><dt>Bundle discount (10%)</dt><dd>−{formatCents(separate - final)}</dd></div>
          <div className="flex justify-between pt-1 text-lg font-semibold text-forest"><dt>Set price</dt><dd>{formatCents(final)}</dd></div>
        </dl>
        <button type="button" disabled={!complete} onClick={addSet} className="btn-primary mt-4 w-full">Add set to cart</button>
        <p className="mt-2 text-xs text-charcoal/65" aria-live="polite">
          {!complete ? "Pick one of each to add your set." : added ? <>Set added. <Link href="/cart" className="underline">View cart</Link></> : "Live plants ship within Ontario only."}
        </p>
      </aside>
    </div>
  );
}
