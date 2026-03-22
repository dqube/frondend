"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@modernstores/ui";
import { useSearchParams } from "next/navigation";
import { ProductCard, type Product } from "@/components/home/product-card";

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { id: "vegetables", label: "Fresh Vegetables", emoji: "🥦", count: 45 },
  { id: "diet",       label: "Diet Foods",       emoji: "🥗", count: 32 },
  { id: "nutrition",  label: "Diet Nutrition",   emoji: "💊", count: 18 },
  { id: "fastfood",   label: "Fast Food Items",  emoji: "🍔", count: 27 },
  { id: "fruits",     label: "Fruits Items",     emoji: "🍉", count: 38 },
  { id: "healthy",    label: "Healthy Foods",    emoji: "🥑", count: 24 },
  { id: "grocery",    label: "Grocery Items",    emoji: "🛒", count: 56 },
  { id: "dairy",      label: "Quality Milk",     emoji: "🥛", count: 19 },
  { id: "drinks",     label: "Cold Drinks",      emoji: "🥤", count: 22 },
  { id: "beef",       label: "Beef Steak",       emoji: "🥩", count: 15 },
  { id: "vitamins",   label: "Vitamin Items",    emoji: "🍋", count: 12 },
  { id: "chicken",    label: "Raw Chicken",      emoji: "🍗", count: 14 },
  { id: "breakfast",  label: "Breakfast Item",   emoji: "🍳", count: 21 },
  { id: "fish",       label: "Fish Items",       emoji: "🐟", count: 16 },
  { id: "greens",     label: "Green Vegetables", emoji: "🥬", count: 28 },
  { id: "snacks",     label: "Cookies & Biscuits", emoji: "🍪", count: 34 },
];

/* ------------------------------------------------------------------ */
/*  Mock products – mapped to categories                               */
/* ------------------------------------------------------------------ */

