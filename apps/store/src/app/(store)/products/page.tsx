"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X, Star, Check } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Button, Sheet, SheetContent, SheetTitle,
  Switch,
} from "@modernstores/ui";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/home/product-card";
import { ALL_PRODUCTS, CATEGORIES, type StoreProduct } from "@/lib/products";

const PAGE_SIZE = 12;
const MIN_PRICE = 0;
const MAX_PRICE = 50;

const SORT_OPTIONS = [
  { value: "price-asc",  label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" },
  { value: "name-asc",   label: "Name A–Z" },
  { value: "name-desc",  label: "Name Z–A" },
  { value: "sale",       label: "On Sale First" },
];

const RATING_OPTIONS = [
  { value: 4, label: "4 & above" },
  { value: 3, label: "3 & above" },
  { value: 2, label: "2 & above" },
];

function sortProducts(products: StoreProduct[], sortBy: string) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":  return sorted.sort((a, b) => a.price - b.price);
    case "price-desc": return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":   return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":  return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "sale":       return sorted.sort((a, b) => (b.onSale ? 1 : 0) - (a.onSale ? 1 : 0));
    default:           return sorted;
  }
}

/* ------------------------------------------------------------------ */
/*  Filter Drawer                                                      */
/* ------------------------------------------------------------------ */

interface Filters {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  onSaleOnly: boolean;
  minRating: number | null;
}

const DEFAULT_FILTERS: Filters = {
  category: null,
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  onSaleOnly: false,
  minRating: null,
};

function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.category)    n++;
  if (f.onSaleOnly)  n++;
  if (f.minRating)   n++;
  if (f.minPrice > MIN_PRICE || f.maxPrice < MAX_PRICE) n++;
  return n;
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  draft: Filters;
  setDraft: (f: Filters) => void;
  onApply: () => void;
  onClear: () => void;
}

