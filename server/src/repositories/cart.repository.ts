import { CartItem, newCartItem } from "../../interfaces/cart.interface.js";

const cartItems: CartItem[] = [];

export function isAlreadyExist(id: number) {
  if (cartItems.find((item) => item.id === id)) return true;
  return false;
}

export function saveNewItem(newItem: newCartItem) {
  const id = (cartItems.at(-1)?.id ?? 0) + 1;
  cartItems.push({ id, ...newItem });
}

export function updateItemQuantity(cartItem: newCartItem) {
  const existingCartItem = cartItems.find((item) => item.productId === cartItem.productId);
  if (existingCartItem) {
    existingCartItem.quantity = existingCartItem.quantity + cartItem.quantity;
  }
}

export function deleteById(id: number) {
  const index = cartItems.findIndex((item) => item.id === id);
  cartItems.splice(index, 1);
  return true;
}

export function findAll(): CartItem[] {
  return [...cartItems];
}

export function reset() {
  cartItems.length = 0;
}
