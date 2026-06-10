export const CART_ITEM_STATUS = {
  AVAILABLE: "available",
  OUT_OF_STOCK: "outOfStock",
  QUANTITY_EXCEEDED: "quantityExceeded",
} as const;

export type CartItemStatus = (typeof CART_ITEM_STATUS)[keyof typeof CART_ITEM_STATUS];

export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  stock: number;
  status: CartItemStatus;
  isSelected: boolean;
  errorMsg?: string;
}

export interface OrderSummary {
  cartItemCount: number;
  totalQuantity: number;
  totalAmount: number;
}
