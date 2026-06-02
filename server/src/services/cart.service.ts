import {
  findAll,
  isAlreadyExist,
  deleteById,
  findProductIdById,
  updateItemQuantity,
} from "../repositories/cart.repository.js";
import { findStockById } from "../repositories/products.repository.js";
import { AppError } from "../errors/AppError.js";

export async function getCartItems() {
  return await findAll();
}

export async function updateCartItemQuantity(id: number, quantity: number): Promise<void> {
  const productId = findProductIdById(id);
  if (productId === -1) throw new AppError("CART_ITEM_NOT_FOUND", 404);
  const stock = findStockById(productId);
  if (stock === -1) throw new AppError("PRODUCT_NOT_FOUND", 404);
  if (quantity > stock) throw new AppError("OUT_OF_STOCK", 409);

  updateItemQuantity(id, quantity);
}

export async function deleteCartItem(id: number): Promise<void> {
  if (!isAlreadyExist(id)) {
    throw new AppError("CART_ITEM_NOT_FOUND", 404);
  }
  await deleteById(id);
}
