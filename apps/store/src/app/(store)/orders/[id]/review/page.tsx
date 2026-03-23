"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Star, ChevronLeft, CheckCircle2, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  params: Promise<{ id: string }>;
}

const ORDER_ITEMS = [
  { name: "Organic Bananas", emoji: "🍌" },
  { name: "Whole Milk", emoji: "🥛" },
  { name: "Sourdough Bread", emoji: "🍞" },
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => onChange(star)} className="focus:outline-none">
          <Star className={`h-6 w-6 transition-colors ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
        </button>
      ))}
    </div>
  );
}

export default function ReviewOrderPage({ params }: Props) {
  const { id } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [itemRatings, setItemRatings] = useState<Record<string, number>>({});
  const [deliveryFeedback, setDeliveryFeedback] = useState<"good" | "bad" | null>(null);
  const [comment, setComment] = useState("");

  function setItemRating(name: string, value: number) {
    setItemRatings((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center space-y-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-16 w-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </motion.div>
        <h1 className="text-2xl font-bold">Thanks for your review!</h1>
        <p className="text-sm text-muted-foreground">Your feedback helps us improve our service and helps other shoppers.</p>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/orders/${id}`} className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Review Order #{id}</h1>
          <p className="text-xs text-muted-foreground">Share your experience with this order</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Delivery rating */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5 space-y-3"
        >
          <h2 className="text-sm font-semibold">Delivery Experience</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">How was the delivery?</span>
            <StarRating value={deliveryRating} onChange={setDeliveryRating} />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDeliveryFeedback("good")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                deliveryFeedback === "good" ? "bg-green-100 text-green-800" : "bg-muted/40 hover:bg-muted/60"
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" /> On time
            </button>
            <button
              type="button"
              onClick={() => setDeliveryFeedback("bad")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                deliveryFeedback === "bad" ? "bg-red-100 text-red-800" : "bg-muted/40 hover:bg-muted/60"
              }`}
            >
              <ThumbsDown className="h-3.5 w-3.5" /> Late
            </button>
          </div>
        </motion.div>

        {/* Item ratings */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5 space-y-3"
        >
          <h2 className="text-sm font-semibold">Rate Products</h2>
          <div className="divide-y divide-border/30">
            {ORDER_ITEMS.map((item) => (
              <div key={item.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="text-2xl">{item.emoji}</span>
                <span className="flex-1 text-sm font-medium">{item.name}</span>
                <StarRating value={itemRatings[item.name] ?? 0} onChange={(v) => setItemRating(item.name, v)} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comment */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5 space-y-3"
        >
          <h2 className="text-sm font-semibold">Additional Comments</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience..."
            rows={3}
            className="w-full rounded-xl border border-border/50 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </motion.div>

        <button
          type="submit"
          disabled={deliveryRating === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
