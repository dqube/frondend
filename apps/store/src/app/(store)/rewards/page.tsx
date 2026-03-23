"use client";

import { Trophy, Star, Gift, ChevronRight, Lock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const POINTS = 2450;
const TIER = "Gold";
const NEXT_TIER = "Platinum";
const NEXT_TIER_POINTS = 5000;

const REWARDS = [
  { id: "1", name: "Free Delivery", points: 500, emoji: "🚚", available: true },
  { id: "2", name: "RM 5 Store Credit", points: 1000, emoji: "💰", available: true },
  { id: "3", name: "10% Off Order", points: 1500, emoji: "🏷️", available: true },
  { id: "4", name: "Free Premium Box", points: 3000, emoji: "📦", available: false },
  { id: "5", name: "RM 25 Store Credit", points: 5000, emoji: "💎", available: false },
];

const HISTORY = [
  { action: "Purchased groceries", points: "+120", date: "Jan 10" },
  { action: "Redeemed: Free Delivery", points: "-500", date: "Jan 8" },
  { action: "Reviewed 3 products", points: "+30", date: "Jan 5" },
  { action: "Referred Sarah M.", points: "+200", date: "Jan 3" },
  { action: "Purchased groceries", points: "+85", date: "Dec 28" },
];

export default function RewardsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Rewards & Loyalty</h1>
      </div>

      {/* Points hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-6 text-center space-y-3"
      >
        <div className="flex items-center justify-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span className="text-sm font-semibold text-amber-800">{TIER} Member</span>
        </div>
        <p className="text-4xl font-bold">{POINTS.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">reward points</p>

        {/* Progress to next tier */}
        <div className="max-w-xs mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{TIER}</span>
            <span>{NEXT_TIER} ({NEXT_TIER_POINTS.toLocaleString()} pts)</span>
          </div>
          <div className="h-2 rounded-full bg-amber-200/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(POINTS / NEXT_TIER_POINTS) * 100}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{(NEXT_TIER_POINTS - POINTS).toLocaleString()} points to {NEXT_TIER}</p>
        </div>
      </motion.div>

      {/* How to earn */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Shop", desc: "1pt/RM 1", emoji: "🛒" },
          { label: "Review", desc: "+10pts", emoji: "⭐" },
          { label: "Refer", desc: "+200pts", emoji: "👥" },
          { label: "Streak", desc: "2x pts", emoji: "🔥" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-3 text-center"
          >
            <span className="text-2xl">{item.emoji}</span>
            <p className="text-xs font-semibold mt-1">{item.label}</p>
            <p className="text-[10px] text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Available rewards */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Redeem Rewards</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {REWARDS.map((reward, i) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className={`bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-4 flex items-center gap-3 ${
                !reward.available ? "opacity-60" : ""
              }`}
            >
              <span className="text-3xl">{reward.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{reward.name}</p>
                <p className="text-xs text-muted-foreground">{reward.points.toLocaleString()} points</p>
              </div>
              {reward.available && POINTS >= reward.points ? (
                <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
                  Redeem
                </button>
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground/40" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Points history */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Points History</h2>
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm divide-y divide-border/30">
          {HISTORY.map((item) => (
            <div key={item.action + item.date} className="flex items-center gap-3 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <span className={`text-sm font-semibold ${item.points.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                {item.points}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
