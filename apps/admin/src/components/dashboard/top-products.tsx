const products = [
  { rank: 1,  name: "Organic Berry Mix",       category: "Fruits & Veg", sales: 842,  revenue: "RM 40,416",  trend: "+14%" },
  { rank: 2,  name: "Cold Press Orange Juice",  category: "Beverages",    sales: 716,  revenue: "RM 28,640",  trend: "+9%"  },
  { rank: 3,  name: "Premium Cheddar Block",    category: "Dairy",        sales: 688,  revenue: "RM 13,071",  trend: "+6%"  },
  { rank: 4,  name: "Sourdough Bread Loaf",     category: "Bakery",       sales: 624,  revenue: "RM 11,232",  trend: "+11%" },
  { rank: 5,  name: "Baby Spinach 400g",        category: "Fruits & Veg", sales: 591,  revenue: "RM 8,865",   trend: "-2%"  },
];

export function TopProducts() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">Top Products</p>
          <p className="text-xs text-muted-foreground">Best sellers this month</p>
        </div>
        <a href="/products" className="text-xs font-medium text-primary hover:underline">
          View all →
        </a>
      </div>
      <div className="divide-y divide-border">
        {products.map((product) => (
          <div key={product.rank} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/40">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
              {product.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.category} · {product.sales} sold</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{product.revenue}</p>
              <p className={`text-xs font-medium ${product.trend.startsWith("+") ? "text-emerald-600" : "text-rose-500"}`}>
                {product.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
