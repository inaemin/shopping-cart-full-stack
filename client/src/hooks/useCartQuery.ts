import { getCart } from "../apis/cart";
import { useMyQuery } from "../lib/myQuery/useMyQuery";
import { CART_QUERY_KEY } from "../constants/queryKeys";

export function useCartQuery() {
  const { data: cartItemResponses, isLoading, hasError, error, refetch } = useMyQuery(CART_QUERY_KEY, getCart);

  return {
    cartItemResponses: cartItemResponses ?? [],
    isLoading,
    hasError,
    error,
    refetch,
  };
}
