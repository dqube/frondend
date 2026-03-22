"use client";

import { Sparkles, Clock } from "lucide-react";
import { motion } from "motion/react";
import { ALL_PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";

// Products added in the last 2 "weeks" — just take first 12 for demo
const NEW_PRODUCTS = ALL_PRODUCTS.slice(0, 12);

export default function NewArrivalsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">New Arrivals</h1>
        </div>
        <p className="text-muted-foreground">The latest additions to our shelves — freshly stocked this week.</p>
      </motion.div>

      {/* Highlight banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-200/60 rounded-2xl p-5 flex items-center gap-3"
      >
        <span className="text-3xl">🆕</span>
        <div>
          <p className="text-sm font-semibold">New products added every week</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Clock className="h-3 w-3" /> Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </motion.div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {NEW_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
