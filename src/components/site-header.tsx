import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categories, formatINR, products } from "@/data/catalog";
import { useShop } from "@/context/shop";

const popular = ["Headphones", "Running shoes", "Titanium watch", "Mirrorless", "Wool coat"];

export function SiteHeader() {
  const { count, setCartOpen, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [menu, setMenu] = useState(false);
  const [light, setLight] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => (p.name + p.brand + p.category).toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  const go = (slug: string) => {
    setQuery("");
    setFocus(false);
    navigate({ to: "/product/$slug", params: { slug } });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border md:hidden"
          onClick={() => setMenu((v) => !v)}
          aria-label="Menu"
        >
          {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-black text-primary-foreground"
            style={{ background: "var(--gradient-brand)" }}
          >
            LX
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight sm:block">
            Luxora
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/shop"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Shop all
          </Link>
          <div className="group relative">
            <button className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
              Categories
            </button>
            <div className="invisible absolute left-0 top-full w-[520px] translate-y-2 rounded-2xl border border-border bg-popover p-4 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to="/shop"
                    search={{ category: c.name }}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {c.name}
                    <span className="badge-font text-xs text-muted-foreground">{c.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            to="/wishlist"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Wishlist
          </Link>
        </nav>

        <div className="relative ml-auto hidden max-w-md flex-1 lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => window.setTimeout(() => setFocus(false), 150)}
            placeholder="Search products, brands and categories"
            className="h-10 w-full rounded-xl border border-input bg-muted/50 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <AnimatePresence>
            {focus && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute left-0 right-0 top-12 rounded-2xl border border-border bg-popover p-2 shadow-2xl"
              >
                {suggestions.length > 0 ? (
                  suggestions.map((p) => (
                    <button
                      key={p.id}
                      onMouseDown={() => go(p.slug)}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                    >
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.brand}</span>
                      </span>
                      <span className="text-sm font-semibold">{formatINR(p.price)}</span>
                    </button>
                  ))
                ) : (
                  <div className="p-2">
                    <p className="badge-font mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                      Popular searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popular.map((t) => (
                        <button
                          key={t}
                          onMouseDown={() => setQuery(t)}
                          className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-primary"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <button
            type="button"
            onClick={() => setLight((v) => !v)}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {light ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:grid"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Heart className="h-4.5 w-4.5" />
            {wishlist.length > 0 && (
              <span className="badge-font absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {count > 0 && (
              <span className="badge-font absolute right-0.5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/account"
            aria-label="Account"
            className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <User className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="space-y-3 px-4 py-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Luxora"
                  className="h-11 w-full rounded-xl border border-input bg-muted/50 pl-9 pr-3 text-sm outline-none focus:border-primary"
                />
              </div>
              {suggestions.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setMenu(false);
                    go(p.slug);
                  }}
                  className="block w-full truncate rounded-lg bg-muted/50 p-2 text-left text-sm"
                >
                  {p.name}
                </button>
              ))}
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to="/shop"
                    search={{ category: c.name }}
                    onClick={() => setMenu(false)}
                    className="rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/shop"
                onClick={() => setMenu(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground"
              >
                Shop all products
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
