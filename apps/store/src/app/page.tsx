import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromotionsCarousel } from "@/components/home/promotions-carousel";
import { PromoBanners } from "@/components/home/promo-banners";
import { Categories } from "@/components/home/categories";
import { ProductRow } from "@/components/home/product-row";
import { AnimatedSection } from "@/components/layout/animated-section";
import { ALL_PRODUCTS } from "@/lib/products";

const BEST_SELLERS = [...ALL_PRODUCTS].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));

const LATEST_PRODUCTS = ALL_PRODUCTS.filter((p) =>
  ["snacks", "drinks", "grocery", "dairy"].includes(p.categoryId)
);

const FRESH_VEGETABLES = ALL_PRODUCTS.filter((p) => p.categoryId === "vegetables");

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] container mx-auto px-4 py-8 space-y-10">
        <PromotionsCarousel />

        <PromoBanners />

        <Categories />

        <section>
          <AnimatedSection>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Best Sellers</h2>
            <a href="/products?sort=best-sellers" className="text-xs font-semibold text-primary bg-card/60 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded-full hover:bg-background/80 transition-colors">View all</a>
          </div>
          <ProductRow products={BEST_SELLERS} />
          </AnimatedSection>
        </section>

        <section>
          <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Latest Products</h2>
            <a href="/products?sort=newest" className="text-xs font-semibold text-primary bg-card/60 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded-full hover:bg-background/80 transition-colors">View all</a>
          </div>
          <ProductRow products={LATEST_PRODUCTS} />
          </AnimatedSection>
        </section>

        <section>
          <AnimatedSection delay={0.15}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">🥦 Fresh Vegetables</h2>
            <a href="/products?category=vegetables" className="text-xs font-semibold text-primary bg-card/60 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded-full hover:bg-background/80 transition-colors">View all</a>
          </div>
          <ProductRow products={FRESH_VEGETABLES} />
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