function FilterDrawer({ open, onClose, draft, setDraft, onApply, onClear }: FilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:w-80 p-0 flex flex-col">
        <SheetTitle className="sr-only">Product Filters</SheetTitle>

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4 pr-12">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Filters</span>
          </div>
          <button
            onClick={onClear}
            className="text-xs font-medium text-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

          {/* Category */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Category
            </h3>
            <div className="space-y-1">
              {/* All */}
              <button
                onClick={() => setDraft({ ...draft, category: null })}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                  draft.category === null
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">🛍️</span>
                <span className="flex-1 text-left">All Items</span>
                {draft.category === null && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setDraft({ ...draft, category: cat.id })}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                    draft.category === cat.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                    {cat.emoji}
                  </span>
                  <span className="flex-1 text-left">{cat.label}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{cat.count}</span>
                  {draft.category === cat.id && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </button>
              ))}
            </div>
          </section>

          {/* Price Range */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Price Range
            </h3>
            <div className="space-y-3">
              {/* Track */}
              <div className="relative h-1.5 bg-muted rounded-full mx-1">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{
                    left:  `${((draft.minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                    right: `${100 - ((draft.maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                  }}
                />
                <input
                  type="range" min={MIN_PRICE} max={MAX_PRICE} step={1}
                  value={draft.minPrice}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v <= draft.maxPrice) setDraft({ ...draft, minPrice: v });
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                />
                <input
                  type="range" min={MIN_PRICE} max={MAX_PRICE} step={1}
                  value={draft.maxPrice}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v >= draft.minPrice) setDraft({ ...draft, maxPrice: v });
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                  <input
                    type="number" min={MIN_PRICE} max={draft.maxPrice} step={1}
                    value={draft.minPrice}
                    onChange={(e) => {
                      const v = Math.max(MIN_PRICE, Math.min(Number(e.target.value), draft.maxPrice));
                      setDraft({ ...draft, minPrice: v });
                    }}
                    className="w-full pl-6 pr-3 py-2 text-sm border border-border rounded-xl bg-background outline-none focus:border-primary focus:ring-[1px] focus:ring-primary/20 transition-colors"
                  />
                </div>
                <span className="text-muted-foreground text-sm shrink-0">–</span>
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                  <input
                    type="number" min={draft.minPrice} max={MAX_PRICE} step={1}
                    value={draft.maxPrice}
                    onChange={(e) => {
                      const v = Math.min(MAX_PRICE, Math.max(Number(e.target.value), draft.minPrice));
                      setDraft({ ...draft, maxPrice: v });
                    }}
                    className="w-full pl-6 pr-3 py-2 text-sm border border-border rounded-xl bg-background outline-none focus:border-primary focus:ring-[1px] focus:ring-primary/20 transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* On Sale */}
          <section>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">On Sale</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Show discounted items only</p>
              </div>
              <Switch
                checked={draft.onSaleOnly}
                onCheckedChange={(v) => setDraft({ ...draft, onSaleOnly: v })}
              />
            </div>
          </section>

          {/* Minimum Rating */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Minimum Rating
            </h3>
            <div className="space-y-1">
              {RATING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setDraft({ ...draft, minRating: draft.minRating === opt.value ? null : opt.value })
                  }
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    draft.minRating === opt.value
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${
                          s <= opt.value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="flex-1 text-left">{opt.label}</span>
                  {draft.minRating === opt.value && <Check className="h-3.5 w-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t px-5 py-4">
          <Button className="w-full h-11 rounded-xl font-semibold" onClick={onApply}>
            Show Results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/*  Active filter chip                                                  */
/* ------------------------------------------------------------------ */

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-primary/20">
      {label}
      <button onClick={onRemove} className="hover:opacity-70 transition-opacity" aria-label={`Remove ${label} filter`}>
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [sortBy, setSortBy] = useState("price-asc");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Applied filters (what the grid actually uses)
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    category: categoryParam,
  });

  // Draft state (inside drawer before applying)
  const [draft, setDraft] = useState<Filters>({ ...DEFAULT_FILTERS, category: categoryParam });

  function openDrawer() {
    setDraft({ ...filters }); // sync draft to current applied
    setDrawerOpen(true);
  }

  function applyFilters() {
    setFilters({ ...draft });
    setPage(1);
    setDrawerOpen(false);
  }

  function clearFilters() {
    setDraft({ ...DEFAULT_FILTERS });
  }

  function removeFilter(key: keyof Filters) {
    const updated = { ...filters, [key]: DEFAULT_FILTERS[key] };
    setFilters(updated);
    setPage(1);
  }

  function changeSort(value: string) {
    setSortBy(value);
    setPage(1);
  }

  const filtered = useMemo(() => {
    let base = ALL_PRODUCTS;
    if (filters.category)   base = base.filter((p) => p.categoryId === filters.category);
    if (filters.onSaleOnly) base = base.filter((p) => p.onSale);
    if (filters.minRating)  base = base.filter((p) => (p.rating ?? 0) >= filters.minRating!);
    base = base.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    return sortProducts(base, sortBy);
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCount = countActiveFilters(filters);

  const categoryLabel = filters.category
    ? CATEGORIES.find((c) => c.id === filters.category)?.label
    : null;

  return (
    <div>
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        draft={draft}
        setDraft={setDraft}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        {/* Filter button */}
        <button
          onClick={openDrawer}
          className={`inline-flex items-center gap-2 h-9 px-4 rounded-xl border text-sm font-medium transition-colors ${
            activeCount > 0
              ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
              : "bg-background border-border text-foreground hover:bg-muted"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-white/20 text-[11px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Active filter chips */}
        {categoryLabel && (
          <FilterChip label={categoryLabel} onRemove={() => removeFilter("category")} />
        )}
        {filters.onSaleOnly && (
          <FilterChip label="On Sale" onRemove={() => removeFilter("onSaleOnly")} />
        )}
        {filters.minRating && (
          <FilterChip label={`${filters.minRating}★ & above`} onRemove={() => removeFilter("minRating")} />
        )}
        {(filters.minPrice > MIN_PRICE || filters.maxPrice < MAX_PRICE) && (
          <FilterChip
            label={`$${filters.minPrice} – $${filters.maxPrice}`}
            onRemove={() => { removeFilter("minPrice"); removeFilter("maxPrice"); }}
          />
        )}

        {/* Spacer + count + sort */}
        <div className="flex-1" />
        <p className="text-sm text-muted-foreground hidden sm:block">
          <span className="font-semibold text-foreground">{filtered.length}</span> items
        </p>
        <Select value={sortBy} onValueChange={changeSort}>
          <SelectTrigger className="w-[160px] h-9 text-sm rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
          <button
            onClick={() => { setFilters({ ...DEFAULT_FILTERS }); setPage(1); }}
            className="mt-4 text-sm text-primary font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paged.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-10">
              <Button
                variant="outline" size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="h-9 w-9 p-0"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isNearby = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                const isEllipsis = !isNearby && (p === 2 || p === totalPages - 1);
                if (!isNearby && !isEllipsis) return null;
                if (isEllipsis) return <span key={p} className="px-1 text-muted-foreground text-sm">…</span>;
                return (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(p)}
                    className="h-9 w-9 p-0 text-sm"
                  >
                    {p}
                  </Button>
                );
              })}

              <Button
                variant="outline" size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="h-9 w-9 p-0"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Sticky filter FAB */}
      <button
        onClick={openDrawer}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="h-5 w-5" />
        {activeCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
