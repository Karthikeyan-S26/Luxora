import { Category } from '@/types/product';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics & Computing',
    slug: 'electronics',
    description: 'Next-generation laptops, tablets, and spatial computing devices.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    itemCount: 48,
    featured: true,
    subcategories: [
      { name: 'Laptops', slug: 'laptops' },
      { name: 'Tablets', slug: 'tablets' },
      { name: 'Monitors', slug: 'monitors' },
      { name: 'Accessories', slug: 'computing-accessories' },
    ]
  },
  {
    id: 'cat-2',
    name: 'Premium Audio',
    slug: 'audio',
    description: 'Noise-canceling headphones, studio monitors, and lossless wireless acoustics.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    itemCount: 32,
    featured: true,
    subcategories: [
      { name: 'Over-Ear Headphones', slug: 'headphones' },
      { name: 'Wireless Earbuds', slug: 'earbuds' },
      { name: 'Bluetooth Speakers', slug: 'speakers' },
      { name: 'Soundbars', slug: 'soundbars' },
    ]
  },
  {
    id: 'cat-3',
    name: 'Smart Wearables',
    slug: 'wearables',
    description: 'Precision health trackers, luxury smartwatches, and spatial accessories.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    itemCount: 26,
    featured: true,
    subcategories: [
      { name: 'Smartwatches', slug: 'smartwatches' },
      { name: 'Fitness Bands', slug: 'fitness-bands' },
      { name: 'Smart Rings', slug: 'smart-rings' },
    ]
  },
  {
    id: 'cat-4',
    name: 'Performance Footwear',
    slug: 'footwear',
    description: 'Architectural sneakers, ergonomic running shoes, and luxury boots.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    itemCount: 64,
    featured: true,
    subcategories: [
      { name: 'Running Shoes', slug: 'running' },
      { name: 'Lifestyle Sneakers', slug: 'lifestyle-sneakers' },
      { name: 'Basketball Shoes', slug: 'basketball' },
    ]
  },
  {
    id: 'cat-5',
    name: 'Modern Apparel',
    slug: 'fashion',
    description: 'Minimalist techwear, tailored outerwear, and sustainable essentials.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800',
    itemCount: 52,
    featured: false,
    subcategories: [
      { name: 'Jackets & Coats', slug: 'jackets' },
      { name: 'Hoodies & Sweatshirts', slug: 'hoodies' },
      { name: 'Performance Pants', slug: 'pants' },
    ]
  },
  {
    id: 'cat-6',
    name: 'Everyday Accessories',
    slug: 'accessories',
    description: 'Minimalist leather goods, magnetic chargers, and daily carry tech bags.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    itemCount: 39,
    featured: false,
    subcategories: [
      { name: 'Backpacks', slug: 'backpacks' },
      { name: 'Wallets', slug: 'wallets' },
      { name: 'Charging Docks', slug: 'chargers' },
    ]
  }
];
