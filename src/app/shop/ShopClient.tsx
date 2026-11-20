"use client";

import { useMemo, useState } from "react";
import { allProducts, bundles, hangerColourFilters, lightFilters, type HangerColourTag, type LightLevel } from "@/data/products";
import { fromPrice } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

type Cat = "all" | "hanger" | "container" | "tree" | "bundle";
const cats: { value: Cat; label: string }[] = [
  { value: "all", label: "All" },
  { value: "hanger", label: "Hangers" },
  { value: "container", label: "Containers" },
  { value: "tree", label: "Trees" },
  { value: "bundle", label: "Bundles" },
];

export function ShopClient({ initialCategory }: { initialCategory: string }) {
  const [cat, setCat] = useState<Cat>(initialCategory as Cat);
  const [colour, setColour] = useState<HangerColourTag | "">("");
  const [light, setLight] = useState<LightLevel | "">("");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  const items = useMemo(() => {
    let list = [
      ...allProducts.filter((p) => cat === "all" || cat === p.category),
      ...(cat === "all" || cat === "bundle" ? bundles : []),
    ];
    if (cat === "hanger" && colour) list = list.filter((i) => "colours" in i && i.colours?.some((c) => c.tag === colour));
    if (cat === "tree" && light) list = list.filter((i) => "light" in i && i.light?.includes(light));
    const price = (i: (typeof list)[number]) => ("contents" in i ? i.price : fromPrice(i));
    if (sort !== "default") list = [...list].sort((a, b) => (sort === "asc" ? price(a) - price(b) : price(b) - price(a)));
    return list;
  }, [cat, colour, light, sort]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition ${active ? "border-forest bg-forest text-cream" : "border-jute/60 bg-white text-charcoal hover:bg-sage"}`;

  return (
    <>
      <div className="mt-6 space-y-4 rounded-2xl bg-white p-4 shadow-soft">
        <div>
          <p className="label">Category</p>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c.value} type="button" aria-pressed={cat === c.value} className={chip(cat === c.value)}
                onClick={() => { setCat(c.value); setColour(""); setLight(""); }}>{c.label}</button>
            ))}
          </div>
        </div>
        {cat === "hanger" && (
          <div>
            <p className="label">Hanger colour</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={colour === ""} className={chip(colour === "")} onClick={() => setColour("")}>Any</button>
              {hangerColourFilters.map((c) => (
                <button key={c.tag} type="button" aria-pressed={colour === c.tag} className={chip(colour === c.tag)} onClick={() => setColour(c.tag)}>{c.label}</button>
              ))}
            </div>
          </div>
        )}
        {cat === "tree" && (
          <div>
            <p className="label">Light needs</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={light === ""} className={chip(light === "")} onClick={() => setLight("")}>Any</button>
              {lightFilters.map((l) => (
                <button key={l.value} type="button" aria-pressed={light === l.value} className={chip(light === l.value)} onClick={() => setLight(l.value)}>{l.label}</button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-forest">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="input !w-auto">
            <option value="default">Featured</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
          <span className="ml-auto text-sm text-charcoal/60" aria-live="polite">{items.length} items</span>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="mt-10 text-center text-charcoal/70">Nothing matches those filters. Try another colour or light level.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((i) => <ProductCard key={i.slug} item={i} />)}
        </div>
      )}
    </>
  );
}
