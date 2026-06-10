import { newProduct, Product } from "../interfaces/product.interface.js";

const initialProducts: Product[] = [
  { id: 1, name: "상품 A", price: 35000, imageUrl: "https://placehold.co/80x80", stock: 10 },
  { id: 2, name: "상품 B", price: 25000, imageUrl: "https://placehold.co/80x80", stock: 3 },
  { id: 3, name: "재고 부족 상품", price: 15000, imageUrl: "https://placehold.co/80x80", stock: 1 },
  { id: 4, name: "재고 초과 상품", price: 20000, imageUrl: "https://placehold.co/80x80", stock: 2 },
];

const products: Product[] = [...initialProducts];

export function isAlreadyExist(id: number) {
  if (products.find((product) => product.id === id)) return true;
  return false;
}

export function save(product: newProduct) {
  const id = (products.at(-1)?.id ?? 0) + 1;

  const newProduct: Product = {
    id: id,
    ...product,
  };

  products.push(newProduct);
}

export function findAll() {
  return [...products];
}

export function findStockById(id: number) {
  const product = products.find((product) => product.id === id);
  if (product) {
    return product.stock;
  }
  return -1;
}

export function findById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function deleteById(id: number): boolean {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return false;
  }
  products.splice(index, 1);
  return true;
}

export function reset() {
  products.length = 0;
}
