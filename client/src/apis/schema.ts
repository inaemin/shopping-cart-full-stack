export interface CartItemResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface GetCartResponse {
  data: CartItemResponse[];
}

export interface PatchCartItemRequest {
  quantity: number;
}
