import type { CartItemResponse } from "../apis/schema";
import { createOrderSummary, toCartItem } from "../utils/cart";

interface UseCartSubmitParams {
  refetchCart: () => Promise<CartItemResponse[] | null>;
  getItemSelection: (id: number) => boolean;
}

export function useCartSubmit({ refetchCart, getItemSelection }: UseCartSubmitParams) {
  const submitCart = async () => {
    const latestCartItems = await refetchCart();
    if (!latestCartItems) return null;

    const latestCartList = latestCartItems.map((item) => toCartItem(item, getItemSelection(item.id)));

    return createOrderSummary(latestCartList);
  };

  return { submitCart };
}
