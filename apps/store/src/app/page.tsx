import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromotionsCarousel } from "@/components/home/promotions-carousel";
import { PromoBanners } from "@/components/home/promo-banners";
import { Categories } from "@/components/home/categories";
import { ProductRow } from "@/components/home/product-row";
import type { Product } from "@/components/home/product-card";

const BEST_SELLERS: Product[] = [
  { id: "bs1",  name: "Organic Whole Milk 1L",        price: 3.99, originalPrice: 4.99, onSale: true,  unit: "1 bottle", emoji: "🥛" },
  { id: "bs2",  name: "Free Range Eggs 12pk",          price: 5.49,                                     unit: "12 pack",  emoji: "🥚" },
  { id: "bs3",  name: "Sourdough Bread Loaf",          price: 4.29, originalPrice: 5.50, onSale: true,  unit: "1 loaf",   emoji: "🍞" },
  { id: "bs4",  name: "Atlantic Salmon Fillet 400g",   price: 9.99,                                     unit: "400g",     emoji: "🐟" },
  { id: "bs5",  name: "Greek Yogurt Plain 500g",       price: 3.49,                                     unit: "500g",     emoji: "🥣" },
  { id: "bs6",  name: "Cheddar Cheese Block 400g",     price: 6.99, originalPrice: 8.49, onSale: true,  unit: "400g",     emoji: "🧀" },
  { id: "bs7",  name: "Chicken Breast",                price: 5.00, priceMax: 12.00,                    unit: "1 each",   emoji: "🍗", hasVariants: true },
  { id: "bs8",  name: "Butter Unsalted 250g",          price: 4.79,                                     unit: "250g",     emoji: "🧈" },
  { id: "bs9",  name: "Basmati Rice 2kg",              price: 7.99,                                     unit: "2kg",      emoji: "🍚" },
  { id: "bs10", name: "Orange Juice 1.75L",            price: 4.99, originalPrice: 6.29, onSale: true,  unit: "1.75L",    emoji: "🍊" },
  { id: "bs11", name: "Pasta Penne 500g",              price: 2.29,                                     unit: "500g",     emoji: "🍝" },
  { id: "bs12", name: "Tomato Passata 680ml",          price: 2.99,                                     unit: "680ml",    emoji: "🍅" },
  { id: "bs13", name: "Extra Virgin Olive Oil 500ml",  price: 8.99,                                     unit: "500ml",    emoji: "🫙" },
  { id: "bs14", name: "Minced Beef 500g",              price: 6.49,                                     unit: "500g",     emoji: "🥩" },
  { id: "bs15", name: "Brie Cheese 200g",              price: 5.99, originalPrice: 7.49, onSale: true,  unit: "200g",     emoji: "🧀" },
  { id: "bs16", name: "Sparkling Water 6pk",           price: 3.79,                                     unit: "6 pack",   emoji: "💧" },
  { id: "bs17", name: "Dark Chocolate 85% 100g",       price: 2.99,                                     unit: "100g",     emoji: "🍫" },
  { id: "bs18", name: "Hummus Classic 250g",           price: 3.49,                                     unit: "250g",     emoji: "🫘" },
  { id: "bs19", name: "Mixed Berry Jam 370g",          price: 3.99,                                     unit: "370g",     emoji: "🫐" },
  { id: "bs20", name: "Peanut Butter Smooth 400g",     price: 4.29,                                     unit: "400g",     emoji: "🥜" },
  { id: "bs21", name: "Coconut Milk 400ml",            price: 2.49,                                     unit: "400ml",    emoji: "🥥" },
  { id: "bs22", name: "Honey Raw 340g",                price: 6.99,                                     unit: "340g",     emoji: "🍯" },
  { id: "bs23", name: "Granola Oat & Honey 500g",      price: 4.99, originalPrice: 6.49, onSale: true,  unit: "500g",     emoji: "🥣" },
  { id: "bs24", name: "Soy Sauce 250ml",               price: 2.29,                                     unit: "250ml",    emoji: "🫙" },
  { id: "bs25", name: "Canned Tuna 3pk",               price: 4.49,                                     unit: "3 pack",   emoji: "🐟" },
];

