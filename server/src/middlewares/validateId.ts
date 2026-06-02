import { NextFunction, Request, Response } from "express";
import { ERROR_RESPONSE } from "../constants/error.js";

export function validateProductId(request: Request, response: Response, next: NextFunction): void {
  if (Number.isNaN(Number(request.params.id))) {
    response.status(400).json(ERROR_RESPONSE.INVALID_PRODUCT_ID);
    return;
  }
  next();
}

export function validateCartItemId(request: Request, response: Response, next: NextFunction): void {
  if (Number.isNaN(Number(request.params.id))) {
    response.status(400).json(ERROR_RESPONSE.INVALID_CART_ITEM_ID);
    return;
  }
  next();
}
