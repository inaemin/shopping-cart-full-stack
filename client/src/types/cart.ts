export type CartItemStatus = "available" | "outOfStock" | "quantityExceeded";

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
