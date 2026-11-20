import type { Metadata } from "next";
import Link from "next/link";
import { trees, LIVE_PLANT_NOTE } from "@/data/products";
import { formatPrice } from "@/lib/money";
import { ProductImage } from "@/components/ProductImage";

export const metadata: Metadata = { title: "Winter trees" };

export default function TreesPage() {
  return (
    <div className="section container-page">
      <h1 className="text-4xl">Winter trees</h1>
      <p className="mt-3 max-w-2xl text-charcoal/80">
        {trees.length} indoor trees and plants that cope with short days and dry heated air. Check the light each one needs before you choose.
      </p>
      <p className="mt-3 rounded-xl bg-sage p-3 text-sm">{LIVE_PLANT_NOTE}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {trees.map((t) => (
          <Link key={t.slug} href={`/product/${t.slug}`} className="flex overflow-hidden rounded-2xl bg-white shadow-soft">
            <ProductImage src={t.images[0]} name={t.name} className="w-2/5 shrink-0" />
            <div className="flex flex-col gap-1 p-4 text-sm">
              <h2 className="font-serif text-lg leading-snug">{t.name}</h2>
              <p className="italic text-charcoal/60">{t.botanical}</p>
              <p><strong>Light:</strong> {t.lightLabel}</p>
              <p><strong>Difficulty:</strong> {t.difficulty}</p>
              <p><strong>Indoor height:</strong> {t.height}</p>
              <p className="mt-1 text-charcoal/80"><strong>Canadian winter note:</strong> {t.winterNote}</p>
              <p className="mt-auto pt-2 font-semibold text-forest">{formatPrice(t.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
