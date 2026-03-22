import type { Product, PaginatedResult } from "@modernstores/types";
import { http } from "../http";

export interface ProductsQuery {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const base = () => process.env["NEXT_PUBLIC_STORE_API_URL"] ?? "";

export const storeProductsApi = {
  list: (query: ProductsQuery = {}) => {
    const params = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    );
    return http.get<PaginatedResult<Product>>(`${base()}/api/products?${params}`);
  },
  getBySlug: (slug: string) => http.get<Product>(`${base()}/api/products/${slug}`),
};
