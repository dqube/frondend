import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Inventory" };

export default function InventoryPage() {
  return (
    <>
      <PageHeader title="Inventory" description="Track stock levels and manage inventory." />
      <div className="p-4 md:p-6">
      </div>
    </>
  );
}
