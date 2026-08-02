import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { springTransition } from '@/animations/variants';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export function EmptyState({
  title,
  description,
  actionText,
  actionHref,
  onAction,
  icon: Icon = PackageOpen,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={springTransition}
      className="relative overflow-hidden flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl shadow-xl space-y-5 my-6"
    >
      {/* Ambient Radial Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Floating Icon Frame */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-primary/20 via-indigo-500/20 to-accent/20 border border-primary/30 text-primary shadow-lg shadow-primary/10"
      >
        <Icon className="h-10 w-10" />
      </motion.div>

      {/* Messaging */}
      <div className="max-w-md space-y-2 z-10">
        <h3 className="text-xl font-extrabold text-foreground tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* CTA Trigger Button */}
      {actionText && (
        <div className="pt-2 z-10">
          {actionHref ? (
            <Link to={actionHref}>
              <Button size="lg" className="rounded-2xl font-bold px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              onClick={onAction}
              className="rounded-2xl font-bold px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              {actionText}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}
