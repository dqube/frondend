import type { Order, PaginatedResult } from "@modernstores/types";
import { http, type RequestOptions } from "../http";

const base = () => process.env["NEXT_PUBLIC_STORE_API_URL"] ?? "";

export const storeOrdersApi = {
  list: (opts?: RequestOptions) =>
    http.get<PaginatedResult<Order>>(`${base()}/api/orders`, opts),
  getById: (id: string, opts?: RequestOptions) =>
    http.get<Order>(`${base()}/api/orders/${id}`, opts),
  create: (body: unknown, opts?: RequestOptions) =>
    http.post<Order>(`${base()}/api/orders`, body, opts),
};
