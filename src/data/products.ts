// ─────────────────────────────────────────────────────────────────────────────
// ALL product, bundle, tree, price and option data lives in this file.
// Concept photos — replace with real product photos before launch.
// (Drop new files in public/images/ with the same filenames, or edit the paths below.)
// To add a product: copy an entry, give it a unique `slug`, and it appears everywhere.
// Hard rule: NO wood — macramé cord hangers only (no shelves, rings, dowels or discs).
// ─────────────────────────────────────────────────────────────────────────────

export type Category = "hanger" | "container" | "tree" | "bundle";
export type LightLevel = "low" | "medium" | "bright";
export type HangerColourTag = "cream" | "rust" | "pink" | "purple" | "blue" | "red" | "yellow";

export interface ColourOption {
  label: string;
  tag: HangerColourTag;
  hex: string;
}
export interface SizeOption {
  label: string;
  price: number;
  note?: string;
}
export interface Product {
  slug: string;
  category: Exclude<Category, "bundle">;
  name: string;
  short: string;
  description: string;
  price: number; // starting / base price (CAD)
  images: string[];
  badge?: string;
  colours?: ColourOption[];
  sizes?: SizeOption[];
  // trees only
  botanical?: string;
  light?: LightLevel[];
  lightLabel?: string;
  difficulty?: string;
  height?: string;
  potSize?: string;
  winterNote?: string;
  pairs?: { hanger: string; container: string };
}
export interface Bundle {
  slug: string;
  name: string;
  short: string;
  price: number;
  separatePrice: number;
  images: string[];
  badge?: string;
  contents: string[];
  note?: string;
  /** product slugs linked from the contents list (when a real product exists) */
  links?: string[];
}

const C = {
  cream: { label: "Cream", tag: "cream", hex: "#EFE6D2" },
  rust: { label: "Rust", tag: "rust", hex: "#B5532F" },
  pink: { label: "Pink", tag: "pink", hex: "#E3A3B0" },
  purple: { label: "Purple", tag: "purple", hex: "#7C5A93" },
  blue: { label: "Blue", tag: "blue", hex: "#5B84A8" },
  red: { label: "Red", tag: "red", hex: "#B03030" },
  yellow: { label: "Yellow", tag: "yellow", hex: "#E0B83C" },
} satisfies Record<string, ColourOption>;

export const LIVE_PLANT_NOTE =
  "Live plants ship within Ontario only, with a heat pack in an insulated box. GTA pickup available.";

export const hangers: Product[] = [
  {
    slug: "classic-single-hanger",
    category: "hanger",
    name: "Classic Single Hanger",
    short: "Spiral-knot macramé, loop top, tassel bottom.",
    description:
      "Our everyday hanger: a handmade spiral-knot single in soft cotton cord with a sturdy loop top and a full tassel. Cord only — no wood, no rings. Choose from seven colours.",
    price: 24.99,
    images: ["/images/classic-single-rubber-plant.jpg", "/images/rust-single-pothos.jpg"],
    colours: [C.cream, C.rust, C.pink, C.purple, C.blue, C.red, C.yellow],
  },
  {
    slug: "diamond-single-hanger",
    category: "hanger",
    name: "Diamond Single Hanger",
    short: "Diamond knotwork, hard to find.",
    description:
      "A single hanger worked in a diamond knot pattern that frames the pot beautifully. Handmade, cord only, and hard to find in Canada.",
    price: 29.99,
    images: ["/images/norfolk-pine-classic-hanger.jpg"],
    badge: "Hard to find",
    colours: [C.cream],
  },
  {
    slug: "owl-hanger",
    category: "hanger",
    name: "Owl Hanger",
    short: "A knotted owl holding one pot.",
    description:
      "A playful owl design that cradles a single pot. A lovely gift for a plant lover. Handmade macramé cord only.",
    price: 39.99,
    images: [],
    badge: "Gift pick",
    colours: [
      { label: "Cream / White", tag: "cream", hex: "#F2ECDD" },
      { label: "Pink / Brown", tag: "pink", hex: "#C99090" },
    ],
  },
  {
    slug: "pod-hanger",
    category: "hanger",
    name: "Pod Hanger",
    short: "Small pouch-shaped single — smallest and lightest.",
    description:
      "A small pouch-shaped single in diamond knotwork. The smallest and lightest hanger we make, made for mini pots and little trees.",
    price: 19.99,
    images: [],
    badge: "Small pot",
    colours: [
      { label: "Cream-Mustard", tag: "yellow", hex: "#D9B85A" },
      { label: "Cream-Red", tag: "red", hex: "#B03030" },
    ],
  },
  {
    slug: "thick-cord-single-hanger",
    category: "hanger",
    name: "Thick-Cord Single Hanger",
    short: "Heavier weave for a medium or large pot.",
    description:
      "A heavier, thicker-cord weave built to carry a medium or large pot with confidence. Handmade, cord only.",
    price: 34.99,
    images: ["/images/thick-cord-dracaena.jpg"],
    badge: "Holds bigger pots",
    colours: [C.cream],
  },
];

