import { useState, useEffect } from 'react';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { mockProducts } from '@/data/products';
import { PriceBadge } from '@/components/common/PriceBadge';
import { RatingStars } from '@/components/common/RatingStars';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatCurrency } from '@/utils/currency';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
  HelpCircle,
  Zap,
  PackageCheck
} from 'lucide-react';
import { mockReviews } from '@/data/reviews';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = useParams({ from: '/products/$productId' });

  // Robust Normalized Slug & ID Matcher
  const decodedParam = decodeURIComponent(productId || '').toLowerCase().trim();
  const hyphenatedParam = decodedParam.replace(/\s+/g, '-');

  const product =
    mockProducts.find(
      (p) =>
        p.slug === hyphenatedParam ||
        p.slug === decodedParam ||
        p.id === decodedParam ||
        p.title.toLowerCase() === decodedParam
    ) || mockProducts[0];

  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Hover magnifier state
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  // Update selected image & options when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.thumbnail);
      setSelectedColor(product.colors?.[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || '');
    }
  }, [product]);

  // Track recently viewed items in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && product) {
      const saved = localStorage.getItem('novacart_recently_viewed');
      const list = saved ? JSON.parse(saved) : [];
      if (!list.includes(product.id)) {
        const updated = [product.id, ...list.slice(0, 5)];
        localStorage.setItem('novacart_recently_viewed', JSON.stringify(updated));
      }
    }
  }, [product?.id]);

  // Show sticky purchase bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMagnifierPos({ x, y });
  };

  // Frequently bought together bundle calculation
  const bundleProduct = mockProducts.find((p) => p.id !== product.id && p.category === 'audio') || mockProducts[1];
  const bundleTotal = Math.round((product.price + bundleProduct.price) * 0.9); // 10% bundle discount

  const handleAddBundleToCart = () => {
    addItem(product, 1, selectedColor, selectedSize);
    addItem(bundleProduct, 1);
    toast.success('Bundle added to cart! Saved 10%.');
  };

  const relatedProducts = mockProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <PublicLayout>
      {/* Sticky Bottom Purchase Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 py-3 px-4 sm:px-8 shadow-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img src={product.thumbnail} alt={product.title} className="h-10 w-10 rounded-xl object-cover bg-muted border border-border/40 hidden sm:block" />
              <div>
                <h4 className="text-sm font-bold text-foreground line-clamp-1">{product.title}</h4>
                <span className="text-xs text-[#F5C754] font-bold">{formatCurrency(product.price)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => addItem(product, quantity, selectedColor, selectedSize)}
                className="rounded-xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24] text-xs px-4"
              >
                <ShoppingBag className="mr-1 h-3.5 w-3.5" /> Add to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleWishlist(product)}
                className="rounded-xl h-9 w-9 p-0"
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb Header */}
      <div className="bg-muted/30 border-b border-border/30 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground badge-font">
              <Link to="/" className="hover:text-[#F5C754]">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/products" className="hover:text-[#F5C754]">Products</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-semibold truncate max-w-xs">{product.title}</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Product link copied to clipboard!');
              }}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image Gallery with Hover Magnifier */}
          <div className="space-y-4">
            <div
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border/50 bg-card shadow-lg cursor-crosshair group"
            >
              <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />

              {/* Hover Magnifier Lens */}
              {isHoveringImage && (
                <div
                  className="absolute inset-0 pointer-events-none bg-no-repeat rounded-3xl"
                  style={{
                    backgroundImage: `url(${selectedImage || product.thumbnail})`,
                    backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                    backgroundSize: '220%',
                  }}
                />
              )}

              {product.isFlashDeal && (
                <span className="absolute top-4 left-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-black uppercase badge-font shadow-md">
                  Flash Deal
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                    selectedImage === img ? 'border-[#F5C754] ring-2 ring-[#F5C754]/20' : 'border-border/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#F5C754] font-bold badge-font uppercase tracking-wider mb-2">
                <span>{product.brand}</span>
                <span>{product.categoryName}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {product.title}
              </h1>

              <div className="mt-3 flex items-center gap-4">
                <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
                <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-card border border-border/40 flex items-center justify-between">
              <PriceBadge
                price={product.price}
                originalPrice={product.originalPrice}
                discountPercentage={product.discountPercentage}
                size="lg"
              />
              <span className="text-xs text-muted-foreground badge-font">Inclusive of all taxes</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Color Swatch Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold badge-font uppercase text-muted-foreground">
                  Select Color: <span className="text-foreground">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                        selectedColor === c.name
                          ? 'border-[#F5C754] bg-[#F5C754]/10 text-[#F5C754] shadow-sm'
                          : 'border-border/60 hover:border-foreground/40 text-muted-foreground'
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold badge-font uppercase text-muted-foreground">
                  Select Size: <span className="text-foreground">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                        selectedSize === s
                          ? 'border-[#F5C754] bg-[#F5C754] text-black'
                          : 'border-border/60 hover:border-foreground/40 text-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Main Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/40">
              <div className="flex items-center rounded-xl border border-border/60 bg-card p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted rounded-lg text-muted-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm badge-font">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-muted rounded-lg text-muted-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                onClick={() => addItem(product, quantity, selectedColor, selectedSize)}
                className="flex-1 rounded-2xl font-bold h-12 bg-[#F5C754] text-black hover:bg-[#D49B24] shadow-xl shadow-[#F5C754]/20"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={() => toggleWishlist(product)}
                className="h-12 w-12 rounded-2xl"
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </Button>
            </div>

            {/* Guarantees List */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-xs text-muted-foreground border-t border-border/30">
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-[#F5C754]" /> Free Express Shipping
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> 2-Year Warranty
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="h-4 w-4 text-indigo-500" /> 30-Day Easy Returns
              </div>
            </div>
          </div>
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER BUNDLE WIDGET */}
        {bundleProduct && (
          <div className="rounded-3xl border border-[#F5C754]/20 bg-gradient-to-r from-[#F5C754]/5 via-card to-card p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400 fill-amber-400" />
              <h3 className="text-xl font-bold text-foreground">Frequently Bought Together</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-4">
                <img src={product.thumbnail} alt={product.title} className="h-20 w-20 rounded-2xl object-cover bg-muted border border-border/40" />
                <Plus className="h-5 w-5 text-muted-foreground" />
                <img src={bundleProduct.thumbnail} alt={bundleProduct.title} className="h-20 w-20 rounded-2xl object-cover bg-muted border border-border/40" />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-foreground">{product.title} + {bundleProduct.title}</div>
                  <div className="text-xs text-emerald-500 font-bold badge-font">Save 10% on bundle checkout</div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div>
                  <div className="text-xs text-muted-foreground">Bundle Total</div>
                  <div className="text-xl font-extrabold text-foreground">{formatCurrency(bundleTotal)}</div>
                </div>
                <Button onClick={handleAddBundleToCart} className="rounded-2xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24]">
                  Add Both to Cart
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* SPECIFICATIONS & REVIEWS & Q&A TABS */}
        <div>
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="rounded-2xl bg-card border border-border/50 p-1 mb-6">
              <TabsTrigger value="specs" className="rounded-xl font-bold text-xs">Technical Specs</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-xl font-bold text-xs">Customer Reviews ({mockReviews.length})</TabsTrigger>
              <TabsTrigger value="qa" className="rounded-xl font-bold text-xs">Questions & Answers</TabsTrigger>
            </TabsList>

            <TabsContent value="specs">
              <div className="rounded-3xl border border-border/50 bg-card p-6 divide-y divide-border/40">
                {product.specs?.map((spec) => (
                  <div key={spec.name} className="flex justify-between py-3.5 text-sm">
                    <span className="font-semibold text-muted-foreground">{spec.name}</span>
                    <span className="font-bold text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="rounded-3xl border border-border/50 bg-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center space-y-1">
                  <div className="text-5xl font-black text-foreground tracking-tight">{product.rating.toFixed(1)}</div>
                  <RatingStars rating={product.rating} showCount={false} size="lg" />
                  <div className="text-xs text-muted-foreground">Based on {product.reviewCount} reviews</div>
                </div>

                <div className="md:col-span-2 space-y-2 text-xs">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-12 font-bold badge-font text-muted-foreground">{star} Stars</span>
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: star === 5 ? '82%' : star === 4 ? '14%' : '4%' }}
                        />
                      </div>
                      <span className="w-8 text-right font-bold text-muted-foreground">
                        {star === 5 ? '82%' : star === 4 ? '14%' : '4%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {mockReviews.map((rev) => (
                  <div key={rev.id} className="rounded-3xl border border-border/50 bg-card p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.avatar} alt={rev.author} className="h-8 w-8 rounded-full object-cover" />
                        <span className="font-bold text-foreground text-sm">{rev.author}</span>
                      </div>
                      <RatingStars rating={rev.rating} showCount={false} />
                    </div>
                    <h5 className="font-bold text-foreground">{rev.title}</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="qa">
              <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold text-sm">Is this product covered by official manufacturer warranty?</AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground">
                      Yes, all items sold on Luxora come with 2-year official manufacturer warranty and 30-day hassle-free replacement.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-bold text-sm">What is the estimated express shipping timeframe?</AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground">
                      Orders placed before 2 PM EST are dispatched same-day with 2-3 business day express delivery.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* RELATED PRODUCTS GRID */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
