export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const API_ENDPOINTS = {
  CART: "/cart",
  CART_ITEM: (id: number) => `/cart/${id}`,
} as const;
