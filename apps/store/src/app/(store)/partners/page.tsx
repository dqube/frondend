"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Handshake, Star, Globe, Mail } from "lucide-react";

const PARTNERS = [
  {
    id: "mdh",
    name: "MDH Spices",
    tagline: "Asli Masale Sach Sach",
    description: "India's most iconic spice brand, founded in 1919 by Mahashay Dharam Pal Gulati in Delhi. MDH blends and distributes over 60 varieties of spice mixes trusted by generations of Indian families worldwide.",
    focus: "Spices & Masalas",
    focusCategory: "indian-spices",
    since: "1919",
    origin: "New Delhi, India",
    rating: 4.9,
    emoji: "🌶️",
    bg: "from-red-500 to-orange-500",
    lightBg: "from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30",
    border: "border-red-200 dark:border-red-900",
    products: ["Deggi Mirch", "Chana Masala", "Kitchen King", "Rajma Masala"],
  },
  {
    id: "everest",
    name: "Everest Masala",
    tagline: "Taste that touches the peak",
    description: "Established in 1965, Everest is India's largest selling spice brand. With a range of over 50 products, Everest pure spices and masala blends bring authentic Indian flavours to kitchens around the world.",
    focus: "Spices & Masalas",
    focusCategory: "indian-spices",
    since: "1965",
    origin: "Mumbai, India",
    rating: 4.8,
    emoji: "⛰️",
    bg: "from-amber-500 to-yellow-500",
    lightBg: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30",
    border: "border-amber-200 dark:border-amber-900",
    products: ["Tikhalal Chilli", "Sambhar Masala", "Meat Masala", "Biryani Masala"],
  },
  {
    id: "india-gate",
    name: "India Gate (KRBL)",
    tagline: "The world's finest Basmati",
    description: "KRBL Limited is the world's largest Basmati rice processor and exporter. The India Gate brand is synonymous with premium aged Basmati rice, exported to over 90 countries and trusted by five-star hotels globally.",
    focus: "Rice & Grains",
    focusCategory: "rice",
    since: "1993",
    origin: "New Delhi, India",
    rating: 4.9,
    emoji: "🍚",
    bg: "from-emerald-500 to-teal-500",
    lightBg: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    border: "border-emerald-200 dark:border-emerald-900",
    products: ["Classic Basmati 5kg", "Super Basmati", "Brown Basmati", "Feast Rozzana"],
  },
  {
    id: "fortune",
    name: "Fortune (Adani Wilmar)",
    tagline: "Good for you, good for family",
    description: "Fortune is India's No.1 cooking oil brand, part of Adani Wilmar's portfolio. From cold-pressed mustard oil to fortified sunflower oil, Fortune brings healthy, quality edible oils and staples to millions of Indian homes.",
    focus: "Cooking Oils",
    focusCategory: "indian-oils",
    since: "1999",
    origin: "Ahmedabad, India",
    rating: 4.8,
    emoji: "🫙",
    bg: "from-yellow-500 to-lime-500",
    lightBg: "from-yellow-50 to-lime-50 dark:from-yellow-950/30 dark:to-lime-950/30",
    border: "border-yellow-200 dark:border-yellow-900",
    products: ["Sunflower Oil", "Mustard Oil", "Kachi Ghani", "Soya Bean Oil"],
  },
  {
    id: "tata-sampann",
    name: "Tata Sampann",
    tagline: "Nutrients. Naturally.",
    description: "Tata Sampann is the food brand from Tata Consumer Products focused on high-quality, nutrient-rich staples. Their range of unpolished dals, spices, and besan is crafted to retain maximum natural nutrients — less processing, more goodness.",
    focus: "Pulses & Spices",
    focusCategory: "pulses",
    since: "2015",
    origin: "Mumbai, India",
    rating: 4.8,
    emoji: "🫘",
    bg: "from-blue-500 to-indigo-500",
    lightBg: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    border: "border-blue-200 dark:border-blue-900",
    products: ["Unpolished Toor Dal", "Chana Dal", "Moong Dal", "Haldi Powder"],
  },
  {
    id: "mtr",
    name: "MTR Foods",
    tagline: "Authentically South Indian",
    description: "Founded in 1924 in Bangalore as Mavalli Tiffin Rooms, MTR Foods is the custodian of authentic South Indian cuisine. Their mixes, masalas, and ready-to-eat meals recreate restaurant-quality dishes at home with effortless ease.",
    focus: "Spices & Ready Mixes",
    focusCategory: "indian-spices",
    since: "1924",
    origin: "Bengaluru, India",
    rating: 4.7,
    emoji: "🍛",
    bg: "from-orange-500 to-red-500",
    lightBg: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
    border: "border-orange-200 dark:border-orange-900",
    products: ["Sambar Powder", "Rasam Powder", "Bisibelebath Mix", "Idli Mix"],
  },
  {
    id: "eastern",
    name: "Eastern Condiments",
    tagline: "The taste of Kerala",
    description: "Eastern Condiments, based in Kerala, has been mastering the art of spice processing since 1983. Specialising in Kerala and South Indian masalas, their single-origin spices and curry powders carry the authentic flavour of God's Own Country.",
    focus: "Spices & Masalas",
    focusCategory: "indian-spices",
    since: "1983",
    origin: "Kottayam, Kerala",
    rating: 4.8,
    emoji: "🌿",
    bg: "from-green-500 to-emerald-500",
    lightBg: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    border: "border-green-200 dark:border-green-900",
    products: ["Kerala Fish Masala", "Chicken Masala", "Curry Powder", "Biryani Mix"],
  },
  {
    id: "patanjali",
    name: "Patanjali Ayurved",
    tagline: "Natural. Swadeshi. Pure.",
    description: "Patanjali Ayurved brings the principles of Ayurveda to everyday food. Their naturally produced mustard oil, honey, pulses, and spices are made without chemicals or preservatives, emphasising purity and the swadeshi (Indian-made) ethos.",
    focus: "Natural Staples & Oils",
    focusCategory: "indian-oils",
    since: "2006",
    origin: "Haridwar, India",
    rating: 4.6,
    emoji: "🌾",
    bg: "from-lime-600 to-green-600",
    lightBg: "from-lime-50 to-green-50 dark:from-lime-950/30 dark:to-green-950/30",
    border: "border-lime-200 dark:border-lime-900",
    products: ["Kachi Ghani Mustard Oil", "Wild Honey", "Sarsyon Ka Tel", "Cow Ghee"],
  },
  {
    id: "aashirvaad",
    name: "Aashirvaad (ITC)",
    tagline: "Goodness of wheat, goodness of life",
    description: "Aashirvaad, India's leading atta (wheat flour) brand from ITC, has expanded into spices, pulses, and salt. Every product is crafted to deliver consistent quality and authentic taste, from the wheat fields of Punjab to Indian households everywhere.",
    focus: "Flour, Spices & Staples",
    focusCategory: "pulses",
    since: "2002",
    origin: "Kolkata, India",
    rating: 4.7,
    emoji: "🌾",
    bg: "from-amber-600 to-orange-600",
    lightBg: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    border: "border-amber-200 dark:border-amber-900",
    products: ["Multigrain Atta", "Turmeric Powder", "Chana Dal", "Rock Salt"],
  },
  {
    id: "24mantra",
    name: "24 Mantra Organic",
    tagline: "Simply. Organically. Better.",
    description: "24 Mantra is India's largest certified organic food brand, working directly with 40,000+ farmers across India. Their certified organic pulses, rice, spices, and oils are farmed without synthetic pesticides or fertilisers for a cleaner, healthier pantry.",
    focus: "Organic Staples",
    focusCategory: "pulses",
    since: "2000",
    origin: "Hyderabad, India",
    rating: 4.8,
    emoji: "🌱",
    bg: "from-teal-500 to-cyan-500",
    lightBg: "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
    border: "border-teal-200 dark:border-teal-900",
    products: ["Organic Toor Dal", "Organic Basmati", "Organic Turmeric", "Organic Coconut Oil"],
  },
  {
    id: "catch",
    name: "Catch Spices",
    tagline: "Flavours of India, captured",
    description: "Catch Spices, from DS Group, is known for its premium whole and ground spices sourced from the finest spice-growing regions of India. Their modern packaging preserves freshness and aroma, bringing elevated spice quality to everyday cooking.",
    focus: "Spices & Seasonings",
    focusCategory: "indian-spices",
    since: "1987",
    origin: "Noida, India",
    rating: 4.7,
    emoji: "✨",
    bg: "from-purple-500 to-pink-500",
    lightBg: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
    border: "border-purple-200 dark:border-purple-900",
    products: ["Black Salt", "Chaat Masala", "Mixed Herbs", "Pepper Grind"],
  },
  {
    id: "laxmi",
    name: "Laxmi Brand (House of Spices)",
    tagline: "The taste of home, wherever you are",
    description: "House of Spices has been supplying authentic Indian grocery products to the diaspora since 1970. The Laxmi brand is trusted by Indian families worldwide for quality basmati rice, dals, atta, and spice blends that bring the taste of home abroad.",
    focus: "Full Indian Pantry Range",
    focusCategory: "rice",
    since: "1970",
    origin: "USA (Indian Diaspora)",
    rating: 4.8,
    emoji: "🏠",
    bg: "from-rose-500 to-red-500",
    lightBg: "from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30",
    border: "border-rose-200 dark:border-rose-900",
    products: ["Extra Long Basmati", "Moong Dal", "Jeera", "Hing (Asafoetida)"],
  },
];

