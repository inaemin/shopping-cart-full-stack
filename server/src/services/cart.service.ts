import { findAll, isAlreadyExist, deleteById } from "../repositories/cart.repository.js";

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

export async function deleteCartItem(id: number) {
  if (!isAlreadyExist(id)) {
    return false;
  }
  await deleteById(id);
  return true;
}
