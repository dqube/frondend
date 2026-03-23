import type { Metadata } from "next";
import { Download, Calendar } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { RecentOrders } from "@/components/dashboard/recent-orders";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back — here's what's happening today.">
        <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          Aug 2025
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
          <Download className="h-4 w-4" />
          Export
        </button>
      </PageHeader>

      <div className="space-y-6 p-4 md:p-6 pb-8">

      {/* KPI Cards */}
      <StatsCards />

      {/* Charts row — Revenue (wide) + Category Donut */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <CategoryChart />
      </div>

      {/* Orders bar + Top Products */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OrdersChart />
        <TopProducts />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
      </div>
    </>
  );
}
