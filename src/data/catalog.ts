import headphones from "@/assets/product-headphones.jpg";
import sneakers from "@/assets/product-sneakers.jpg";
import watch from "@/assets/product-watch.jpg";
import laptop from "@/assets/product-laptop.jpg";
import jacket from "@/assets/product-jacket.jpg";
import camera from "@/assets/product-camera.jpg";
import speaker from "@/assets/product-speaker.jpg";
import bag from "@/assets/product-bag.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  tags: ("trending" | "deal" | "bestseller" | "recommended" | "flash")[];
  colors: string[];
  highlights: string[];
  description: string;
  stock: number;
};

const img = {
  headphones,
  sneakers,
  watch,
  laptop,
  jacket,
  camera,
  speaker,
  bag,
};

export const categories = [
  { name: "Audio", icon: "Headphones", count: 128 },
  { name: "Footwear", icon: "Footprints", count: 214 },
  { name: "Wearables", icon: "Watch", count: 96 },
  { name: "Computers", icon: "Laptop", count: 143 },
  { name: "Fashion", icon: "Shirt", count: 380 },
  { name: "Cameras", icon: "Camera", count: 64 },
  { name: "Accessories", icon: "Backpack", count: 172 },
  { name: "Smart Home", icon: "Lamp", count: 88 },
];

export const brands = [
  "Northwave",
  "Aurelia",
  "Kinetic",
  "Vantra",
  "Lumen",
  "Orbit Labs",
];

