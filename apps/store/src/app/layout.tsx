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
          {/* Mint Fresh Breeze Background — light mode only */}
          <div
            className="absolute inset-0 z-0 dark:hidden"
            style={{
              backgroundImage: `
                linear-gradient(45deg,
                  rgba(240,253,250,1) 0%,
                  rgba(204,251,241,0.7) 30%,
                  rgba(153,246,228,0.5) 60%,
                  rgba(94,234,212,0.4) 100%
                ),
                radial-gradient(circle at 40% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(167,243,208,0.5) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(209,250,229,0.6) 0%, transparent 45%)
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
