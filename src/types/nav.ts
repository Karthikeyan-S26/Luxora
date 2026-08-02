export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  icon?: string;
}

export interface MegaCategory {
  title: string;
  slug: string;
  items: NavItem[];
  featuredProduct?: {
    title: string;
    description: string;
    image: string;
    href: string;
    badge?: string;
  };
}
