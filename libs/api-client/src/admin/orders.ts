import type { Order, PaginatedResult } from "@modernstores/types";
import { http, type RequestOptions } from "../http";

const base = () => process.env["NEXT_PUBLIC_ADMIN_API_URL"] ?? "";

export const adminOrdersApi = {
  list: (query: Record<string, string> = {}, opts?: RequestOptions) =>
    http.get<PaginatedResult<Order>>(`${base()}/api/admin/orders?${new URLSearchParams(query)}`, opts),
  getById: (id: string, opts?: RequestOptions) =>
    http.get<Order>(`${base()}/api/admin/orders/${id}`, opts),
  updateStatus: (id: string, status: string, opts?: RequestOptions) =>
    http.patch<Order>(`${base()}/api/admin/orders/${id}/status`, { status }, opts),
};
