"use client";

import { Cell, Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const data = [
  { category: "Fruits & Veg", value: 38, key: "fruits" },
  { category: "Dairy", value: 22, key: "dairy" },
  { category: "Bakery", value: 18, key: "bakery" },
  { category: "Beverages", value: 14, key: "beverages" },
  { category: "Other", value: 8, key: "other" },
];

const chartConfig = {
  fruits:     { label: "Fruits & Veg", color: "var(--color-primary)" },
  dairy:      { label: "Dairy",        color: "hsl(217 91% 60%)" },
  bakery:     { label: "Bakery",       color: "hsl(262 83% 67%)" },
  beverages:  { label: "Beverages",    color: "hsl(34 94% 58%)" },
  other:      { label: "Other",        color: "hsl(220 13% 78%)" },
} satisfies ChartConfig;

const COLORS = [
  "var(--color-primary)",
  "hsl(217 91% 60%)",
  "hsl(262 83% 67%)",
  "hsl(34 94% 58%)",
  "hsl(220 13% 78%)",
];

export function CategoryChart() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground">Sales by Category</p>
        <p className="mt-0.5 text-2xl font-bold tracking-tight">5 Categories</p>
      </div>
      <ChartContainer config={chartConfig} className="mx-auto h-[180px] w-full max-w-[200px]">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `${value}%`}
                nameKey="category"
              />
            }
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            isAnimationActive
            animationBegin={200}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={entry.key} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={item.key} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-muted-foreground">{item.category}</span>
            </div>
            <span className="font-semibold tabular-nums">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
