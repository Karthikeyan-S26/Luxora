export type ProductCategory = 
  | 'electronics'
  | 'audio'
  | 'wearables'
  | 'footwear'
  | 'fashion'
  | 'accessories';

export interface Category {
  id: string;
  name: string;
  slug: ProductCategory;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
  subcategories?: { name: string; slug: string }[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  featured?: boolean;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  category: ProductCategory;
  categoryName: string;
  brand: string;
  images: string[];
  thumbnail: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  tags: string[];
  specs: ProductSpec[];
}

export interface ProductFilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  brands: string[];
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  searchQuery: string;
}
