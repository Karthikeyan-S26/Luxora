import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Keyboard, Search, ShoppingBag, Home, PackageCheck, Command } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsCartDrawerOpen } = useCart();

  const isModalOpen = isOpen !== undefined ? isOpen : open;
  const handleClose = onClose || (() => setOpen(false));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Modal via Shift + Alt + Z
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      // Hotkey: Shift + Alt + C -> Open Cart
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsCartDrawerOpen(true);
      }

      // Hotkey: Shift + Alt + H -> Navigate Home
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        navigate({ to: '/' });
      }

      // Hotkey: Shift + Alt + O -> Navigate Orders
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        navigate({ to: '/orders' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, setIsCartDrawerOpen]);

  const shortcuts = [
    { key: 'Alt + /', action: 'Search Catalog', icon: Search },
    { key: 'Shift + Alt + C', action: 'Open Shopping Cart', icon: ShoppingBag },
    { key: 'Shift + Alt + H', action: 'Go to Home', icon: Home },
    { key: 'Shift + Alt + O', action: 'Go to Orders', icon: PackageCheck },
    { key: 'Shift + Alt + Z', action: 'Show/Hide Shortcuts', icon: Keyboard },
  ];

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-3xl border border-[#F5C754]/30 bg-card/98 backdrop-blur-2xl p-6 shadow-2xl">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-xl font-black text-foreground flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#F5C754]/10 text-[#F5C754]">
              <Keyboard className="h-5 w-5" />
            </div>
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Navigate Luxora at lightning speed using your keyboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2.5 pt-4 border-t border-border/40">
          {shortcuts.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.key} className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/30">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-[#F5C754]" />
                  <span className="text-xs font-bold text-foreground">{s.action}</span>
                </div>
                <kbd className="h-6 px-2.5 rounded-lg border border-border/80 bg-black/60 font-mono text-[10px] font-bold text-[#F5C754] flex items-center">
                  {s.key}
                </kbd>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
