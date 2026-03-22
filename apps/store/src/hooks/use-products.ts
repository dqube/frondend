"use client";

import { useQuery } from "@tanstack/react-query";
import { storeProductsApi, type ProductsQuery } from "@modernstores/api-client/store";

export function useProducts(query: ProductsQuery = {}) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => storeProductsApi.list(query),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => storeProductsApi.getBySlug(slug),
    enabled: Boolean(slug),
  });
}
