"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const data = [
  { day: "Mon", orders: 186 },
  { day: "Tue", orders: 205 },
  { day: "Wed", orders: 237 },
  { day: "Thu", orders: 273 },
  { day: "Fri", orders: 309 },
  { day: "Sat", orders: 214 },
  { day: "Sun", orders: 136 },
];

const chartConfig = {
  orders: {
    label: "Orders",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

export function OrdersChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Orders This Week</p>
          <p className="mt-0.5 text-2xl font-bold tracking-tight">1,560</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
          +8.2% vs last week
        </span>
      </div>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barSize={28}>
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} dy={8} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
          <ChartTooltip
            cursor={{ fill: "hsl(var(--muted))", radius: 6 }}
            content={<ChartTooltipContent />}
          />
          <Bar
            dataKey="orders"
            fill="var(--color-primary)"
            radius={[6, 6, 0, 0]}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
