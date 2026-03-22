"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw, ShoppingCart, Package, Check, Clock } from "lucide-react";
import { motion } from "motion/react";

interface PastOrder {
  id: string;
  date: string;
  items: { name: string; emoji: string; price: number; qty: number }[];
  total: number;
}

const PAST_ORDERS: PastOrder[] = [
  {
    id: "ORD-1042",
    date: "2025-01-08",
    items: [
      { name: "Organic Bananas", emoji: "🍌", price: 1.99, qty: 2 },
      { name: "Whole Milk", emoji: "🥛", price: 3.49, qty: 1 },
      { name: "Sourdough Bread", emoji: "🍞", price: 4.99, qty: 1 },
      { name: "Free Range Eggs", emoji: "🥚", price: 5.99, qty: 1 },
    ],
    total: 18.45,
  },
  {
    id: "ORD-1038",
    date: "2024-12-28",
    items: [
      { name: "Atlantic Salmon", emoji: "🐟", price: 12.99, qty: 1 },
      { name: "Baby Spinach", emoji: "🥬", price: 3.49, qty: 2 },
      { name: "Greek Yogurt", emoji: "🍦", price: 4.99, qty: 1 },
    ],
    total: 24.96,
  },
  {
    id: "ORD-1025",
    date: "2024-12-15",
    items: [
      { name: "Chicken Breast", emoji: "🍗", price: 8.99, qty: 2 },
      { name: "Jasmine Rice", emoji: "🍚", price: 5.49, qty: 1 },
      { name: "Avocados", emoji: "🥑", price: 4.99, qty: 1 },
      { name: "Cherry Tomatoes", emoji: "🍅", price: 3.99, qty: 1 },
      { name: "Fresh Basil", emoji: "🌿", price: 2.49, qty: 1 },
    ],
    total: 34.94,
  },
];

export default function ReorderPage() {
  const [addedOrders, setAddedOrders] = useState<Set<string>>(new Set());

  function reorderAll(orderId: string) {
    setAddedOrders((prev) => new Set(prev).add(orderId));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <RotateCcw className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Quick Reorder</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        Easily reorder items from your previous purchases. Click &ldquo;Add All to Cart&rdquo; to add the entire order,
        or select individual items.
      </p>

      <div className="space-y-4">
        {PAST_ORDERS.map((order, idx) => {
          const added = addedOrders.has(order.id);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 px-5 py-3">
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">{order.id}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <button
                  onClick={() => reorderAll(order.id)}
                  disabled={added}
                  className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                  {added ? "Added to Cart" : "Add All to Cart"}
                </button>
              </div>

              <div className="divide-y divide-border/30">
                {order.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 px-5 py-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between px-5 py-3 bg-muted/20">
                <span className="text-xs text-muted-foreground">{order.items.length} items</span>
                <span className="text-sm font-bold">Total: ${order.total.toFixed(2)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Looking for something else?{" "}
          <Link href="/products" className="text-primary font-medium hover:underline">
            Browse all products
          </Link>
        </p>
      </div>
    </div>
  );
}
