import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <>
      <PageHeader title="Customers" description="Manage your customer base." />
      <div className="p-4 md:p-6">
      </div>
    </>
  );
}
