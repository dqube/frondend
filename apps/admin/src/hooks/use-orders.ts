"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminOrdersApi } from "@modernstores/api-client/admin";
import { toast } from "@modernstores/ui";
import type { OrderStatus } from "@modernstores/types";

export function useAdminOrders(query: Record<string, string> = {}, token?: string) {
  return useQuery({
    queryKey: ["admin", "orders", query],
    queryFn: () => adminOrdersApi.list(query, { token }),
  });
}

export function useUpdateOrderStatus(token?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      adminOrdersApi.updateStatus(id, status, { token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      toast.success("Order status updated");
    },
    onError: () => toast.error("Failed to update order status"),
  });
}
