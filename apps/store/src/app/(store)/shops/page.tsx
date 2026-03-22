"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  MapPin, Clock, Phone, Navigation, Star,
  ChevronRight, Search, Filter,
} from "lucide-react";
import { cn } from "@modernstores/ui";

// Dynamically import the map to avoid SSR issues with Leaflet
const StoreMap = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore -- resolved at build time
  () => import("./store-map"),
  { ssr: false }
) as React.ComponentType<{ stores: StoreLocation[]; selectedId: string; onSelectStore: (id: string) => void }>;

// ─── Store data ───────────────────────────────────────────────────────────────

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  hours: { day: string; time: string }[];
  features: string[];
  image: string;
  isOpen: boolean;
}

const STORES: StoreLocation[] = [
  {
    id: "downtown",
    name: "ModernStores Downtown",
    address: "42 Market Street, City Center",
    city: "London EC2A 1AH",
    phone: "+44 20 7123 4567",
    lat: 51.5225,
    lng: -0.0834,
    rating: 4.8,
    reviewCount: 324,
    hours: [
      { day: "Mon – Fri", time: "7:00 AM – 10:00 PM" },
      { day: "Saturday", time: "8:00 AM – 9:00 PM" },
      { day: "Sunday", time: "9:00 AM – 7:00 PM" },
    ],
    features: ["Organic Section", "Bakery", "Deli Counter", "Free Parking"],
    image: "🏬",
    isOpen: true,
  },
  {
    id: "westside",
    name: "ModernStores Westside",
    address: "185 Holland Park Avenue",
    city: "London W11 4UL",
    phone: "+44 20 7890 1234",
    lat: 51.5074,
    lng: -0.2058,
    rating: 4.6,
    reviewCount: 198,
    hours: [
      { day: "Mon – Fri", time: "8:00 AM – 9:00 PM" },
      { day: "Saturday", time: "8:00 AM – 8:00 PM" },
      { day: "Sunday", time: "10:00 AM – 6:00 PM" },
    ],
    features: ["Organic Section", "Click & Collect", "Wheelchair Accessible"],
    image: "🛒",
    isOpen: true,
  },
  {
    id: "riverside",
    name: "ModernStores Riverside",
    address: "12 Canary Wharf, Docklands",
    city: "London E14 5AB",
    phone: "+44 20 7456 7890",
    lat: 51.5054,
    lng: -0.0235,
    rating: 4.9,
    reviewCount: 412,
    hours: [
      { day: "Mon – Fri", time: "6:30 AM – 11:00 PM" },
      { day: "Saturday", time: "7:00 AM – 10:00 PM" },
      { day: "Sunday", time: "8:00 AM – 8:00 PM" },
    ],
    features: ["24hr Click & Collect", "Bakery", "Juice Bar", "Free WiFi", "Deli Counter"],
    image: "🏪",
    isOpen: false,
  },
];

// ─── Store card component ─────────────────────────────────────────────────────

function StoreCard({
  store,
  isSelected,
  onSelect,
}: {
  store: StoreLocation;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full rounded-2xl border-2 p-5 text-left transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-white/80 bg-white/60 shadow-sm backdrop-blur-sm hover:border-primary/30 hover:shadow-md"
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
            {store.image}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold">{store.name}</h3>
            <div className="mt-0.5 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold">{store.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({store.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
            store.isOpen
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          )}
        >
          {store.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      {/* Address */}
      <div className="mb-3 flex items-start gap-2">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          {store.address}, {store.city}
        </p>
      </div>

      {/* Today's hours */}
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">{store.hours[0]?.time}</p>
      </div>

      {/* Features */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {store.features.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-full bg-muted/80 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {f}
          </span>
        ))}
        {store.features.length > 3 && (
          <span className="rounded-full bg-muted/80 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            +{store.features.length - 3} more
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Navigation className="h-3 w-3" />
          Directions
        </span>
        <span className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-accent/60">
          <Phone className="h-3 w-3" />
          Call
        </span>
        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
      </div>
    </button>
  );
}

// ─── Store detail panel (for mobile expanded view) ────────────────────────────

function StoreDetail({ store }: { store: StoreLocation }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl">
          {store.image}
        </span>
        <div>
          <h2 className="text-lg font-bold">{store.name}</h2>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{store.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({store.reviewCount} reviews)
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                store.isOpen
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {store.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      {/* Info rows */}
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {store.address}, {store.city}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Phone className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{store.phone}</p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium">Hours</p>
            <div className="space-y-1">
              {store.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6 text-sm">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-medium">Store Features</p>
        <div className="flex flex-wrap gap-2">
          {store.features.map((f) => (
            <span
              key={f}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Navigation className="h-4 w-4" />
          Get Directions
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium transition-colors hover:bg-accent/60">
          <Phone className="h-4 w-4" />
          Call Store
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopsPage() {
  const [selectedId, setSelectedId] = useState<string>(STORES[0]?.id ?? "");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedStore = useMemo(
    () => STORES.find((s) => s.id === selectedId) ?? STORES[0]!,
    [selectedId]
  );

  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) return STORES;
    const q = searchQuery.toLowerCase();
    return STORES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Our Stores</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find a ModernStores location near you
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          type="text"
          placeholder="Search by store name, address, or city…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
        />
      </div>

      {/* Map + store list */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Store list — left side on desktop, below map on mobile */}
        <div className="order-2 w-full space-y-4 lg:order-1 lg:w-96 lg:shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="space-y-3">
            {filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                isSelected={selectedId === store.id}
                onSelect={() => setSelectedId(store.id)}
              />
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/60 py-12 shadow-sm backdrop-blur-sm">
              <MapPin className="mb-3 h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm font-medium">No stores found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try searching with a different term
              </p>
            </div>
          )}
        </div>

        {/* Map — right side on desktop, first on mobile */}
        <div className="order-1 w-full lg:order-2 lg:flex-1">
          <div className="sticky top-20 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-sm">
              <StoreMap
                stores={STORES}
                selectedId={selectedId}
                onSelectStore={setSelectedId}
              />
            </div>

            {/* Detail panel — desktop only */}
            <div className="hidden lg:block">
              <StoreDetail store={selectedStore} />
            </div>
          </div>
        </div>
      </div>

      {/* Store detail — mobile only, below everything */}
      <div className="mt-6 block lg:hidden">
        <StoreDetail store={selectedStore} />
      </div>
    </div>
  );
}
