import { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { WishlistProvider } from './WishlistProvider';
import { Toaster } from '@/components/ui/sonner';

export function AppProvider({
  children,
  queryClient
}: {
  children: ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
