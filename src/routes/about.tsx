import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { BRAND_VALUES, SITE_CONFIG } from '@/lib/constants';
import { Compass, Leaf, ShieldCheck, Award, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/animations/variants';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

const iconsMap: Record<string, any> = {
  Compass,
  Leaf,
  ShieldCheck,
};

function AboutPage() {
  return (
    <PublicLayout>
      {/* Brand Hero Header */}
      <section className="relative overflow-hidden py-24 bg-muted/20 border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary badge-font uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" /> Our Architectural Heritage
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="text-4xl sm:text-6xl font-black text-foreground tracking-tight max-w-3xl mx-auto"
          >
            Crafting the Future of Acoustic & Spatial Intelligence
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Luxora was founded on a singular conviction: technology should feel like an architectural extension of human capability—milled with raw precision, silent power, and timeless materials.
          </motion.p>
        </div>
      </section>

      {/* Brand Values Grid */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">The Luxora Standard</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Our non-negotiable principles governing industrial design, acoustic tuning, and logistics.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {BRAND_VALUES.map((val) => {
            const Icon = iconsMap[val.icon] || Award;
            return (
              <motion.div
                key={val.title}
                variants={slideUp}
                className="rounded-3xl border border-border/50 bg-card p-8 shadow-lg hover:border-primary/40 transition-colors space-y-4"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </PublicLayout>
  );
}
