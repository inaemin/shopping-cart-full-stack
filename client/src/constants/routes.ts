export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

export const ROUTES = {
  CART: "/cart",
  ORDER_CONFIRM: "/order-confirm",
} as const;
