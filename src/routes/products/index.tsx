import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { mockProducts } from '@/data/products';
import { mockCategories } from '@/data/categories';
import { mockBrands } from '@/data/brands';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { EmptyState } from '@/components/common/EmptyState';
import { SlidersHorizontal, ChevronRight, Search, Check, RotateCcw } from 'lucide-react';

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
});

function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter logic
  const filteredProducts = mockProducts
    .filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (selectedColor !== 'all' && p.colors && !p.colors.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase())) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      return 0;
    });

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMaxPrice(3000);
    setInStockOnly(false);
    setSelectedColor('all');
    setSortBy('featured');
  };

  return (
    <PublicLayout>
      {/* Header & Breadcrumb */}
      <div className="bg-muted/30 border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground badge-font mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Products Catalog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                All Products Catalog
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Showing {filteredProducts.length} items with smart filters and instant sorting.
              </p>
            </div>

            {/* Live Filter Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by name or brand..."
                className="pl-9 rounded-xl border-border/60 bg-card h-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Advanced Filter Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" /> Smart Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Categories Filter */}
              <div className="space-y-3">
                <Label className="text-xs font-bold badge-font uppercase text-muted-foreground">
                  Category
                </Label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-primary-foreground font-bold'
                        : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    All Categories
                  </button>
                  {mockCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] badge-font">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 pt-3 border-t border-border/40">
                <Label className="text-xs font-bold badge-font uppercase text-muted-foreground">
                  Brand
                </Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-full rounded-xl border-border/60 text-xs font-bold">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Brands</SelectItem>
                    {mockBrands.map((b) => (
                      <SelectItem key={b.id} value={b.name.toLowerCase()}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Max Price Range Slider */}
              <div className="space-y-3 pt-3 border-t border-border/40">
                <div className="flex justify-between items-center text-xs font-bold badge-font uppercase text-muted-foreground">
                  <span>Max Price</span>
                  <span className="text-primary font-bold">${maxPrice}</span>
                </div>
                <Slider
                  value={[maxPrice]}
                  min={50}
                  max={3000}
                  step={50}
                  onValueChange={(val) => setMaxPrice(val[0])}
                  className="py-2"
                />
              </div>

              {/* In Stock Toggle */}
              <div className="flex items-center space-x-2 pt-3 border-t border-border/40">
                <Checkbox
                  id="stock-only"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(!!checked)}
                />
                <Label htmlFor="stock-only" className="text-xs font-bold cursor-pointer text-foreground">
                  In Stock Items Only
                </Label>
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting Toolbar */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm">
              <span className="text-xs font-semibold text-muted-foreground badge-font uppercase">
                {filteredProducts.length} Products Found
              </span>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Sort By:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 rounded-xl border-border/60 bg-card text-xs font-bold">
                    <SelectValue placeholder="Sort Options" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <EmptyState
                title="No Products Match Filters"
                description="Try clearing search queries or expanding your price threshold."
                actionText="Reset All Filters"
                onAction={resetFilters}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </PublicLayout>
  );
}
