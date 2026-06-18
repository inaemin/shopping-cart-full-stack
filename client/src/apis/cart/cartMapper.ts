import type { CartItemResponse } from "./cartSchema";
import type { CreateCheckoutRequest } from "../checkout/checkoutSchema";
import { CART_ITEM_STATUS, type CartItem } from "../../domain/cart";

export function toCartItem(item: CartItemResponse): CartItem {
  return {
    id: item.id,
    name: item.name,
    imageUrl: item.image_url,
    price: item.price,
    quantity: item.quantity,
    stock: item.stock,
    status: item.status,
  };
}

export function toCheckoutItems(
  cartItems: CartItemResponse[],
  getItemSelection: (id: number) => boolean,
): CreateCheckoutRequest["items"] {
  return cartItems
    .filter((item) => getItemSelection(item.id) && item.status === CART_ITEM_STATUS.AVAILABLE)
    .map((item) => ({ product_id: item.id, quantity: item.quantity }));
}
