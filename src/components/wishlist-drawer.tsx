import { Link } from '@tanstack/react-router';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/currency';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlistItems, wishlistCount, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-80 sm:w-96 p-6 flex flex-col justify-between bg-card border-l border-border/50">
        <div>
          <SheetHeader className="pb-5 border-b border-border/40 text-left">
            <SheetTitle className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              Saved Wishlist ({wishlistCount})
            </SheetTitle>
          </SheetHeader>

          <div className="py-5 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            {wishlistItems.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground space-y-3">
                <Heart className="h-10 w-10 text-rose-500/40 mx-auto" />
                <p className="text-sm font-semibold">Your wishlist is currently empty</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Save items by tapping the heart icon on any product card.
                </p>
              </div>
            ) : (
              wishlistItems.map((product) => (
                <div key={product.id} className="flex gap-3 p-3 rounded-2xl border border-border/50 bg-background/50">
                  <img src={product.thumbnail} alt={product.title} className="h-16 w-16 rounded-xl object-cover bg-muted shrink-0" />
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="truncate text-xs font-bold text-foreground">{product.title}</p>
                      <p className="text-[10px] text-muted-foreground font-semibold">{product.brand}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-extrabold text-foreground">{formatCurrency(product.price)}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          onClick={() => addItem(product)}
                          className="h-7 text-[10px] font-bold px-2 rounded-lg"
                        >
                          <ShoppingBag className="mr-1 h-3 w-3" /> Add
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleWishlist(product)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-border/40">
          <Link to="/wishlist" onClick={onClose}>
            <Button variant="outline" className="w-full rounded-xl font-bold">
              View Full Wishlist <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