export const containers: Product[] = [
  {
    slug: "nested-seagrass-basket-set",
    category: "container",
    name: "Nested Seagrass Basket Set",
    short: "Three woven seagrass baskets that nest together.",
    description:
      "A set of three woven seagrass baskets in natural colour: 20×20×20 cm, 21×21×21 cm and 23×23×24 cm. Buy the set, or any size on its own.",
    price: 16.99,
    images: [],
    sizes: [
      { label: "Set of 3", price: 44.99, note: "20×20×20, 21×21×21 and 23×23×24 cm" },
      { label: "Small", price: 16.99, note: "20×20×20 cm" },
      { label: "Medium", price: 19.99, note: "21×21×21 cm" },
      { label: "Large", price: 24.99, note: "23×23×24 cm" },
    ],
  },
  {
    slug: "woven-jute-pot",
    category: "container",
    name: "Woven Jute Pot",
    short: "Natural woven jute, in three sizes.",
    description:
      "A hand-woven jute pot in a warm natural tone. It slips straight into a macramé hanger or stands on its own. More container styles are coming.",
    price: 14.99,
    images: [],
    sizes: [
      { label: "Small", price: 14.99 },
      { label: "Medium", price: 18.99 },
      { label: "Large", price: 22.99, note: "Floor-standing option" },
    ],
  },
];

