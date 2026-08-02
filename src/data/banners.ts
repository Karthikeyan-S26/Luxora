export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  highlightText: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image: string;
  badge?: string;
}

export const mockHeroBanners: HeroBanner[] = [
  {
    id: 'banner-1',
    badge: 'NovaCart Exclusive Release',
    title: 'Precision Sound.',
    highlightText: 'Elevated Spatial Engineering.',
    subtitle: 'Discover the all-new NovaSound Pro Max with 40mm titanium drivers and active spatial cancellation.',
    ctaText: 'Explore NovaSound',
    ctaLink: '/products/novasound-pro-max-headphones',
    secondaryCtaText: 'View All Audio',
    secondaryCtaLink: '/category/audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'banner-2',
    badge: 'Spatial Computing Arrived',
    title: 'Power Beyond',
    highlightText: 'Every Known Boundary.',
    subtitle: 'NovaBook Ultra M3 Max features liquid retina XDR and 36GB unified memory for high-density creators.',
    ctaText: 'Shop NovaBook',
    ctaLink: '/products/novabook-ultra-m3-max-16',
    secondaryCtaText: 'Explore Laptops',
    secondaryCtaLink: '/category/electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'banner-3',
    badge: 'Flash Sale: 20% Off',
    title: 'Carbon Kinetic',
    highlightText: 'Pure Propulsion.',
    subtitle: 'Full-length carbon fiber plate engineered for maximum energy return and marathon speed.',
    ctaText: 'Shop Footwear',
    ctaLink: '/category/footwear',
    secondaryCtaText: 'View Deals',
    secondaryCtaLink: '/products?sortBy=featured',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200'
  }
];
