import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: "ModernStores", template: "%s | ModernStores" },
  description: "Fresh groceries delivered to your door"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <div className="min-h-screen w-full bg-background relative">
          {/* Glossy White Background — light mode only */}
          <div
            className="absolute inset-0 z-0 dark:hidden"
            style={{
              backgroundImage: `
                linear-gradient(135deg,
                  rgba(255,255,255,1) 0%,
                  rgba(248,250,252,0.9) 40%,
                  rgba(241,245,249,0.8) 100%
                ),
                radial-gradient(circle at 30% 20%, rgba(255,255,255,1) 0%, transparent 50%),
                radial-gradient(circle at 75% 60%, rgba(226,232,240,0.5) 0%, transparent 55%),
                radial-gradient(circle at 15% 85%, rgba(248,250,252,0.7) 0%, transparent 40%)
              `,
            }}
          />
          <div className="relative z-10">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
