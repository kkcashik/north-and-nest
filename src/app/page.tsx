import Link from "next/link";
import { bundles } from "@/data/products";
import { BundleCard } from "@/components/BundleCard";
import { ProductImage } from "@/components/ProductImage";
import { siteConfig } from "@/config/site";

const categories = [
  { href: "/shop?category=hanger", title: "Hangers", text: "Handmade macramé singles in seven colours.", img: "/images/rust-single-pothos.jpg" },
  { href: "/shop?category=container", title: "Containers", text: "Woven jute pots and seagrass baskets.", img: "/images/thick-cord-dracaena.jpg" },
  { href: "/trees", title: "Winter Trees", text: "Low-light trees chosen for Canadian homes.", img: "/images/classic-single-rubber-plant.jpg" },
];
const why = [
  { t: "Low-light tolerant trees", d: "Every tree is picked to cope with short Canadian winter days and dry heated air." },
  { t: "Heat-pack winter shipping", d: "Live plants travel in an insulated box with a heat pack, expedited within Ontario." },
  { t: "GTA pickup available", d: "Skip the shipping and collect your tree in the Greater Toronto Area." },
];
const steps = [
  { n: 1, t: "Pick a tree", d: "Choose from ten easy winter trees." },
  { n: 2, t: "Pick a pot", d: "Woven jute or seagrass, in three sizes." },
  { n: 3, t: "Pick a hanger", d: "Or simply take a ready-made bundle." },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-sage/60">
        <div className="container-page grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-jute">Christmas 2026 · Toronto</p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">A living Christmas tree, ready to hang.</h1>
            <p className="mt-4 max-w-lg text-lg text-charcoal/80">
              {siteConfig.tagline} Take a bundle with a macramé hanger, a woven jute pot and a live winter tree — nothing else to buy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/bundles" className="btn-primary">Shop the bundles</Link>
              <Link href="/build" className="btn-secondary">Build your own set</Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <ProductImage src="/images/norfolk-pine-classic-hanger.jpg" name="Norfolk Island pine in a jute pot and macramé hanger" priority className="aspect-[4/3] w-full" />
          </div>
        </div>
      </section>

      <section className="section container-page">
        <h2 className="text-3xl">Shop by category</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.title} href={c.href} className="group overflow-hidden rounded-2xl bg-white shadow-soft">
              <ProductImage src={c.img} name={c.title} className="aspect-[4/3] w-full transition group-hover:scale-[1.02]" />
              <div className="p-4">
                <h3 className="font-serif text-xl">{c.title}</h3>
                <p className="text-sm text-charcoal/75">{c.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section bg-white/60">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl">Holiday bundles</h2>
            <Link href="/bundles" className="text-sm text-forest underline">All bundles</Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bundles.map((b) => <BundleCard key={b.slug} bundle={b} />)}
          </div>
        </div>
      </section>

      <section className="section container-page">
        <h2 className="text-3xl">Why it works in a Canadian winter</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {why.map((w) => (
            <div key={w.t} className="rounded-2xl bg-sage p-6">
              <h3 className="font-serif text-xl">{w.t}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-forest text-cream">
        <div className="container-page">
          <h2 className="text-3xl !text-cream">How it works</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl bg-cream/10 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-jute-light font-semibold text-forest">{s.n}</span>
                <h3 className="mt-3 font-serif text-xl !text-cream">{s.t}</h3>
                <p className="mt-1 text-sm text-cream/80">{s.d}</p>
              </li>
            ))}
          </ol>
          <Link href="/build" className="mt-6 inline-flex rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-forest">Build your own set</Link>
        </div>
      </section>

      <section className="section container-page">
        <div className="rounded-3xl bg-sage p-8 sm:p-12">
          <h2 className="text-3xl">Keep your tree happy all winter</h2>
          <p className="mt-3 max-w-2xl text-charcoal/80">Water less, find the brightest window, and keep away from radiators. Our care guide covers it all, tree by tree.</p>
          <Link href="/care" className="btn-primary mt-5">Read the care guide</Link>
        </div>
      </section>
    </>
  );
}
