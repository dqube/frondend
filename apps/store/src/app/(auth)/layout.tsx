import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      {/* Brand */}
      <Link href="/" className="mb-8 flex items-center gap-2 text-primary">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="14" width="28" height="18" rx="4" fill="currentColor" opacity="0.15" />
          <rect x="4" y="14" width="28" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M12 14V11C12 7.686 14.686 5 18 5C21.314 5 24 7.686 24 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 24C15 24 16 20 20 19C20 19 19 23 15 24Z" fill="currentColor" />
          <path d="M21 24C21 24 20 20 16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-xl font-bold tracking-tight">
          Modern<span className="text-foreground">Stores</span>
        </span>
      </Link>

      {/* Auth card */}
      <div className="w-full max-w-md rounded-2xl border border-white/80 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
        {children}
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} ModernStores. All rights reserved.
      </p>
    </div>
  );
}
