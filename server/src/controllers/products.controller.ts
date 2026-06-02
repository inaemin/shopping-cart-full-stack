import { CreateProductDto } from "../interfaces/product.interface.js";
import { Request, Response } from "express";
import {
  addProduct,
  getProducts as fetchProducts,
  deleteProduct as removeProduct,
} from "../services/products.service.js";
import { createProductRequestSchema } from "../schemas/product.schema.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export async function createProduct(request: Request, response: Response): Promise<void> {
  const dto: CreateProductDto = createProductRequestSchema.parse(request.body);
  await addProduct(dto);
  response.status(201).end();
}

export async function getProducts(_request: Request, response: Response): Promise<void> {
  const productList = await fetchProducts();
  response.status(200).json(productList);
}

export const deleteProduct = asyncHandler(async (request, response) => {
  const id = Number(request.params.id);
  await removeProduct(id);
  response.status(204).end();
});
