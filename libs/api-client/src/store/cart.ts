import type { Cart } from "@modernstores/types";
import { http, type RequestOptions } from "../http";

const base = () => process.env["NEXT_PUBLIC_STORE_API_URL"] ?? "";

export const storeCartApi = {
  get: (opts?: RequestOptions) =>
    http.get<Cart>(`${base()}/api/cart`, opts),
  addItem: (body: { variantId: string; quantity: number }, opts?: RequestOptions) =>
    http.post<Cart>(`${base()}/api/cart/items`, body, opts),
  updateItem: (itemId: string, quantity: number, opts?: RequestOptions) =>
    http.patch<Cart>(`${base()}/api/cart/items/${itemId}`, { quantity }, opts),
  removeItem: (itemId: string, opts?: RequestOptions) =>
    http.delete<Cart>(`${base()}/api/cart/items/${itemId}`, opts),
  applyCoupon: (couponCode: string, opts?: RequestOptions) =>
    http.post<Cart>(`${base()}/api/cart/coupon`, { couponCode }, opts),
};
