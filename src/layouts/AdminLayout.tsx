import { ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft, Shield, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const adminNav = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Customers', href: '/admin/customers', icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-lg">
              N
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground tracking-tight">{SITE_CONFIG.name}</h3>
              <p className="text-[10px] text-primary font-bold badge-font uppercase">Admin Workspace</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {adminNav.map((item) => {
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
          </nav>
        </div>

        <div className="pt-6 border-t border-border/40 space-y-3">
          <Link to="/">
            <Button variant="outline" className="w-full justify-start rounded-xl font-bold text-xs">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Store
            </Button>
          </Link>
        </div>
      </aside>

      {/* Admin Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-20 border-b border-border/50 bg-card/60 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">Management Console</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="rounded-xl">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm badge-font">
              AD
            </div>
          </div>
        </header>

        {/* Viewport Outlet */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
