"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "@/components/home/product-card";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/products";

interface Props { params: Promise<{ slug: string }> }

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);
  const category = CATEGORIES.find((c) => c.id === slug);
  const products = ALL_PRODUCTS.filter((p) => p.categoryId === slug);

  if (!category) {
    return (
      <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
        <p className="text-muted-foreground text-sm mb-4">The category you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/products" className="text-sm font-semibold text-primary hover:underline">Browse all products</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{category.label}</span>
      </nav>

      {/* Category hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 flex items-center gap-6"
      >
        <span className="text-6xl md:text-7xl">{category.emoji}</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{category.label}</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} products available</p>
        </div>
      </motion.div>

      {/* Related categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.filter((c) => c.id !== slug).slice(0, 8).map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/60 hover:bg-primary/10 hover:border-primary/30 transition-colors text-sm shrink-0"
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>

      {products.length === 0 && (
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 text-center">
          <p className="text-muted-foreground">No products found in this category yet.</p>
          <Link href="/products" className="text-sm font-semibold text-primary hover:underline mt-2 inline-block">
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}
