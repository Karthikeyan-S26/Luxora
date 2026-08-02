import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { SITE_CONFIG } from '@/lib/constants';
import { ArrowLeft, Sparkles } from 'lucide-react';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background text-foreground">
      {/* Left Column: Form Shell */}
      <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto py-12">
          {children}
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_CONFIG.name} Inc. Secure authentication platform.
        </div>
      </div>

      {/* Right Column: Hero Showcase Image */}
      <div className="hidden lg:relative lg:flex flex-col justify-between p-16 bg-gradient-to-br from-slate-900 via-primary/90 to-indigo-950 text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200"
          alt="Auth Hero"
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-30"
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-xl">
            N
          </div>
          <span className="text-2xl font-extrabold tracking-tight">{SITE_CONFIG.name}</span>
        </div>

        <div className="relative z-10 space-y-4 max-w-lg">
          <span className="inline-flex items-center gap-1 text-xs font-bold badge-font uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
            <Sparkles className="h-3.5 w-3.5" /> Next-Gen Commerce
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Elevated Living. Intelligent Commerce.
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Join thousands of audiophiles, spatial creators, and athletic runners who rely on NovaCart for curated premium gear.
          </p>
        </div>
      </div>
    </div>
  );
}
