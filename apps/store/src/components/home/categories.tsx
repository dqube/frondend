"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@modernstores/ui";
import { motion } from "motion/react";

const CATEGORIES = [
  { id: "vegetables",  label: "Fresh Vegetables", emoji: "🥦" },
  { id: "diet",        label: "Diet Foods",        emoji: "🥗" },
  { id: "nutrition",   label: "Diet Nutrition",    emoji: "💊" },
  { id: "fastfood",    label: "Fast Food Items",   emoji: "🍔" },
  { id: "fruits",      label: "Fruits Items",      emoji: "🍉" },
  { id: "healthy",     label: "Healthy Foods",     emoji: "🥑" },
  { id: "grocery",     label: "Grocery Items",     emoji: "🛒" },
  { id: "dairy",       label: "Quality Milk",      emoji: "🥛" },
  { id: "drinks",      label: "Cold Drinks",       emoji: "🥤" },
  { id: "beef",        label: "Beef Steak",        emoji: "🥩" },
  { id: "vitamins",    label: "Vitamin Items",     emoji: "🍋" },
  { id: "chicken",     label: "Raw Chicken",       emoji: "🍗" },
  { id: "breakfast",   label: "Breakfast Item",    emoji: "🍳" },
  { id: "fish",        label: "Fish Items",        emoji: "🐟" },
  { id: "greens",      label: "Green Vegetables",  emoji: "🥬" },
  { id: "snacks",      label: "Cookies & Biscuits",emoji: "🍪" },
];

export function Categories() {
  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-1">What food you love to order</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Here order your favorite foods from different categories
      </p>

      <ScrollArea className="w-full">
        <div className="flex gap-6 pb-4 justify-start md:justify-center flex-nowrap px-1">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
            >
            <Link
              href={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
              aria-label={cat.label}
            >
              <span className="h-20 w-20 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md group-hover:bg-card/90 transition-all">
                {cat.emoji}
              </span>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors w-20 text-center leading-tight">
                {cat.label}
              </span>
            </Link>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}
