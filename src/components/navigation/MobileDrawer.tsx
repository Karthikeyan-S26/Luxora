import { Link } from '@tanstack/react-router';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { User, LogOut, Shield, Heart, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-80 p-6 flex flex-col justify-between bg-card border-r border-border/50">
        <div>
          <SheetHeader className="pb-6 border-b border-border/40 text-left">
            <SheetTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-lg">
                N
              </span>
              {SITE_CONFIG.name}
            </SheetTitle>
          </SheetHeader>

          <nav className="py-6 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className="block text-base font-semibold text-foreground/80 hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-muted/50"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground badge-font uppercase">Theme</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 mr-1.5" /> : <Moon className="h-4 w-4 mr-1.5" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>

          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/40">
                <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground truncate">{user?.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link to="/profile" onClick={onClose}>
                  <Button variant="outline" size="sm" className="w-full justify-start rounded-xl">
                    <User className="mr-1.5 h-3.5 w-3.5" /> Profile
                  </Button>
                </Link>
                <Link to="/wishlist" onClick={onClose}>
                  <Button variant="outline" size="sm" className="w-full justify-start rounded-xl">
                    <Heart className="mr-1.5 h-3.5 w-3.5" /> Wishlist
                  </Button>
                </Link>
              </div>

              {isAdmin && (
                <Link to="/admin" onClick={onClose}>
                  <Button variant="secondary" size="sm" className="w-full justify-start rounded-xl text-primary font-bold">
                    <Shield className="mr-1.5 h-3.5 w-3.5" /> Admin Dashboard
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl"
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" /> Log Out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/auth/login" onClick={onClose}>
                <Button className="w-full rounded-xl">Sign In</Button>
              </Link>
              <Link to="/auth/register" onClick={onClose}>
                <Button variant="outline" className="w-full rounded-xl">Create Account</Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
