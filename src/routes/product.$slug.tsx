import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/section";
import { ProductGrid } from "@/components/product-card";
import { useShop } from "@/context/shop";
import { discount, formatINR, getProduct, products } from "@/data/catalog";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Luxora" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.brand} | Luxora`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, toggleWish, wishlist, markViewed, setCartOpen } = useShop();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const off = discount(product);
  const wished = wishlist.includes(product.id);

  useEffect(() => {
    markViewed(product.id);
    setQty(1);
    setActive(0);
  }, [product.id, markViewed]);

  const gallery = [product.image, product.image, product.image, product.image];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Section className="pt-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="relative overflow-hidden rounded-2xl border border-border bg-surface"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
              });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <img
              src={gallery[active]}
              alt={product.name}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover transition-transform duration-300"
              style={
                zoom
                  ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
            {off > 0 && (
              <span className="badge-font absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
                {off}% OFF
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`overflow-hidden rounded-xl border transition-colors ${
                  active === i ? "border-primary" : "border-border hover:border-primary/60"
                }`}
              >
                <img src={g} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="badge-font text-[11px] uppercase tracking-[0.2em] text-primary">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 rounded-md bg-success/15 px-2 py-1 font-semibold text-success">
              <Star className="h-3.5 w-3.5 fill-current" /> {product.rating}
            </span>
            <span className="text-muted-foreground">
              {product.reviews.toLocaleString("en-IN")} verified ratings
            </span>
            <span className={product.stock < 10 ? "text-warning" : "text-muted-foreground"}>
              {product.stock < 10 ? `Only ${product.stock} left` : "In stock"}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-extrabold">{formatINR(product.price)}</span>
            <span className="text-lg text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
            <span className="badge-font rounded-md bg-success/15 px-2 py-1 text-sm font-semibold text-success">
              Save {formatINR(product.mrp - product.price)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Inclusive of all taxes · EMI from {formatINR(Math.round(product.price / 12))}/mo
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["LUX10 · 10% off", "ICICI · 5% cashback", "No-cost EMI"].map((c) => (
              <span
                key={c}
                className="badge-font rounded-lg border border-dashed border-primary/50 px-3 py-1.5 text-xs text-primary"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Colour</p>
            <div className="flex gap-2">
              {product.colors.map((c: string) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border-2 border-border"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-border">
              <button
                aria-label="Decrease"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-11 place-items-center hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="badge-font w-9 text-center font-semibold">{qty}</span>
              <button
                aria-label="Increase"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="grid h-12 w-11 place-items-center hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => add(product.id, qty)}
              className="h-12 flex-1 rounded-xl border border-border text-sm font-semibold transition-colors hover:border-primary hover:bg-primary/10"
            >
              Add to bag
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                add(product.id, qty);
                setCartOpen(true);
              }}
              className="h-12 flex-1 rounded-xl text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              Buy now
            </motion.button>
            <button
              aria-label="Wishlist"
              onClick={() => toggleWish(product.id)}
              className="grid h-12 w-12 place-items-center rounded-xl border border-border hover:border-primary"
            >
              <Heart
                className={`h-5 w-5 ${wished ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
              />
            </button>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {[
              { icon: Truck, t: "Free delivery" },
              { icon: RotateCcw, t: "30-day returns" },
              { icon: ShieldCheck, t: "2-year warranty" },
            ].map(({ icon: Icon, t }) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate">{t}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-bold">Highlights</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {product.highlights.map((h: string) => (
                  <li key={h} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-bold">About this product</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-bold">Specifications</h2>
              <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border text-sm">
                {[
                  ["Brand", product.brand],
                  ["Category", product.category],
                  ["In stock", `${product.stock} units`],
                  ["Rating", `${product.rating} / 5`],
                  ["Warranty", "24 months"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 gap-2 bg-card px-4 py-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Customer reviews" title="What buyers report" />
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["Sanjay M.", "Exactly as described. Shipping was quicker than the estimate."],
            ["Elena V.", "Build quality punches well above the price. Would buy again."],
            ["Tanvi S.", "Support replaced a faulty unit in three days, no arguments."],
          ].map(([n, t], i) => (
            <Reveal key={n} delay={i * 0.06}>
              <figure className="surface-card h-full p-5">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm text-muted-foreground">{t}</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">{n}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeading eyebrow="You may also like" title="Related products" />
          <ProductGrid items={related} />
        </div>
      )}
    </Section>
  );
}
