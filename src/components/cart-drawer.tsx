import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight, Truck, Tag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function CartDrawer() {
  const { isCartDrawerOpen, setIsCartDrawerOpen, items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const tax = Math.round((subtotal - discount) * 0.08);
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + tax + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "LUXORA20") {
      const discountVal = Math.round(subtotal * 0.2);
      setDiscount(discountVal);
      setAppliedCoupon("LUXORA20 (-20%)");
      toast.success("Coupon LUXORA20 applied! 20% discount saved.");
    } else if (coupon.trim()) {
      toast.error("Invalid promo coupon code. Try LUXORA20");
    }
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-[61] flex h-dvh w-full max-w-md flex-col border-l border-[#F5C754]/30 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/40 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#F5C754]" />
                <h2 className="text-lg font-black text-foreground">
                  Your Cart
                </h2>
                <span className="rounded-full bg-[#F5C754]/10 px-2.5 py-0.5 text-xs font-black text-[#F5C754] badge-font border border-[#F5C754]/20">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4 }}
                  className="grid h-20 w-20 place-items-center rounded-3xl bg-[#F5C754]/10 border border-[#F5C754]/20"
                >
                  <ShoppingBag className="h-9 w-9 text-[#F5C754]" />
                </motion.div>
                <p className="text-xl font-bold text-foreground">Your bag is empty</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Discover our spatial audio, techwear, and high-performance footwear collections.
                </p>
                <Link
                  to="/products"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-2"
                >
                  <Button size="lg" className="rounded-2xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24]">
                    Explore Catalog
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress Meter Bar */}
                <div className="bg-muted/40 border-b border-border/30 px-6 py-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold badge-font">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Truck className="h-3.5 w-3.5 text-[#F5C754]" />
                      {remainingForFreeShipping > 0
                        ? `Add ${formatCurrency(remainingForFreeShipping)} for FREE Shipping`
                        : "Unlocked FREE Express Shipping!"}
                    </span>
                    <span className="text-[#F5C754] font-black">{Math.round(freeShippingPercent)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${freeShippingPercent}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-amber-500 via-[#F5C754] to-amber-300 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map(({ product, quantity, selectedColor, selectedSize }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 rounded-2xl border border-border/50 bg-background/50 p-3 shadow-sm"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                        className="h-20 w-20 shrink-0 rounded-xl object-cover bg-muted border border-border/40"
                      />
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="truncate text-sm font-bold text-foreground">{product.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span className="text-[#F5C754] font-semibold">{product.brand}</span>
                            {selectedColor && <span>• {selectedColor}</span>}
                            {selectedSize && <span>• {selectedSize}</span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2">
                          <div className="flex items-center rounded-lg border border-border bg-card">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="grid h-7 w-7 place-items-center hover:bg-muted text-muted-foreground"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold badge-font">{quantity}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="grid h-7 w-7 place-items-center hover:bg-muted text-muted-foreground"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-foreground">
                              {formatCurrency(product.price * quantity)}
                            </span>
                            <button
                              aria-label="Remove item"
                              onClick={() => removeItem(product.id)}
                              className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Promo Coupon Form */}
                <div className="px-6 py-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <Input
                      placeholder="Promo Coupon (e.g. LUXORA20)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="h-9 rounded-xl border border-border/50 text-xs uppercase"
                    />
                    <Button type="submit" size="sm" variant="outline" className="h-9 rounded-xl text-xs font-bold">
                      <Tag className="mr-1 h-3.5 w-3.5" /> Apply
                    </Button>
                  </form>
                  {appliedCoupon && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <Check className="h-3 w-3" /> Code {appliedCoupon} Active
                    </div>
                  )}
                </div>

                <div className="space-y-3 border-t border-border/40 bg-card p-6 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount</span>
                      <span className="font-semibold">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-semibold text-foreground">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-400">
                      {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/40 pt-3 text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-[#F5C754] font-black">{formatCurrency(total)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link to="/cart" onClick={() => setIsCartDrawerOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl font-bold">
                        View Cart
                      </Button>
                    </Link>
                    <Link to="/checkout" onClick={() => setIsCartDrawerOpen(false)}>
                      <Button className="w-full rounded-xl font-black bg-[#F5C754] text-black hover:bg-[#D49B24] shadow-lg shadow-[#F5C754]/20">
                        Checkout <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
