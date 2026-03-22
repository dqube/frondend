"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Plus, ArrowLeftRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ALL_PRODUCTS } from "@/lib/products";
import type { StoreProduct } from "@/lib/products";

const SUGGESTED = ALL_PRODUCTS.slice(0, 8);

export default function ComparePage() {
  const [selected, setSelected] = useState<StoreProduct[]>([
    ALL_PRODUCTS[0]!,
    ALL_PRODUCTS[1]!,
  ]);

  function removeItem(id: string) {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  }

  function addItem(product: StoreProduct) {
    if (selected.length < 4 && !selected.find((p) => p.id === product.id)) {
      setSelected((prev) => [...prev, product]);
    }
  }

  const rows: { label: string; getValue: (p: StoreProduct) => string }[] = [
    { label: "Price", getValue: (p) => p.priceMax ? `$${p.price.toFixed(2)} – $${p.priceMax.toFixed(2)}` : `$${p.price.toFixed(2)}` },
    { label: "Unit", getValue: (p) => p.unit ?? "—" },
    { label: "Category", getValue: (p) => p.categoryId },
    { label: "Rating", getValue: (p) => p.rating ? `${p.rating} ★ (${p.reviewCount})` : "—" },
    { label: "Origin", getValue: (p) => p.origin ?? "—" },
    { label: "Storage", getValue: (p) => p.storage ?? "—" },
    { label: "Tags", getValue: (p) => p.tags?.join(", ") ?? "—" },
    { label: "Nutrition", getValue: (p) => p.nutritionHighlights?.join(", ") ?? "—" },
    { label: "On Sale", getValue: (p) => p.onSale ? "Yes" : "No" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ArrowLeftRight className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Compare Products</h1>
        <span className="text-sm text-muted-foreground">({selected.length}/4)</span>
      </div>

      {selected.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-8 text-center">
          <ArrowLeftRight className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-1">No products to compare</h2>
          <p className="text-sm text-muted-foreground mb-4">Add products from the suggestions below or browse our catalog.</p>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            {/* Product headers */}
            <thead>
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-32 sticky left-0 bg-white/60">Feature</th>
                {selected.map((p) => (
                  <th key={p.id} className="p-4 text-center min-w-[180px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative">
                        <span className="h-16 w-16 rounded-xl bg-muted/40 flex items-center justify-center text-3xl">{p.emoji}</span>
                        <button
                          onClick={() => removeItem(p.id)}
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <Link href={`/products/${p.id}`} className="text-sm font-medium hover:text-primary transition-colors text-center line-clamp-2">
                        {p.name}
                      </Link>
                    </div>
                  </th>
                ))}
                {selected.length < 4 && (
                  <th className="p-4 text-center min-w-[180px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center">
                        <Plus className="h-5 w-5 text-primary/50" />
                      </div>
                      <span className="text-xs text-muted-foreground">Add product</span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                  <td className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide sticky left-0 bg-inherit">{row.label}</td>
                  {selected.map((p) => (
                    <td key={p.id} className="p-4 text-center text-sm">{row.getValue(p)}</td>
                  ))}
                  {selected.length < 4 && <td />}
                </tr>
              ))}
              {/* Add to cart row */}
              <tr>
                <td className="p-4 sticky left-0 bg-white/60" />
                {selected.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <button className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </td>
                ))}
                {selected.length < 4 && <td />}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Suggested products to add */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Add products to compare</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SUGGESTED.filter((p) => !selected.find((s) => s.id === p.id)).map((product) => (
            <button
              key={product.id}
              onClick={() => addItem(product)}
              disabled={selected.length >= 4}
              className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <span className="text-2xl">{product.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug line-clamp-1">{product.name}</p>
                <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
              </div>
              <Plus className="h-4 w-4 text-primary shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
