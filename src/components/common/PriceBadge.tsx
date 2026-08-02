import { formatCurrency, formatDiscount } from '@/utils/currency';

interface PriceBadgeProps {
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceBadge({
  price,
  originalPrice,
  discountPercentage,
  size = 'md',
  className = ''
}: PriceBadgeProps) {
  const discount = discountPercentage || (originalPrice ? formatDiscount(originalPrice, price) : 0);

  const textSizeMap = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-2xl font-extrabold'
  };

  const originalSizeMap = {
    sm: 'text-xs line-through text-muted-foreground',
    md: 'text-sm line-through text-muted-foreground',
    lg: 'text-base line-through text-muted-foreground'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`${textSizeMap[size]} text-foreground tracking-tight`}>
        {formatCurrency(price)}
      </span>

      {originalPrice && originalPrice > price && (
        <span className={originalSizeMap[size]}>
          {formatCurrency(originalPrice)}
        </span>
      )}

      {discount > 0 && (
        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400">
          -{discount}%
        </span>
      )}
    </div>
  );
}
