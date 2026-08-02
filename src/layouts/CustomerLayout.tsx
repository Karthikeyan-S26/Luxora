import { ReactNode } from 'react';
import { PublicLayout } from './PublicLayout';
import { Link, useLocation } from '@tanstack/react-router';
import { User, PackageCheck, Heart, MapPin, Shield, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function CustomerLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  const customerNav = [
    { label: 'Profile Settings', href: '/profile', icon: User },
    { label: 'My Orders', href: '/orders', icon: PackageCheck },
    { label: 'Saved Wishlist', href: '/wishlist', icon: Heart },
  ];

  return (
    <PublicLayout>
      <div className="bg-muted/30 border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground badge-font mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Account Dashboard</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-primary/20 shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">{user?.name}</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-bold text-primary badge-font uppercase">
              Verified Customer
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Customer Navigation Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <div className="rounded-3xl border border-border/50 bg-card p-3 shadow-sm space-y-1">
              {customerNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Main Account Viewport */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </PublicLayout>
  );
}
