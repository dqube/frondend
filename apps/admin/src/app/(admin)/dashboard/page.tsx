import type { Metadata } from "next";
import { Download, Calendar } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { RecentOrders } from "@/components/dashboard/recent-orders";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Dashboard
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Welcome back — here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Aug 2025
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

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
  );
}
