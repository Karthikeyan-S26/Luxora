import { Link } from '@tanstack/react-router';
import { mockCategories } from '@/data/categories';
import { ArrowRight, Sparkles } from 'lucide-react';

export function MegaMenu() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[840px] max-w-[90vw] bg-card/98 backdrop-blur-2xl border border-[#F5C754]/30 shadow-2xl rounded-3xl py-8 px-8 z-50 mt-2">
      <div className="grid grid-cols-4 gap-8">
        {mockCategories.slice(0, 3).map((cat) => (
          <div key={cat.id} className="space-y-4">
            <Link
              to={`/category/${cat.slug}`}
              className="text-xs font-black text-[#F5C754] badge-font uppercase tracking-wider flex items-center gap-2 hover:underline group"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C754] group-hover:scale-125 transition-transform" />
              {cat.name}
            </Link>
            <ul className="space-y-2.5 text-xs font-medium">
              {cat.subcategories?.map((sub) => (
                <li key={sub.slug}>
                  <Link
                    to="/products"
                    search={{ category: cat.slug, search: sub.name }}
                    className="text-muted-foreground hover:text-[#F5C754] transition-colors hover:translate-x-1 inline-block"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured Mega Banner */}
        <div className="rounded-2xl border border-[#F5C754]/30 bg-gradient-to-br from-black via-card to-[#F5C754]/10 p-5 flex flex-col justify-between hover:border-[#F5C754]/50 transition-colors">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#F5C754] badge-font uppercase tracking-wider bg-[#F5C754]/10 px-2.5 py-0.5 rounded-full border border-[#F5C754]/20">
              <Sparkles className="h-3 w-3" /> Featured Release
            </span>
            <h4 className="text-sm font-black text-foreground">NovaSound Pro Max</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Experience lossless acoustics with 40mm titanium drivers.
            </p>
          </div>

          <Link
            to="/products/novasound-pro-max-headphones"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#F5C754] hover:underline pt-3"
          >
            <span>Discover Specs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
