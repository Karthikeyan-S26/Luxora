import { Link } from '@tanstack/react-router';
import { Category } from '@/types/product';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-md transition-all hover:shadow-xl dark:hover:border-primary/40"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted mb-4">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

          <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-md text-foreground shadow-md transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <span className="text-xs font-semibold text-muted-foreground badge-font">
              {category.itemCount} Items
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {category.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
