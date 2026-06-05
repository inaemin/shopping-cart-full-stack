import { ApiError, type ApiErrorResponse } from "./error";
import type { CartItemResponse, GetCartResponse, PatchCartItemRequest } from "./schema";
import { BASE_URL, API_ENDPOINTS } from "../constants/apis";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json().catch(() => ({
      error: "UNKNOWN_ERROR",
      message: response.statusText,
    }));
    throw new ApiError(response.status, errorResponse.error, errorResponse.message);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function getCart(): Promise<CartItemResponse[]> {
  const cartResponse = await fetch(`${BASE_URL}${API_ENDPOINTS.CART}`);
  const cartData = await handleResponse<GetCartResponse>(cartResponse);
  return cartData.data;
}

export async function deleteCartItem(id: number): Promise<void> {
  const deleteResponse = await fetch(`${BASE_URL}${API_ENDPOINTS.CART_ITEM(id)}`, { method: "DELETE" });
  await handleResponse<void>(deleteResponse);
}

export async function updateCartItemQuantity(id: number, quantity: number): Promise<void> {
  const requestBody: PatchCartItemRequest = { quantity };
  const updateResponse = await fetch(`${BASE_URL}${API_ENDPOINTS.CART_ITEM(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  await handleResponse<void>(updateResponse);
}
