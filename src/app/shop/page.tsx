import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const initial = ["hanger", "container", "tree", "bundle"].includes(category ?? "") ? (category as string) : "all";
  return (
    <div className="section container-page">
      <h1 className="text-4xl">Shop</h1>
      <p className="mt-2 text-charcoal/75">Hangers, containers, winter trees and bundles. Everything is sold separately too.</p>
      <Suspense>
        <ShopClient key={initial} initialCategory={initial} />
      </Suspense>
    </div>
  );
}
