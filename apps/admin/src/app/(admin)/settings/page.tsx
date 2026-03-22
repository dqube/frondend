import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Settings</h1>
    </div>
  );
}
