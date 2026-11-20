import type { Metadata } from "next";
import { bundles } from "@/data/products";
import { BundleCard } from "@/components/BundleCard";

export const metadata: Metadata = { title: "Holiday bundles" };

export default function BundlesPage() {
  return (
    <div className="section container-page">
      <h1 className="text-4xl">Holiday bundles</h1>
      <p className="mt-3 max-w-2xl text-charcoal/80">Hanger, pot and tree — everything in one box, for less than buying the parts one by one.</p>
      <div className="mt-8 space-y-6">
        {bundles.map((b) => <BundleCard key={b.slug} bundle={b} full />)}
      </div>
      <p className="mt-8 rounded-xl bg-sage p-4 text-sm">Live plants ship within Ontario only, with a heat pack in an insulated box. GTA pickup available.</p>
    </div>
  );
}
