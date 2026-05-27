import { Request, Response } from "express";
import { getCartItems as fetchCartItems } from "../services/cart.service.js";

export async function getCartItems(_request: Request, response: Response): Promise<void> {
  const cartItemList = await fetchCartItems();
  if (cartItemList.length) {
    response.status(200).json(cartItemList);
    return;
  }
  response.status(204).end();
}
