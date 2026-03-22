"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storeCartApi } from "@modernstores/api-client/store";
import { toast } from "@modernstores/ui";

export function useCart(token?: string) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => storeCartApi.get({ token }),
    enabled: Boolean(token),
  });
}

export function useAddToCart(token?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: { variantId: string; quantity: number }) =>
      storeCartApi.addItem(vars, { token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart");
    },
    onError: () => toast.error("Failed to add to cart"),
  });
}
