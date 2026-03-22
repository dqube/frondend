"use client";

import { TrendingUp, TrendingDown, ShoppingCart, Users, Package, DollarSign } from "lucide-react";
import { cn } from "@modernstores/ui";

const stats = [
  {
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    trend: "up" as const,
    sub: "vs last month",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Orders",
    value: "1,429",
    change: "+8.2%",
    trend: "up" as const,
    sub: "vs last month",
    icon: ShoppingCart,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Customers",
    value: "9,420",
    change: "+3.1%",
    trend: "up" as const,
    sub: "vs last month",
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    iconColor: "text-violet-600",
  },
  {
    title: "Products in Stock",
    value: "342",
    change: "-2.4%",
    trend: "down" as const,
    sub: "vs last month",
    icon: Package,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    iconColor: "text-orange-600",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
            </div>
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", stat.bg)}>
              <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5">
            {stat.trend === "up" ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
            )}
            <span className={cn("text-xs font-semibold", stat.trend === "up" ? "text-emerald-600" : "text-rose-500")}>
              {stat.change}
            </span>
            <span className="text-xs text-muted-foreground">{stat.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
