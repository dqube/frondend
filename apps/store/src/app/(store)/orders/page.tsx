import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Orders" };

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
    </div>
  );
}
