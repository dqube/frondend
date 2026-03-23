"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Check, Home, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Address {
  id: string;
  label: string;
  type: "home" | "work";
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  phone: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "1",
    label: "Home",
    type: "home",
    name: "John Doe",
    line1: "No. 12, Jalan Ampang",
    city: "Kuala Lumpur",
    postcode: "50450",
    phone: "+60 3-2382 0100",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    type: "work",
    name: "John Doe",
    line1: "100 Tech Park",
    line2: "Floor 3",
    city: "Petaling Jaya",
    postcode: "47810",
    phone: "+60 3-7965 1200",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);

  function removeAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  function setDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Saved Addresses</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add New
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5 space-y-4">
              <h2 className="text-sm font-semibold">New Address</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input placeholder="Full Name" className="col-span-full rounded-xl border border-border/50 bg-background/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Address Line 1" className="col-span-full rounded-xl border border-border/50 bg-background/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Address Line 2 (optional)" className="col-span-full rounded-xl border border-border/50 bg-background/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="City" className="rounded-xl border border-border/50 bg-background/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Postcode" className="rounded-xl border border-border/50 bg-background/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Phone Number" className="col-span-full rounded-xl border border-border/50 bg-background/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-muted/60 hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Save Address
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {addresses.map((addr, i) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-card/60 backdrop-blur-sm border rounded-2xl shadow-sm p-5 ${
              addr.isDefault ? "border-primary/40" : "border-border/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                addr.type === "home" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
              }`}>
                {addr.type === "home" ? <Home className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Default</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{addr.name}</p>
                <p className="text-sm text-muted-foreground">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                <p className="text-sm text-muted-foreground">{addr.city}, {addr.postcode}</p>
                <p className="text-xs text-muted-foreground mt-1">{addr.phone}</p>
              </div>
              <div className="flex gap-1">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-muted/60 transition-colors"
                    title="Set as default"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                )}
                <button className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-muted/60 transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => removeAddress(addr.id)}
                  className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-1">No saved addresses</h2>
          <p className="text-sm text-muted-foreground">Add an address for faster checkout.</p>
        </div>
      )}
    </div>
  );
}
