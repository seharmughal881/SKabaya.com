/* ============================================================
   SK Abaya — Content & Catalogue data
   Imagery uses Unsplash editorial photography; every visual
   sits on a luxury gradient so the layout holds even offline.
   ============================================================ */

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export const collections: Collection[] = [
  {
    slug: "luxury-abayas",
    name: "Luxury Abayas",
    tagline: "Pure Nida, draped to perfection",
    image: img("1490481651871-ab68de25d43d"),
  },
  {
    slug: "signature",
    name: "Signature Collection",
    tagline: "The house codes, in gold thread",
    image: img("1539109136881-3be0616acf4b"),
  },
  {
    slug: "eid",
    name: "Eid Collection",
    tagline: "Celebration, woven in light",
    image: img("1583391733956-6c78276477e2"),
  },
  {
    slug: "bridal",
    name: "Bridal Abayas",
    tagline: "An entrance to remember",
    image: img("1515372039744-b8f02a3ae446"),
  },
  {
    slug: "everyday",
    name: "Everyday Elegance",
    tagline: "Effortless from dawn to dusk",
    image: img("1487222477894-8943e31ef7b2"),
  },
  {
    slug: "limited-edition",
    name: "Limited Edition",
    tagline: "Numbered. Never repeated.",
    image: img("1469334031218-e382a71b716b"),
  },
];

export type Product = {
  id: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  description?: string;
  fabric?: string;
};

/** Sizes offered on every product (length, shoulder-to-hem). */
export const productSizes = ["52\"", "54\"", "56\"", "58\"", "Custom"] as const;

export const bestSellers: Product[] = [
  {
    id: "noor-classic",
    name: "Noor Classic Black",
    collection: "Signature Collection",
    price: 420,
    currency: "USD",
    rating: 5,
    reviews: 214,
    badge: "Best Seller",
    image: img("1539008835657-9e8e9680c956", 900),
    fabric: "Premium Japanese Nida",
    description:
      "The piece that defines the house — a fluid, floor-skimming silhouette in matte black Nida, finished with a discreet gold-tipped placket. Quietly perfect for every occasion.",
  },
  {
    id: "layla-gold",
    name: "Layla Gold Embroidery",
    collection: "Luxury Abayas",
    price: 680,
    currency: "USD",
    rating: 5,
    reviews: 168,
    badge: "Handcrafted",
    image: img("1503342217505-b0a15ec3261c", 900),
    fabric: "Premium Nida with real gold thread",
    description:
      "Hand-embroidered cuffs in 24k-tone gold thread trace the wrist and hem. Each Layla takes an artisan three days to finish — a wearable heirloom.",
  },
  {
    id: "dana-pearl",
    name: "Dana Pearl Bridal",
    collection: "Bridal Abayas",
    price: 1240,
    currency: "USD",
    rating: 5,
    reviews: 92,
    badge: "Limited",
    image: img("1469334031218-e382a71b716b", 900),
    fabric: "Silk-blend crepe with pearl detailing",
    description:
      "Hand-set pearls cascade across an ivory-lined train. Designed for the bride who wants modesty and majesty in a single, unforgettable entrance.",
  },
  {
    id: "rim-eid",
    name: "Rim Eid Edition",
    collection: "Eid Collection",
    price: 560,
    currency: "USD",
    rating: 4,
    reviews: 137,
    image: img("1485968579580-b6d095142e6e", 900),
    fabric: "Premium Nida with satin trim",
    description:
      "Celebration, woven in light. Soft satin panelling catches the evening glow — made for the nights that matter most.",
  },
  {
    id: "huda-everyday",
    name: "Huda Everyday Drape",
    collection: "Everyday Elegance",
    price: 320,
    currency: "USD",
    rating: 5,
    reviews: 248,
    badge: "New",
    image: img("1487222477894-8943e31ef7b2", 900),
    fabric: "Breathable lightweight Nida",
    description:
      "Effortless from dawn to dusk. A relaxed, breathable drape that moves with you — the everyday luxury you will reach for first.",
  },
  {
    id: "yasmin-signature",
    name: "Yasmin Signature Satin",
    collection: "Signature Collection",
    price: 740,
    currency: "USD",
    rating: 5,
    reviews: 121,
    image: img("1490481651871-ab68de25d43d", 900),
    fabric: "Liquid satin Nida",
    description:
      "A column of liquid satin that catches the light with every step. House codes, reimagined for the modern woman.",
  },
  {
    id: "amira-limited",
    name: "Amira Limited Edition",
    collection: "Limited Edition",
    price: 980,
    currency: "USD",
    rating: 5,
    reviews: 64,
    badge: "Limited",
    image: img("1539109136881-3be0616acf4b", 900),
    fabric: "Couture-weight Nida",
    description:
      "Numbered and never repeated. An architectural cut released in a single, limited run for the collector of fine modest fashion.",
  },
  {
    id: "sana-bridal",
    name: "Sana Bridal Couture",
    collection: "Bridal Abayas",
    price: 1480,
    currency: "USD",
    rating: 5,
    reviews: 73,
    badge: "Bestseller",
    image: img("1515372039744-b8f02a3ae446", 900),
    fabric: "Embroidered silk organza",
    description:
      "Our most celebrated bridal piece — layers of embroidered organza over a fluid base, hand-finished for the most important day of all.",
  },
];

