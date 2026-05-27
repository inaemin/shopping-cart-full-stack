import { CreateProductDto } from "../../interfaces/product.interface.js";
import { save, findAll } from "../repositories/products.repository.js";

export async function addProduct(product: CreateProductDto) {
  await save(product);
}

export async function getProducts() {
  return await findAll();
}
