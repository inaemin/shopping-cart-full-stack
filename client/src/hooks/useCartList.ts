import { canPurchaseCart, toCartItem } from "../utils/cart";
import { useCartQuery } from "./useCartQuery";
import { useCartSelection } from "./useCartSelection";

export function useCartList() {
  const { cartItemResponses, isLoading, hasError, refetch } = useCartQuery();
  const { getItemSelection, toggleItemSelection, toggleAllItemSelection } = useCartSelection();

  const cartList = cartItemResponses.map((item) => toCartItem(item, getItemSelection(item.id)));

  const hasNoCartItem = !isLoading && !hasError && cartList.length === 0;
  const hasCartItem = !isLoading && !hasError && cartList.length > 0;
  const isAllSelected = cartList.length > 0 && cartList.every((item) => item.isSelected);
  const isAbleToPurchase = !isLoading && canPurchaseCart(cartList);

  const selectItem = (id: number) => {
    toggleItemSelection(id);
  };

  const selectAllItem = () => {
    const shouldSelectAll = !isAllSelected;
    const ids = cartList.map((item) => item.id);
    toggleAllItemSelection(ids, shouldSelectAll);
  };

  return {
    cartList,
    isLoading,
    hasError,
    refetch,
    hasNoCartItem,
    hasCartItem,
    isAllSelected,
    isAbleToPurchase,
    getItemSelection,
    selectItem,
    selectAllItem,
  };
}
