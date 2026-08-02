import { useState } from 'react';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { mockCategories } from '@/data/categories';
import { mockProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/category/$categorySlug')({
  component: CategoryPage,
});

function CategoryPage() {
  const { categorySlug } = useParams({ from: '/category/$categorySlug' });
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  const category = mockCategories.find((c) => c.slug === categorySlug) || mockCategories[0];

  const filteredProducts = mockProducts.filter((p) => {
    if (p.category !== categorySlug) return false;
    if (selectedSubcategory !== 'all' && p.tags && !p.tags.includes(selectedSubcategory.toLowerCase())) return false;
    return true;
  });

  return (
    <PublicLayout>
      {/* Category Banner */}
      <div className="relative overflow-hidden bg-card border-b border-border/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground badge-font">
            <Link to="/" className="hover:text-[#F5C754]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/products" className="hover:text-[#F5C754]">Categories</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">{category.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center rounded-full bg-[#F5C754]/10 border border-[#F5C754]/20 px-3 py-0.5 text-xs font-bold text-[#F5C754] badge-font uppercase">
                {category.itemCount} Items Available
              </span>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
                {category.name}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>

            <img
              src={category.image}
              alt={category.name}
              className="h-40 w-full md:w-64 rounded-2xl object-cover border border border-[#F5C754]/20 shadow-lg"
            />
          </div>

          {/* Subcategory Pills */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  selectedSubcategory === 'all'
                    ? 'bg-[#F5C754] text-black shadow-md shadow-[#F5C754]/20'
                    : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                All {category.name}
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => setSelectedSubcategory(sub.slug)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    selectedSubcategory === sub.slug
                      ? 'bg-[#F5C754] text-black shadow-md shadow-[#F5C754]/20'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <EmptyState
            title={`No products in ${category.name} match selection`}
            description="Try selecting a different subcategory filter or browse all catalog products."
            actionText="Explore All Products"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
