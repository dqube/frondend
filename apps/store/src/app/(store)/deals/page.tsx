"use client";

import Link from "next/link";
import { Tag, Clock, Percent, Gift, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "@modernstores/ui";
import { ProductCard } from "@/components/home/product-card";
import { ALL_PRODUCTS } from "@/lib/products";

const saleProducts = ALL_PRODUCTS.filter((p) => p.onSale);

const PROMO_CODES = [
  { code: "FRESH20", discount: "20% off", description: "On all fresh vegetables", expiry: "Expires Apr 15", emoji: "🥦" },
  { code: "DAIRY10", discount: "10% off", description: "Dairy products over RM 20", expiry: "Expires Apr 30", emoji: "🧀" },
  { code: "FREEDELIVERY", discount: "Free Delivery", description: "On orders over RM 50", expiry: "Ongoing", emoji: "🚚" },
];

const FLASH_DEALS = [
  { id: "fd1", name: "Organic Mixed Berry Box 500g", price: 6.99, originalPrice: 11.99, onSale: true, emoji: "🫐", unit: "500g", endsIn: "2h 15m" },
  { id: "fd2", name: "Premium Wagyu Steak 300g", price: 18.99, originalPrice: 34.99, onSale: true, emoji: "🥩", unit: "300g", endsIn: "5h 42m" },
  { id: "fd3", name: "Artisan Sourdough Bread", price: 3.49, originalPrice: 5.99, onSale: true, emoji: "🍞", unit: "1 loaf", endsIn: "1h 08m" },
];

export default function DealsPage() {
  return (
    <div className="space-y-10">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-8 md:p-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <Tag className="h-6 w-6 text-primary" />
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Fresh Deals</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Today&apos;s Best Offers</h1>
        <p className="text-muted-foreground max-w-lg">Save big on fresh groceries, household essentials, and more. New deals added daily.</p>
      </motion.div>

      {/* Flash deals */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <Clock className="h-5 w-5 text-destructive" />
          <h2 className="text-xl font-bold">Flash Deals</h2>
          <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">Limited Time</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FLASH_DEALS.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5 relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-destructive/10 text-destructive text-xs font-bold px-2.5 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                {deal.endsIn}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-16 w-16 rounded-xl bg-muted/40 flex items-center justify-center text-3xl">{deal.emoji}</span>
                <div>
                  <p className="text-sm font-medium leading-snug">{deal.name}</p>
                  <p className="text-xs text-muted-foreground">{deal.unit}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-bold text-primary">RM {deal.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">RM {deal.originalPrice.toFixed(2)}</span>
                <span className="text-xs font-bold text-white bg-destructive px-2 py-0.5 rounded-full">
                  {Math.round((1 - deal.price / deal.originalPrice) * 100)}% OFF
                </span>
              </div>
              <button
                onClick={() => toast.success(`${deal.name} added to cart`)}
                className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promo codes */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <Percent className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Promo Codes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROMO_CODES.map((promo, i) => (
            <motion.div
              key={promo.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="bg-card/60 backdrop-blur-sm border border-dashed border-primary/40 rounded-2xl p-5 flex items-center gap-4"
            >
              <span className="text-3xl">{promo.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-sm font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">{promo.code}</code>
                  <span className="text-sm font-semibold">{promo.discount}</span>
                </div>
                <p className="text-xs text-muted-foreground">{promo.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{promo.expiry}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* On Sale products */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">On Sale Now</h2>
          <Link href="/products?sort=sale" className="text-xs font-semibold text-primary bg-card/60 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded-full hover:bg-background/80 transition-colors flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {saleProducts.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
