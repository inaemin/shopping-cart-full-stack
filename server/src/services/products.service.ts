import { CreateProductDto } from "../interfaces/product.interface.js";
import { save, findAll, deleteById, isAlreadyExist } from "../repositories/products.repository.js";
import { deleteByProductId } from "../repositories/cart.repository.js";
import { AppError } from "../errors/AppError.js";

export async function addProduct(product: CreateProductDto) {
  await save(product);
}

export async function getProducts() {
  return await findAll();
}

export async function deleteProduct(id: number): Promise<void> {
  if (!isAlreadyExist(id)) {
    throw new AppError("PRODUCT_NOT_FOUND", 404);
  }
  await deleteById(id);
  await deleteByProductId(id);
}
