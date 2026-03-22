"use client";

import { useState } from "react";
import { Plus, Minus, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "@modernstores/ui";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  priceMax?: number; // for price range display e.g. "$5.00 - $15.00"
  image?: string;
  emoji?: string;
  unit?: string;
  onSale?: boolean;
  hasVariants?: boolean; // shows eye icon instead of + button
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string, qty: number) => void;
  className?: string;
}

export function ProductCard({ product, onAddToCart, className = "" }: ProductCardProps) {
  const [qty, setQty] = useState(0);

  function increment() {
    const next = qty + 1;
    setQty(next);
    onAddToCart?.(product.id, next);
    if (qty === 0) toast.success(`${product.name} added to cart`);
  }

  function decrement() {
    const next = Math.max(0, qty - 1);
    setQty(next);
    onAddToCart?.(product.id, next);
  }

  const priceDisplay = product.priceMax
    ? `$${product.price.toFixed(2)} - $${product.priceMax.toFixed(2)}`
    : `$${product.price.toFixed(2)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group flex flex-col w-full rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-visible pb-4 ${className}`}
    >
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block">
      <div className="relative aspect-square rounded-t-2xl overflow-visible mb-3">
        <div className="w-full h-full flex items-center justify-center rounded-t-2xl bg-muted/40">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-5xl sm:text-6xl select-none">{product.emoji ?? "🛒"}</span>
          )}
        </div>

        {/* ON SALE badge */}
        {product.onSale && (
          <span className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            On Sale
          </span>
        )}

        {/* Cart action — bottom right */}
        <div className="absolute -bottom-3 right-3 z-10">
          {product.hasVariants ? (
            /* Eye / quick-view button */
            <button
              className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          ) : qty === 0 ? (
            /* Add to cart button */
            <button
              onClick={increment}
              className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="h-4 w-4" />
            </button>
          ) : (
            /* Quantity stepper */
            <div className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 shadow-md">
              <button
                onClick={decrement}
                className="h-5 w-5 flex items-center justify-center hover:opacity-80"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-xs font-bold min-w-[14px] text-center">{qty}</span>
              <button
                onClick={increment}
                className="h-5 w-5 flex items-center justify-center hover:opacity-80"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
      </Link>

      {/* Info area */}
      <Link href={`/products/${product.id}`} className="pt-2 px-3 flex flex-col gap-0.5">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm font-bold text-foreground">{priceDisplay}</span>
          {product.originalPrice && !product.priceMax && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm text-foreground leading-snug line-clamp-2">{product.name}</p>
        {product.unit && (
          <p className="text-xs text-muted-foreground">{product.unit}</p>
        )}
      </Link>
    </motion.div>
  );
}
