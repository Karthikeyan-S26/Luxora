import { ReactNode } from 'react';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/footer/SiteFooter';
import { CartDrawer } from '@/components/cart-drawer';
import { BackToTop } from '@/components/back-to-top';
import { motion } from 'framer-motion';

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground selection:bg-[#F5C754]/30 selection:text-[#F5C754]">
      <SiteHeader />
      <motion.main
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.995 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <SiteFooter />
      <CartDrawer />
      <BackToTop />
    </div>
  );
}
