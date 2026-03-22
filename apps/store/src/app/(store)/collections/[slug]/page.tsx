"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Tag } from "lucide-react";
import { motion } from "motion/react";
import { ALL_PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";

const COLLECTIONS: Record<string, { title: string; description: string; emoji: string; tags: string[]; gradient: string }> = {
  "healthy-snacks": {
    title: "Healthy Snacks",
    description: "Guilt-free snacking — from dried fruits to protein bars.",
    emoji: "🥜",
    tags: ["organic", "healthy", "snack"],
    gradient: "from-green-50 to-emerald-100",
  },
  "quick-meals": {
    title: "Quick Meals Under 15 Minutes",
    description: "Ready-to-cook ingredients for those time-pressed evenings.",
    emoji: "⏰",
    tags: ["quick", "easy", "meal"],
    gradient: "from-orange-50 to-amber-100",
  },
  "vegan-essentials": {
    title: "Vegan Essentials",
    description: "Plant-based staples for every meal of the day.",
    emoji: "🌱",
    tags: ["vegan", "plant-based", "organic"],
    gradient: "from-lime-50 to-green-100",
  },
  "family-favourites": {
    title: "Family Favourites",
    description: "Crowd-pleasers that the whole family will love.",
    emoji: "👨‍👩‍👧‍👦",
    tags: ["family", "kids", "classic"],
    gradient: "from-blue-50 to-sky-100",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CollectionPage({ params }: Props) {
  const { slug } = use(params);
  const collection = COLLECTIONS[slug] ?? {
    title: "Collection",
    description: "A curated selection of our finest products.",
    emoji: "🛍️",
    tags: [],
    gradient: "from-gray-50 to-gray-100",
  };

  // Filter products by tags (for demo, just show a subset)
  const products = collection.tags.length > 0
    ? ALL_PRODUCTS.filter((p) => p.tags?.some((t) => collection.tags.includes(t))).slice(0, 12)
    : ALL_PRODUCTS.slice(0, 12);

  // Fallback to show some products if none match
  const displayProducts = products.length > 0 ? products : ALL_PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-6">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back to products
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${collection.gradient} border border-white/80 rounded-2xl p-6 md:p-8 text-center`}
      >
        <span className="text-6xl">{collection.emoji}</span>
        <h1 className="text-2xl font-bold mt-3">{collection.title}</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{collection.description}</p>
        <div className="flex justify-center gap-2 mt-3">
          {collection.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full text-xs font-medium">
              <Tag className="h-2.5 w-2.5" /> {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Other collections */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(COLLECTIONS).filter(([s]) => s !== slug).map(([s, c]) => (
          <Link
            key={s}
            href={`/collections/${s}`}
            className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl px-3 py-2 text-xs font-medium hover:shadow-md transition-shadow shrink-0"
          >
            <span>{c.emoji}</span> {c.title}
          </Link>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {displayProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}
