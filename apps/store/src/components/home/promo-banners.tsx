"use client";

import { motion } from "motion/react";

const BANNERS = [
  {
    id: "1",
    title: "Spring cleaning for home appliance",
    subtitle: "Get your clean on supplies.",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-100 dark:border-blue-900",
    emoji: "🧴",
  },
  {
    id: "2",
    title: "Your pet choice for fresh healthy food",
    subtitle: "Get your clean on supplies.",
    bg: "bg-card",
    border: "border-border",
    emoji: "🐾",
  },
  {
    id: "3",
    title: "Washing item with discount product",
    subtitle: "Get your clean on supplies.",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    border: "border-cyan-100 dark:border-cyan-900",
    emoji: "🫧",
  },
  {
    id: "4",
    title: "Fresh quality meat item with discount",
    subtitle: "Get your clean on supplies.",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-100 dark:border-rose-900",
    emoji: "🥩",
  },
];

export function PromoBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {BANNERS.map((b, index) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -2 }}
          className={`flex items-center gap-3 ${b.bg} border ${b.border} rounded-2xl px-4 py-3 cursor-pointer hover:shadow-md transition-shadow`}
        >
          <span className="text-4xl shrink-0 select-none">{b.emoji}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{b.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{b.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
