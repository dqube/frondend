import type { User, PaginatedResult } from "@modernstores/types";
import { http, type RequestOptions } from "../http";

const base = () => process.env["NEXT_PUBLIC_ADMIN_API_URL"] ?? "";

export const adminCustomersApi = {
  list: (query: Record<string, string> = {}, opts?: RequestOptions) =>
    http.get<PaginatedResult<User>>(`${base()}/api/admin/customers?${new URLSearchParams(query)}`, opts),
  getById: (id: string, opts?: RequestOptions) =>
    http.get<User>(`${base()}/api/admin/customers/${id}`, opts),
};
