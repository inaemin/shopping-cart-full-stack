import { CartItem, newCartItem } from "../interfaces/cart.interface.js";

const initialCartItems: CartItem[] = [
  { id: 1, productId: 1, quantity: 2 },
  { id: 2, productId: 2, quantity: 1 },
  { id: 3, productId: 3, quantity: 1 },
  { id: 4, productId: 4, quantity: 5 },
];

const cartItems: CartItem[] = [...initialCartItems];

export function isAlreadyExist(id: number) {
  if (cartItems.find((item) => item.id === id)) return true;
  return false;
}

export function saveNewItem(newItem: newCartItem) {
  const id = (cartItems.at(-1)?.id ?? 0) + 1;
  cartItems.push({ id, ...newItem });
}

export function updateItemQuantity(id: number, quantity: number) {
  const existingCartItem = cartItems.find((item) => item.id === id);
  if (existingCartItem) {
    existingCartItem.quantity = quantity;
  }
}

export function deleteById(id: number) {
  const index = cartItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }
  cartItems.splice(index, 1);
  return true;
}

export function deleteByProductId(productId: number) {
  const index = cartItems.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  return true;
}

export function findAll(): CartItem[] {
  return [...cartItems];
}

export function findProductIdById(id: number) {
  const index = cartItems.find((item) => item.id === id);
  if (index) {
    return index.productId;
  }
  return -1;
}

export function findQuantityById(id: number) {
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    return item.quantity;
  }
  return -1;
}

export function reset() {
  cartItems.length = 0;
}
