export const SITE_CONFIG = {
  name: 'Luxora',
  tagline: 'Elevated Living. Intelligent Commerce.',
  description:
    'Luxora curates hyper-engineered acoustics, spatial computing devices, and architectural lifestyle essentials designed for modern pioneers.',
  url: 'https://luxora.store',
  ogImage: 'https://luxora.store/og.jpg',
  announcement: '✨ Complimented Express Shipping on all global orders over $150 • Code: LUXORA150',
  supportEmail: 'concierge@luxora.store',
  supportPhone: '+1 (800) 892-5896',
};

export const NAV_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Catalog', href: '/products' },
  { title: 'Brand Story', href: '/about' },
  { title: 'Saved Items', href: '/wishlist' },
  { title: 'Orders', href: '/orders' },
];

export const FOOTER_LINKS = {
  shop: [
    { title: 'All Products', href: '/products' },
    { title: 'Featured Acoustics', href: '/products?category=audio' },
    { title: 'Workstations', href: '/products?category=electronics' },
    { title: 'Performance Shoes', href: '/products?category=footwear' },
  ],
  company: [
    { title: 'Brand Story', href: '/about' },
    { title: 'Architectural Standards', href: '/about' },
    { title: 'Sustainability', href: '/about' },
    { title: 'Careers', href: '/about' },
  ],
  support: [
    { title: 'Concierge Help Center', href: '/profile' },
    { title: 'Order Tracker', href: '/orders' },
    { title: 'Shipping Policy', href: '/' },
    { title: 'Privacy Guarantee', href: '/' },
  ],
};

export const HERO_SLIDES = [
  {
    id: 1,
    badge: 'Spatial Acoustics',
    title: 'Acoustic Mastery Milled to Precision',
    subtitle: 'Custom 40mm titanium drivers with active room calibration and 35-hour battery performance.',
    ctaText: 'Explore Acoustics',
    ctaLink: '/products',
    secondaryCtaText: 'Read Architecture Story',
    secondaryCtaLink: '/about',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    highlightPrice: '$399',
  },
  {
    id: 2,
    badge: 'Neural Workstations',
    title: 'Uncompromised Computing Power',
    subtitle: 'M3 Max 16-Core silicon engineered for machine learning, spatial rendering, and extreme code compilation.',
    ctaText: 'View Workstations',
    ctaLink: '/products',
    secondaryCtaText: 'Compare Models',
    secondaryCtaLink: '/products',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200',
    highlightPrice: '$2,899',
  },
];

export const BRAND_VALUES = [
  {
    title: 'Architectural Precision',
    description: 'Every product in the Luxora ecosystem undergoes 400+ points of structural testing and acoustic tuning.',
    icon: 'Compass',
  },
  {
    title: 'Zero-Carbon Logistics',
    description: '100% climate-neutral air freight and eco-friendly recyclable titanium packaging.',
    icon: 'Leaf',
  },
  {
    title: 'Lifetime Concierge',
    description: 'Dedicated 24/7 technical advisory, priority repair service, and seamless device upgrades.',
    icon: 'ShieldCheck',
  },
];
