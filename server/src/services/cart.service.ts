import { findAll, isAlreadyExist } from "../repositories/cart.repository.js";

export async function getCartItems() {
  return await findAll();
}

export async function updateCartItemQuantity(id: number, quantity: number) {
  if (!isAlreadyExist(id)) {
    return false;
  }
  updateCartItemQuantity(id, quantity);
  return true;
}
