import {
  findAll,
  isAlreadyExist,
  deleteById,
  findProductIdById,
  findQuantityById,
  updateItemQuantity,
} from "../repositories/cart.repository.js";
import { findById as findProductById, findStockById } from "../repositories/products.repository.js";
import { AppError } from "../errors/AppError.js";
import { CART_ITEM_STATUS, CartItem, CartItemStatus, CartItemResponse } from "../interfaces/cart.interface.js";
import { Product } from "../interfaces/product.interface.js";

function getCartItemStatus(quantity: number, stock: number): CartItemStatus {
  if (stock === 0) return CART_ITEM_STATUS.OUT_OF_STOCK;
  if (quantity > stock) return CART_ITEM_STATUS.QUANTITY_EXCEEDED;
  return CART_ITEM_STATUS.AVAILABLE;
}

function toCartItemResponse(item: CartItem, product: Product): CartItemResponse {
  const { name, price, stock, imageUrl } = product;
  const status = getCartItemStatus(item.quantity, stock);
  return { id: item.id, name, price, quantity: item.quantity, stock, status, imageUrl };
}

function toCartItemResponseOrEmpty(item: CartItem): CartItemResponse[] {
  const product = findProductById(item.productId);
  if (!product) return [];
  return [toCartItemResponse(item, product)];
}

export async function getCartItems(): Promise<CartItemResponse[]> {
  const cartItems = await findAll();
  return cartItems.flatMap(toCartItemResponseOrEmpty);
}

export async function updateCartItemQuantity(id: number, quantity: number): Promise<void> {
  const productId = findProductIdById(id);
  if (productId === -1) throw new AppError("CART_ITEM_NOT_FOUND", 404);
  const stock = findStockById(productId);
  if (stock === -1) throw new AppError("PRODUCT_NOT_FOUND", 404);
  const existingQuantity = findQuantityById(id);
  if (quantity > stock && quantity > existingQuantity) throw new AppError("OUT_OF_STOCK", 409);

  updateItemQuantity(id, quantity);
}

export async function deleteCartItem(id: number): Promise<void> {
  if (!isAlreadyExist(id)) {
    throw new AppError("CART_ITEM_NOT_FOUND", 404);
  }
  await deleteById(id);
}
