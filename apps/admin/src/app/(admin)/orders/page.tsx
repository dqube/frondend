import type { Metadata } from "next";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Orders</h1>
    </div>
  );
}
