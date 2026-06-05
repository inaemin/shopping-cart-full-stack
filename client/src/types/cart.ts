export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  isSelected: boolean;
  isAvailable: boolean;
  errorMsg?: string;
}

export interface OrderSummary {
  cartItemCount: number;
  totalQuantity: number;
  totalAmount: number;
}
