import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { categories } from "@/data/catalog";

const cols = [
  {
    title: "Company",
    links: ["About Luxora", "Careers", "Press", "Sustainability"],
  },
  {
    title: "Support",
    links: ["Track order", "Shipping & returns", "Warranty", "Contact us"],
  },
  {
    title: "Legal",
    links: ["Terms of use", "Privacy policy", "Cookie settings", "Sitemap"],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-sm font-black text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              LX
            </span>
            <span className="font-display text-lg font-bold">Luxora</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Considered commerce. Fewer, better products — shipped fast, backed by a
            30-day no-questions return window.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <span
                key={i}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">Categories</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {categories.slice(0, 5).map((c) => (
              <li key={c.name}>
                <Link
                  to="/shop"
                  search={{ category: c.name }}
                  className="transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold">{col.title}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l} className="transition-colors hover:text-foreground">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Luxora Commerce. All rights reserved.</p>
          <p className="badge-font">Secure payments · UPI · Cards · Netbanking · EMI</p>
        </div>
      </div>
    </footer>
  );
}
