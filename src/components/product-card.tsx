import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { discount, formatINR, type Product } from "@/data/catalog";
import { useShop } from "@/context/shop";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, toggleWish, wishlist, setCartOpen } = useShop();
  const wished = wishlist.includes(product.id);
  const off = discount(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="surface-card hover-lift group relative flex flex-col overflow-hidden p-3"
    >
      <div className="relative overflow-hidden rounded-xl bg-surface">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        {off > 0 && (
          <span className="badge-font absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-semibold text-destructive-foreground">
            {off}% OFF
          </span>
        )}

        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWish(product.id)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wished ? "fill-destructive text-destructive" : "text-muted-foreground",
            )}
          />
        </button>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background/85 text-xs font-medium backdrop-blur transition-colors hover:border-primary"
          >
            Quick view
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="badge-font text-[11px] uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-success/15 px-1.5 py-0.5 text-[11px] font-semibold text-success">
            <Star className="h-3 w-3 fill-current" />
            {product.rating}
          </span>
        </div>

        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-2">
          <span className="text-lg font-bold">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">
            {formatINR(product.mrp)}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => add(product.id)}
            className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border text-xs font-medium transition-colors hover:border-primary hover:bg-primary/10"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
          <button
            type="button"
            onClick={() => {
              add(product.id);
              setCartOpen(true);
            }}
            className="flex h-10 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "var(--gradient-brand)" }}
          >
            <Zap className="h-3.5 w-3.5" /> Buy now
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
