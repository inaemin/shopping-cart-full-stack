export type newCartItem = Omit<CartItem, "id">;
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}
