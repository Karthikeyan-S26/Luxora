import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/common/EmptyState';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/cart')({
  component: CartPage,
});

function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const tax = Math.round(subtotal * 0.08);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal - appliedDiscount + tax + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'NOVA20') {
      const discount = Math.round(subtotal * 0.2);
      setAppliedDiscount(discount);
      toast.success('Promo code NOVA20 applied! Saved 20%.');
    } else {
      toast.error('Invalid promo code. Try code "NOVA20".');
    }
  };

  return (
    <PublicLayout>
      <div className="bg-muted/30 border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground badge-font mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Shopping Bag</span>
          </div>

          <div className="flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              Shopping Cart ({itemCount} items)
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-10 w-10 text-muted-foreground/60" />}
            title="Your Cart is Empty"
            description="Explore our high-performance gear, spatial headphones, and minimalist accessories."
            actionText="Discover Products"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl border border-border/50 bg-card p-6 divide-y divide-border/40 shadow-sm">
                {items.map(({ product, quantity, selectedColor, selectedSize }) => (
                  <div key={product.id} className="py-6 first:pt-0 last:pb-0 flex gap-6">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-28 w-28 rounded-2xl object-cover bg-muted border border-border/40 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs text-primary font-bold badge-font uppercase">{product.brand}</span>
                            <h3 className="text-lg font-bold text-foreground">{product.title}</h3>
                          </div>
                          <span className="text-lg font-extrabold text-foreground">
                            {formatCurrency(product.price * quantity)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          {selectedColor && <span>Color: {selectedColor}</span>}
                          {selectedSize && <span>Size: {selectedSize}</span>}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center rounded-xl border border-border/60 bg-background p-1">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm badge-font">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(product.id)}
                          className="text-xs text-destructive hover:bg-destructive/10 rounded-xl"
                        >
                          <Trash2 className="mr-1.5 h-4 w-4" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-foreground tracking-tight border-b border-border/40 pb-4">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-xs font-bold badge-font uppercase text-muted-foreground">
                    Promotional Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Try code NOVA20"
                      className="rounded-xl border-border/60 uppercase"
                    />
                    <Button type="submit" variant="secondary" className="rounded-xl font-bold">
                      Apply
                    </Button>
                  </div>
                </form>

                {/* Costs Breakdown */}
                <div className="space-y-3 text-sm divide-y divide-border/30 pt-2">
                  <div className="flex justify-between pt-2 text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-bold text-foreground">{formatCurrency(subtotal)}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between pt-2 text-emerald-500 font-semibold">
                      <span>Promo Savings (NOVA20)</span>
                      <span>-{formatCurrency(appliedDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-bold text-foreground">{formatCurrency(tax)}</span>
                  </div>

                  <div className="flex justify-between pt-2 text-muted-foreground">
                    <span>Express Shipping</span>
                    <span className="font-bold text-emerald-500">
                      {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4 text-xl font-extrabold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(total)}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button size="lg" className="w-full rounded-2xl font-extrabold text-base h-13 shadow-xl shadow-primary/25">
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  256-Bit Encrypted SSL Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
