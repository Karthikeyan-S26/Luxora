import { Link } from '@tanstack/react-router';
import { SITE_CONFIG } from '@/lib/constants';
import { LuxoraLogo } from '@/components/common/LuxoraLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  ChevronUp,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  Github,
} from 'lucide-react';
import { toast } from 'sonner';

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to Luxora Private Client drops.');
  };

  return (
    <footer className="bg-card border-t border-[#F5C754]/20 text-foreground">
      {/* Back to Top Bar */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#1c1917] hover:bg-[#292524] py-3 text-center text-xs font-bold text-[#F5C754] tracking-wider transition-colors flex items-center justify-center gap-1 border-b border-[#F5C754]/20 cursor-pointer"
      >
        <span>Back to Top</span>
        <ChevronUp className="h-4 w-4" />
      </button>

      {/* Brand Emblem & Divider Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-b border-border/40 text-center flex flex-col items-center">
        <LuxoraLogo size="xl" showWordmark={true} showTagline={true} className="mb-6 flex-col items-center gap-4 text-center" />
      </div>

      {/* Trust Badges Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-b border-border/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/30">
            <div className="p-3 rounded-xl bg-[#F5C754]/10 text-[#F5C754]">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Express Global Courier</h4>
              <p className="text-xs text-muted-foreground">Complimentary over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/30">
            <div className="p-3 rounded-xl bg-[#F5C754]/10 text-[#F5C754]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">2-Year Guarantee</h4>
              <p className="text-xs text-muted-foreground">Full replacement warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/30">
            <div className="p-3 rounded-xl bg-[#F5C754]/10 text-[#F5C754]">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">30-Day Trial</h4>
              <p className="text-xs text-muted-foreground">Seamless returns policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/30">
            <div className="p-3 rounded-xl bg-[#F5C754]/10 text-[#F5C754]">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">24/7 Private Concierge</h4>
              <p className="text-xs text-muted-foreground">Direct technical support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Enterprise Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Get to Know Us */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold badge-font text-[#F5C754] uppercase tracking-wider">Get to Know Us</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
              <li><Link to="/about" className="hover:text-[#F5C754] transition-colors">About Luxora</Link></li>
              <li><Link to="/about" className="hover:text-[#F5C754] transition-colors">Careers & Engineering</Link></li>
              <li><Link to="/about" className="hover:text-[#F5C754] transition-colors">Press Releases & Media</Link></li>
              <li><Link to="/about" className="hover:text-[#F5C754] transition-colors">Acoustic Science & Research</Link></li>
              <li><Link to="/about" className="hover:text-[#F5C754] transition-colors">Zero-Carbon Logistics</Link></li>
            </ul>
          </div>

          {/* Column 2: Connect & Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold badge-font text-[#F5C754] uppercase tracking-wider">Connect with Us</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
              <li><a href="#" className="hover:text-[#F5C754] transition-colors flex items-center gap-2"><Instagram className="h-3.5 w-3.5" /> Instagram</a></li>
              <li><a href="#" className="hover:text-[#F5C754] transition-colors flex items-center gap-2"><Twitter className="h-3.5 w-3.5" /> Twitter / X</a></li>
              <li><a href="#" className="hover:text-[#F5C754] transition-colors flex items-center gap-2"><Youtube className="h-3.5 w-3.5" /> YouTube Channel</a></li>
              <li><a href="#" className="hover:text-[#F5C754] transition-colors flex items-center gap-2"><Github className="h-3.5 w-3.5" /> GitHub Open Source</a></li>
            </ul>
          </div>

          {/* Column 3: Partner & Seller */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold badge-font text-[#F5C754] uppercase tracking-wider">Partner with Luxora</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
              <li><Link to="/admin" className="hover:text-[#F5C754] transition-colors">Sell on Luxora Market</Link></li>
              <li><Link to="/admin" className="hover:text-[#F5C754] transition-colors">Brand Accelerator</Link></li>
              <li><Link to="/admin" className="hover:text-[#F5C754] transition-colors">Global Merchant Network</Link></li>
              <li><Link to="/admin" className="hover:text-[#F5C754] transition-colors">Affiliate Program</Link></li>
              <li><Link to="/admin" className="hover:text-[#F5C754] transition-colors">Fulfilment by Luxora</Link></li>
            </ul>
          </div>

          {/* Column 4: Customer Help & Account */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold badge-font text-[#F5C754] uppercase tracking-wider">Let Us Help You</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
              <li><Link to="/profile" className="hover:text-[#F5C754] transition-colors">Your Account & Security</Link></li>
              <li><Link to="/orders" className="hover:text-[#F5C754] transition-colors">Returns & Order Tracking</Link></li>
              <li><Link to="/orders" className="hover:text-[#F5C754] transition-colors">Recalls & Safety Alerts</Link></li>
              <li><Link to="/profile" className="hover:text-[#F5C754] transition-colors">100% Purchase Protection</Link></li>
              <li><Link to="/profile" className="hover:text-[#F5C754] transition-colors">Concierge Assistance</Link></li>
            </ul>
          </div>
        </div>

        {/* Region & Language Selector Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <LuxoraLogo size="sm" badgeStyle="squircle" showWordmark={true} />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-muted/20">
              <Globe className="h-3.5 w-3.5 text-[#F5C754]" />
              <span className="font-bold">English • India</span>
            </div>
          </div>

          <div className="flex gap-6 text-[11px] font-medium">
            <Link to="/" className="hover:text-[#F5C754]">Conditions of Use & Sale</Link>
            <Link to="/" className="hover:text-[#F5C754]">Privacy Guarantee</Link>
            <Link to="/" className="hover:text-[#F5C754]">Interest-Based Ads</Link>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-muted-foreground badge-font">
          © 1996-{new Date().getFullYear()} {SITE_CONFIG.name}, Inc. or its affiliates. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
