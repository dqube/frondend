
const orders = [
  { id: "#ORD-8821", customer: "Emma Johnson",    email: "emma@example.com",  product: "Organic Berry Mix",      amount: "$48.20",  status: "Delivered",  date: "Aug 12" },
  { id: "#ORD-8820", customer: "Liam Chen",       email: "liam@example.com",  product: "Whole Grain Bread Pack", amount: "$22.50",  status: "Processing", date: "Aug 12" },
  { id: "#ORD-8819", customer: "Sofia Martínez",  email: "sofia@example.com", product: "Almond Milk x6",         amount: "$34.80",  status: "Shipped",    date: "Aug 11" },
  { id: "#ORD-8818", customer: "Noah Williams",   email: "noah@example.com",  product: "Premium Cheddar Block",  amount: "$18.99",  status: "Delivered",  date: "Aug 11" },
  { id: "#ORD-8817", customer: "Olivia Brown",    email: "olivia@example.com", product: "Seasonal Veg Box",      amount: "$62.00",  status: "Cancelled",  date: "Aug 10" },
  { id: "#ORD-8816", customer: "Ethan Taylor",    email: "ethan@example.com",  product: "Cold Press Juice x4",  amount: "$29.60",  status: "Delivered",  date: "Aug 10" },
];

const FALLBACK_STATUS = { label: "Processing", className: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900" };

const statusConfig: Record<string, { label: string; className: string }> = {
  Delivered:  { label: "Delivered",  className: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900" },
  Processing: { label: "Processing", className: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900" },
  Shipped:    { label: "Shipped",    className: "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900" },
  Cancelled:  { label: "Cancelled",  className: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900" },
};

export function RecentOrders() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">Recent Orders</p>
          <p className="text-xs text-muted-foreground">Last 6 orders across all channels</p>
        </div>
        <a href="/orders" className="text-xs font-medium text-primary hover:underline">
          View all →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Order</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Customer</th>
              <th className="hidden px-5 py-3 text-left text-xs font-medium text-muted-foreground md:table-cell">Product</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="hidden px-5 py-3 text-right text-xs font-medium text-muted-foreground sm:table-cell">Date</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => {
              const status = statusConfig[order.status] ?? FALLBACK_STATUS;
              return (
                <tr key={order.id} className="transition-colors hover:bg-muted/40">
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs font-medium text-foreground">{order.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-foreground">{order.customer}</div>
                    <div className="text-xs text-muted-foreground">{order.email}</div>
                  </td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground md:table-cell">{order.product}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3.5 text-right text-xs text-muted-foreground sm:table-cell">
                    {order.date}
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-foreground">{order.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