const base: Omit<Product, "id" | "slug">[] = [
  {
    name: "Aurora Pro ANC Headphones",
    brand: "Northwave",
    category: "Audio",
    price: 18999,
    mrp: 26999,
    rating: 4.8,
    reviews: 2841,
    image: img.headphones,
    tags: ["trending", "bestseller", "flash"],
    colors: ["#09090B", "#94A3B8", "#2563EB"],
    highlights: [
      "Adaptive hybrid noise cancellation",
      "48h battery with fast charge",
      "Spatial audio with head tracking",
      "Titanium-coated 40mm drivers",
    ],
    description:
      "Studio-grade sound engineered for daily life. Aurora Pro blends adaptive noise cancellation with a signature warm low end and a featherweight memory-foam fit.",
    stock: 24,
  },
  {
    name: "Kinetic Drift Runner",
    brand: "Kinetic",
    category: "Footwear",
    price: 7499,
    mrp: 11999,
    rating: 4.6,
    reviews: 1620,
    image: img.sneakers,
    tags: ["trending", "deal"],
    colors: ["#FFFFFF", "#2563EB", "#EF4444"],
    highlights: [
      "Nitrogen-infused foam midsole",
      "Recycled knit upper",
      "Carbon propulsion plate",
      "Weighs just 218g",
    ],
    description:
      "Built for tempo days and long city miles. The Drift Runner returns energy with every step while staying breathable through the last kilometre.",
    stock: 41,
  },
  {
    name: "Vantra Chrono Titanium",
    brand: "Vantra",
    category: "Wearables",
    price: 24999,
    mrp: 32999,
    rating: 4.7,
    reviews: 934,
    image: img.watch,
    tags: ["bestseller", "recommended"],
    colors: ["#18181B", "#94A3B8"],
    highlights: [
      "Grade-5 titanium case",
      "Always-on sapphire display",
      "Dual-band GPS",
      "7-day battery life",
    ],
    description:
      "A precision instrument for training and travel, wrapped in aerospace titanium with a sapphire crystal face that shrugs off scratches.",
    stock: 12,
  },
  {
    name: "Lumen Studio 14 Laptop",
    brand: "Lumen",
    category: "Computers",
    price: 118999,
    mrp: 139999,
    rating: 4.9,
    reviews: 512,
    image: img.laptop,
    tags: ["bestseller", "recommended", "flash"],
    colors: ["#18181B", "#94A3B8"],
    highlights: [
      "14-core CPU / 20-core GPU",
      "3K 120Hz mini-LED display",
      "22-hour battery",
      "32GB unified memory",
    ],
    description:
      "A creator laptop that renders, compiles and colour-grades without ever spinning a fan. Silence, meet speed.",
    stock: 8,
  },
  {
    name: "Aurelia Tailored Wool Coat",
    brand: "Aurelia",
    category: "Fashion",
    price: 12499,
    mrp: 19999,
    rating: 4.5,
    reviews: 388,
    image: img.jacket,
    tags: ["deal", "trending"],
    colors: ["#09090B", "#94A3B8", "#7C3AED"],
    highlights: [
      "Italian merino wool blend",
      "Fully lined, structured shoulder",
      "Water-repellent finish",
      "Made in limited runs",
    ],
    description:
      "A sharp silhouette in soft Italian wool. Cut once, finished by hand, and made to outlast the season it was bought in.",
    stock: 30,
  },
  {
    name: "Orbit M2 Mirrorless Camera",
    brand: "Orbit Labs",
    category: "Cameras",
    price: 89999,
    mrp: 109999,
    rating: 4.8,
    reviews: 276,
    image: img.camera,
    tags: ["recommended", "flash"],
    colors: ["#09090B"],
    highlights: [
      "42MP stacked full-frame sensor",
      "8K 30p internal recording",
      "8-stop in-body stabilisation",
      "Weather-sealed magnesium body",
    ],
    description:
      "Stills and cinema in one body. The M2 tracks eyes through chaos and keeps highlights intact when the light does not cooperate.",
    stock: 6,
  },
  {
    name: "Northwave Pulse 360 Speaker",
    brand: "Northwave",
    category: "Audio",
    price: 9499,
    mrp: 14999,
    rating: 4.4,
    reviews: 1104,
    image: img.speaker,
    tags: ["deal", "trending"],
    colors: ["#18181B", "#22C55E"],
    highlights: [
      "360° room-filling sound",
      "IP67 dust and water resistant",
      "24h playtime",
      "Stereo pairing",
    ],
    description:
      "One speaker, every direction. Pulse 360 tunes itself to the room so the back of the kitchen sounds like the front row.",
    stock: 55,
  },
  {
    name: "Aurelia Everyday Leather Tote",
    brand: "Aurelia",
    category: "Accessories",
    price: 6999,
    mrp: 10999,
    rating: 4.6,
    reviews: 742,
    image: img.bag,
    tags: ["bestseller", "recommended"],
    colors: ["#18181B", "#94A3B8", "#F59E0B"],
    highlights: [
      "Full-grain vegetable-tanned leather",
      "Fits a 16\" laptop",
      "Suede-lined tech pocket",
      "Ages into a patina",
    ],
    description:
      "The one bag that works from the 9am stand-up to the 9pm flight. Structured enough for work, soft enough for weekends.",
    stock: 37,
  },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// A realistic catalogue: variants generated from curated base products.
export const products: Product[] = base.flatMap((p, i) =>
  [0, 1, 2].map((v) => {
    const name = v === 0 ? p.name : `${p.name} ${["", "Max", "Lite"][v] ?? ""}`.trim();
    const mult = [1, 1.22, 0.72][v] ?? 1;
    return {
      ...p,
      id: `p-${i}-${v}`,
      slug: slugify(name),
      name,
      price: Math.round((p.price * mult) / 10) * 10,
      mrp: Math.round((p.mrp * mult) / 10) * 10,
      rating: Math.min(5, Number((p.rating - v * 0.15).toFixed(1))),
      reviews: Math.max(48, Math.round(p.reviews / (v + 1))),
      stock: Math.max(3, p.stock - v * 7),
      tags: v === 0 ? p.tags : v === 1 ? ["recommended"] : ["deal"],
    } as Product;
  }),
);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const byTag = (tag: Product["tags"][number], limit = 4) =>
  products.filter((p) => p.tags.includes(tag)).slice(0, limit);

export const discount = (p: Product) =>
  Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const reviewsFeed = [
  {
    name: "Ananya Rao",
    city: "Bengaluru",
    text: "Delivery in 19 hours, packaging was immaculate, and the coat fits exactly like the size guide promised.",
    rating: 5,
  },
  {
    name: "Marcus Bell",
    city: "London",
    text: "I compared four stores before buying the M2 here. Best price, and the returns policy is actually readable.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    city: "Kochi",
    text: "The product pages are the most honest I have seen — real specs, real reviews, no fake countdown timers.",
    rating: 4,
  },
];
