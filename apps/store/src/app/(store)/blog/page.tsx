"use client";

import Link from "next/link";
import { BookOpen, Clock, Search, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const BLOG_POSTS = [
  {
    slug: "seasonal-winter-vegetables",
    title: "10 Seasonal Winter Vegetables to Add to Your Cart",
    excerpt: "Discover the best winter produce and how to make the most of seasonal flavours.",
    category: "Seasonal",
    date: "Jan 10, 2025",
    readTime: "5 min",
    emoji: "🥦",
    image: "from-green-50 to-emerald-100",
  },
  {
    slug: "meal-prep-guide",
    title: "The Ultimate Meal Prep Guide for Busy Weekdays",
    excerpt: "Save time and money with our step-by-step meal prep strategies.",
    category: "Tips",
    date: "Jan 5, 2025",
    readTime: "8 min",
    emoji: "📋",
    image: "from-blue-50 to-blue-100",
  },
  {
    slug: "organic-vs-conventional",
    title: "Organic vs Conventional: What's Actually Worth the Premium?",
    excerpt: "An honest look at when organic is worth it and when it's not.",
    category: "Guide",
    date: "Dec 28, 2024",
    readTime: "6 min",
    emoji: "🌱",
    image: "from-amber-50 to-yellow-100",
  },
  {
    slug: "zero-waste-kitchen",
    title: "How to Run a Zero-Waste Kitchen",
    excerpt: "Practical tips to reduce food waste and save money at the same time.",
    category: "Sustainability",
    date: "Dec 20, 2024",
    readTime: "7 min",
    emoji: "♻️",
    image: "from-lime-50 to-green-100",
  },
  {
    slug: "quick-weeknight-dinners",
    title: "15 Quick Weeknight Dinners Under 30 Minutes",
    excerpt: "Delicious recipes that come together fast with store-cupboard staples.",
    category: "Recipes",
    date: "Dec 15, 2024",
    readTime: "10 min",
    emoji: "🍳",
    image: "from-orange-50 to-red-100",
  },
  {
    slug: "storing-fresh-produce",
    title: "How to Store Fresh Produce to Last Longer",
    excerpt: "Expert tips on keeping your fruits and vegetables fresher for longer.",
    category: "Tips",
    date: "Dec 10, 2024",
    readTime: "4 min",
    emoji: "🥕",
    image: "from-purple-50 to-pink-100",
  },
];

const CATEGORIES = ["All", "Recipes", "Tips", "Guide", "Seasonal", "Sustainability"];

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchCat = category === "All" || post.category === category;
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Blog & Tips</h1>
        <p className="text-muted-foreground">Recipes, seasonal guides, and practical grocery tips.</p>
      </motion.div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-xl border border-border/50 bg-white/80 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                category === cat ? "bg-primary text-primary-foreground" : "bg-muted/40 hover:bg-muted/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href={`/blog/${filtered[0]!.slug}`} className="block group">
            <div className={`bg-gradient-to-br ${filtered[0]!.image} border border-white/80 rounded-2xl p-6 md:p-8`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium bg-white/80 px-2.5 py-0.5 rounded-full">{filtered[0]!.category}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {filtered[0]!.readTime}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{filtered[0]!.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{filtered[0]!.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3">
                    Read More <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
                <span className="text-6xl hidden sm:block">{filtered[0]!.emoji}</span>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(1).map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
          >
            <Link href={`/blog/${post.slug}`} className="block group">
              <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm overflow-hidden h-full">
                <div className={`bg-gradient-to-br ${post.image} h-32 flex items-center justify-center`}>
                  <span className="text-5xl">{post.emoji}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-medium bg-muted/60 px-2 py-0.5 rounded-full">{post.category}</span>
                    <span className="text-[10px] text-muted-foreground">{post.date}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <BookOpen className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No articles found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}
