import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Product" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>
    </div>
  );
}
