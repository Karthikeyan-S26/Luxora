import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Heart, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/wishlist')({
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlistItems, wishlistCount } = useWishlist();

  return (
    <PublicLayout>
      <div className="bg-muted/30 border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground badge-font mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Saved Wishlist</span>
          </div>

          <div className="flex items-center gap-3">
            <Heart className="h-7 w-7 text-rose-500 fill-rose-500" />
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              My Saved Wishlist ({wishlistCount})
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {wishlistItems.length === 0 ? (
          <EmptyState
            icon={<Heart className="h-10 w-10 text-rose-500/60" />}
            title="Your Wishlist is Empty"
            description="Save items you love by tapping the heart icon on any product card to revisit them later."
            actionText="Explore Catalog"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
