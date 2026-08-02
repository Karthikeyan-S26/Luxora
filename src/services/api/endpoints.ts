/**
 * NovaCart Laravel REST API Endpoints Contract
 */

export const API_ENDPOINTS = {
  // Authentication (Sanctum)
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    USER: '/auth/user',
    CSRF: '/sanctum/csrf-cookie',
  },
  // Products Catalog
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (slugOrId: string) => `/products/${slugOrId}`,
    CATEGORIES: '/categories',
    BRANDS: '/brands',
    REVIEWS: (productId: string) => `/products/${productId}/reviews`,
  },
  // Cart & Checkout
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    UPDATE: (itemId: string) => `/cart/items/${itemId}`,
    REMOVE: (itemId: string) => `/cart/items/${itemId}`,
    APPLY_PROMO: '/cart/promo',
  },
  // Orders & Wishlist
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: (orderId: string) => `/orders/${orderId}`,
    TRACK: (orderId: string) => `/orders/${orderId}/track`,
  },
  WISHLIST: {
    GET: '/wishlist',
    TOGGLE: '/wishlist/toggle',
  },
  // Admin Management
  ADMIN: {
    ANALYTICS: '/admin/analytics',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    CUSTOMERS: '/admin/customers',
  },
};
