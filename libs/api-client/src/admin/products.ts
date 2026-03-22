import type { Product, PaginatedResult } from "@modernstores/types";
import { http, type RequestOptions } from "../http";

const base = () => process.env["NEXT_PUBLIC_ADMIN_API_URL"] ?? "";

export const adminProductsApi = {
  list: (query: Record<string, string> = {}, opts?: RequestOptions) =>
    http.get<PaginatedResult<Product>>(`${base()}/api/admin/products?${new URLSearchParams(query)}`, opts),
  getById: (id: string, opts?: RequestOptions) =>
    http.get<Product>(`${base()}/api/admin/products/${id}`, opts),
  create: (body: unknown, opts?: RequestOptions) =>
    http.post<Product>(`${base()}/api/admin/products`, body, opts),
  update: (id: string, body: unknown, opts?: RequestOptions) =>
    http.put<Product>(`${base()}/api/admin/products/${id}`, body, opts),
  delete: (id: string, opts?: RequestOptions) =>
    http.delete<void>(`${base()}/api/admin/products/${id}`, opts),
};
