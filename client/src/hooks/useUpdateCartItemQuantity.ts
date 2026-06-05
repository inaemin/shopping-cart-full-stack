import { useState } from "react";

type Status = "idle" | "pending" | "error";

export function useUpdateCartItemQuantity(onQuantityUpdate: (id: number, quantity: number) => Promise<void>) {
  const [status, setStatus] = useState<Status>("idle");

  const updateQuantity = async (id: number, quantity: number) => {
    setStatus("pending");
    try {
      await onQuantityUpdate(id, quantity);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const increaseCartItemQuantity = (id: number, quantity: number) => updateQuantity(id, quantity + 1);
  const decreaseCartItemQuantity = (id: number, quantity: number) => updateQuantity(id, quantity - 1);

  return {
    isPending: status === "pending",
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  };
}