const ALL_PRODUCTS: (Product & { categoryId: string })[] = [
  // vegetables
  { id: "p1",  name: "Broccoli Crown Large",        price: 2.49,                                    unit: "1 each",  emoji: "🥦", categoryId: "vegetables" },
  { id: "p2",  name: "Organic Baby Spinach 150g",   price: 3.29, originalPrice: 3.99, onSale: true, unit: "150g",    emoji: "🥬", categoryId: "vegetables" },
  { id: "p3",  name: "Cherry Tomatoes 250g",        price: 2.99,                                    unit: "250g",    emoji: "🍅", categoryId: "vegetables" },
  { id: "p4",  name: "Carrots 1kg Bag",             price: 1.99,                                    unit: "1kg",     emoji: "🥕", categoryId: "vegetables" },
  { id: "p5",  name: "Bell Peppers Mixed",          price: 3.00, priceMax: 5.00,                    unit: "1 each",  emoji: "🫑", categoryId: "vegetables", hasVariants: true },
  { id: "p6",  name: "Cucumber Long",               price: 1.49,                                    unit: "1 each",  emoji: "🥒", categoryId: "vegetables" },
  { id: "p7",  name: "Red Onions 1kg",              price: 1.79,                                    unit: "1kg",     emoji: "🧅", categoryId: "vegetables" },
  { id: "p8",  name: "Garlic Bulb 3pk",             price: 1.99,                                    unit: "3 pack",  emoji: "🧄", categoryId: "vegetables" },
  { id: "p9",  name: "Kale Bunch",                  price: 2.49, originalPrice: 3.49, onSale: true, unit: "1 bunch", emoji: "🥬", categoryId: "vegetables" },
  { id: "p10", name: "Sweet Potato 1kg",            price: 2.99,                                    unit: "1kg",     emoji: "🍠", categoryId: "vegetables" },

  // fruits
  { id: "p11", name: "Banana Bunch 6pk",            price: 1.99,                                    unit: "6 pack",  emoji: "🍌", categoryId: "fruits" },
  { id: "p12", name: "Strawberries 400g",           price: 4.49, originalPrice: 5.99, onSale: true, unit: "400g",    emoji: "🍓", categoryId: "fruits" },
  { id: "p13", name: "Blueberries 150g",            price: 3.99,                                    unit: "150g",    emoji: "🫐", categoryId: "fruits" },
  { id: "p14", name: "Avocado Ripe 2pk",            price: 3.49,                                    unit: "2 pack",  emoji: "🥑", categoryId: "fruits" },
  { id: "p15", name: "Mango Large",                 price: 2.49,                                    unit: "1 each",  emoji: "🥭", categoryId: "fruits" },
  { id: "p16", name: "Green Grapes 500g",           price: 3.79,                                    unit: "500g",    emoji: "🍇", categoryId: "fruits" },
  { id: "p17", name: "Watermelon Mini",             price: 5.99,                                    unit: "1 each",  emoji: "🍉", categoryId: "fruits" },
  { id: "p18", name: "Pineapple Whole",             price: 3.99, originalPrice: 4.99, onSale: true, unit: "1 each",  emoji: "🍍", categoryId: "fruits" },

  // dairy
  { id: "p19", name: "Organic Whole Milk 1L",       price: 3.99, originalPrice: 4.99, onSale: true, unit: "1 bottle",emoji: "🥛", categoryId: "dairy" },
  { id: "p20", name: "Free Range Eggs 12pk",        price: 5.49,                                    unit: "12 pack", emoji: "🥚", categoryId: "dairy" },
  { id: "p21", name: "Greek Yogurt Plain 500g",     price: 3.49,                                    unit: "500g",    emoji: "🥣", categoryId: "dairy" },
  { id: "p22", name: "Cheddar Cheese Block 400g",   price: 6.99, originalPrice: 8.49, onSale: true, unit: "400g",    emoji: "🧀", categoryId: "dairy" },
  { id: "p23", name: "Butter Unsalted 250g",        price: 4.79,                                    unit: "250g",    emoji: "🧈", categoryId: "dairy" },
  { id: "p24", name: "Brie Cheese 200g",            price: 5.99, originalPrice: 7.49, onSale: true, unit: "200g",    emoji: "🧀", categoryId: "dairy" },

  // drinks
  { id: "p25", name: "Orange Juice 1.75L",          price: 4.99, originalPrice: 6.29, onSale: true, unit: "1.75L",   emoji: "🍊", categoryId: "drinks" },
  { id: "p26", name: "Sparkling Water 6pk",         price: 3.79,                                    unit: "6 pack",  emoji: "💧", categoryId: "drinks" },
  { id: "p27", name: "Kombucha Ginger Lemon 330ml", price: 3.99,                                    unit: "330ml",   emoji: "🧃", categoryId: "drinks" },
  { id: "p28", name: "Cold Brew Coffee 500ml",      price: 6.99,                                    unit: "500ml",   emoji: "☕", categoryId: "drinks" },
  { id: "p29", name: "Coconut Water 1L",            price: 3.49,                                    unit: "1L",      emoji: "🥥", categoryId: "drinks" },

  // grocery
  { id: "p30", name: "Basmati Rice 2kg",            price: 7.99,                                    unit: "2kg",     emoji: "🍚", categoryId: "grocery" },
  { id: "p31", name: "Pasta Penne 500g",            price: 2.29,                                    unit: "500g",    emoji: "🍝", categoryId: "grocery" },
  { id: "p32", name: "Tomato Passata 680ml",        price: 2.99,                                    unit: "680ml",   emoji: "🍅", categoryId: "grocery" },
  { id: "p33", name: "Extra Virgin Olive Oil 500ml",price: 8.99,                                    unit: "500ml",   emoji: "🫙", categoryId: "grocery" },
  { id: "p34", name: "Soy Sauce 250ml",             price: 2.29,                                    unit: "250ml",   emoji: "🫙", categoryId: "grocery" },
  { id: "p35", name: "Canned Tuna 3pk",             price: 4.49,                                    unit: "3 pack",  emoji: "🐟", categoryId: "grocery" },
  { id: "p36", name: "Honey Raw 340g",              price: 6.99,                                    unit: "340g",    emoji: "🍯", categoryId: "grocery" },

  // beef
  { id: "p37", name: "Minced Beef 500g",            price: 6.49,                                    unit: "500g",    emoji: "🥩", categoryId: "beef" },
  { id: "p38", name: "Ribeye Steak 300g",           price: 12.99, originalPrice: 15.99, onSale: true, unit: "300g",  emoji: "🥩", categoryId: "beef" },
  { id: "p39", name: "Beef Sirloin 400g",           price: 9.99,                                    unit: "400g",    emoji: "🥩", categoryId: "beef" },

  // chicken
  { id: "p40", name: "Chicken Breast",              price: 5.00, priceMax: 12.00,                   unit: "1 each",  emoji: "🍗", categoryId: "chicken", hasVariants: true },
  { id: "p41", name: "Chicken Thighs 600g",         price: 5.49,                                    unit: "600g",    emoji: "🍗", categoryId: "chicken" },
  { id: "p42", name: "Whole Chicken 1.5kg",         price: 8.99, originalPrice: 10.99, onSale: true, unit: "1.5kg",  emoji: "🍗", categoryId: "chicken" },

  // fish
  { id: "p43", name: "Atlantic Salmon Fillet 400g", price: 9.99,                                    unit: "400g",    emoji: "🐟", categoryId: "fish" },
  { id: "p44", name: "Cod Fillet 300g",             price: 7.49, originalPrice: 8.99, onSale: true, unit: "300g",    emoji: "🐟", categoryId: "fish" },
  { id: "p45", name: "Tiger Prawns 400g",           price: 11.99,                                   unit: "400g",    emoji: "🦐", categoryId: "fish" },

  // snacks
  { id: "p46", name: "Dark Chocolate 85% 100g",     price: 2.99,                                    unit: "100g",    emoji: "🍫", categoryId: "snacks" },
  { id: "p47", name: "Peanut Butter Smooth 400g",   price: 4.29,                                    unit: "400g",    emoji: "🥜", categoryId: "snacks" },
  { id: "p48", name: "Granola Oat & Honey 500g",    price: 4.99, originalPrice: 6.49, onSale: true, unit: "500g",    emoji: "🥣", categoryId: "snacks" },
  { id: "p49", name: "Mixed Berry Jam 370g",        price: 3.99,                                    unit: "370g",    emoji: "🫐", categoryId: "snacks" },
  { id: "p50", name: "Hummus Classic 250g",         price: 3.49,                                    unit: "250g",    emoji: "🫘", categoryId: "snacks" },

  // diet
  { id: "p51", name: "Oat Milk Barista 1L",         price: 4.49, originalPrice: 5.49, onSale: true, unit: "1L",      emoji: "🥛", categoryId: "diet" },
  { id: "p52", name: "Plant-Based Burger Patties 2pk", price: 7.99,                                 unit: "2 pack",  emoji: "🍔", categoryId: "diet" },
  { id: "p53", name: "Cauliflower Pizza Base",      price: 6.49, originalPrice: 7.99, onSale: true, unit: "1 each",  emoji: "🍕", categoryId: "diet" },
  { id: "p54", name: "Chickpea Pasta 400g",         price: 3.99,                                    unit: "400g",    emoji: "🍝", categoryId: "diet" },
  { id: "p55", name: "Vegan Cheese Shreds",         price: 4.00, priceMax: 8.00,                    unit: "1 each",  emoji: "🧀", categoryId: "diet", hasVariants: true },

  // nutrition
  { id: "p56", name: "Spirulina Powder 200g",       price: 9.99,                                    unit: "200g",    emoji: "🌿", categoryId: "nutrition" },
  { id: "p57", name: "Pea Protein Powder 500g",     price: 19.99,                                   unit: "500g",    emoji: "💪", categoryId: "nutrition" },
  { id: "p58", name: "Hemp Seeds 250g",             price: 7.49,                                    unit: "250g",    emoji: "🌿", categoryId: "nutrition" },

  // healthy
  { id: "p59", name: "Quinoa Tri-Colour 500g",      price: 5.79,                                    unit: "500g",    emoji: "🌾", categoryId: "healthy" },
  { id: "p60", name: "Matcha Latte Powder 100g",    price: 12.99,                                   unit: "100g",    emoji: "🍵", categoryId: "healthy" },
  { id: "p61", name: "Kimchi Traditional 400g",     price: 5.99,                                    unit: "400g",    emoji: "🥬", categoryId: "healthy" },
  { id: "p62", name: "Tempeh Original 200g",        price: 3.99,                                    unit: "200g",    emoji: "🫘", categoryId: "healthy" },

  // breakfast
  { id: "p63", name: "Sourdough Bread Loaf",        price: 4.29, originalPrice: 5.50, onSale: true, unit: "1 loaf",  emoji: "🍞", categoryId: "breakfast" },
  { id: "p64", name: "Almond Butter 250g",          price: 8.99,                                    unit: "250g",    emoji: "🥜", categoryId: "breakfast" },
  { id: "p65", name: "Date Syrup 330g",             price: 6.49, originalPrice: 8.49, onSale: true, unit: "330g",    emoji: "🍯", categoryId: "breakfast" },

  // fastfood
  { id: "p66", name: "Frozen Pizza Margherita",     price: 5.99,                                    unit: "1 each",  emoji: "🍕", categoryId: "fastfood" },
  { id: "p67", name: "Chicken Nuggets 500g",        price: 4.99, originalPrice: 6.49, onSale: true, unit: "500g",    emoji: "🍗", categoryId: "fastfood" },
  { id: "p68", name: "Fish Fingers 10pk",           price: 3.99,                                    unit: "10 pack", emoji: "🐟", categoryId: "fastfood" },

  // greens
  { id: "p69", name: "Organic Rocket 80g",          price: 3.49,                                    unit: "80g",     emoji: "🥬", categoryId: "greens" },
  { id: "p70", name: "Iceberg Lettuce",             price: 1.79,                                    unit: "1 each",  emoji: "🥬", categoryId: "greens" },
  { id: "p71", name: "Green Beans 300g",            price: 2.79, originalPrice: 3.29, onSale: true, unit: "300g",    emoji: "🫛", categoryId: "greens" },

  // vitamins
  { id: "p72", name: "Açaí Frozen Puree 100g",     price: 3.49,                                    unit: "100g",    emoji: "🍇", categoryId: "vitamins" },
  { id: "p73", name: "Coconut Yogurt 400g",         price: 5.29, originalPrice: 6.99, onSale: true, unit: "400g",    emoji: "🥥", categoryId: "vitamins" },
  { id: "p74", name: "Kefir Plain 750ml",           price: 4.99,                                    unit: "750ml",   emoji: "🥛", categoryId: "vitamins" },
];

