"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FAQ_CATEGORIES = [
  {
    title: "Orders & Delivery",
    items: [
      { q: "How do I place an order?", a: "Browse our products, add items to your cart, and proceed to checkout. You can choose a delivery slot that works for you and pay securely online." },
      { q: "What are the delivery slots available?", a: "We offer same-day delivery with 1-hour slots from 7am to 10pm, Monday to Saturday, and 9am to 8pm on Sundays. Express delivery (within 2 hours) is available for an additional fee." },
      { q: "Can I change or cancel my order?", a: "You can modify or cancel your order up to 1 hour before your scheduled delivery slot. Go to Orders in your account to make changes." },
      { q: "What is the minimum order value?", a: "The minimum order is RM 15. Orders over RM 50 qualify for free standard delivery." },
      { q: "What happens if an item is out of stock?", a: "We'll substitute with a similar product of equal or greater value. You can opt out of substitutions in your account settings or for individual items." },
    ],
  },
  {
    title: "Payments & Pricing",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and PayPal. All payments are processed securely." },
      { q: "When am I charged for my order?", a: "Your card is authorised when you place the order and charged after delivery. The final amount may differ slightly if substitutions are made." },
      { q: "Do you offer a price-match guarantee?", a: "Yes! If you find a lower price for the same product at a major Malaysian supermarket, we'll match it. Contact our support team with the details." },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      { q: "How do I return an item?", a: "Go to Returns in your account, select the items, choose a reason, and submit. Refunds are processed within 3–5 business days." },
      { q: "What items are eligible for return?", a: "Most items can be returned within 7 days. Perishable items must be reported within 24 hours of delivery. Items that are opened or consumed cannot be returned." },
      { q: "How long does a refund take?", a: "Refunds are issued to your original payment method within 3–5 business days after we approve the return." },
    ],
  },
  {
    title: "Account & Rewards",
    items: [
      { q: "How do I earn reward points?", a: "You earn 1 point for every RM 1 spent. Bonus points are available for reviews (10 pts), referrals (200 pts), and weekly shopping streaks (2x points)." },
      { q: "How do I redeem rewards?", a: "Go to the Rewards page in your account. You can redeem points for store credit, free delivery, or percentage discounts." },
      { q: "How does the referral program work?", a: "Share your unique referral code. Your friend gets RM 10 off their first order, and you earn RM 5 in store credit when they complete a purchase." },
    ],
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <HelpCircle className="h-8 w-8 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Find answers to common questions about ModernStores.</p>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-2xl border border-border/50 bg-background/80 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No questions match your search. Try different keywords.</p>
        </div>
      ) : (
        filtered.map((category, ci) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + ci * 0.08 }}
          >
            <h2 className="text-lg font-semibold mb-3">{category.title}</h2>
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm divide-y divide-border/30 overflow-hidden">
              {category.items.map((item) => {
                const id = `${category.title}-${item.q}`;
                const isOpen = openId === id;
                return (
                  <div key={id}>
                    <button
                      onClick={() => setOpenId(isOpen ? null : id)}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/20 transition-colors"
                    >
                      <span className="flex-1 text-sm font-medium">{item.q}</span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))
      )}

      {/* Still need help */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="/contact" className="text-primary font-medium hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
}
