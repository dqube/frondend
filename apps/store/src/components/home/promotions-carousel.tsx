"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface Promotion {
  id: string;
  title: string;
  description: string;
  badge: string;
  gradient: string;
  emoji: string;
}

const PROMOTIONS: Promotion[] = [
  {
    id: "1",
    title: "Fresh Organic Produce",
    description: "Up to 30% off on all organic fruits and vegetables",
    badge: "30% OFF",
    gradient: "from-emerald-400 to-teal-500",
    emoji: "🥦",
  },
  {
    id: "2",
    title: "Weekend Meat Sale",
    description: "Premium cuts at unbeatable prices this weekend only",
    badge: "Limited Time",
    gradient: "from-red-400 to-rose-500",
    emoji: "🥩",
  },
  {
    id: "3",
    title: "Dairy Deals",
    description: "Buy 2 get 1 free on all dairy products",
    badge: "B2G1 Free",
    gradient: "from-yellow-300 to-amber-400",
    emoji: "🧀",
  },
  {
    id: "4",
    title: "Bakery Fresh Daily",
    description: "Artisan breads and pastries baked fresh every morning",
    badge: "New Arrivals",
    gradient: "from-orange-300 to-amber-500",
    emoji: "🥖",
  },
  {
    id: "5",
    title: "Seafood Spectacular",
    description: "Fresh catch of the day delivered straight to your door",
    badge: "Fresh Today",
    gradient: "from-blue-400 to-cyan-500",
    emoji: "🦐",
  },
];

export function PromotionsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + PROMOTIONS.length) % PROMOTIONS.length);
  const next = () => setCurrent((c) => (c + 1) % PROMOTIONS.length);

  const promo = PROMOTIONS[current];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <div className={`bg-gradient-to-br ${promo.gradient} text-white p-8 md:p-12 min-h-[240px] flex flex-col justify-between transition-all duration-300`}>
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-sm">
            <span className="inline-block bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              {promo.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{promo.title}</h2>
            <p className="text-white/90 text-sm md:text-base">{promo.description}</p>
          </div>
          <span className="text-6xl md:text-8xl select-none shrink-0">{promo.emoji}</span>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {PROMOTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-white w-6" : "bg-white/40 w-2"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="h-8 w-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="h-8 w-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
