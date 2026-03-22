"use client";

import { Truck, Clock, MapPin, Package, Zap, Leaf } from "lucide-react";
import { motion } from "motion/react";

const DELIVERY_OPTIONS = [
  {
    icon: Zap,
    name: "Express Delivery",
    time: "Within 2 hours",
    price: "£4.99",
    desc: "For urgent orders — we'll prioritise your delivery.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Clock,
    name: "Same-Day Delivery",
    time: "Choose a 1-hour slot",
    price: "£2.99",
    desc: "Select a convenient time slot for today.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Truck,
    name: "Standard Delivery",
    time: "Next day",
    price: "FREE over £50",
    desc: "Scheduled next-day delivery with flexible time slots.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    name: "Click & Collect",
    time: "Ready in 1 hour",
    price: "Free",
    desc: "Order online and pick up from your nearest ModernStores location.",
    color: "bg-purple-100 text-purple-600",
  },
];

const ZONES = [
  { area: "Central London (Zones 1–2)", sameDay: "✓", express: "✓", nextDay: "✓" },
  { area: "Inner London (Zones 3–4)", sameDay: "✓", express: "✓", nextDay: "✓" },
  { area: "Outer London (Zones 5–6)", sameDay: "✓", express: "—", nextDay: "✓" },
  { area: "Greater London", sameDay: "—", express: "—", nextDay: "✓" },
];

export default function DeliveryPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Delivery Information</h1>
        <p className="text-muted-foreground">Fast, flexible delivery options to suit your schedule.</p>
      </motion.div>

      {/* Delivery options */}
      <div className="grid gap-4 sm:grid-cols-2">
        {DELIVERY_OPTIONS.map((opt, i) => {
          const Icon = opt.icon;
          return (
            <motion.div
              key={opt.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5"
            >
              <div className={`h-10 w-10 rounded-xl ${opt.color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold">{opt.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{opt.time}</span>
                <span className="text-xs font-semibold text-primary">{opt.price}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{opt.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Delivery zones */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border/50">
          <h2 className="text-lg font-semibold">Delivery Zones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Area</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Same-Day</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Express</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">Next-Day</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map((zone) => (
                <tr key={zone.area} className="border-t border-border/30">
                  <td className="px-5 py-3 font-medium">{zone.area}</td>
                  <td className="text-center px-3 py-3">{zone.sameDay}</td>
                  <td className="text-center px-3 py-3">{zone.express}</td>
                  <td className="text-center px-3 py-3">{zone.nextDay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Packaging */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-xl bg-green-100 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Eco-Friendly Packaging</h2>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>All our deliveries use 100% recyclable and compostable packaging. We&apos;ve eliminated single-use plastics across our entire supply chain.</p>
          <p>Our insulated bags keep chilled and frozen items at the right temperature throughout delivery — no styrofoam needed.</p>
        </div>
      </motion.div>

      {/* Delivery tips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Delivery Tips</h2>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Ensure someone is available to receive the delivery at the specified address</li>
          <li>• You can add delivery instructions (buzzer code, gate info) in checkout</li>
          <li>• Track your order in real-time once it&apos;s out for delivery</li>
          <li>• Contact your driver directly through the app if needed</li>
          <li>• Orders over £50 qualify for free standard delivery</li>
        </ul>
      </motion.div>
    </div>
  );
}
