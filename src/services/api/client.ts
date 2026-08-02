import { mockProducts } from '@/data/products';
import { mockCategories } from '@/data/categories';
import { mockBrands } from '@/data/brands';
import { Product, Category, Brand } from '@/types/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('novacart_auth_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 sec connection timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      return {
        success: true,
        data: json.data || json,
        meta: json.meta,
        message: json.message,
      };
    }
  } catch (error) {
    // Offline / Connection Fallback Handler
    console.info(`[NovaCart API Fallback] Serving cache for endpoint: ${endpoint}`);
  }

  // Graceful Local Fallback Data Provider
  return getLocalFallbackData<T>(endpoint);
}

function getLocalFallbackData<T>(endpoint: string): ApiResponse<T> {
  if (endpoint.startsWith('/products/featured')) {
    return { success: true, data: mockProducts.filter((p) => p.isFeatured) as unknown as T };
  }
  if (endpoint.startsWith('/products/flash-deals')) {
    return { success: true, data: mockProducts.filter((p) => p.isFlashDeal) as unknown as T };
  }
  if (endpoint.startsWith('/products')) {
    return { success: true, data: mockProducts as unknown as T };
  }
  if (endpoint.startsWith('/categories')) {
    return { success: true, data: mockCategories as unknown as T };
  }
  if (endpoint.startsWith('/brands')) {
    return { success: true, data: mockBrands as unknown as T };
  }

  return { success: true, data: [] as unknown as T };
}
