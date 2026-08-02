import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Heart, MapPin, Package, Settings, ShieldCheck, User } from "lucide-react";
import { Section } from "@/components/section";
import { useShop } from "@/context/shop";
import { formatINR, products } from "@/data/catalog";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Luxora" },
      {
        name: "description",
        content: "Track orders, manage addresses, wishlist and security settings at Luxora.",
      },
      { property: "og:title", content: "Your account — Luxora" },
      { property: "og:description", content: "Orders, addresses, wishlist and security." },
    ],
  }),
  component: Account,
});

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

const orders = [
  { id: "LX881204", date: "12 Jul 2026", status: "Delivered", total: 18999, items: 1 },
  { id: "LX874530", date: "28 Jun 2026", status: "In transit", total: 32480, items: 2 },
  { id: "LX861119", date: "03 Jun 2026", status: "Delivered", total: 6999, items: 1 },
];

function Account() {
  const [tab, setTab] = useState("overview");
  const { wishlist, count, subtotal } = useShop();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <Section className="pt-10">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-black text-primary-foreground"
            style={{ background: "var(--gradient-brand)" }}
          >
            AR
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold sm:text-2xl">Ananya Rao</h1>
            <p className="truncate text-sm text-muted-foreground">ananya@example.com</p>
          </div>
        </div>
        <span className="badge-font shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-widest text-primary">
          Luxora Plus
        </span>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                tab === id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>

        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {tab === "overview" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Orders placed" value="14" />
              <Stat label="Items in bag" value={String(count)} />
              <Stat label="Bag value" value={formatINR(subtotal)} />
              <div className="surface-card p-5 sm:col-span-3">
                <h2 className="mb-4 text-lg font-bold">Recent activity</h2>
                <ul className="space-y-3 text-sm">
                  {orders.map((o) => (
                    <li key={o.id} className="flex items-center justify-between gap-3">
                      <span className="badge-font truncate">{o.id}</span>
                      <span className="truncate text-muted-foreground">{o.date}</span>
                      <span className="shrink-0 font-semibold">{formatINR(o.total)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="surface-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-5 sm:flex sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="badge-font text-sm font-semibold">{o.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.date} · {o.items} item{o.items > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span
                    className={`badge-font shrink-0 rounded-full px-3 py-1 text-[11px] ${
                      o.status === "Delivered"
                        ? "bg-success/15 text-success"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {o.status}
                  </span>
                  <span className="font-semibold">{formatINR(o.total)}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "addresses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Home", "18 Lavelle Road, Bengaluru 560001"],
                ["Work", "Prestige Tech Park, Bengaluru 560103"],
              ].map(([t, a]) => (
                <div key={t} className="surface-card p-5">
                  <p className="text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a}</p>
                  <div className="mt-4 flex gap-2 text-xs">
                    <button className="rounded-lg border border-border px-3 py-1.5 hover:border-primary">
                      Edit
                    </button>
                    <button className="rounded-lg border border-border px-3 py-1.5 text-destructive hover:border-destructive">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            <div className="surface-card p-6">
              {saved.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nothing saved yet.{" "}
                  <Link to="/shop" className="text-primary">
                    Browse products
                  </Link>
                  .
                </p>
              ) : (
                <ul className="space-y-3">
                  {saved.map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt="" loading="lazy" className="h-12 w-12 rounded-lg object-cover" />
                      <Link
                        to="/product/$slug"
                        params={{ slug: p.slug }}
                        className="min-w-0 flex-1 truncate text-sm hover:text-primary"
                      >
                        {p.name}
                      </Link>
                      <span className="text-sm font-semibold">{formatINR(p.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {tab === "security" && (
            <div className="surface-card space-y-4 p-6 text-sm">
              <Toggle label="Two-factor authentication" hint="Requires an OTP on new devices" />
              <Toggle label="Login alerts" hint="Email me on every new sign-in" />
              <Toggle label="Save payment methods" hint="Tokenised, never raw card data" />
            </div>
          )}

          {tab === "settings" && (
            <div className="surface-card space-y-4 p-6 text-sm">
              <Toggle label="Order updates by email" hint="Shipping and delivery alerts" />
              <Toggle label="Price drop alerts" hint="For items in your wishlist" />
              <Toggle label="Weekly newsletter" hint="New drops and restocks" />
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Toggle({ label, hint }: { label: string; hint: string }) {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="truncate font-medium">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{hint}</p>
      </div>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${on ? "translate-x-5.5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}
