import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  { q: "Do you ship live plants outside Ontario?", a: "No — live plants ship within Ontario only for now. Hangers and pots ship Canada-wide." },
  { q: "How do plants survive winter shipping?", a: "Each plant travels with a heat pack in an insulated box, shipped expedited. GTA pickup is available if you'd rather collect it yourself." },
  { q: "When will my order arrive?", a: `Holiday orders ship within 2 business days. Last shipping date is ${siteConfig.lastShipDate}; last pickup date is ${siteConfig.lastPickupDate}.` },
  { q: "What is your returns policy?", a: "Hangers and pots can be returned within 30 days if unused. For live plants, contact us within 48 hours of delivery with a photo." },
  { q: "Can I buy parts separately?", a: "Yes — every hanger, pot and tree is sold separately too." },
];

export default function FaqPage() {
  return (
    <div className="section container-page max-w-3xl">
      <h1 className="text-4xl">Frequently asked questions</h1>
      <div className="mt-8 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-soft">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-forest">
              {f.q}
              <span aria-hidden className="text-2xl transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-charcoal/85">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
