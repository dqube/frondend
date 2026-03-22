import type { Metadata } from "next";

export const metadata: Metadata = { title: "Promotions" };

export default function PromotionsPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Promotions</h1>
    </div>
  );
}
