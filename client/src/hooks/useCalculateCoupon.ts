import { useState } from "react";
import { getCouponDiscount } from "../apis/checkout/checkout";
import { discountPreviewQueryKey } from "../constants/queryKeys";
import { useCouponPolicy } from "./useCouponPolicy";
import { useMyQuery } from "../lib/myQuery/useMyQuery";

export function useCalculateCoupon(checkoutId: number, initialCouponIds: number[] = [], initialDiscount: number = 0) {
  const { maxCouponCount } = useCouponPolicy();
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>(initialCouponIds);

  const isDirty =
    initialCouponIds.length !== selectedCouponIds.length ||
    selectedCouponIds.some((id) => !initialCouponIds.includes(id));

  // selectedCouponIds가 바뀔 때마다 키가 달라져 자동 재요청된다.
  // initialDiscount는 '첫 조합(초기 선택)'의 할인액이므로 그 조합일 때만 초기값으로 쓴다.
  // 조합이 바뀌면 initialData 없이 조회하므로 isLoading이 켜져 '계산 중' 상태를 노출할 수 있다.
  const queryKey = discountPreviewQueryKey(checkoutId, selectedCouponIds);
  const { data, isLoading } = useMyQuery<number>(queryKey, () => getCouponDiscount(checkoutId, selectedCouponIds), {
    initialData: isDirty ? undefined : initialDiscount,
  });

  const toggleCouponCheckBox = (id: number, checked: boolean) => {
    setSelectedCouponIds((prev) => {
      if (checked) {
        if (prev.includes(id) || prev.length >= maxCouponCount) return prev;
        return [...prev, id];
      }
      if (!prev.includes(id)) return prev;
      return prev.filter((couponId) => couponId !== id);
    });
  };

  return {
    isPending: isLoading,
    isDirty,
    selectedCouponIds,
    toggleCouponCheckBox,
    estimatedCouponDiscount: data ?? initialDiscount,
  };
}
