"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const INITIAL_ITEMS = [
  { id: "1", name: "Leafy Romaine Mixed Lettuce",            emoji: "🥬", unit: "1 each",  price: 5.00,  qty: 1 },
  { id: "2", name: "Gourmet Garden™ Lightly Dried Cilantro", emoji: "🌿", unit: "0.5 oz",  price: 7.92,  qty: 2 },
  { id: "3", name: "Freshness Guaranteed Mango Spears",      emoji: "🥭", unit: "16 oz",   price: 7.98,  qty: 1 },
  { id: "4", name: "Organic Whole Milk 1L",                  emoji: "🥛", unit: "1 L",     price: 3.99,  qty: 3 },
];

interface CartItem {
  id: string;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  qty: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  function updateQty(id: string, delta: number) {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 30 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div>
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground text-sm">Add some fresh items to get started.</p>
            <Link
              href="/products"
              className="mt-2 bg-primary text-primary-foreground px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Cart items card */}
        <div className="flex-1 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-6 md:p-8">
          <h1 className="text-xl font-bold mb-6">My Cart</h1>

          {/* Table header - desktop only */}
          <div className="hidden md:grid grid-cols-[1fr_120px_100px_40px] gap-4 pb-3 mb-1 border-b border-border/40 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
            <span />
          </div>

          {/* Cart items with dividers */}
          <div className="divide-y divide-border/40">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:grid sm:grid-cols-[1fr_120px_100px_40px] gap-4 items-start sm:items-center py-5"
              >
                {/* Product */}
                <div className="flex items-center gap-4 min-w-0">
                  <span className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center text-3xl shrink-0">
                    {item.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.unit}</p>
                    <p className="text-sm font-bold mt-1">RM {item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Qty stepper + total + remove (mobile: inline row) */}
                <div className="flex items-center gap-3 sm:contents pl-20 sm:pl-0">
                  {/* Qty stepper */}
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="h-7 w-7 flex items-center justify-center rounded-full border border-border bg-card/60 hover:bg-accent hover:border-primary transition-colors text-foreground"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="h-7 w-7 flex items-center justify-center rounded-full border border-border bg-card/60 hover:bg-accent hover:border-primary transition-colors text-foreground"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Line total */}
                  <span className="text-sm font-bold text-right w-[100px]">
                    RM {(item.price * item.qty).toFixed(2)}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => remove(item.id)}
                    aria-label="Remove item"
                    className="h-8 w-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue shopping */}
          <div className="mt-6 pt-4 border-t border-border/40">
            <Link
              href="/products"
              className="text-sm text-primary hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary card */}
        <div className="w-full lg:w-80 shrink-0 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-6 md:p-8 sticky top-24">
          <h2 className="text-lg font-bold mb-6">Order Summary</h2>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span className="font-medium">RM {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? <span className="text-primary font-semibold">Free</span> : `RM ${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-muted-foreground">
                Free shipping on orders over RM 30.00
              </p>
            )}
          </div>

          <div className="border-t border-border/50 pt-4 mb-6">
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>RM {total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
