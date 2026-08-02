import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { products, type Product } from "@/data/catalog";

type CartLine = { id: string; qty: number };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  recent: string[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  markViewed: (id: string) => void;
  items: { product: Product; qty: number }[];
  subtotal: number;
  count: number;
};

const ShopContext = createContext<ShopState | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>("lx.cart", []));
    setWishlist(read<string[]>("lx.wish", []));
    setRecent(read<string[]>("lx.recent", []));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lx.cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    window.localStorage.setItem("lx.wish", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    window.localStorage.setItem("lx.recent", JSON.stringify(recent));
  }, [recent]);

  const add = useCallback((id: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((l) => l.id === id);
      return found
        ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
        : [...c, { id, qty }];
    });
    const p = products.find((x) => x.id === id);
    toast.success("Added to bag", { description: p?.name });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.id !== id)
        : c.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
    toast("Removed from bag");
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((w) => {
      const has = w.includes(id);
      toast[has ? "message" : "success"](
        has ? "Removed from wishlist" : "Saved to wishlist",
      );
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  }, []);

  const markViewed = useCallback((id: string) => {
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const items = useMemo(
    () =>
      cart
        .map((l) => ({ product: products.find((p) => p.id === l.id)!, qty: l.qty }))
        .filter((l) => Boolean(l.product)),
    [cart],
  );

  const subtotal = useMemo(
    () => items.reduce((s, l) => s + l.product.price * l.qty, 0),
    [items],
  );
  const count = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  const value: ShopState = {
    cart,
    wishlist,
    recent,
    cartOpen,
    setCartOpen,
    add,
    setQty,
    remove,
    clear,
    toggleWish,
    markViewed,
    items,
    subtotal,
    count,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
