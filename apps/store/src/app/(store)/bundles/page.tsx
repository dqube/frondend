"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, ShoppingCart, Users, Clock, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "@modernstores/ui";

interface Bundle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  items: { name: string; emoji: string }[];
  originalPrice: number;
  bundlePrice: number;
  servings: string;
  prepTime: string;
  rating: number;
  reviews: number;
}

const BUNDLES: Bundle[] = [
  {
    id: "1",
    name: "Weeknight Italian Kit",
    emoji: "🍝",
    description: "Everything you need for a classic spaghetti bolognese — fresh ingredients, authentic flavour.",
    items: [
      { name: "Fresh Pasta", emoji: "🍝" },
      { name: "Beef Mince", emoji: "🥩" },
      { name: "Cherry Tomatoes", emoji: "🍅" },
      { name: "Fresh Basil", emoji: "🌿" },
      { name: "Parmesan", emoji: "🧀" },
      { name: "Garlic", emoji: "🧄" },
    ],
    originalPrice: 18.94,
    bundlePrice: 14.99,
    servings: "4",
    prepTime: "30 min",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Smoothie Starter Pack",
    emoji: "🥤",
    description: "Kickstart your mornings with our curated smoothie ingredients — blend and go!",
    items: [
      { name: "Organic Bananas", emoji: "🍌" },
      { name: "Frozen Berries", emoji: "🫐" },
      { name: "Greek Yogurt", emoji: "🍦" },
      { name: "Honey", emoji: "🍯" },
      { name: "Baby Spinach", emoji: "🥬" },
    ],
    originalPrice: 16.95,
    bundlePrice: 12.99,
    servings: "5 smoothies",
    prepTime: "5 min",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    name: "BBQ Essentials",
    emoji: "🔥",
    description: "Fire up the grill with premium meats, fresh salads, and all the fixings.",
    items: [
      { name: "Beef Burgers", emoji: "🍔" },
      { name: "Chicken Wings", emoji: "🍗" },
      { name: "Corn on the Cob", emoji: "🌽" },
      { name: "Coleslaw Kit", emoji: "🥗" },
      { name: "Burger Buns", emoji: "🍞" },
      { name: "BBQ Sauce", emoji: "🥫" },
    ],
    originalPrice: 24.94,
    bundlePrice: 19.99,
    servings: "4-6",
    prepTime: "45 min",
    rating: 4.7,
    reviews: 67,
  },
  {
    id: "4",
    name: "Breakfast Box",
    emoji: "🥐",
    description: "A curated selection for the perfect weekend brunch — from pastries to fresh juice.",
    items: [
      { name: "Croissants", emoji: "🥐" },
      { name: "Free Range Eggs", emoji: "🥚" },
      { name: "Smoked Salmon", emoji: "🐟" },
      { name: "Avocados", emoji: "🥑" },
      { name: "Sourdough Bread", emoji: "🍞" },
      { name: "Orange Juice", emoji: "🍊" },
    ],
    originalPrice: 22.94,
    bundlePrice: 17.99,
    servings: "2-4",
    prepTime: "15 min",
    rating: 4.9,
    reviews: 156,
  },
];

export default function BundlesPage() {
  const [addedBundles, setAddedBundles] = useState<Set<string>>(new Set());

  function addToCart(id: string) {
    setAddedBundles((prev) => new Set(prev).add(id));
    const bundle = BUNDLES.find((b) => b.id === id);
    toast.success(`${bundle?.name ?? "Bundle"} added to cart`);
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Meal Kits & Bundles</h1>
        <p className="text-muted-foreground">Pre-portioned ingredients for easy cooking. Save up to 25% vs buying separately.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {BUNDLES.map((bundle, i) => {
          const savings = bundle.originalPrice - bundle.bundlePrice;
          const added = addedBundles.has(bundle.id);
          return (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 flex items-center gap-3">
                <span className="text-4xl">{bundle.emoji}</span>
                <div className="flex-1">
                  <h3 className="text-base font-bold">{bundle.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-0.5 text-xs">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {bundle.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">({bundle.reviews})</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${bundle.bundlePrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground line-through">${bundle.originalPrice.toFixed(2)}</p>
                  <p className="text-[10px] text-green-600 font-semibold">Save ${savings.toFixed(2)}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-muted-foreground">{bundle.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {bundle.items.map((item) => (
                    <span key={item.name} className="inline-flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-lg text-xs">
                      {item.emoji} {item.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {bundle.servings}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {bundle.prepTime}</span>
                  <span className="flex items-center gap-1"><Package className="h-3 w-3" /> {bundle.items.length} items</span>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border/30 px-4 py-3">
                <button
                  onClick={() => addToCart(bundle.id)}
                  disabled={added}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  {added ? "Added to Cart" : "Add Bundle to Cart"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Custom bundle CTA */}
      <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6 text-center">
        <Package className="h-8 w-8 text-primary mx-auto mb-2" />
        <h3 className="text-sm font-semibold">Build Your Own Bundle</h3>
        <p className="text-xs text-muted-foreground mt-1 mb-3">Pick any 5+ items and save 10% automatically.</p>
        <Link href="/products" className="text-sm text-primary font-medium hover:underline">
          Start building →
        </Link>
      </div>
    </div>
  );
}
