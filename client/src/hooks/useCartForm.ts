import { useEffect, useState } from "react";
import type { CartItem } from "../types/cart";
import {
  calculateShippingFee,
  getDefaultItemSelectPolicy,
  saveItemSelectionToStorage,
  removeItemSelectionFromStorage,
} from "../utils/cart";
import {
  getCart,
  deleteCartItem as deleteCartItemApi,
  updateCartItemQuantity as updateCartItemQuantityApi,
} from "../apis/cart";
import { ApiError } from "../apis/error";

type Status = "loading" | "success" | "error";

export function useCartForm() {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  const loadCart = async () => {
    setStatus("loading");
    try {
      const cartItems = await getCart();
      const clientCartList = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity,
        isSelected: getDefaultItemSelectPolicy(item.id),
        isAvailable: true,
      }));
      setCartList(clientCartList);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCart();
  }, []);

  const orderAmount = cartList
    .filter((item) => item.isSelected && item.isAvailable)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingFee = calculateShippingFee(orderAmount);
  const totalAmount = orderAmount + shippingFee;

  const isAllSelected = cartList.length > 0 && cartList.every((item) => item.isSelected);
  const hasNoCartItem = status === "success" && cartList.length === 0;
  const hasCartItem = status === "success" && cartList.length > 0;
  const isAbleToPurchase =
    status !== "loading" && cartList.filter((item) => item.isSelected && item.isAvailable).length > 0;

  const deleteCartItem = async (id: number) => {
    const deletedItem = cartList.find((item) => item.id === id);
    setCartList((list) => list.filter((item) => item.id !== id));
    try {
      await deleteCartItemApi(id);
      removeItemSelectionFromStorage(id);
    } catch {
      if (deletedItem) {
        setCartList((list) => [...list, deletedItem]);
      }
    }
  };

  const toggleItemSelection = (id: number) => {
    const item = cartList.find((item) => item.id === id);
    if (item) saveItemSelectionToStorage(id, !item.isSelected);
    setCartList((list) => list.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item)));
  };

  const toggleAllItemSelection = () => {
    const next = !isAllSelected;
    cartList.forEach((item) => saveItemSelectionToStorage(item.id, next));
    setCartList((list) => list.map((item) => ({ ...item, isSelected: next })));
  };

  const handleUpdateCartItemQuantity = async (id: number, quantity: number) => {
    setCartList((list) => list.map((item) => (item.id === id ? { ...item, errorMsg: undefined } : item)));
    try {
      await updateCartItemQuantityApi(id, quantity);
      setCartList((list) => list.map((item) => (item.id === id ? { ...item, quantity } : item)));
    } catch (error) {
      const errorMsg = error instanceof ApiError ? error.message : "수량 변경에 실패했습니다.";
      setCartList((list) => list.map((item) => (item.id === id ? { ...item, errorMsg } : item)));
    }
  };

  const validateCartForm = async () => {
    try {
      const cartItems = await getCart();
      const validatedCartList = cartList.map((item) => {
        const serverItem = cartItems.find((c) => c.id === item.id);
        if (!serverItem) return { ...item, isAvailable: false, errorMsg: "더 이상 구매할 수 없는 상품입니다." };
        return { ...item, quantity: serverItem.quantity };
      });
      setCartList(validatedCartList);
      return true;
    } catch {
      return false;
    }
  };

  return {
    cartList,
    isLoading: status === "loading",
    hasError: status === "error",
    hasNoCartItem,
    hasCartItem,
    orderAmount,
    shippingFee,
    totalAmount,
    isAllSelected,
    isAbleToPurchase,
    deleteCartItem,
    toggleItemSelection,
    toggleAllItemSelection,
    handleUpdateCartItemQuantity,
    validateCartForm,
  };
}
