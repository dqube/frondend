"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, Users, ShoppingCart, ChefHat } from "lucide-react";
import { motion } from "motion/react";

const RECIPES: Record<string, {
  title: string;
  emoji: string;
  time: string;
  servings: string;
  difficulty: string;
  intro: string;
  ingredients: { name: string; amount: string; emoji: string }[];
  steps: string[];
  products: { name: string; emoji: string; price: number }[];
}> = {
  "banana-pancakes": {
    title: "Fluffy Banana Pancakes",
    emoji: "🥞",
    time: "20 min",
    servings: "4",
    difficulty: "Easy",
    intro: "Start your morning right with these naturally sweet, fluffy banana pancakes. No refined sugar needed!",
    ingredients: [
      { name: "Organic Bananas", amount: "2 ripe", emoji: "🍌" },
      { name: "Free Range Eggs", amount: "2 large", emoji: "🥚" },
      { name: "Whole Milk", amount: "200ml", emoji: "🥛" },
      { name: "Plain Flour", amount: "150g", emoji: "🌾" },
      { name: "Baking Powder", amount: "1 tsp", emoji: "🥄" },
      { name: "Vanilla Extract", amount: "1 tsp", emoji: "🧴" },
    ],
    steps: [
      "Mash the bananas in a large bowl until smooth.",
      "Add eggs and milk, whisk until combined.",
      "Fold in flour and baking powder until just mixed — don't overmix.",
      "Heat a non-stick pan over medium heat with a little butter.",
      "Pour 2 tablespoons of batter per pancake. Cook until bubbles form (about 2 minutes).",
      "Flip and cook for another minute until golden brown.",
      "Serve with fresh berries, maple syrup, or a dollop of yogurt.",
    ],
    products: [
      { name: "Organic Bananas", emoji: "🍌", price: 1.99 },
      { name: "Free Range Eggs", emoji: "🥚", price: 5.99 },
      { name: "Whole Milk", emoji: "🥛", price: 3.49 },
    ],
  },
  "salmon-bowl": {
    title: "Teriyaki Salmon Rice Bowl",
    emoji: "🍣",
    time: "25 min",
    servings: "2",
    difficulty: "Medium",
    intro: "A restaurant-quality salmon bowl you can make at home in under 30 minutes.",
    ingredients: [
      { name: "Atlantic Salmon", amount: "2 fillets", emoji: "🐟" },
      { name: "Jasmine Rice", amount: "200g", emoji: "🍚" },
      { name: "Avocado", amount: "1 ripe", emoji: "🥑" },
      { name: "Edamame", amount: "100g", emoji: "🫛" },
      { name: "Soy Sauce", amount: "3 tbsp", emoji: "🥫" },
      { name: "Sesame Seeds", amount: "1 tbsp", emoji: "🌰" },
    ],
    steps: [
      "Cook jasmine rice according to package instructions.",
      "Mix soy sauce with a tablespoon of honey for the teriyaki glaze.",
      "Pan-sear salmon fillets skin-down for 4 minutes, flip and cook 3 more minutes.",
      "Brush the glaze over the salmon during the last minute of cooking.",
      "Slice avocado and prepare edamame.",
      "Assemble bowls: rice base, salmon on top, avocado and edamame on the side.",
      "Sprinkle with sesame seeds and drizzle remaining glaze.",
    ],
    products: [
      { name: "Atlantic Salmon", emoji: "🐟", price: 12.99 },
      { name: "Jasmine Rice", emoji: "🍚", price: 5.49 },
      { name: "Avocados", emoji: "🥑", price: 4.99 },
    ],
  },
};

const DEFAULT_RECIPE = RECIPES["banana-pancakes"]!;

interface Props {
  params: Promise<{ slug: string }>;
}

export default function RecipePage({ params }: Props) {
  const { slug } = use(params);
  const recipe = RECIPES[slug] ?? DEFAULT_RECIPE;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back to recipes
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200/60 rounded-2xl p-6 text-center"
      >
        <span className="text-6xl">{recipe.emoji}</span>
        <h1 className="text-2xl font-bold mt-3">{recipe.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{recipe.intro}</p>
        <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.time}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {recipe.servings} servings</span>
          <span className="flex items-center gap-1"><ChefHat className="h-3.5 w-3.5" /> {recipe.difficulty}</span>
        </div>
      </motion.div>

      {/* Ingredients */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
        <div className="space-y-2">
          {recipe.ingredients.map((ing) => (
            <div key={ing.name} className="flex items-center gap-2 text-sm">
              <span>{ing.emoji}</span>
              <span className="flex-1">{ing.name}</span>
              <span className="text-muted-foreground">{ing.amount}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-lg font-semibold mb-3">Instructions</h2>
        <ol className="space-y-3">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              <span className="text-muted-foreground leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Shop ingredients */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-lg font-semibold mb-3">Shop the Ingredients</h2>
        <div className="space-y-2">
          {recipe.products.map((p) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="text-xl">{p.emoji}</span>
              <span className="flex-1 text-sm font-medium">{p.name}</span>
              <span className="text-sm text-muted-foreground">RM {p.price.toFixed(2)}</span>
              <button className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">
                <ShoppingCart className="h-3 w-3" /> Add
              </button>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 mt-3 flex justify-between items-center">
          <span className="text-sm font-semibold">Total: RM {recipe.products.reduce((s, p) => s + p.price, 0).toFixed(2)}</span>
          <button className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors">
            <ShoppingCart className="h-3.5 w-3.5" /> Add All to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
}
