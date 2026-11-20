import type { Metadata } from "next";
import Link from "next/link";
import { hangers, containers, trees, bundles, LIVE_PLANT_NOTE, type Product } from "@/data/products";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/money";
import { fromPrice } from "@/lib/catalog";
import { ProductImage } from "@/components/ProductImage";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = { title: "Product catalogue" };

function Item({ p }: { p: Product }) {
  const multi = (p.sizes?.length ?? 0) > 1;
  return (
    <article className="flex gap-4 break-inside-avoid rounded-2xl bg-white p-3 shadow-soft print:shadow-none print:ring-1 print:ring-jute/40">
      <ProductImage src={p.images[0]} name={p.name} className="h-32 w-24 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 text-sm">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg leading-snug">
            <Link href={`/product/${p.slug}`}>{p.name}</Link>
          </h3>
          <p className="shrink-0 font-semibold text-forest">
            {multi && <span className="text-xs font-normal text-charcoal/60">from </span>}
            {formatPrice(fromPrice(p))}
          </p>
        </div>
        {p.botanical && <p className="italic text-charcoal/60">{p.botanical}</p>}
        <p className="mt-1 text-charcoal/80">{p.short}</p>
        {p.colours && p.colours.length > 0 && (
          <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-charcoal/70">
            {p.colours.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-full border border-charcoal/20" style={{ backgroundColor: c.hex }} />
                {c.label}
              </span>
            ))}
          </p>
        )}
        {p.sizes && (
          <p className="mt-1.5 text-xs text-charcoal/70">
            {p.sizes.map((s) => `${s.label} ${formatPrice(s.price)}`).join(" · ")}
          </p>
        )}
        {p.category === "tree" && (
          <p className="mt-1.5 text-xs text-charcoal/70">
            {p.lightLabel} · {p.difficulty} · {p.height}
            <br />
            <span className="text-forest">Winter note:</span> {p.winterNote}
          </p>
        )}
        {p.badge && <p className="mt-1.5 inline-block rounded-full bg-sage px-2 py-0.5 text-xs text-forest">{p.badge}</p>}
      </div>
    </article>
  );
}

function Section({ title, intro, items }: { title: string; intro: string; items: Product[] }) {
  return (
    <section className="mt-10 print:mt-6">
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-charcoal/70">{intro}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 print:grid-cols-2">
        {items.map((p) => <Item key={p.slug} p={p} />)}
      </div>
    </section>
  );
}

export default function CataloguePage() {
  return (
    <div className="section container-page print:py-0">
      <header className="rounded-3xl bg-forest p-8 text-cream print:rounded-none">
        <p className="text-sm uppercase tracking-wider text-jute-light">Holiday 2026 catalogue</p>
        <h1 className="mt-2 text-4xl !text-cream">{siteConfig.name}</h1>
        <p className="mt-2 max-w-xl text-cream/85">{siteConfig.tagline}</p>
        <p className="mt-4 text-xs text-cream/70">All prices in CAD. Toronto, Ontario. GTA pickup available.</p>
      </header>
      <div className="mt-4 flex flex-wrap items-center gap-3 print:hidden">
        <PrintButton />
        <span className="text-sm text-charcoal/60">Opens your browser&rsquo;s print dialogue — choose &ldquo;Save as PDF&rdquo;.</span>
      </div>

      <Section title="Macramé hangers" intro="Handmade small singles. Cotton cord only — loop top, tassel bottom." items={hangers} />
      <Section title="Woven containers" intro="Jute pots and seagrass baskets, sold on their own or in a set." items={containers} />
      <Section title="Winter trees" intro={LIVE_PLANT_NOTE} items={trees} />

      <section className="mt-10 break-before-page print:mt-6">
        <h2 className="text-2xl">Holiday bundles</h2>
        <p className="mt-1 text-sm text-charcoal/70">Hanger, pot and tree in one box — for less than the parts.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 print:grid-cols-2">
          {bundles.map((b) => {
            const save = b.separatePrice - b.price;
            return (
              <article key={b.slug} className="flex gap-4 break-inside-avoid rounded-2xl bg-white p-3 shadow-soft print:shadow-none print:ring-1 print:ring-jute/40">
                <ProductImage src={b.images[0]} name={b.name} className="h-32 w-24 shrink-0 rounded-xl" />
                <div className="flex-1 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg leading-snug">{b.name}</h3>
                    <p className="shrink-0 font-semibold text-forest">{formatPrice(b.price)}</p>
                  </div>
                  <ul className="mt-1 list-disc pl-4 text-xs text-charcoal/75">
                    {b.contents.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                  {save > 0 && <p className="mt-1.5 text-xs text-jute">Separately {formatPrice(b.separatePrice)} — you save {formatPrice(save)}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="mt-10 rounded-2xl bg-sage p-5 text-xs text-charcoal/75">
        <p>Handmade macramé and woven containers by artisan partners in Bangladesh. Live trees sourced in Ontario. Assembled in Toronto.</p>
        <p className="mt-1">Holiday orders: last shipping {siteConfig.lastShipDate}, last GTA pickup {siteConfig.lastPickupDate}. Live plants ship within Ontario only.</p>
        <p className="mt-1">Photos are concept images. Real product photos will replace them before launch.</p>
      </footer>
    </div>
  );
}
