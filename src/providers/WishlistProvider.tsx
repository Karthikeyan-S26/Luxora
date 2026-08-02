import { ReactNode, useState } from 'react';
import { WishlistContext } from '@/context/WishlistContext';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/products';
import { toast } from 'sonner';

export function WishlistProvider({ children }: { children: ReactNode }) {
  // Initialize with 2 items for demonstration shell
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    mockProducts[1],
    mockProducts[2]
  ]);

  const toggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.info(`Removed ${product.title} from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        toast.success(`Saved ${product.title} to wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
