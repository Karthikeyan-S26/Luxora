import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, ShieldCheck, CreditCard, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');

  const tax = Math.round(subtotal * 0.08);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + tax + shipping;

  const handleCompleteOrder = () => {
    toast.success('Order placed successfully! Confirmation email sent.');
    clearCart();
    navigate({ to: '/orders' });
  };

  if (items.length === 0) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center space-y-6">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#F5C754]/10 border border-[#F5C754]/20 text-[#F5C754]">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Your Cart is Empty</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            You don't have any items in your cart to checkout. Discover our luxury audio, techwear, and footwear collections.
          </p>
          <Link to="/products">
            <Button size="lg" className="rounded-2xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24] px-8 shadow-lg shadow-[#F5C754]/20">
              Explore Catalog
            </Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-muted/30 border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground badge-font mb-3">
            <Link to="/" className="hover:text-[#F5C754]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/cart" className="hover:text-[#F5C754]">Cart</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">Checkout</span>
          </div>

          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Secure Express Checkout
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Form Stepper */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/50 text-xs font-bold badge-font uppercase">
              <span className={step >= 1 ? 'text-[#F5C754]' : 'text-muted-foreground'}>1. Shipping Info</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className={step >= 2 ? 'text-[#F5C754]' : 'text-muted-foreground'}>2. Payment Method</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className={step >= 3 ? 'text-[#F5C754]' : 'text-muted-foreground'}>3. Order Review</span>
            </div>

            {/* Step 1: Shipping Address Form */}
            {step === 1 && (
              <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-6">
                <h3 className="text-xl font-bold text-foreground">Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Alex Vance" className="rounded-xl" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Street Address</Label>
                    <Input defaultValue="742 Evergreen Terrace" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input defaultValue="San Francisco" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>State / Province</Label>
                    <Input defaultValue="CA" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Postal Code</Label>
                    <Input defaultValue="94107" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input defaultValue="+1 (555) 234-5678" className="rounded-xl" />
                  </div>
                </div>

                <Button onClick={() => setStep(2)} size="lg" className="w-full rounded-2xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24]">
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-6">
                <h3 className="text-xl font-bold text-foreground">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={(val: any) => setPaymentMethod(val)} className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border border-border/60 bg-background cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer font-bold">
                      <CreditCard className="h-5 w-5 text-[#F5C754]" /> Credit or Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border border-border/60 bg-background cursor-pointer">
                    <RadioGroupItem value="apple" id="apple" />
                    <Label htmlFor="apple" className="flex items-center gap-2 cursor-pointer font-bold">
                      Apple Pay
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t border-border/40">
                    <div className="space-y-2">
                      <Label>Card Number</Label>
                      <Input placeholder="•••• •••• •••• 4242" className="rounded-xl font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Expiration Date</Label>
                        <Input placeholder="MM/YY" className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>CVC Security Code</Label>
                        <Input placeholder="123" className="rounded-xl" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="rounded-2xl">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} size="lg" className="flex-1 rounded-2xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24]">
                    Review Final Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-6">
                <h3 className="text-xl font-bold text-foreground">Review Order Details</h3>
                <div className="p-4 rounded-2xl bg-muted/40 text-sm space-y-2">
                  <div className="font-bold text-foreground">Shipping To:</div>
                  <div className="text-muted-foreground">Alex Vance • 742 Evergreen Terrace, San Francisco, CA 94107</div>
                </div>

                <Button onClick={handleCompleteOrder} size="lg" className="w-full rounded-2xl font-black text-base h-13 bg-[#F5C754] text-black hover:bg-[#D49B24] shadow-xl shadow-[#F5C754]/25">
                  <CheckCircle2 className="mr-2 h-5 w-5" /> Pay {formatCurrency(total)} & Complete Order
                </Button>
              </div>
            )}
          </div>

          {/* Checkout Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
              <h4 className="text-lg font-bold text-foreground border-b border-border/40 pb-3">Order Items ({items.length})</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img src={product.thumbnail} alt={product.title} className="h-12 w-12 rounded-xl object-cover bg-muted border border-border/40" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-foreground truncate">{product.title}</div>
                      <div className="text-xs text-muted-foreground">Qty: {quantity}</div>
                    </div>
                    <div className="text-xs font-bold text-foreground">{formatCurrency(product.price * quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border/40 pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-bold text-foreground">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span className="font-bold text-foreground">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-400">{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-border/40 pt-3 text-lg font-extrabold text-foreground">
                  <span>Total</span>
                  <span className="text-[#F5C754] font-black">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
