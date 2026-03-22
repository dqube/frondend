"use client";

import { useState } from "react";
import { CreditCard, Plus, Trash2, Check, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
  icon: string;
}

const INITIAL_METHODS: PaymentMethod[] = [
  { id: "1", brand: "Visa", last4: "4242", expiry: "12/26", isDefault: true, icon: "💳" },
  { id: "2", brand: "Mastercard", last4: "8888", expiry: "08/25", isDefault: false, icon: "💳" },
  { id: "3", brand: "Apple Pay", last4: "", expiry: "", isDefault: false, icon: "🍎" },
];

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(INITIAL_METHODS);
  const [showForm, setShowForm] = useState(false);

  function removeMethod(id: string) {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  }

  function setDefault(id: string) {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Payment Methods</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add Card
        </button>
      </div>

      <div className="bg-green-50 border border-green-200/80 rounded-xl p-3 flex items-center gap-2 text-xs text-green-800">
        <Shield className="h-4 w-4 text-green-600 shrink-0" />
        Your payment information is encrypted and securely stored.
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5 space-y-4">
              <h2 className="text-sm font-semibold">Add New Card</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input placeholder="Cardholder Name" className="col-span-full rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Card Number" className="col-span-full rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="MM/YY" className="rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="CVV" className="rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-muted/60 hover:bg-muted transition-colors">Cancel</button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Save Card</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {methods.map((method, i) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-white/60 backdrop-blur-sm border rounded-2xl shadow-sm p-5 ${
              method.isDefault ? "border-primary/40" : "border-white/80"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{method.brand}</span>
                  {method.last4 && <span className="text-sm text-muted-foreground">•••• {method.last4}</span>}
                  {method.isDefault && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Default</span>
                  )}
                </div>
                {method.expiry && <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>}
              </div>
              <div className="flex gap-1">
                {!method.isDefault && (
                  <button
                    onClick={() => setDefault(method.id)}
                    className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-muted/60 transition-colors"
                    title="Set as default"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => removeMethod(method.id)}
                  className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
