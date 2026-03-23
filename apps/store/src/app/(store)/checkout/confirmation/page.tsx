"use client";

import Link from "next/link";
import { CheckCircle2, Package, MapPin, ArrowRight, Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const ORDER = {
  id: "ORD-1043",
  date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  deliverySlot: "Today, 2:00 – 3:00 PM",
  address: "12 Jalan Ampang, KLCC, Kuala Lumpur 50450",
  payment: "Visa ending in 4242",
  items: [
    { name: "Organic Bananas", emoji: "🍌", qty: 2, price: 1.99 },
    { name: "Whole Milk", emoji: "🥛", qty: 1, price: 3.49 },
    { name: "Sourdough Bread", emoji: "🍞", qty: 1, price: 4.99 },
    { name: "Free Range Eggs", emoji: "🥚", qty: 1, price: 5.99 },
  ],
  subtotal: 18.45,
  delivery: 2.99,
  total: 21.44,
};

export default function CheckoutConfirmationPage() {
  const [copied, setCopied] = useState(false);

  function copyOrderId() {
    navigator.clipboard.writeText(ORDER.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Success hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-3"
      >
        <div className="h-16 w-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Order Placed!</h1>
        <p className="text-sm text-muted-foreground">
          Thank you for your order. We&apos;ll send you a confirmation email shortly.
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-mono font-semibold bg-muted/60 px-3 py-1 rounded-lg">{ORDER.id}</span>
          <button onClick={copyOrderId} className="h-7 w-7 rounded-md bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors">
            {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </motion.div>

      {/* Delivery info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" /> Delivery Details
        </h2>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Slot</span>
            <span className="font-medium">{ORDER.deliverySlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address</span>
            <span className="font-medium text-right">{ORDER.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium">{ORDER.payment}</span>
          </div>
        </div>
      </motion.div>

      {/* Items */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" /> Items ({ORDER.items.length})
        </h2>
        <div className="divide-y divide-border/30">
          {ORDER.items.map((item) => (
            <div key={item.name} className="flex items-center gap-3 py-2.5">
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
              </div>
              <p className="text-sm font-semibold">RM {(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>RM {ORDER.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Delivery</span>
            <span>RM {ORDER.delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-1">
            <span>Total</span>
            <span>RM {ORDER.total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link
          href={`/orders/${ORDER.id}/track`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
        >
          Track Order <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/products"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-muted/60 font-semibold py-3 rounded-xl hover:bg-muted transition-colors text-sm"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}
