import { Logo } from "@/components/layout/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Brand bar */}
      <header className="flex items-center gap-2.5 px-8 py-6">
        <div className="text-primary"><Logo size={32} /></div>
        <span className="text-base font-semibold tracking-tight">ModernStores</span>
      </header>

      {/* Centered content */}
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        {children}
      </main>
    </div>
  );
}
