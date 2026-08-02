import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Product } from '@/types/product';
import { PriceBadge } from '@/components/common/PriceBadge';
import { RatingStars } from '@/components/common/RatingStars';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { QuickViewModal } from './QuickViewModal';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isWishlistPulsing, setIsWishlistPulsing] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlistPulsing(true);
    toggleWishlist(product);
    setTimeout(() => setIsWishlistPulsing(false), 400);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    navigate({ to: '/checkout' });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-[#F5C754]/40 shine-sweep"
      >
        {/* Badges Overlay */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="inline-flex items-center rounded-full bg-[#F5C754] text-black font-black px-2.5 py-0.5 text-[10px] uppercase badge-font tracking-wider shadow-md">
              New Drop
            </span>
          )}
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase badge-font tracking-wider shadow-md">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Pulse Button */}
        <motion.button
          onClick={handleWishlistClick}
          animate={{ scale: isWishlistPulsing ? [1, 1.4, 1] : 1 }}
          transition={{ duration: 0.3 }}
          aria-label="Save item to wishlist"
          className="absolute top-6 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-[#F5C754]/30 backdrop-blur-md text-foreground shadow-md transition-transform active:scale-90 hover:bg-black"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isSaved ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground hover:text-white'
            }`}
          />
        </motion.button>

        {/* Padded Image Frame Container: Never let image touch card borders! */}
        <div className="product-image-frame relative w-full mb-3">
          <Link to={`/products/${product.slug}`} className="block relative aspect-square w-full overflow-hidden rounded-2xl bg-black/40">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
              loading="lazy"
            />
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt={`${product.title} alternate view`}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                loading="lazy"
              />
            )}

            {/* Quick Action Overlay */}
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem(product);
                }}
                className="flex-1 rounded-xl bg-[#F5C754] text-black font-bold backdrop-blur-md shadow-lg hover:bg-[#D49B24] text-xs"
              >
                <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                Add to Cart
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsQuickViewOpen(true);
                }}
                className="h-8 w-8 rounded-xl bg-black/80 border-[#F5C754]/40 text-white backdrop-blur-md"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>

        {/* Content Details */}
        <div className="flex flex-1 flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1">
              <span className="text-[#F5C754] font-bold badge-font uppercase tracking-wider">{product.brand}</span>
              <span className="text-[10px] font-bold text-emerald-400 badge-font">In Stock</span>
            </div>

            <Link to={`/products/${product.slug}`} className="group-hover:text-[#F5C754] transition-colors">
              <h3 className="text-sm font-extrabold text-foreground line-clamp-1 tracking-tight">
                {product.title}
              </h3>
            </Link>
          </div>

          <div className="pt-2 border-t border-border/30 flex items-center justify-between">
            <PriceBadge
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
              size="sm"
            />
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" showCount={false} />
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleBuyNow}
            className="w-full rounded-xl text-xs font-bold text-[#F5C754] hover:bg-[#F5C754]/10 h-8 mt-1"
          >
            <Zap className="mr-1 h-3 w-3 fill-[#F5C754]" /> Express Checkout
          </Button>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
