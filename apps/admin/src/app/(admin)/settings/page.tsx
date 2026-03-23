import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Configure your store preferences." />
      <div className="p-4 md:p-6">
      </div>
    </>
  );
}
