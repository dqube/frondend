import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <>
      <PageHeader title="Orders" description="View and manage customer orders." />
      <div className="p-4 md:p-6">
      </div>
    </>
  );
}
