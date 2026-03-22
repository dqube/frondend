"use client";

import { Heart, Leaf, Truck, Users, Award, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  { icon: Leaf, title: "Fresh & Local", desc: "We source from local farms and suppliers within 50 miles wherever possible." },
  { icon: Heart, title: "Quality First", desc: "Every product is hand-selected and quality-checked before it reaches you." },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available across London with 1-hour express slots." },
  { icon: Users, title: "Community", desc: "Supporting local producers and giving back to the communities we serve." },
  { icon: Award, title: "Best Prices", desc: "Price-match guarantee on all everyday essentials — we won't be beaten." },
  { icon: ShieldCheck, title: "Sustainability", desc: "Zero-waste packaging and carbon-neutral delivery by 2026." },
];

const TEAM = [
  { name: "Elena Marchetti", role: "Founder & CEO", emoji: "👩‍💼" },
  { name: "David Chen", role: "Head of Operations", emoji: "👨‍💻" },
  { name: "Sarah Williams", role: "Head of Sourcing", emoji: "👩‍🌾" },
  { name: "James Okafor", role: "Head of Technology", emoji: "👨‍🔧" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h1 className="text-3xl md:text-4xl font-bold">About ModernStores</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We&apos;re on a mission to make grocery shopping effortless, affordable, and sustainable.
          Fresh food delivered to your door — the way it should be.
        </p>
      </motion.div>

      {/* Story */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6 md:p-8"
      >
        <h2 className="text-xl font-bold mb-3">Our Story</h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            ModernStores was born in 2023 from a simple idea: everyone deserves access to fresh, quality groceries
            without the hassle of crowded supermarkets or lengthy commutes.
          </p>
          <p>
            Starting with a small team in East London, we built direct relationships with local farmers, artisan
            bakers, and independent producers. Today, we serve thousands of customers across London with same-day
            delivery and a curated selection of over 5,000 products.
          </p>
          <p>
            We believe in transparency — from sourcing to pricing. Every product on our platform includes origin
            information, and we&apos;re committed to fair prices for both customers and producers.
          </p>
        </div>
      </motion.div>

      {/* Values */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-center">What We Stand For</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5"
              >
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{value.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "5,000+", label: "Products" },
          { value: "50+", label: "Local Suppliers" },
          { value: "10,000+", label: "Happy Customers" },
          { value: "99.2%", label: "On-Time Delivery" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4 text-center"
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Team */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-center">Our Team</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-4 text-center"
            >
              <span className="text-4xl">{member.emoji}</span>
              <p className="text-sm font-semibold mt-2">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
