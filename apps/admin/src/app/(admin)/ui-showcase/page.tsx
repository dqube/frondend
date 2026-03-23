import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { UIShowcaseView } from "./_components/ui-showcase-view";

export const metadata: Metadata = { title: "UI Components" };

export default function UIShowcasePage() {
  return (
    <>
      <PageHeader
        title="UI Components"
        description="A showcase of all shadcn/ui and reui controls used across the application."
      />
      <div className="p-4 md:p-6">
        <UIShowcaseView />
      </div>
    </>
  );
}
