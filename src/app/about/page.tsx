import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="section container-page max-w-3xl">
      <h1 className="text-4xl">Our story</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/85">
        <p>We started with a simple problem: buying a plant, a pot and something to hang it in meant three shops and three deliveries. So we put them in one box.</p>
        <p>Our macramé hangers and woven jute and seagrass containers are handmade by artisan partners in Bangladesh. Our live trees are sourced in Ontario, then assembled and shipped from Toronto.</p>
        <p>We care about doing it gently. Our packaging is plastic-free and eco-friendly, and every tree is chosen because it copes with a Canadian winter.</p>
        <p>Every hanger, pot and tree is also sold on its own, so you can build exactly the set you want.</p>
      </div>
      <Link href="/shop" className="btn-primary mt-8">Start shopping</Link>
    </div>
  );
}
