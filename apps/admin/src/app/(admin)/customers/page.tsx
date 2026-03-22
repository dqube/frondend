import type { Metadata } from "next";

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Customers</h1>
    </div>
  );
}
