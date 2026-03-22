import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inventory" };

export default function InventoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Inventory</h1>
    </div>
  );
}
