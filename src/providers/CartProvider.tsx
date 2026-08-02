import { ReactNode, useState } from 'react';
import { CartContext, CartItem } from '@/context/CartContext';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/products';
import { toast } from 'sonner';

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize with 2 items for demonstration shell
  const [items, setItems] = useState<CartItem[]>([
    {
      product: mockProducts[0],
      quantity: 1,
      selectedColor: 'Space Black'
    },
    {
      product: mockProducts[3],
      quantity: 1,
      selectedColor: 'Crimson Red',
      selectedSize: 'US 10'
    }
  ]);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const addItem = (product: Product, quantity = 1, color?: string, size?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    toast.success(`Added ${product.title} to cart`);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