export const trees: Product[] = [
  {
    slug: "norfolk-island-pine",
    category: "tree",
    name: "Norfolk Island Pine",
    botanical: "Araucaria heterophylla",
    short: "The living Christmas tree.",
    description:
      "A soft-needled evergreen that looks like a tiny Christmas tree and stays green all winter. Arrives small, in a 6\" pot, ready to hang or decorate with fairy lights.",
    price: 34.99,
    images: ["/images/norfolk-pine-classic-hanger.jpg"],
    badge: "Christmas hero",
    light: ["low", "medium"],
    lightLabel: "Low–medium light",
    difficulty: "Easy",
    height: "5–8 ft indoors",
    potSize: "Small, in 6\" pot",
    winterNote: "The living Christmas tree — evergreen, soft needles, happy in low winter light.",
    pairs: { hanger: "pod-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "money-tree",
    category: "tree",
    name: "Money Tree",
    botanical: "Pachira aquatica",
    short: "Braided trunk, a classic gift.",
    description: "A braided-trunk tree with bright palm-like leaves. Easy, forgiving and a popular gift.",
    price: 29.99,
    images: [],
    badge: "Gift pick",
    light: ["low", "medium"],
    lightLabel: "Low–medium light",
    difficulty: "Easy",
    height: "6–8 ft",
    winterNote: "Braided trunk; tolerates short days and dry air.",
    pairs: { hanger: "diamond-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "dracaena-marginata",
    category: "tree",
    name: "Dracaena Marginata (Dragon Tree)",
    botanical: "Dracaena marginata",
    short: "Spiky, sculptural and nearly unkillable.",
    description: "Slender stems topped with spiky red-edged leaves. One of the toughest houseplants you can buy.",
    price: 27.99,
    images: ["/images/thick-cord-dracaena.jpg"],
    light: ["low"],
    lightLabel: "Low light",
    difficulty: "Very easy",
    height: "To 6 ft",
    winterNote: "Nearly unkillable; water less in winter.",
    pairs: { hanger: "thick-cord-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "rubber-plant",
    category: "tree",
    name: "Rubber Plant",
    botanical: "Ficus elastica",
    short: "Big glossy leaves, bold look.",
    description: "Deep green, glossy leaves on a strong upright stem. A statement plant that grows with you.",
    price: 24.99,
    images: ["/images/classic-single-rubber-plant.jpg"],
    light: ["low", "medium"],
    lightLabel: "Low–medium light",
    difficulty: "Easy",
    height: "To 10 ft",
    winterNote: "Glossy leaves; keep away from cold drafts.",
    pairs: { hanger: "classic-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "corn-plant",
    category: "tree",
    name: "Corn Plant",
    botanical: "Dracaena fragrans",
    short: "Lush, tropical and easy-going.",
    description: "Broad arching leaves on a thick cane. Thrives in ordinary home conditions with very little fuss.",
    price: 26.99,
    images: [],
    light: ["low"],
    lightLabel: "Low light",
    difficulty: "Very easy",
    height: "4–6 ft",
    winterNote: "Thrives on neglect; cut watering in winter.",
    pairs: { hanger: "thick-cord-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "umbrella-tree",
    category: "tree",
    name: "Umbrella Tree",
    botanical: "Schefflera actinophylla",
    short: "Glossy leaves in an umbrella shape.",
    description: "Fan-like clusters of glossy leaves give this tree a full, cheerful shape.",
    price: 28.99,
    images: [],
    light: ["low"],
    lightLabel: "Low light",
    difficulty: "Easy",
    height: "4–6 ft",
    winterNote: "Needs only ~4 hours of dim light.",
    pairs: { hanger: "thick-cord-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "kentia-palm",
    category: "tree",
    name: "Kentia Palm",
    botanical: "Howea forsteriana",
    short: "The elegant, slow-growing palm.",
    description: "Graceful arching fronds and a calm, upright shape. Slow growing, so it stays in scale for years.",
    price: 39.99,
    images: [],
    light: ["low"],
    lightLabel: "Low light",
    difficulty: "Easy",
    height: "Slow, to 7 ft",
    winterNote: "Elegant and slow-growing; dry-air tolerant.",
    pairs: { hanger: "thick-cord-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "parlor-palm",
    category: "tree",
    name: "Parlor Palm",
    botanical: "Chamaedorea elegans",
    short: "Classic low-light palm for small spaces.",
    description: "A compact, feathery palm that suits shelves, desks and small rooms.",
    price: 22.99,
    images: [],
    light: ["low"],
    lightLabel: "Low light",
    difficulty: "Easy",
    height: "3–4 ft",
    winterNote: "Classic low-light palm for small spaces.",
    pairs: { hanger: "classic-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "monstera-deliciosa",
    category: "tree",
    name: "Monstera Deliciosa",
    botanical: "Monstera deliciosa",
    short: "Big split leaves, big personality.",
    description: "Famous for its large, split leaves. Gives a lot of look for the money.",
    price: 32.99,
    images: [],
    light: ["medium"],
    lightLabel: "Medium light",
    difficulty: "Easy",
    height: "4–6 ft",
    winterNote: "Give it your brightest indirect spot.",
    pairs: { hanger: "owl-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "fiddle-leaf-fig",
    category: "tree",
    name: "Fiddle-Leaf Fig",
    botanical: "Ficus lyrata",
    short: "The designer favourite — needs a bright window.",
    description: "Large, violin-shaped leaves on a sculptural stem. Beautiful, but it needs real light.",
    price: 44.99,
    images: [],
    badge: "Bright window needed",
    light: ["bright"],
    lightLabel: "Bright light",
    difficulty: "Moderate",
    height: "To 8 ft",
    winterNote:
      "Needs a bright south or west window in a Canadian winter — do not buy for a dark room.",
    pairs: { hanger: "thick-cord-single-hanger", container: "woven-jute-pot" },
  },
  {
    slug: "olive-tree",
    category: "tree",
    name: "Olive Tree",
    botanical: "Olea europaea",
    short: "Silvery leaves, Mediterranean calm.",
    description: "Soft silver-green foliage on a slender trunk. A premium pick for a sunny spot.",
    price: 49.99,
    images: [],
    badge: "Premium",
    light: ["bright"],
    lightLabel: "Bright light",
    difficulty: "Moderate",
    height: "To 6 ft",
    winterNote: "Brightest spot in the house; cool rooms suit it.",
    pairs: { hanger: "thick-cord-single-hanger", container: "woven-jute-pot" },
  },
];

export const bundles: Bundle[] = [
  {
    slug: "starter-bundle",
    name: "Starter Bundle",
    short: "A small plant, a hanger and a jute pot.",
    price: 49.99,
    separatePrice: 59,
    images: ["/images/rust-single-pothos.jpg"],
    contents: [
      "Small tree (pothos or succulent)",
      "Classic Single Hanger",
      "Small Jute Pot",
    ],
    links: ["classic-single-hanger", "woven-jute-pot"],
  },
  {
    slug: "signature-bundle",
    name: "Signature Bundle",
    short: "Medium plant, diamond hanger, medium jute pot.",
    price: 69.99,
    separatePrice: 79,
    images: [],
    contents: [
      "Medium tree (pothos or silver satin pothos)",
      "Diamond Single Hanger",
      "Medium Jute Pot",
    ],
    links: ["diamond-single-hanger", "woven-jute-pot"],
  },
  {
    slug: "tree-bundle",
    name: "Tree Bundle",
    short: "A large tree, a thick-cord hanger and a large pot.",
    price: 99.99,
    separatePrice: 119,
    images: ["/images/thick-cord-dracaena.jpg"],
    contents: [
      "Large tree (snake plant or rubber plant)",
      "Thick-Cord Single Hanger",
      "Large Jute Pot (floor-standing)",
    ],
    links: ["rubber-plant", "thick-cord-single-hanger", "woven-jute-pot"],
  },
  {
    slug: "christmas-norfolk-set",
    name: "Christmas Norfolk Set",
    short: "Our living Christmas tree, ready to hang.",
    price: 89.99,
    separatePrice: 104,
    images: ["/images/norfolk-pine-classic-hanger.jpg"],
    badge: "Holiday limited",
    contents: [
      "Norfolk Island Pine",
      "Pod Hanger (mini)",
      "Medium Jute Pot",
      "Fairy-light styling note",
    ],
    note: "Includes a short styling note for wrapping your tree in fairy lights.",
    links: ["norfolk-island-pine", "pod-hanger", "woven-jute-pot"],
  },
];

export const allProducts: Product[] = [...hangers, ...containers, ...trees];

export const hangerColourFilters: { label: string; tag: HangerColourTag }[] = [
  { label: "Cream", tag: "cream" },
  { label: "Rust", tag: "rust" },
  { label: "Pink", tag: "pink" },
  { label: "Purple", tag: "purple" },
  { label: "Blue", tag: "blue" },
  { label: "Red", tag: "red" },
  { label: "Yellow", tag: "yellow" },
];
export const lightFilters: { label: string; value: LightLevel }[] = [
  { label: "Low light", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "Bright", value: "bright" },
];
