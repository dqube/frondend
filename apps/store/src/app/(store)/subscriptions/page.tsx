"use client";

import { useState } from "react";
import Link from "next/link";
import { RefreshCw, Plus, Pencil, Trash2, Pause, Play, Calendar, Package } from "lucide-react";
import { motion } from "motion/react";

interface Subscription {
  id: string;
  name: string;
  items: { name: string; emoji: string; qty: number }[];
  frequency: string;
  nextDelivery: string;
  total: number;
  active: boolean;
}

const INITIAL_SUBS: Subscription[] = [
  {
    id: "sub-1",
    name: "Weekly Essentials",
    items: [
      { name: "Whole Milk", emoji: "🥛", qty: 2 },
      { name: "Sourdough Bread", emoji: "🍞", qty: 1 },
      { name: "Free Range Eggs", emoji: "🥚", qty: 1 },
      { name: "Organic Bananas", emoji: "🍌", qty: 1 },
    ],
    frequency: "Weekly",
    nextDelivery: "Jan 15, 2025",
    total: 18.45,
    active: true,
  },
  {
    id: "sub-2",
    name: "Monthly Pantry",
    items: [
      { name: "Jasmine Rice", emoji: "🍚", qty: 1 },
      { name: "Olive Oil", emoji: "🫒", qty: 1 },
      { name: "Pasta", emoji: "🍝", qty: 2 },
    ],
    frequency: "Monthly",
    nextDelivery: "Feb 1, 2025",
    total: 24.97,
    active: true,
  },
  {
    id: "sub-3",
    name: "Fruit Box",
    items: [
      { name: "Apples", emoji: "🍎", qty: 1 },
      { name: "Oranges", emoji: "🍊", qty: 1 },
      { name: "Berries Mix", emoji: "🫐", qty: 1 },
    ],
    frequency: "Bi-weekly",
    nextDelivery: "Paused",
    total: 15.97,
    active: false,
  },
];

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>(INITIAL_SUBS);

  function toggleSubscription(id: string) {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, active: !s.active, nextDelivery: s.active ? "Paused" : "Jan 22, 2025" } : s
      )
    );
  }

  function removeSub(id: string) {
    setSubs((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Subscriptions</h1>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors">
          <Plus className="h-3.5 w-3.5" /> New Subscription
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Set up recurring deliveries and never run out of your essentials. Save 5% on all subscription orders.
      </p>

      {/* Savings banner */}
      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200/60 dark:border-green-900 rounded-xl p-4 flex items-center gap-3">
        <span className="text-2xl">💰</span>
        <div>
          <p className="text-sm font-semibold text-green-900 dark:text-green-300">You&apos;ve saved RM 23.40 with subscriptions</p>
          <p className="text-xs text-green-700 dark:text-green-400">5% discount applied automatically to all recurring orders</p>
        </div>
      </div>

      <div className="space-y-4">
        {subs.map((sub, i) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-card/60 backdrop-blur-sm border rounded-2xl shadow-sm overflow-hidden ${
              sub.active ? "border-border/50" : "border-amber-200/60"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{sub.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  sub.active ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {sub.active ? "Active" : "Paused"}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => toggleSubscription(sub.id)}
                  className="h-7 w-7 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-muted/60 transition-colors"
                  title={sub.active ? "Pause" : "Resume"}
                >
                  {sub.active ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </button>
                <button className="h-7 w-7 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-muted/60 transition-colors">
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  onClick={() => removeSub(sub.id)}
                  className="h-7 w-7 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="px-5 py-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {sub.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 bg-muted/30 px-2.5 py-1 rounded-lg">
                    <span>{item.emoji}</span>
                    <span className="text-xs">{item.name}</span>
                    <span className="text-xs text-muted-foreground">×{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-3 bg-muted/20 text-xs">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1"><RefreshCw className="h-3 w-3" /> {sub.frequency}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Next: {sub.nextDelivery}</span>
              </div>
              <span className="font-semibold text-sm">RM {sub.total.toFixed(2)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {subs.length === 0 && (
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 text-center">
          <RefreshCw className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-1">No active subscriptions</h2>
          <p className="text-sm text-muted-foreground mb-4">Set up recurring deliveries to save time and money.</p>
          <Link href="/products" className="text-sm text-primary font-medium hover:underline">Browse products</Link>
        </div>
      )}
    </div>
  );
}
