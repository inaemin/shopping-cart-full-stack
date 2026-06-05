const FREE_SHIPPING_THRESHOLD = 100_000;
const SHIPPING_FEE = 3_000;

const CART_SELECTION_KEY = "cart_selection";

function getItemSelectionFromStorage(): Record<number, boolean> {
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

export function getDefaultItemSelectPolicy(id: number): boolean {
  const stored = getItemSelectionFromStorage();
  return stored[id] ?? true;
}

export const getShippingFeePolicy = () => FREE_SHIPPING_THRESHOLD;

export const calculateShippingFee = (orderAmount: number) => {
  return orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
};
