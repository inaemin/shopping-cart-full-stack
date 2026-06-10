import type { CartItemStatus } from "../types/cart";

export interface CartItemResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
  status: CartItemStatus;
}

export interface GetCartResponse {
  data: CartItemResponse[];
}

export interface PatchCartItemRequest {
  quantity: number;
}
