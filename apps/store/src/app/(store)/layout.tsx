import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
