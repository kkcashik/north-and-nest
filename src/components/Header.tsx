"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";

export const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/bundles", label: "Bundles" },
  { href: "/trees", label: "Trees" },
  { href: "/shop?category=container", label: "Containers" },
  { href: "/care", label: "Care Guide" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, ready } = useCart();
  return (
    <header className="sticky top-0 z-40 print:hidden border-b border-jute/30 bg-cream/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-forest" onClick={() => setOpen(false)}>
          {siteConfig.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-charcoal/80 hover:text-forest">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/cart" aria-label={`Cart, ${ready ? count : 0} items`} className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-sage">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-forest" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M6 7h12l-1 12H7L6 7zM9 7a3 3 0 016 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {ready && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1 text-[11px] font-semibold text-cream">{count}</span>
            )}
          </Link>
          <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sage md:hidden">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-forest" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-jute/30 bg-cream md:hidden">
          <div className="container-page flex flex-col py-2">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="border-b border-jute/20 py-3 text-base text-forest last:border-0">{l.label}</Link>
            ))}
            <Link href="/catalogue" onClick={() => setOpen(false)} className="border-b border-jute/20 py-3 text-base text-forest">Catalogue</Link>
            <Link href="/build" onClick={() => setOpen(false)} className="py-3 text-base font-medium text-forest">Build your own set</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
