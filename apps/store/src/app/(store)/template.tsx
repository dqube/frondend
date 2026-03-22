import { PageTransition } from "@/components/layout/page-transition";

export default function StoreTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
