import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProducts, trees, hangers, containers, LIVE_PLANT_NOTE, type Product } from "@/data/products";
import { getProduct } from "@/lib/catalog";
import { Gallery } from "@/components/Gallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/Badge";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p?.name ?? "Product", description: p?.short };
}

function pairsFor(p: Product): Product[] {
  const next = (list: Product[]) => list[(list.findIndex((x) => x.slug === p.slug) + 1) % list.length];
  const hanger = p.category === "hanger" ? next(hangers)
    : (p.pairs ? getProduct(p.pairs.hanger) : undefined) ?? hangers[0];
  const container = p.category === "container" ? next(containers)
    : (p.pairs ? getProduct(p.pairs.container) : undefined) ?? containers[1];
  const tree = p.category === "tree" ? next(trees)
    : trees.find((t) => t.pairs?.hanger === p.slug) ?? trees[0];
  return [hanger, container, tree].filter((x): x is Product => !!x && x.slug !== p.slug);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const isTree = p.category === "tree";
  return (
    <div className="section container-page">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal/60">
        <Link href="/shop" className="hover:underline">Shop</Link> / <span>{p.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <Gallery images={p.images} name={p.name} />
        <div className="space-y-5">
          {p.badge && <Badge>{p.badge}</Badge>}
          <h1 className="text-4xl">{p.name}</h1>
          {p.botanical && <p className="italic text-charcoal/60">{p.botanical}</p>}
          <p className="text-charcoal/85">{p.description}</p>
          <ProductPurchase product={p} />
          {isTree && (
            <section className="rounded-2xl bg-sage p-5 text-sm">
              <h2 className="font-serif text-xl">Care info</h2>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
                <dt className="font-medium">Light</dt><dd>{p.lightLabel}</dd>
                <dt className="font-medium">Difficulty</dt><dd>{p.difficulty}</dd>
                <dt className="font-medium">Indoor height</dt><dd>{p.height}</dd>
                <dt className="font-medium">Water</dt><dd>Less in winter — let the top few centimetres of soil dry first.</dd>
                <dt className="font-medium">Winter note</dt><dd>{p.winterNote}</dd>
              </dl>
              <p className="mt-3 border-t border-forest/15 pt-3">{LIVE_PLANT_NOTE}</p>
            </section>
          )}
        </div>
      </div>
      <section className="mt-16">
        <h2 className="text-2xl">Pairs well with</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
          {pairsFor(p).map((x) => <ProductCard key={x.slug} item={x} />)}
        </div>
      </section>
    </div>
  );
}