const CATEGORY_FILTERS = [
  { id: "all",           label: "All Partners" },
  { id: "indian-spices", label: "Spices & Masalas" },
  { id: "rice",          label: "Rice & Grains" },
  { id: "indian-oils",   label: "Cooking Oils" },
  { id: "pulses",        label: "Pulses & Dhals" },
];

const STATS = [
  { value: "12+", label: "Brand Partners" },
  { value: "500+", label: "Products Listed" },
  { value: "100+", label: "Years Combined Heritage" },
  { value: "40K+", label: "Farmers Supported" },
];

export default function PartnersPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PARTNERS
      : PARTNERS.filter((p) => p.focusCategory === activeFilter);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-orange-500/10 border border-border/50 p-8 md:p-14 text-center"
      >
        {/* Floating background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["🌶️", "🍚", "🫙", "🫘", "🌿", "⛰️", "🌾", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl opacity-10 select-none"
              style={{
                left: `${8 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -16, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <Handshake className="h-3.5 w-3.5" />
            Trusted Partners Network
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Sourced from India&apos;s<br />
            <span className="text-primary">Most Trusted Brands</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We partner exclusively with heritage Indian food manufacturers — brands that have earned the
            trust of generations of families across India and the world. From spice houses to rice mills,
            every product on our shelves comes with a story of craft, culture, and commitment to quality.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-5 text-center shadow-sm"
          >
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === f.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card/60 border-border/50 hover:bg-accent/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className={`group relative bg-gradient-to-br ${partner.lightBg} border ${partner.border} rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow`}
          >
            {/* Floating logo / emoji */}
            <div className="relative h-32 flex items-center justify-center overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${partner.bg} opacity-10`} />
              {/* Decorative floating rings */}
              <motion.div
                className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${partner.bg} opacity-10`}
                animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className={`absolute w-14 h-14 rounded-full bg-gradient-to-br ${partner.bg} opacity-15`}
                animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              {/* Main floating emoji logo */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${partner.bg} flex items-center justify-center shadow-lg text-3xl`}>
                  {partner.emoji}
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-foreground text-base leading-tight">{partner.name}</h3>
                <div className="flex items-center gap-0.5 shrink-0 ml-2">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-foreground">{partner.rating}</span>
                </div>
              </div>
              <p className="text-xs text-primary font-medium italic mb-3">&quot;{partner.tagline}&quot;</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {partner.description}
              </p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="inline-flex items-center gap-1 text-[10px] bg-background/70 border border-border/50 rounded-full px-2 py-0.5 text-muted-foreground">
                  <Globe className="h-2.5 w-2.5" />
                  {partner.origin}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-background/70 border border-border/50 rounded-full px-2 py-0.5 text-muted-foreground">
                  Since {partner.since}
                </span>
              </div>

              {/* Product tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {partner.products.map((prod) => (
                  <span
                    key={prod}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${partner.bg} text-white`}
                  >
                    {prod}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/products?category=${partner.focusCategory}`}
                className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Browse {partner.focus}
                <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Become a Partner CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary/10 to-orange-500/10 border border-primary/20 rounded-3xl p-8 md:p-12 text-center"
      >
        <div className="text-4xl mb-4">🤝</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Are you an Indian food brand?</h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-6">
          We&apos;re always looking to partner with authentic Indian food manufacturers who share our
          commitment to quality, heritage, and taste. Join our growing network of trusted brands.
        </p>
        <a
          href="mailto:partners@modernstores.com"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md"
        >
          <Mail className="h-4 w-4" />
          Get in touch
        </a>
      </motion.div>
    </div>
  );
}
