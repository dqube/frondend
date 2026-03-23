import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Promotions" };

export default function PromotionsPage() {
  return (
    <>
      <PageHeader title="Promotions" description="Create and manage promotional campaigns." />
      <div className="p-4 md:p-6">
      </div>
    </>
  );
}
