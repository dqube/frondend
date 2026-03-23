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
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">{children}</main>
      </div>
    </div>
  );
}
