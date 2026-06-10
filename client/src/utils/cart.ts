import type { CartItemResponse } from "../apis/schema";
import type { CartItem, CartItemStatus, OrderSummary } from "../types/cart";

const FREE_SHIPPING_THRESHOLD = 100_000;
const SHIPPING_FEE = 3_000;
export const MAX_PURCHASE_QUANTITY = 99;

const CART_SELECTION_KEY = "cart_selection";

export function getItemSelectionFromStorage(): Record<number, boolean> {
  try {
    const stored = localStorage.getItem(CART_SELECTION_KEY);
    return stored ? (JSON.parse(stored) as Record<number, boolean>) : {};
  } catch {
    return {};
  }
}

export function saveItemSelectionToStorage(id: number, isSelected: boolean): void {
  const stored = getItemSelectionFromStorage();
  stored[id] = isSelected;
  localStorage.setItem(CART_SELECTION_KEY, JSON.stringify(stored));
}

export function removeItemSelectionFromStorage(id: number): void {
  const stored = getItemSelectionFromStorage();
  delete stored[id];
  localStorage.setItem(CART_SELECTION_KEY, JSON.stringify(stored));
}

export const getShippingFeePolicy = () => FREE_SHIPPING_THRESHOLD;

export const calculateShippingFee = (orderAmount: number) => {
  return orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
};

export function getCartItemStatusMessage(status: CartItemStatus, stock: number): string | undefined {
  switch (status) {
    case "outOfStock":
      return "품절된 상품입니다.";
    case "quantityExceeded":
      return `최대 구매 가능 수량이 ${Math.min(stock, MAX_PURCHASE_QUANTITY)}개 입니다.`;
    case "available":
      return undefined;
  }
}

export function toCartItem(item: CartItemResponse, isSelected: boolean): CartItem {
  return {
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    price: item.price,
    quantity: item.quantity,
    stock: item.stock,
    status: item.status,
    isSelected,
    errorMsg: getCartItemStatusMessage(item.status, item.stock),
  };
}

export function getCartSummary(cartList: CartItem[]) {
  const selectedCartItems = cartList.filter((item) => item.isSelected && item.status === "available");
  const orderAmount = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = calculateShippingFee(orderAmount);
  const totalAmount = orderAmount + shippingFee;

  return {
    selectedCartItems,
    orderAmount,
    shippingFee,
    totalAmount,
  };
}

export function canPurchaseCart(cartList: CartItem[]): boolean {
  const selectedCartItems = cartList.filter((item) => item.isSelected);

  return selectedCartItems.length > 0 && selectedCartItems.every((item) => item.status === "available");
}

export function createOrderSummary(cartList: CartItem[]): OrderSummary | null {
  const { selectedCartItems, totalAmount } = getCartSummary(cartList);

  if (selectedCartItems.length === 0) return null;

  return {
    cartItemCount: selectedCartItems.length,
    totalQuantity: selectedCartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount,
  };
}
