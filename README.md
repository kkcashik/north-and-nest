# Winter Trees concept store

Concept e-commerce site (Next.js App Router + TypeScript + Tailwind) for macramé hangers, woven jute containers and live winter trees. Prices in CAD. No backend, no database, no real payments — checkout is a reservation form.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
Deploys to Vercel or Netlify with zero config.

## Where things live
- **Products, bundles, trees, prices, options:** `src/data/products.ts` — the only place prices are defined. To add a product, copy an entry and give it a unique `slug`.
- **Store name, tagline, ship dates:** `src/config/site.ts` — change `name` (currently "North & Nest") and it updates the header, footer, page titles and checkout.
- **Cart:** `src/context/CartContext.tsx` (client-side, saved in the browser).
- **Builder discount (10%):** `src/lib/money.ts`.

## Product catalogue
Visit `/catalogue` for a printable catalogue built from `src/data/products.ts`. Click **Print / save as PDF** to export it.

## Replace the concept photos
Photos are in `public/images/`. Replace a file with the same name, or edit the `images` paths in `src/data/products.ts`. Any product without a photo shows a clean placeholder block (no broken images). All current photos are AI concept mockups. Shoot your own samples and swap them in before listing anything.

## Rules baked in
No wood in any hanger. Live plants ship within Ontario only. No supplier names on the public site.
