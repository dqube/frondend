"use client";

import { useQuery } from "@tanstack/react-query";
import { adminAnalyticsApi } from "@modernstores/api-client/admin";

export function useDashboardStats(token?: string) {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => adminAnalyticsApi.getDashboard({ token }),
    enabled: Boolean(token),
  });
}
