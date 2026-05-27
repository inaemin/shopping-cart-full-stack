import { CreateProductDto } from "../../interfaces/product.interface.js";
import { Request, Response } from "express";
import {
  addProduct,
  getProducts as fetchProducts,
} from "../services/products.service.js";
import { createProductRequestSchema } from "../schemas/product.schema.js";

export async function createProduct(
  request: Request,
  response: Response,
): Promise<void> {
  const dto: CreateProductDto = createProductRequestSchema.parse(request.body);
  await addProduct(dto);
  response.status(201).end();
}

export async function getProducts(
  _request: Request,
  response: Response,
): Promise<void> {
  const productList = await fetchProducts();
  if (productList.length) {
    response.status(200).json(productList);
    return;
  }
  response.status(204).end();
}
