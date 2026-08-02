import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { LuxoraLogo } from '@/components/common/LuxoraLogo';
import { SearchModal } from './SearchModal';
import { MegaMenu } from './MegaMenu';
import { MobileDrawer } from './MobileDrawer';
import { WishlistDrawer } from '@/components/wishlist-drawer';
import { KeyboardShortcutsModal } from '@/components/common/KeyboardShortcutsModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  ChevronDown,
  Shield,
  LogOut,
  Sun,
  Moon,
  PackageCheck,
  MapPin,
  Keyboard,
} from 'lucide-react';
import { toast } from 'sonner';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [pincode, setPincode] = useState('605007');
  const [city, setCity] = useState('Puducherry');
  const [tempPincode, setTempPincode] = useState('');

  const { itemCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout, switchRole } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdatePincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim()) {
      setPincode(tempPincode.trim());
      setIsLocationModalOpen(false);
      toast.success(`Delivery location updated to ${tempPincode.trim()}`);
    }
  };

  return (
    <>
      {/* Top Announcement & Delivery Location Bar */}
      <div className="bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#1c1917] border-b border-[#F5C754]/20 px-4 py-2 text-xs font-semibold text-[#F5C754] tracking-wider flex items-center justify-between">
        {/* Delivery Location Selector */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          <MapPin className="h-3.5 w-3.5 text-[#F5C754]" />
          <span>Delivering to <span className="font-bold underline">{city} {pincode}</span></span>
        </button>

        {/* Announcement Message */}
        <div className="hidden md:flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 5 0 C 5 3.5 3.5 5 0 5 C 3.5 5 5 6.5 5 10 C 5 6.5 6.5 5 10 5 C 6.5 5 5 3.5 5 0 Z" fill="#F5C754" />
          </svg>
          <span>{SITE_CONFIG.announcement}</span>
        </div>

        {/* Hotkeys Dialog Trigger */}
        <button
          onClick={() => setIsShortcutsOpen(true)}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Keyboard className="h-3.5 w-3.5 text-[#F5C754]" />
          <span className="hidden sm:inline">Shortcuts</span>
          <kbd className="h-4 px-1 rounded bg-black/60 font-mono text-[9px]">Shift+Alt+Z</kbd>
        </button>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass bg-background/90 shadow-2xl border-b border-[#F5C754]/20 backdrop-blur-xl'
            : 'bg-background border-b border-border/20'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-foreground hover:bg-muted/50 rounded-xl"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link to="/" className="flex items-center group">
              <LuxoraLogo size="md" badgeStyle="squircle" showWordmark={true} />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-bold text-foreground/90 hover:text-[#F5C754] transition-colors rounded-xl hover:bg-muted/40"
            >
              Home
            </Link>

            {/* Mega Menu Category Trigger */}
            <div
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="relative"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-foreground/90 hover:text-[#F5C754] transition-colors rounded-xl hover:bg-muted/40"
              >
                Catalog
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#F5C754]' : ''}`} />
              </Link>

              {isMegaMenuOpen && <MegaMenu />}
            </div>

            {NAV_LINKS.slice(2).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm font-bold text-foreground/90 hover:text-[#F5C754] transition-colors rounded-xl hover:bg-muted/40"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-border/50 bg-card/60 px-3.5 py-2 text-xs text-muted-foreground hover:border-[#F5C754]/40 hover:text-foreground transition-all shadow-sm"
              aria-label="Search catalog items"
            >
              <Search className="h-4 w-4 text-[#F5C754]" />
              <span className="hidden sm:inline-block font-bold">Search...</span>
              <kbd className="hidden md:inline-flex h-5 items-center rounded border border-border/80 bg-muted px-1.5 font-mono text-[10px] font-bold text-muted-foreground">
                Alt+/
              </kbd>
            </button>

            {/* Theme Switcher Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10 rounded-2xl text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-600" />}
            </Button>

            {/* Wishlist Drawer Trigger */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="relative h-10 w-10 rounded-2xl text-muted-foreground hover:text-foreground"
              aria-label="View saved wishlist items drawer"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-extrabold text-black shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Button>

            {/* Cart Icon Drawer Trigger */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative h-10 w-10 rounded-2xl text-muted-foreground hover:text-foreground"
              aria-label="View shopping bag drawer"
            >
              <ShoppingBag className="h-5 w-5 text-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C754] text-[10px] font-black text-black shadow-md animate-pulse">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* User Profile Dropdown */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 p-1 rounded-full border border-[#F5C754]/40 hover:border-[#F5C754] transition-colors focus:outline-none ml-1"
                    aria-label="User account profile menu"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border border-[#F5C754]/30 bg-card/95 backdrop-blur-xl shadow-2xl">
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-foreground leading-none">{user?.name}</p>
                      <p className="text-xs text-muted-foreground leading-none">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-[#F5C754]" /> Profile Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/orders" className="flex items-center">
                      <PackageCheck className="mr-2 h-4 w-4 text-amber-500" /> My Orders
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/wishlist" className="flex items-center">
                      <Heart className="mr-2 h-4 w-4 text-rose-500" /> Saved Wishlist
                    </Link>
                  </DropdownMenuItem>

                  {isAdmin ? (
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer bg-[#F5C754]/10 text-[#F5C754] font-bold">
                      <Link to="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" /> Admin Portal
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => switchRole('admin')}
                      className="rounded-xl cursor-pointer text-xs text-muted-foreground"
                    >
                      <Shield className="mr-2 h-4 w-4" /> Switch to Admin View
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="rounded-xl cursor-pointer text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth/login">
                <Button size="sm" className="rounded-xl px-5 font-extrabold bg-gradient-to-r from-[#F5C754] to-[#D49B24] text-black hover:brightness-110 shadow-lg shadow-[#F5C754]/20 border-none">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Pincode Location Modal */}
      <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
        <DialogContent className="max-w-md rounded-3xl border border-[#F5C754]/30 bg-card/98 backdrop-blur-2xl p-6 shadow-2xl">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-xl font-black text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#F5C754]" /> Choose Location
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Enter your Pincode to view delivery availability and shipping speed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdatePincode} className="space-y-4 pt-4">
            <Input
              type="text"
              placeholder="Enter 6-digit Pincode (e.g. 605007)"
              value={tempPincode}
              onChange={(e) => setTempPincode(e.target.value)}
              className="rounded-xl border border-border/60 bg-muted/30 font-bold"
              maxLength={6}
            />
            <Button type="submit" className="w-full rounded-xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24]">
              Apply Pincode
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Global Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileDrawer isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      <WishlistDrawer isOpen={isWishlistDrawerOpen} onClose={() => setIsWishlistDrawerOpen(false)} />
      <KeyboardShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </>
  );
}
