"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw, Package, ChevronRight, CheckCircle2, AlertCircle, Camera } from "lucide-react";
import { motion } from "motion/react";

const RETURNABLE_ORDERS = [
  {
    id: "ORD-1042",
    date: "2025-01-08",
    items: [
      { name: "Organic Bananas", emoji: "🍌", price: 3.98, eligible: true },
      { name: "Whole Milk", emoji: "🥛", price: 3.49, eligible: true },
      { name: "Sourdough Bread", emoji: "🍞", price: 4.99, eligible: false },
    ],
  },
  {
    id: "ORD-1038",
    date: "2024-12-28",
    items: [
      { name: "Atlantic Salmon", emoji: "🐟", price: 12.99, eligible: true },
      { name: "Baby Spinach", emoji: "🥬", price: 6.98, eligible: true },
    ],
  },
];

const RETURN_REASONS = [
  "Item arrived damaged",
  "Wrong item delivered",
  "Item expired or near expiry",
  "Quality issue",
  "Missing from order",
  "Changed my mind",
  "Other",
];

export default function ReturnsPage() {
  const [step, setStep] = useState<"select" | "reason" | "done">("select");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState("");

  function toggleItem(key: string) {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function submitReturn() {
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="max-w-lg mx-auto py-12 text-center space-y-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-16 w-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </motion.div>
        <h1 className="text-2xl font-bold">Return Request Submitted</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ll review your request and process the refund within 3–5 business days.
          You&apos;ll receive an email confirmation shortly.
        </p>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          View Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <RotateCcw className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Returns & Refunds</h1>
      </div>

      {/* Policy info */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900 rounded-xl p-4 flex gap-3 text-sm">
        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-medium text-amber-900 dark:text-amber-300">Return Policy</p>
          <p className="text-amber-700 dark:text-amber-400 text-xs mt-0.5">
            Returns are accepted within 7 days of delivery for damaged, wrong, or expired items.
            Perishable items must be reported within 24 hours.
          </p>
        </div>
      </div>

      {step === "select" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Select the items you&apos;d like to return:</p>
          {RETURNABLE_ORDERS.map((order) => (
            <div key={order.id} className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{order.id}</span>
                <span className="text-xs text-muted-foreground">· {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
              <div className="divide-y divide-border/30">
                {order.items.map((item) => {
                  const key = `${order.id}-${item.name}`;
                  const isSelected = selectedItems.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => item.eligible && toggleItem(key)}
                      disabled={!item.eligible}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                        isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      <div className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                      }`}>
                        {isSelected && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span className="text-xl">{item.emoji}</span>
                      <span className="flex-1 text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
                      {!item.eligible && <span className="text-[10px] bg-muted/60 px-2 py-0.5 rounded-full">Not eligible</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={() => setStep("reason")}
            disabled={selectedItems.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "reason" && (
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Returning {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""}. Select a reason:
          </p>

          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5 space-y-2">
            {RETURN_REASONS.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  reason === r ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/40"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Photo upload placeholder */}
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-semibold mb-2">Upload photos (optional)</h3>
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 text-center">
              <Camera className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Drag photos here or click to upload</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("select")}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-muted/60 hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button
              onClick={submitReturn}
              disabled={!reason}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Submit Return
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