const LATEST_PRODUCTS: Product[] = [
  { id: "lp1",  name: "Oat Milk Barista 1L",            price: 4.49, originalPrice: 5.49, onSale: true,  unit: "1L",       emoji: "🥛" },
  { id: "lp2",  name: "Plant-Based Burger Patties 2pk", price: 7.99,                                     unit: "2 pack",   emoji: "🍔" },
  { id: "lp3",  name: "Matcha Latte Powder 100g",       price: 12.99,                                    unit: "100g",     emoji: "🍵" },
  { id: "lp4",  name: "Kimchi Traditional 400g",        price: 5.99,                                     unit: "400g",     emoji: "🥬" },
  { id: "lp5",  name: "Kombucha Ginger Lemon 330ml",    price: 3.99,                                     unit: "330ml",    emoji: "🧃" },
  { id: "lp6",  name: "Cauliflower Pizza Base",         price: 6.49, originalPrice: 7.99, onSale: true,  unit: "1 each",   emoji: "🍕" },
  { id: "lp7",  name: "Truffle Infused Oil 250ml",      price: 14.99,                                    unit: "250ml",    emoji: "🫙" },
  { id: "lp8",  name: "Chickpea Pasta 400g",            price: 3.99,                                     unit: "400g",     emoji: "🍝" },
  { id: "lp9",  name: "Vegan Cheese Shreds",            price: 4.00, priceMax: 8.00,                     unit: "1 each",   emoji: "🧀", hasVariants: true },
  { id: "lp10", name: "Cold Brew Coffee 500ml",         price: 6.99,                                     unit: "500ml",    emoji: "☕" },
  { id: "lp11", name: "Quinoa Tri-Colour 500g",         price: 5.79,                                     unit: "500g",     emoji: "🌾" },
  { id: "lp12", name: "Sriracha Hot Sauce 435ml",       price: 4.99,                                     unit: "435ml",    emoji: "🌶️" },
  { id: "lp13", name: "Jackfruit BBQ 400g",             price: 4.29, originalPrice: 5.99, onSale: true,  unit: "400g",     emoji: "🍖" },
  { id: "lp14", name: "Tahini Smooth 300g",             price: 5.49,                                     unit: "300g",     emoji: "🫙" },
  { id: "lp15", name: "Açaí Frozen Puree 100g",        price: 3.49,                                     unit: "100g",     emoji: "🍇" },
  { id: "lp16", name: "Edamame Frozen 400g",            price: 3.99,                                     unit: "400g",     emoji: "🫛" },
  { id: "lp17", name: "Miso Paste White 300g",          price: 4.79,                                     unit: "300g",     emoji: "🥣" },
  { id: "lp18", name: "Spirulina Powder 200g",          price: 9.99,                                     unit: "200g",     emoji: "🌿" },
  { id: "lp19", name: "Coconut Yogurt 400g",            price: 5.29, originalPrice: 6.99, onSale: true,  unit: "400g",     emoji: "🥥" },
  { id: "lp20", name: "Hemp Seeds 250g",                price: 7.49,                                     unit: "250g",     emoji: "🌿" },
  { id: "lp21", name: "Almond Butter 250g",             price: 8.99,                                     unit: "250g",     emoji: "🥜" },
  { id: "lp22", name: "Kefir Plain 750ml",              price: 4.99,                                     unit: "750ml",    emoji: "🥛" },
  { id: "lp23", name: "Tempeh Original 200g",           price: 3.99,                                     unit: "200g",     emoji: "🫘" },
  { id: "lp24", name: "Pea Protein Powder 500g",        price: 19.99,                                    unit: "500g",     emoji: "💪" },
  { id: "lp25", name: "Date Syrup 330g",                price: 6.49, originalPrice: 8.49, onSale: true,  unit: "330g",     emoji: "🍯" },
];

