import { findAll } from "../repositories/cart.repository.js";

export async function getCartItems() {
  return await findAll();
}
