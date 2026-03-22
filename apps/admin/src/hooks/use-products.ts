"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminProductsApi } from "@modernstores/api-client/admin";
import { toast } from "@modernstores/ui";

export function useAdminProducts(query: Record<string, string> = {}, token?: string) {
  return useQuery({
    queryKey: ["admin", "products", query],
    queryFn: () => adminProductsApi.list(query, { token }),
  });
}

export function useDeleteProduct(token?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminProductsApi.delete(id, { token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });
}