/* ------------------------------------------------------------------ */
/*  Sort options                                                       */
/* ------------------------------------------------------------------ */

const SORT_OPTIONS = [
  { value: "price-asc",  label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" },
  { value: "name-asc",   label: "Name A–Z" },
  { value: "name-desc",  label: "Name Z–A" },
  { value: "sale",       label: "On Sale First" },
];

function sortProducts(products: (Product & { categoryId: string })[], sortBy: string) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "sale":
      return sorted.sort((a, b) => (b.onSale ? 1 : 0) - (a.onSale ? 1 : 0));
    default:
      return sorted;
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categoryParam);
  const [sortBy, setSortBy] = useState("price-asc");

  const filtered = useMemo(() => {
    const base = activeCategory
      ? ALL_PRODUCTS.filter((p) => p.categoryId === activeCategory)
      : ALL_PRODUCTS;
    return sortProducts(base, sortBy);
  }, [activeCategory, sortBy]);

  return (
    <div className="flex gap-8">
      {/* ---- Category sidebar ---- */}
      <aside className="hidden lg:block w-64 shrink-0">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <nav className="space-y-0.5">
          {/* All items */}
          <button
            onClick={() => { setActiveCategory(null); setExpandedCategory(null); }}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              activeCategory === null
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-base shrink-0">
              🛍️
            </span>
            <span className="flex-1 text-left">All Items</span>
          </button>

          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedCategory(expandedCategory === cat.id ? null : cat.id);
                }}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-base shrink-0">
                  {cat.emoji}
                </span>
                <span className="flex-1 text-left">{cat.label}</span>
                {expandedCategory === cat.id ? (
                  <ChevronDown className="h-4 w-4 shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0" />
                )}
              </button>
              {/* Expanded sub-info */}
              {expandedCategory === cat.id && (
                <div className="ml-14 mt-1 mb-2 text-xs text-muted-foreground">
                  {cat.count} products
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* ---- Main content ---- */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> Items Found
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] h-9 text-sm rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile category pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 lg:hidden mb-4">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm border transition-colors ${
              activeCategory === null
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm border transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
