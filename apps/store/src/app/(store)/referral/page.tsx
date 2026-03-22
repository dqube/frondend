"use client";

import { useState } from "react";
import { Gift, Copy, Check, Users, Share2 } from "lucide-react";
import { motion } from "motion/react";

const REFERRAL_CODE = "MODERN25";

const REFERRAL_HISTORY = [
  { name: "Sarah M.", status: "completed", reward: "$5.00", date: "Jan 5, 2025" },
  { name: "Alex K.", status: "pending", reward: "$5.00", date: "Jan 10, 2025" },
  { name: "Emily R.", status: "completed", reward: "$5.00", date: "Dec 20, 2024" },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Gift className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Refer a Friend</h1>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 text-center space-y-3"
      >
        <div className="h-14 w-14 rounded-full bg-primary/15 mx-auto flex items-center justify-center">
          <Users className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-lg font-bold">Give $10, Get $5</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Share your referral code with friends. They get $10 off their first order, and you earn $5 in store credit!
        </p>

        {/* Code */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="font-mono text-xl font-bold bg-white/80 px-6 py-2.5 rounded-xl border border-border/50">{REFERRAL_CODE}</span>
          <button
            onClick={copyCode}
            className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex justify-center gap-2 pt-2">
          {["WhatsApp", "Email", "SMS", "Link"].map((channel) => (
            <button
              key={channel}
              className="px-4 py-2 rounded-xl bg-white/80 border border-border/50 text-xs font-medium hover:bg-muted/60 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="h-3 w-3" /> {channel}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Friends Referred", value: "3" },
          { label: "Credits Earned", value: "$15" },
          { label: "Pending", value: "$5" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-4 text-center"
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* History */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Referral History</h2>
        <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm divide-y divide-border/30">
          {REFERRAL_HISTORY.map((ref) => (
            <div key={ref.name} className="flex items-center gap-3 px-5 py-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {ref.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{ref.name}</p>
                <p className="text-xs text-muted-foreground">{ref.date}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                ref.status === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}>
                {ref.status === "completed" ? `+${ref.reward}` : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-lg font-semibold mb-3">How It Works</h2>
        <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "Share Code", desc: "Send your unique code to friends" },
              { step: "2", title: "They Shop", desc: "Your friend gets $10 off their first order" },
              { step: "3", title: "You Earn", desc: "Get $5 credit when they complete an order" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center text-sm font-bold mb-2">{s.step}</div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
