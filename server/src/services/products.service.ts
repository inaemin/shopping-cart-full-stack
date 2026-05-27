import { CreateProductDto } from "../../interfaces/product.interface.js";
import { save, findAll, deleteById } from "../repositories/products.repository.js";

export async function addProduct(product: CreateProductDto) {
  await save(product);
}

export async function getProducts() {
  return await findAll();
}

export async function deleteProduct(id: number): Promise<boolean> {
  return await deleteById(id);
}
