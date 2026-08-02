import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { HERO_SLIDES } from '@/lib/constants';
import { mockProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  Sparkles,
  Clock,
  Flame,
  ArrowRight,
  Video,
  Eye,
  ShoppingBag,
  ShieldCheck,
  Award,
  Zap,
  Sliders,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideUp, scaleUp, staggerContainer, springTransition } from '@/animations/variants';
import { toast } from 'sonner';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'featured' | 'flash' | 'newest'>('featured');
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  // Mouse Parallax Coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - top) / height - 0.5) * -20; // -10 to +10 deg
    setMousePos({ x, y });
  };

  // Countdown timer ticker for Flash Deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = mockProducts.filter((p) => p.isFeatured);
  const flashProducts = mockProducts.filter((p) => p.isFlashDeal);
  const newProducts = mockProducts.filter((p) => p.isNew);

  const getActiveTabProducts = () => {
    if (activeTab === 'flash') return flashProducts;
    if (activeTab === 'newest') return newProducts;
    return featuredProducts;
  };

  return (
    <PublicLayout>
      {/* 1. Cinematic Hero Section with Mouse Parallax & Floating Glass Specs */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        className="relative overflow-hidden bg-gradient-to-b from-[#141414] via-background to-background border-b border-[#F5C754]/20"
      >
        {/* Layered Ambient Light Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-[#F5C754]/10 blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <motion.div
                variants={fadeIn}
                className="inline-flex items-center gap-2 rounded-full border border-[#F5C754]/40 bg-[#F5C754]/10 px-4 py-1.5 text-xs font-black text-[#F5C754] badge-font uppercase tracking-widest"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {HERO_SLIDES[currentSlide].badge}
              </motion.div>

              <motion.h1
                variants={slideUp}
                className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-[1.08]"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h1>

              <motion.p variants={fadeIn} className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.p>

              <motion.div variants={slideUp} className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={HERO_SLIDES[currentSlide].ctaLink}>
                  <Button size="lg" className="rounded-2xl px-8 font-black bg-gradient-to-r from-[#F5C754] via-[#E6B33D] to-[#C9901C] text-black hover:brightness-110 shadow-xl shadow-[#F5C754]/20 border-none transition-transform hover:scale-[1.03]">
                    {HERO_SLIDES[currentSlide].ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to={HERO_SLIDES[currentSlide].secondaryCtaLink}>
                  <Button size="lg" variant="outline" className="rounded-2xl px-6 font-bold border-border/60 hover:border-[#F5C754]">
                    {HERO_SLIDES[currentSlide].secondaryCtaText}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Right Flagship Image with Parallax & Floating Glass Widgets */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleUp}
              className="lg:col-span-6 relative flex justify-center perspective-1000"
            >
              <motion.div
                style={{
                  rotateY: mousePos.x,
                  rotateX: mousePos.y,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border border-[#F5C754]/40 bg-card/80 shadow-2xl p-4 group"
              >
                <img
                  src={HERO_SLIDES[currentSlide].image}
                  alt="Hero Flagship Product"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Glass Spec Widget 1 */}
                <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-xl border border-[#F5C754]/40 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-xl animate-float">
                  <Sliders className="h-4 w-4 text-[#F5C754]" />
                  <span className="text-xs font-black text-white badge-font">40mm Titanium Drivers</span>
                </div>

                {/* Floating Glass Price Widget 2 */}
                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-xl border border-[#F5C754]/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
                  <span className="text-xs font-semibold text-muted-foreground badge-font uppercase">Starting at</span>
                  <span className="text-xl font-black text-[#F5C754]">{HERO_SLIDES[currentSlide].highlightPrice}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Storyteller Divider 1 */}
      <section className="py-12 bg-black border-b border-[#F5C754]/20 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <span className="text-xs font-black text-[#F5C754] badge-font uppercase tracking-widest">Luxora Philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">"Designed for Everyday Luxury."</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Every contour, titanium driver, and leather surface is engineered for timeless permanence.</p>
        </div>
      </section>

      {/* 2. Amazon-Style Quad 4-Card Offer Grids */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quad Grid 1: Appliances & Home */}
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#F5C754]/40 transition-colors">
            <div className="space-y-3">
              <h3 className="text-lg font-black text-foreground tracking-tight">Appliances for Home | Up to 55% off</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/products?category=electronics" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=300" alt="Curved OLED Monitors" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Curved OLED Monitors</span>
                </Link>
                <Link to="/products?category=audio" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300" alt="Studio Soundbars" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Studio Soundbars</span>
                </Link>
                <Link to="/products?category=electronics" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300" alt="Workstation Laptops" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Workstation Laptops</span>
                </Link>
                <Link to="/products?category=wearables" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300" alt="Titanium Watches" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Titanium Watches</span>
                </Link>
              </div>
            </div>
            <Link to="/products" className="text-xs font-bold text-[#F5C754] hover:underline flex items-center gap-1 pt-2">
              See more deals <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quad Grid 2: High-Performance Electronics */}
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#F5C754]/40 transition-colors">
            <div className="space-y-3">
              <h3 className="text-lg font-black text-foreground tracking-tight">Up to 45% off | Electronics & Power</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300" alt="Lossless Earbuds" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Lossless Earbuds</span>
                </Link>
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&q=80&w=300" alt="Spatial VR Headset" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Spatial VR Headsets</span>
                </Link>
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300" alt="ANC Headphones" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">ANC Headphones</span>
                </Link>
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" alt="Carbon Race Shoes" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Carbon Race Shoes</span>
                </Link>
              </div>
            </div>
            <Link to="/products" className="text-xs font-bold text-[#F5C754] hover:underline flex items-center gap-1 pt-2">
              See all offers <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quad Grid 3: Smart Mobility & Techwear */}
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#F5C754]/40 transition-colors">
            <div className="space-y-3">
              <h3 className="text-lg font-black text-foreground tracking-tight">Techwear & Mobility | Up to 60% off</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/products?category=apparel" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=300" alt="Gore-Tex Anorak" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Gore-Tex Anoraks</span>
                </Link>
                <Link to="/products?category=footwear" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" alt="Kinetic Sneakers" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Kinetic Sneakers</span>
                </Link>
                <Link to="/products?category=wearables" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300" alt="GPS Smartwatches" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">GPS Smartwatches</span>
                </Link>
                <Link to="/products?category=audio" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300" alt="TWS Audio" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">TWS Audio</span>
                </Link>
              </div>
            </div>
            <Link to="/products" className="text-xs font-bold text-[#F5C754] hover:underline flex items-center gap-1 pt-2">
              Explore collection <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quad Grid 4: Emerging Brands & Unique Home Finds */}
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#F5C754]/40 transition-colors">
            <div className="space-y-3">
              <h3 className="text-lg font-black text-foreground tracking-tight">Curated Home Finds | Min. 40% off</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300" alt="Acoustic Staging" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Acoustic Staging</span>
                </Link>
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300" alt="Titanium Enclosures" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Workstation Racks</span>
                </Link>
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=300" alt="OLED Accessories" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Display Mounts</span>
                </Link>
                <Link to="/products" className="space-y-1 group">
                  <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=300" alt="Modular Apparel" className="h-24 w-full object-cover rounded-xl border border-border/40 group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-[#F5C754] line-clamp-1">Modular Bags</span>
                </Link>
              </div>
            </div>
            <Link to="/products" className="text-xs font-bold text-[#F5C754] hover:underline flex items-center gap-1 pt-2">
              See curated finds <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Storyteller Divider 2 */}
      <section className="py-12 bg-card/60 border-b border-border/30 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <span className="text-xs font-black text-[#F5C754] badge-font uppercase tracking-widest">Precision Acoustics</span>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">"Crafted with Absolute Precision."</h2>
          <p className="text-xs text-muted-foreground">Every driver is tuned in our acoustic lab to match reference studio frequency responses.</p>
        </div>
      </section>

      {/* 3. Amazon LIVE Video Showcase Strip */}
      <section className="py-16 bg-muted/20 border-b border-border/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#F5C754]/30 bg-card p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                  <Video className="h-5 w-5 text-rose-500" /> Luxora LIVE Stream Showcase
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                <Eye className="h-3.5 w-3.5" /> 1.5K Watching Live Now
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden border border-[#F5C754]/20 bg-black shadow-xl group">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200" alt="Live Stream" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-between">
                  <span className="bg-rose-600 text-white font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md w-fit badge-font">
                    LIVE DEMO
                  </span>
                  <div>
                    <h4 className="text-xl font-black text-white">Spatial Acoustic Staging & Titanium Drivers Calibration</h4>
                    <p className="text-xs text-white/80 mt-1">Presented by Alex Vance • Luxora Acoustic Engineer</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold badge-font text-[#F5C754] uppercase tracking-wider">Featured in Stream</div>
                <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 flex items-center gap-4">
                  <img src={featuredProducts[0].thumbnail} alt={featuredProducts[0].title} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-foreground line-clamp-1">{featuredProducts[0].title}</h5>
                    <div className="text-xs text-[#F5C754] font-extrabold">${featuredProducts[0].price}</div>
                    <Link to={`/products/${featuredProducts[0].slug}`}>
                      <Button size="sm" className="rounded-xl font-bold text-xs bg-[#F5C754] text-black hover:bg-[#D49B24] h-8 mt-1">
                        <ShoppingBag className="mr-1 h-3 w-3" /> Buy Featured Item
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Lightning Deals Section */}
      <section className="py-16 bg-gradient-to-b from-card/40 via-background to-background border-b border-border/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#F5C754]/30 bg-card p-8 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/30 animate-pulse">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                    Lightning Deals <span className="text-xs badge-font uppercase font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">Up to 30% Off</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">High-demand architectural acoustics and computing gear on limited flash allocation.</p>
                </div>
              </div>

              {/* Ticker Timer */}
              <div className="flex items-center gap-2 bg-muted/40 p-2.5 rounded-2xl border border-border/50">
                <Clock className="h-4 w-4 text-[#F5C754]" />
                <span className="text-xs font-bold text-muted-foreground uppercase badge-font">Ends In:</span>
                <div className="flex items-center gap-1 font-mono font-black text-sm text-[#F5C754]">
                  <span className="bg-black/60 px-2 py-1 rounded-lg border border-[#F5C754]/30">{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span>:</span>
                  <span className="bg-black/60 px-2 py-1 rounded-lg border border-[#F5C754]/30">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span>:</span>
                  <span className="bg-black/60 px-2 py-1 rounded-lg border border-[#F5C754]/30">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            </div>

            {/* Flash Deals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="space-y-3">
                  <ProductCard product={product} />
                  {/* Stock Availability Bar */}
                  <div className="space-y-1 px-1">
                    <div className="flex justify-between text-[10px] font-bold badge-font text-muted-foreground">
                      <span>Claimed: 78%</span>
                      <span className="text-amber-500 font-bold">{product.stock} items left</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-[#F5C754] rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Multi-Tab Collection Switcher */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">Curated Collections</h2>
            <p className="text-sm text-muted-foreground mt-1">Switch through top-rated acoustic gear, new drops, and bestsellers.</p>
          </div>

          {/* Tab Filter Pills */}
          <div className="flex items-center gap-2 bg-card p-1.5 rounded-2xl border border-border/50">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'featured' ? 'bg-[#F5C754] text-black shadow-lg shadow-[#F5C754]/20' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Featured Staff Picks
            </button>
            <button
              onClick={() => setActiveTab('flash')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'flash' ? 'bg-[#F5C754] text-black shadow-lg shadow-[#F5C754]/20' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Flash Deals
            </button>
            <button
              onClick={() => setActiveTab('newest')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'newest' ? 'bg-[#F5C754] text-black shadow-lg shadow-[#F5C754]/20' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              New Drops
            </button>
          </div>
        </div>

        {/* Tabbed Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={springTransition}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {getActiveTabProducts().slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </PublicLayout>
  );
}
