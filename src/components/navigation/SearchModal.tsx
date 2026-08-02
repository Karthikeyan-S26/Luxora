import { useState, useEffect } from 'react';
import { Search, X, TrendingUp, History, CornerDownLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { mockProducts } from '@/data/products';
import { useNavigate } from '@tanstack/react-router';
import { PriceBadge } from '@/components/common/PriceBadge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('luxora_recent_searches');
      return saved ? JSON.parse(saved) : ['NovaSound Headphones', 'M3 Max Laptop', 'Carbon Footwear'];
    }
    return [];
  });

  const filteredProducts = query.trim()
    ? mockProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (slug: string) => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const updated = [query.trim(), ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('luxora_recent_searches', JSON.stringify(updated));
    }
    onClose();
    navigate({ to: `/products/${slug}` });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }

      if (!isOpen || filteredProducts.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredProducts[selectedIndex]) {
          handleSelectProduct(filteredProducts[selectedIndex].slug);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredProducts, selectedIndex, query]);

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('luxora_recent_searches');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden rounded-3xl border border-[#F5C754]/30 bg-card/95 backdrop-blur-2xl shadow-2xl">
        <DialogTitle className="sr-only">Search Luxora Catalog</DialogTitle>
        <div className="flex items-center border-b border-border/40 px-4 py-3.5">
          <Search className="h-5 w-5 text-[#F5C754] mr-3" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search audio, laptops, footwear, or brands... (Press ↑ ↓ to navigate)"
            className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 h-11"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-muted-foreground hover:text-foreground rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {!query && (
            <div className="space-y-6">
              {/* Recent History */}
              {recentSearches.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground badge-font uppercase">
                    <span className="flex items-center gap-1.5">
                      <History className="h-3.5 w-3.5 text-[#F5C754]" /> Recent Searches
                    </span>
                    <button onClick={clearHistory} className="hover:underline text-[10px]">
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-[#F5C754]/10 hover:border-[#F5C754]/40 hover:text-[#F5C754] transition-colors flex items-center gap-1.5"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div className="space-y-3">
                <div className="flex items-center text-xs font-semibold text-muted-foreground badge-font uppercase">
                  <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-[#F5C754]" /> Trending Keywords
                </div>
                <div className="flex flex-wrap gap-2">
                  {['NovaSound', 'Spatial Audio', 'M3 Max', 'Carbon Plate', 'MagSafe Wallet'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-[#F5C754]/10 hover:border-[#F5C754]/40 hover:text-[#F5C754] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && filteredProducts.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No products found matching "{query}"
            </div>
          )}

          {query && filteredProducts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground badge-font uppercase">
                <span>Products ({filteredProducts.length})</span>
                <span className="text-[10px]">Press ↑ ↓ keys to highlight, Enter to select</span>
              </div>
              <div className="divide-y divide-border/30">
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className={`flex items-center gap-4 py-3 px-3 rounded-xl transition-colors cursor-pointer ${
                      selectedIndex === idx ? 'bg-[#F5C754]/10 border border-[#F5C754]/30' : 'hover:bg-muted/30'
                    }`}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover bg-muted border border-border/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-[#F5C754] font-bold">{product.brand}</div>
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {product.title}
                      </h4>
                    </div>
                    <PriceBadge price={product.price} originalPrice={product.originalPrice} size="sm" />
                    <CornerDownLeft className="h-4 w-4 text-muted-foreground opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