const FRESH_VEGETABLES: Product[] = [
  { id: "fv1",  name: "Broccoli Crown Large",          price: 2.49,                                     unit: "1 each",   emoji: "🥦" },
  { id: "fv2",  name: "Organic Baby Spinach 150g",     price: 3.29, originalPrice: 3.99, onSale: true,  unit: "150g",     emoji: "🥬" },
  { id: "fv3",  name: "Cherry Tomatoes 250g",          price: 2.99,                                     unit: "250g",     emoji: "🍅" },
  { id: "fv4",  name: "Carrots 1kg Bag",               price: 1.99,                                     unit: "1kg",      emoji: "🥕" },
  { id: "fv5",  name: "Bell Peppers Mixed",            price: 3.00, priceMax: 5.00,                     unit: "1 each",   emoji: "🫑", hasVariants: true },
  { id: "fv6",  name: "Cucumber Long",                 price: 1.49,                                     unit: "1 each",   emoji: "🥒" },
  { id: "fv7",  name: "Zucchini 2pk",                  price: 2.79,                                     unit: "2 pack",   emoji: "🥒" },
  { id: "fv8",  name: "Red Onions 1kg",                price: 1.79,                                     unit: "1kg",      emoji: "🧅" },
  { id: "fv9",  name: "Garlic Bulb 3pk",               price: 1.99,                                     unit: "3 pack",   emoji: "🧄" },
  { id: "fv10", name: "Kale Bunch",                    price: 2.49, originalPrice: 3.49, onSale: true,  unit: "1 bunch",  emoji: "🥬" },
  { id: "fv11", name: "Sweet Potato 1kg",              price: 2.99,                                     unit: "1kg",      emoji: "🍠" },
  { id: "fv12", name: "Leeks 2pk",                     price: 2.29,                                     unit: "2 pack",   emoji: "🌿" },
  { id: "fv13", name: "Cauliflower Head",              price: 2.99,                                     unit: "1 each",   emoji: "🥦" },
  { id: "fv14", name: "Asparagus 250g Bunch",          price: 3.99,                                     unit: "250g",     emoji: "🌿" },
  { id: "fv15", name: "Butternut Squash",              price: 2.49,                                     unit: "1 each",   emoji: "🎃" },
  { id: "fv16", name: "Snow Peas 200g",                price: 2.79, originalPrice: 3.49, onSale: true,  unit: "200g",     emoji: "🫛" },
  { id: "fv17", name: "Baby Corn 200g",                price: 2.49,                                     unit: "200g",     emoji: "🌽" },
  { id: "fv18", name: "Beetroot 500g",                 price: 2.29,                                     unit: "500g",     emoji: "🫐" },
  { id: "fv19", name: "Celery Sticks Bunch",           price: 2.09,                                     unit: "1 bunch",  emoji: "🌿" },
  { id: "fv20", name: "Fennel Bulb",                   price: 2.99,                                     unit: "1 each",   emoji: "🌿" },
  { id: "fv21", name: "Organic Rocket 80g",            price: 3.49,                                     unit: "80g",      emoji: "🥬" },
  { id: "fv22", name: "Green Beans 300g",              price: 2.79, originalPrice: 3.29, onSale: true,  unit: "300g",     emoji: "🫛" },
  { id: "fv23", name: "Mushrooms White 400g",          price: 3.29,                                     unit: "400g",     emoji: "🍄" },
  { id: "fv24", name: "Iceberg Lettuce",               price: 1.79,                                     unit: "1 each",   emoji: "🥬" },
  { id: "fv25", name: "Corn on the Cob 2pk",           price: 2.29,                                     unit: "2 pack",   emoji: "🌽" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] container mx-auto px-4 py-8 space-y-10">
        <PromotionsCarousel />

        <PromoBanners />

        <Categories />

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Best Sellers</h2>
            <a href="/products?sort=best-sellers" className="text-xs font-semibold text-primary bg-white/60 backdrop-blur-sm border border-white/80 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">View all</a>
          </div>
          <ProductRow products={BEST_SELLERS} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Latest Products</h2>
            <a href="/products?sort=newest" className="text-xs font-semibold text-primary bg-white/60 backdrop-blur-sm border border-white/80 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">View all</a>
          </div>
          <ProductRow products={LATEST_PRODUCTS} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">🥦 Fresh Vegetables</h2>
            <a href="/products?category=vegetables" className="text-xs font-semibold text-primary bg-white/60 backdrop-blur-sm border border-white/80 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">View all</a>
          </div>
          <ProductRow products={FRESH_VEGETABLES} />
        </section>
      </main>
      <Footer />
    </>
  );
}