export type Pillar = {
  title: string;
  description: string;
  icon: string;
};

export const pillars: Pillar[] = [
  {
    title: "Premium Nida Fabrics",
    description:
      "Sourced from the finest mills, our signature Nida falls like liquid and breathes like silk.",
    icon: "M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-18 5l9 4 9-4",
  },
  {
    title: "Handcrafted Embroidery",
    description:
      "Each motif is set by hand in real gold thread by master artisans — a craft passed through generations.",
    icon: "M12 3v18M5 8c3 0 4 4 7 4s4-4 7-4M5 16c3 0 4-4 7-4s4 4 7 4",
  },
  {
    title: "Luxury Finishing",
    description:
      "French seams, weighted hems, and silk linings — the details you feel before you ever see them.",
    icon: "M5 13l4 4L19 7",
  },
  {
    title: "Worldwide Shipping",
    description:
      "White-glove delivery to your door across the GCC, Pakistan, the UK, and beyond.",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20",
  },
  {
    title: "Exclusive Designs",
    description:
      "Silhouettes you will not find elsewhere — conceived in-house, released in limited numbers.",
    icon: "M12 2l2.4 7.2H22l-6 4.4 2.3 7.4L12 16.8 5.7 21l2.3-7.4-6-4.4h7.6z",
  },
  {
    title: "Custom Tailoring",
    description:
      "Made-to-measure by appointment, so every abaya is cut to you and you alone.",
    icon: "M6 3l6 6 6-6M4 21l8-8m0 0l8 8M14 9a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The moment I unwrapped it, I understood the difference. The weight, the drape, the gold — this is couture, simply modest.",
    name: "Aisha Al-Fahim",
    location: "Dubai, UAE",
  },
  {
    quote:
      "I wore my SK Abaya to my sister's wedding and three women asked where it was from before the night was over.",
    name: "Fatima Khan",
    location: "Lahore, Pakistan",
  },
  {
    quote:
      "Nothing I own makes me feel as elegant. It is modesty without compromise, and luxury without apology.",
    name: "Noura Al-Saud",
    location: "Riyadh, KSA",
  },
  {
    quote:
      "From the packaging to the tailoring, every detail whispers quality. This is the Chanel of abayas.",
    name: "Sarah Ahmed",
    location: "London, UK",
  },
];

export const instagram: string[] = [
  img("1485968579580-b6d095142e6e", 600),
  img("1490481651871-ab68de25d43d", 600),
  img("1539109136881-3be0616acf4b", 600),
  img("1515372039744-b8f02a3ae446", 600),
  img("1503342217505-b0a15ec3261c", 600),
  img("1469334031218-e382a71b716b", 600),
];

export const navLinks = [
  { label: "Collections", href: "/#collections" },
  { label: "Best Sellers", href: "/#best-sellers" },
  { label: "The House", href: "/#experience" },
  { label: "Track Order", href: "/order" },
  { label: "Contact", href: "/#newsletter" },
];

export const currencies = ["USD", "AED", "SAR", "PKR", "GBP"] as const;
export const languages = ["EN", "عربي"] as const;
