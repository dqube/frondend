"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight, Star, ShoppingCart, Heart, Share2,
  Truck, Shield, RotateCcw, Leaf, Plus, Minus, ThumbsUp,
} from "lucide-react";
import { Badge, toast } from "@modernstores/ui";
import { getProductById, getRelatedProducts, getCategoryLabel } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";

// ─── Mock reviews ─────────────────────────────────────────────────────────────

const MOCK_REVIEWS = [
  { id: "r1", author: "Sarah M.", avatar: "SM", rating: 5, date: "2 weeks ago", title: "Absolutely fresh and delicious!", body: "Couldn't be happier. Arrived perfectly ripe, full of flavour, and the packaging was minimal and eco-friendly. Will definitely order again every week.", verified: true, helpful: 24 },
  { id: "r2", author: "James T.", avatar: "JT", rating: 4, date: "1 month ago", title: "Great quality, fast delivery", body: "Really impressed with the freshness. One piece was slightly smaller than expected but the taste was spot on. Good value for the price.", verified: true, helpful: 17 },
  { id: "r3", author: "Priya K.", avatar: "PK", rating: 5, date: "3 weeks ago", title: "Best I've found online", body: "I've tried a few grocery delivery services and the quality here is noticeably better. Everything was cold, fresh, and exactly as described.", verified: false, helpful: 31 },
  { id: "r4", author: "Oliver R.", avatar: "OR", rating: 3, date: "5 weeks ago", title: "Good but not exceptional", body: "Quality is fine — nothing to complain about. I expected it to be a bit more vibrant given the photos and description. Taste was solid though.", verified: true, helpful: 8 },
  { id: "r5", author: "Aisha B.", avatar: "AB", rating: 5, date: "1 week ago", title: "Fresh, organic, worth every penny", body: "The moment I opened the bag I could smell the freshness. Perfect texture, no damage. Organic certification visible on the pack. Highly recommend.", verified: true, helpful: 19 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sz} ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-8 text-right text-muted-foreground shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-muted-foreground shrink-0">{count}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props { params: Promise<{ slug: string }> }

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductById(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.categoryId, product.id, 6);
  const categoryLabel = getCategoryLabel(product.categoryId);

  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const priceDisplay = product.priceMax
    ? `$${product.price.toFixed(2)} – $${product.priceMax.toFixed(2)}`
    : `$${product.price.toFixed(2)}`;

  const totalReviews = MOCK_REVIEWS.length;
  const avgRating = product.rating ?? (MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / totalReviews);
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: MOCK_REVIEWS.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="space-y-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link href={`/products?category=${product.categoryId}`} className="hover:text-foreground transition-colors">{categoryLabel}</Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Hero — image + info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* Image panel */}
        <div className="space-y-3">
          <div className="relative rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 aspect-square flex items-center justify-center overflow-hidden">
            {product.onSale && (
              <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                On Sale
              </span>
            )}
            <span className="text-[9rem] md:text-[11rem] select-none drop-shadow-sm">
              {product.emoji ?? "🛒"}
            </span>

            {/* Share + Wishlist float */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => setWishlisted((w) => !w)}
                className={`h-9 w-9 rounded-full flex items-center justify-center shadow-md transition-all border ${wishlisted ? "bg-red-500 border-red-500 text-white" : "bg-white/80 backdrop-blur border-white/60 text-muted-foreground hover:text-red-500"}`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
              </button>
              <button
                className="h-9 w-9 rounded-full bg-white/80 backdrop-blur border border-white/60 flex items-center justify-center shadow-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Origin + storage info pill row */}
          {(product.origin || product.storage) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.origin && (
                <div className="flex items-start gap-2.5 bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl px-4 py-3">
                  <Leaf className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Origin</p>
                    <p className="text-sm font-medium">{product.origin}</p>
                  </div>
                </div>
              )}
              {product.storage && (
                <div className="flex items-start gap-2.5 bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl px-4 py-3">
                  <Shield className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Storage</p>
                    <p className="text-sm font-medium leading-snug">{product.storage}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="space-y-6">

          {/* Category + tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs font-medium rounded-full px-3">
              {categoryLabel}
            </Badge>
            {product.onSale && (
              <Badge variant="destructive" className="text-xs font-medium rounded-full px-3">
                On Sale
              </Badge>
            )}
            {product.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs rounded-full px-3">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>

          {/* Rating row */}
          <div className="flex items-center gap-3 flex-wrap">
            <StarDisplay rating={avgRating} size="lg" />
            <span className="text-base font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount ?? totalReviews} reviews)</span>
            <a href="#reviews" className="text-sm text-primary font-medium hover:underline ml-1">
              Read reviews
            </a>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{priceDisplay}</span>
            {product.originalPrice && !product.priceMax && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.unit && (
              <span className="text-sm text-muted-foreground">/ {product.unit}</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Nutrition highlights */}
          {product.nutritionHighlights && product.nutritionHighlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.nutritionHighlights.map((h) => (
                <span key={h} className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Leaf className="h-3 w-3" />
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0 bg-muted/50 rounded-xl border border-border/50 overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                Total: <span className="font-bold text-foreground">${(product.price * qty).toFixed(2)}</span>
              </span>
            </div>

            <button
              onClick={() => toast.success(`${product.name} added to cart`)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/40">
            {[
              { icon: Truck, label: "Free delivery", sub: "on orders over $40" },
              { icon: Shield, label: "Freshness guarantee", sub: "or full refund" },
              { icon: RotateCcw, label: "Easy returns", sub: "within 24 hours" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5 py-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs font-semibold leading-tight">{label}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews & Ratings */}
      <section id="reviews" className="scroll-mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Reviews & Ratings</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-8">
          {/* Overall score */}
          <div className="bg-white/60 backdrop-blur-sm border border-border/40 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-6xl font-bold leading-none">{avgRating.toFixed(1)}</span>
            <StarDisplay rating={avgRating} size="lg" />
            <p className="text-sm text-muted-foreground">Based on {product.reviewCount ?? totalReviews} reviews</p>
          </div>

          {/* Rating breakdown */}
          <div className="md:col-span-2 bg-white/60 backdrop-blur-sm border border-border/40 rounded-3xl p-6 space-y-3">
            {ratingCounts.map(({ star, count }) => (
              <RatingBar key={star} label={`${star}★`} count={count} total={totalReviews} />
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="space-y-4">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold">{review.author}</span>
                      {review.verified && (
                        <span className="text-[10px] font-medium text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarDisplay rating={review.rating} />
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">{review.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
              </div>

              <button
                onClick={() => setHelpfulVotes((v) => ({ ...v, [review.id]: !v[review.id] }))}
                className={`flex items-center gap-1.5 text-xs transition-colors ${helpfulVotes[review.id] ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                Helpful ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">You May Also Like</h2>
            <Link href={`/products?category=${product.categoryId}`} className="text-sm text-primary font-medium hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
