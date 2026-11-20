import { allProducts, bundles, type Bundle, type Product } from "@/data/products";

export const getProduct = (slug: string): Product | undefined => allProducts.find((p) => p.slug === slug);
export const getBundle = (slug: string): Bundle | undefined => bundles.find((b) => b.slug === slug);
export const getItem = (slug: string) => getProduct(slug) ?? getBundle(slug);
/** Price a product starts from (lowest size option, if it has sizes). */
export const fromPrice = (p: Product) => (p.sizes ? Math.min(...p.sizes.map((s) => s.price)) : p.price);
