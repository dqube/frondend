"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, Share2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  emoji: string;
  unit: string;
  inStock: boolean;
  addedAt: string;
}

const MOCK_WISHLIST: WishlistItem[] = [
  { id: "p12", name: "Strawberries 400g", price: 4.49, originalPrice: 5.99, onSale: true, emoji: "🍓", unit: "400g", inStock: true, addedAt: "2 days ago" },
  { id: "p14", name: "Avocado Ripe 2pk", price: 3.49, emoji: "🥑", unit: "2 pack", inStock: true, addedAt: "1 week ago" },
  { id: "p19", name: "Organic Whole Milk 1L", price: 3.99, originalPrice: 4.99, onSale: true, emoji: "🥛", unit: "1 bottle", inStock: true, addedAt: "3 days ago" },
  { id: "p8",  name: "Garlic Bulb 3pk", price: 1.99, emoji: "🧄", unit: "3 pack", inStock: false, addedAt: "2 weeks ago" },
  { id: "p22", name: "Cheddar Cheese Block 400g", price: 6.99, originalPrice: 8.49, onSale: true, emoji: "🧀", unit: "400g", inStock: true, addedAt: "5 days ago" },
  { id: "p17", name: "Watermelon Mini", price: 5.99, emoji: "🍉", unit: "1 each", inStock: true, addedAt: "1 day ago" },
];

export default function WishlistPage() {
  const [items, setItems] = useState(MOCK_WISHLIST);

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const inStockItems = items.filter((i) => i.inStock);

  if (items.length === 0) {
    return (
      <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 md:p-12">
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
          <Heart className="h-16 w-16 text-muted-foreground/40" />
          <h1 className="text-2xl font-bold">Your wishlist is empty</h1>
          <p className="text-muted-foreground text-sm">Save items you love for later.</p>
          <Link href="/products" className="mt-2 bg-primary text-primary-foreground px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} items saved</p>
        </div>
        {inStockItems.length > 0 && (
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            <ShoppingCart className="h-4 w-4" />
            Add All to Cart ({inStockItems.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5 flex flex-col gap-4"
          >
            <div className="flex items-start gap-4">
              <Link href={`/products/${item.id}`} className="h-20 w-20 rounded-xl bg-muted/40 flex items-center justify-center text-4xl shrink-0">
                {item.emoji}
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="text-sm font-medium leading-snug hover:text-primary transition-colors line-clamp-2">
                  {item.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{item.unit}</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-sm font-bold">RM {item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">RM {item.originalPrice.toFixed(2)}</span>
                  )}
                  {item.onSale && (
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">SALE</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-border/30">
              <span className={`text-xs font-medium ${item.inStock ? "text-green-600" : "text-red-500"}`}>
                {item.inStock ? "In Stock" : "Out of Stock"}
              </span>
              <span className="text-xs text-muted-foreground">Added {item.addedAt}</span>
            </div>

            <div className="flex gap-2">
              <button
                disabled={!item.inStock}
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-lg py-2 text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </button>
              <button
                onClick={() => remove(item.id)}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
