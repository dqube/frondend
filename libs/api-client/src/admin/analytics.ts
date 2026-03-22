import { http, type RequestOptions } from "../http";

const base = () => process.env["NEXT_PUBLIC_ADMIN_API_URL"] ?? "";

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
}

export const adminAnalyticsApi = {
  getDashboard: (opts?: RequestOptions) =>
    http.get<DashboardStats>(`${base()}/api/admin/analytics/dashboard`, opts),
};
