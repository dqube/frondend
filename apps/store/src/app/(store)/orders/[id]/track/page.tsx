"use client";

import { use } from "react";
import Link from "next/link";
import { MapPin, Package, Truck, CheckCircle2, Clock, Phone, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

const TRACKING_STEPS = [
  { label: "Order Confirmed", time: "10:30 AM", done: true, icon: CheckCircle2 },
  { label: "Preparing", time: "10:45 AM", done: true, icon: Package },
  { label: "Out for Delivery", time: "11:15 AM", done: true, icon: Truck },
  { label: "Delivered", time: "", done: false, icon: MapPin },
];

interface Props {
  params: Promise<{ id: string }>;
}

export default function TrackOrderPage({ params }: Props) {
  const { id } = use(params);
  const currentStep = TRACKING_STEPS.filter((s) => s.done).length - 1;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Link href={`/orders/${id}`} className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Track Order #{id}</h1>
          <p className="text-xs text-muted-foreground">Estimated delivery: 12:00 – 12:30 PM</p>
        </div>
      </div>

      {/* Map placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200/80 rounded-2xl h-56 flex flex-col items-center justify-center gap-2"
      >
        <Truck className="h-10 w-10 text-green-600 animate-pulse" />
        <p className="text-sm font-medium text-green-800">Driver is on the way</p>
        <p className="text-xs text-green-600">2.3 km away · ~15 min</p>
      </motion.div>

      {/* Tracking timeline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-sm font-semibold mb-4">Delivery Progress</h2>
        <div className="space-y-0">
          {TRACKING_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep + 1;
            return (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-primary text-primary-foreground" : isActive ? "bg-primary/20 text-primary border-2 border-primary" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {i < TRACKING_STEPS.length - 1 && (
                    <div className={`w-0.5 h-8 ${step.done ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
                <div className="pb-6">
                  <p className={`text-sm font-medium ${step.done ? "" : "text-muted-foreground"}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.time || "Pending"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Driver info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-sm font-semibold mb-3">Your Driver</h2>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">🚗</div>
          <div className="flex-1">
            <p className="text-sm font-medium">James W.</p>
            <p className="text-xs text-muted-foreground">Toyota Prius · LP 42 XYZ</p>
          </div>
          <button className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <Phone className="h-4 w-4 text-primary" />
          </button>
        </div>
      </motion.div>

      {/* Order summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-sm font-semibold mb-3">Order Summary</h2>
        <div className="space-y-2 text-sm">
          {[
            { name: "Organic Bananas x2", price: "$3.98", emoji: "🍌" },
            { name: "Whole Milk x1", price: "$3.49", emoji: "🥛" },
            { name: "Sourdough Bread x1", price: "$4.99", emoji: "🍞" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span>{item.emoji}</span>
              <span className="flex-1">{item.name}</span>
              <span className="font-medium">{item.price}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>$12.46</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
