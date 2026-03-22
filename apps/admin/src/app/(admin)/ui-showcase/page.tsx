import type { Metadata } from "next";
import { UIShowcaseView } from "./_components/ui-showcase-view";

export const metadata: Metadata = { title: "UI Components" };

export default function UIShowcasePage() {
  return <UIShowcaseView />;
}
