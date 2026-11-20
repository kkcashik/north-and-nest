import type { Bundle, ColourOption, Product, SizeOption } from "@/data/products";
import { toCents } from "./money";
import type { CartLine } from "@/context/CartContext";

export function lineForProduct(p: Product, opts: { size?: SizeOption; colour?: ColourOption } = {}): Omit<CartLine, "qty"> {
  const size = opts.size ?? (p.sizes && p.sizes.length === 1 ? p.sizes[0] : p.sizes ? p.sizes[0] : undefined);
  const colour = opts.colour ?? p.colours?.[0];
  const cents = toCents(size?.price ?? p.price);
  const variant = [size?.label, colour?.label].filter(Boolean).join(" · ") || undefined;
  return {
    id: [p.slug, size?.label, colour?.label].filter(Boolean).join("|"),
    slug: p.slug,
    name: p.name,
    variant,
    image: p.images[0],
    unitCents: cents,
    regularCents: cents,
    live: p.category === "tree",
  };
}

export function lineForBundle(b: Bundle): Omit<CartLine, "qty"> {
  return {
    id: `bundle|${b.slug}`,
    name: b.name,
    details: b.contents,
    image: b.images[0],
    unitCents: toCents(b.price),
    regularCents: toCents(b.separatePrice),
    live: true,
  };
}
