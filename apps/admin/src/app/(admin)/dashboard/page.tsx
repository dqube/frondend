import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Stats cards */}
      </div>
    </div>
  );
}
