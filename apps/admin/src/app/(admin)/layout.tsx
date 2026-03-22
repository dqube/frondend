"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-y-auto p-6 bg-[#f5f5f7] dark:bg-neutral-950">{children}</main>
      </div>
    </div>
  );
}
