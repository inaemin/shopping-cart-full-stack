import { http, HttpResponse } from "msw";
import { CART_ITEM_STATUS } from "../types/cart";

const BASE_URL = "http://localhost:3000";

export interface MockProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface MockCartItem {
  id: number;
  productId: number;
  quantity: number;
}

export const defaultProducts: MockProduct[] = [
  { id: 1, name: "상품 A", price: 35000, imageUrl: "https://placehold.co/80x80", stock: 10 },
  { id: 2, name: "상품 B", price: 25000, imageUrl: "https://placehold.co/80x80", stock: 3 },
  { id: 3, name: "재고 부족 상품", price: 15000, imageUrl: "https://placehold.co/80x80", stock: 1 },
];

export const defaultCartItems: MockCartItem[] = [
  { id: 1, productId: 1, quantity: 2 },
  { id: 2, productId: 2, quantity: 1 },
  { id: 3, productId: 3, quantity: 1 },
];

const errorResponse = (error: string, message: string, status: number) =>
  HttpResponse.json({ error, message }, { status });

const getCartItemStatus = (quantity: number, stock: number) => {
  if (stock === 0) return CART_ITEM_STATUS.OUT_OF_STOCK;
  if (quantity > stock) return CART_ITEM_STATUS.QUANTITY_EXCEEDED;
  return CART_ITEM_STATUS.AVAILABLE;
};

export interface PatchDelayController {
  wait: () => Promise<void>;
}

export const createHandlers = (
  initialProducts: MockProduct[] = defaultProducts,
  initialCartItems: MockCartItem[] = defaultCartItems,
  patchDelay?: PatchDelayController,
) => {
  const products = initialProducts.map((p) => ({ ...p }));
  const cartItems = initialCartItems.map((c) => ({ ...c }));

  return [
    http.get(`${BASE_URL}/cart`, () => {
      const data = cartItems.map(({ id, productId, quantity }) => {
        const product = products.find((p) => p.id === productId)!;
        return {
          id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity,
          stock: product.stock,
          status: getCartItemStatus(quantity, product.stock),
        };
      });
      return HttpResponse.json({ data });
    }),

    http.patch(`${BASE_URL}/cart/:id`, async ({ params, request }) => {
      if (patchDelay) {
        await patchDelay.wait();
      }

      const id = Number(params.id);

      if (isNaN(id)) {
        return errorResponse("INVALID_CART_ITEM_ID", "장바구니 상품 ID는 숫자여야 합니다.", 400);
      }

      const body = (await request.json()) as { quantity?: unknown };
      const { quantity } = body;

      if (quantity === undefined || quantity === null || typeof quantity !== "number") {
        return errorResponse("REQUIRED_CART_ITEM_QUANTITY", "장바구니 상품 수량은 필수입니다.", 400);
      }

      if (quantity < 1) {
        return errorResponse("INVALID_CART_ITEM_QUANTITY", "장바구니 상품 수량은 1개 이상이어야 합니다.", 400);
      }

      const item = cartItems.find((item) => item.id === id);
      if (!item) {
        return errorResponse("CART_ITEM_NOT_FOUND", "장바구니 상품을 찾을 수 없습니다.", 404);
      }

      const product = products.find((p) => p.id === item.productId)!;
      if (quantity > product.stock && quantity > item.quantity) {
        return errorResponse("OUT_OF_STOCK", "요청한 수량이 현재 재고보다 많습니다.", 409);
      }

      item.quantity = quantity;
      return new HttpResponse(null, { status: 204 });
    }),

    http.delete(`${BASE_URL}/cart/:id`, ({ params }) => {
      const id = Number(params.id);

      if (isNaN(id)) {
        return errorResponse("INVALID_CART_ITEM_ID", "장바구니 상품 ID는 숫자여야 합니다.", 400);
      }

      const index = cartItems.findIndex((item) => item.id === id);
      if (index === -1) {
        return errorResponse("CART_ITEM_NOT_FOUND", "장바구니 상품을 찾을 수 없습니다.", 404);
      }

      cartItems.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }),
  ];
};

export const handlers = createHandlers();
