"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "@/components/home/product-card";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/products";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = query.trim().length > 0
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryId.toLowerCase().includes(query.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const categoryMatches = query.trim().length > 0
    ? CATEGORIES.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories, brands..."
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-border/60 bg-background/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* No query state */}
      {!query.trim() && (
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-semibold mb-4">Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background/60 hover:bg-primary/10 hover:border-primary/30 transition-colors text-sm"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-8 mb-4">Trending Searches</h2>
          <div className="flex flex-wrap gap-2">
            {["Organic", "Vegan", "Gluten Free", "Fresh Milk", "Avocado", "Berries", "Bread", "Salmon"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-4 py-2 rounded-full border border-border/60 bg-background/60 hover:bg-primary/10 hover:border-primary/30 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category matches */}
      {categoryMatches.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categoryMatches.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-shadow text-sm font-medium"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className="text-xs text-muted-foreground">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Product results */}
      {query.trim() && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {results.length} {results.length === 1 ? "product" : "products"} found
            </h2>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          ) : (
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-1">No results found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We couldn&apos;t find anything matching &quot;{query}&quot;
              </p>
              <Link href="/products" className="text-sm font-semibold text-primary hover:underline">
                Browse all products
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
