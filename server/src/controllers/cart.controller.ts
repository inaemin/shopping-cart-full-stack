import { Request, Response } from "express";
import {
  getCartItems as fetchCartItems,
  updateCartItemQuantity as modifyCartItemQuantity,
  deleteCartItem as removeCartItem,
} from "../services/cart.service.js";
import { updateCartItemRequestSchema } from "../schemas/cart.schema.js";
import { UpdateCartItemDto } from "../interfaces/cart.interface.js";

export async function getCartItems(_request: Request, response: Response): Promise<void> {
  const cartItemList = await fetchCartItems();
  response.status(200).json({ data: cartItemList });
}

export async function updateCartItemQuantity(request: Request, response: Response): Promise<void> {
  const id = Number(request.params.id);
  const { quantity }: UpdateCartItemDto = updateCartItemRequestSchema.parse(request.body);
  await modifyCartItemQuantity(id, quantity);
  response.status(204).end();
}

export async function deleteCartItem(request: Request, response: Response): Promise<void> {
  const id = Number(request.params.id);
  await removeCartItem(id);
  response.status(204).end();
}
