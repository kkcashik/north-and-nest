import Link from "next/link";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/bundles", label: "Bundles" },
  { href: "/build", label: "Build your own set" },
  { href: "/trees", label: "Winter trees" },
  { href: "/care", label: "Care guide" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/cart", label: "Cart" },
];

export function Footer() {
  return (
    <footer className="mt-12 bg-forest text-cream">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-cream">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-cream/80">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-cream/85 hover:text-cream hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1 text-sm text-cream/85">
          <p>GTA pickup available</p>
          <p>Ontario-only shipping for live plants</p>
          <p>Hangers and pots ship Canada-wide</p>
          <p>Toronto, Ontario</p>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-page flex flex-col gap-1 py-4 text-xs text-cream/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All prices in CAD.</p>
          <p>Concept store — launching for Christmas 2026</p>
        </div>
      </div>
    </footer>
  );
}
