"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const data = [
  { month: "Jan", revenue: 68420, target: 72000 },
  { month: "Feb", revenue: 74891, target: 75000 },
  { month: "Mar", revenue: 89234, target: 80000 },
  { month: "Apr", revenue: 95012, target: 85000 },
  { month: "May", revenue: 88734, target: 90000 },
  { month: "Jun", revenue: 102456, target: 95000 },
  { month: "Jul", revenue: 98123, target: 100000 },
  { month: "Aug", revenue: 124563, target: 105000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-primary)",
  },
  target: {
    label: "Target",
    color: "hsl(220 13% 75%)",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Revenue Overview</p>
          <p className="mt-0.5 text-2xl font-bold tracking-tight">RM 124,563</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          +12.5% this month
        </span>
      </div>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(220 13% 75%)" stopOpacity={0.10} />
              <stop offset="100%" stopColor="hsl(220 13% 75%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => `RM ${(v / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) =>
                  `RM ${Number(value).toLocaleString()}`
                }
              />
            }
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke="hsl(220 13% 75%)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="url(#targetGradient)"
            dot={false}
            isAnimationActive
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ChartContainer>
      <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded bg-primary" />
          Revenue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded border-t border-dashed border-muted-foreground" />
          Target
        </span>
      </div>
    </div>
  );
}
