import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  actionText,
  actionHref,
  align = 'left',
  className = ''
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex flex-col md:flex-row ${
        isCentered ? 'items-center text-center' : 'items-start justify-between'
      } gap-4 mb-10 ${className}`}
    >
      <div className={`space-y-2 ${isCentered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
        {badge && (
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary badge-font tracking-wide uppercase">
            {badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionHref && (
        <Link
          to={actionHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group shrink-0"
        >
          <span>{actionText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
