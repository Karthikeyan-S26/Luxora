import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, Star } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { Section } from "@/components/section";
import { brands, categories, products } from "@/data/catalog";

type ShopSearch = { category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch =>
    typeof search["category"] === "string" ? { category: search["category"] } : {},
  head: () => ({
    meta: [
      { title: "Shop all products — Luxora" },
      {
        name: "description",
        content:
          "Browse the full Luxora catalogue with filters for category, brand, price and rating.",
      },
      { property: "og:title", content: "Shop all products — Luxora" },
      {
        property: "og:description",
        content: "Filter by category, brand, price and rating across the Luxora catalogue.",
      },
    ],
  }),
  component: Shop,
});

const sorts = ["Featured", "Price: low to high", "Price: high to low", "Top rated"] as const;

function Shop() {
  const { category } = Route.useSearch();
  const [cats, setCats] = useState<string[]>(category ? [category] : []);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(false);
  const perPage = 8;

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (brandSel.length === 0 || brandSel.includes(p.brand)) &&
        p.price <= maxPrice &&
        p.rating >= minRating,
    );
    const sorted = [...list];
    if (sort === "Price: low to high") sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") sorted.sort((a, b) => b.price - a.price);
    if (sort === "Top rated") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [cats, brandSel, maxPrice, minRating, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  const filters = (
    <div className="space-y-7">
      <FilterBlock title="Category">
        {categories.map((c) => (
          <Check
            key={c.name}
            label={c.name}
            hint={String(c.count)}
            checked={cats.includes(c.name)}
            onChange={() => toggle(cats, c.name, setCats)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title="Brand">
        {brands.map((b) => (
          <Check
            key={b}
            label={b}
            checked={brandSel.includes(b)}
            onChange={() => toggle(brandSel, b, setBrandSel)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title="Max price">
        <input
          type="range"
          min={2000}
          max={150000}
          step={1000}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setPage(1);
          }}
          className="w-full accent-[var(--primary)]"
        />
        <p className="badge-font text-xs text-muted-foreground">
          Up to ₹{maxPrice.toLocaleString("en-IN")}
        </p>
      </FilterBlock>

      <FilterBlock title="Rating">
        {[4.5, 4, 3.5, 0].map((r) => (
          <button
            key={r}
            onClick={() => {
              setMinRating(r);
              setPage(1);
            }}
            className={`flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
              minRating === r ? "bg-primary/15 text-primary" : "hover:bg-muted"
            }`}
          >
            <Star className="h-3.5 w-3.5 fill-current text-warning" />
            {r === 0 ? "All ratings" : `${r} & above`}
          </button>
        ))}
      </FilterBlock>
    </div>
  );

  return (
    <Section className="pt-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Shop</span>
        {cats.length === 1 && (
          <>
            <span>/</span>
            <span className="text-foreground">{cats[0]}</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-3xl font-bold sm:text-4xl">
            {cats.length === 1 ? cats[0] : "All products"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} products available
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setOpenFilters((v) => !v)}
            className="flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm lg:hidden"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="h-10 appearance-none rounded-lg border border-border bg-card pl-9 pr-4 text-sm outline-none"
            >
              {sorts.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`${openFilters ? "block" : "hidden"} lg:block`}>{filters}</aside>

        <div>
          {visible.length === 0 ? (
            <div className="surface-card grid place-items-center gap-2 py-24 text-center">
              <p className="font-semibold">Nothing matches those filters</p>
              <p className="text-sm text-muted-foreground">
                Try widening the price range or clearing a brand.
              </p>
            </div>
          ) : (
            <ProductGrid items={visible} />
          )}

          {pages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`badge-font h-10 w-10 rounded-lg border text-sm transition-colors ${
                    page === i + 1
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="badge-font mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Check({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[var(--primary)]"
      />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {hint ? <span className="badge-font text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}
