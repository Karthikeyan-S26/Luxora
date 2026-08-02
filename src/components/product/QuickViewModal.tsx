import { useState } from 'react';
import { Product } from '@/types/product';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PriceBadge } from '@/components/common/PriceBadge';
import { RatingStars } from '@/components/common/RatingStars';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Heart, ShieldCheck, Truck, X, ArrowRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');

  const handleBuyNow = () => {
    addItem(product, 1, selectedColor);
    onClose();
    navigate({ to: '/checkout' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden rounded-3xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
        <DialogTitle className="sr-only">{product.title} Quick View</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Image Showcase Frame */}
          <div className="p-6 bg-muted/30 flex flex-col items-center justify-center space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/40 bg-card">
              <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`h-12 w-12 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-primary' : 'border-border/40 opacity-70'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${i}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details */}
          <div className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-primary font-bold badge-font uppercase">
                <span>{product.brand}</span>
                <span>{product.categoryName}</span>
              </div>

              <h3 className="text-xl font-extrabold text-foreground tracking-tight line-clamp-2">
                {product.title}
              </h3>

              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />

              <div className="p-3 rounded-xl bg-muted/40 inline-block">
                <PriceBadge
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discountPercentage={product.discountPercentage}
                  size="md"
                />
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <Label className="text-xs font-bold badge-font uppercase text-muted-foreground">Color</Label>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                          selectedColor === c.name ? 'border-primary bg-primary/10 text-primary' : 'border-border/60 text-muted-foreground'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-border/40">
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    addItem(product, 1, selectedColor);
                    onClose();
                  }}
                  className="flex-1 rounded-xl font-bold"
                >
                  <ShoppingBag className="mr-1.5 h-4 w-4" /> Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleWishlist(product)}
                  className="h-10 w-10 rounded-xl"
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                </Button>
              </div>

              <Button
                variant="secondary"
                onClick={handleBuyNow}
                className="w-full rounded-xl font-bold text-xs"
              >
                Buy Now with Instant Express <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
