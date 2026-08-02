import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
  className = ''
}: RatingStarsProps) {
  const starSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizes = {
    sm: 'text-xs text-muted-foreground',
    md: 'text-sm text-muted-foreground',
    lg: 'text-base font-medium text-muted-foreground'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSizes[size]} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-muted/30 text-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      <span className={`font-semibold text-foreground ${textSizes[size]}`}>
        {rating.toFixed(1)}
      </span>

      {showCount && reviewCount !== undefined && (
        <span className={textSizes[size]}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
