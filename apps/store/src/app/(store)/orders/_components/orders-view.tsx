"use client";

import { useState } from "react";
import { Package, Search, SlidersHorizontal } from "lucide-react";
import { Input, Tabs, TabsList, TabsTrigger, TabsContent } from "@modernstores/ui";
import { AnimatedSection } from "@/components/layout/animated-section";
import { OrderCard } from "./order-card";
import { EmptyOrders } from "./empty-orders";
import type { Order, OrderStatus } from "@modernstores/types";

const SAMPLE_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "MS-20260318-001",
    userId: "u1",
    status: "delivered",
    items: [
      { id: "i1", orderId: "ord-001", productId: "p1", variantId: "v1", productName: "Organic Avocados", variantName: "Pack of 6", quantity: 2, unitPrice: 8.99, totalPrice: 17.98 },
      { id: "i2", orderId: "ord-001", productId: "p2", variantId: "v2", productName: "Almond Milk", variantName: "1L", quantity: 1, unitPrice: 4.49, totalPrice: 4.49 },
      { id: "i3", orderId: "ord-001", productId: "p3", variantId: "v3", productName: "Sourdough Bread", variantName: "Whole Loaf", quantity: 1, unitPrice: 6.99, totalPrice: 6.99 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 29.46,
    shippingFee: 0,
    discount: 2.95,
    total: 26.51,
    paymentMethod: "Visa •••• 4242",
    paymentStatus: "paid",
    createdAt: "2026-03-18T10:30:00Z",
    updatedAt: "2026-03-20T14:00:00Z",
  },
  {
    id: "ord-002",
    orderNumber: "MS-20260320-002",
    userId: "u1",
    status: "shipped",
    items: [
      { id: "i4", orderId: "ord-002", productId: "p4", variantId: "v4", productName: "Fresh Salmon Fillet", variantName: "500g", quantity: 1, unitPrice: 14.99, totalPrice: 14.99 },
      { id: "i5", orderId: "ord-002", productId: "p5", variantId: "v5", productName: "Greek Yogurt", variantName: "500g", quantity: 3, unitPrice: 3.49, totalPrice: 10.47 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 25.46,
    shippingFee: 3.99,
    discount: 0,
    total: 29.45,
    paymentMethod: "Apple Pay",
    paymentStatus: "paid",
    createdAt: "2026-03-20T09:15:00Z",
    updatedAt: "2026-03-21T11:00:00Z",
  },
  {
    id: "ord-003",
    orderNumber: "MS-20260321-003",
    userId: "u1",
    status: "processing",
    items: [
      { id: "i6", orderId: "ord-003", productId: "p6", variantId: "v6", productName: "Organic Eggs", variantName: "Dozen", quantity: 2, unitPrice: 5.99, totalPrice: 11.98 },
      { id: "i7", orderId: "ord-003", productId: "p7", variantId: "v7", productName: "Oat Milk", variantName: "1L", quantity: 2, unitPrice: 4.99, totalPrice: 9.98 },
      { id: "i8", orderId: "ord-003", productId: "p8", variantId: "v8", productName: "Bananas", variantName: "Bunch", quantity: 1, unitPrice: 2.49, totalPrice: 2.49 },
      { id: "i9", orderId: "ord-003", productId: "p9", variantId: "v9", productName: "Blueberries", variantName: "250g", quantity: 2, unitPrice: 4.99, totalPrice: 9.98 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 34.43,
    shippingFee: 0,
    discount: 5.0,
    total: 29.43,
    paymentMethod: "Visa •••• 4242",
    paymentStatus: "paid",
    createdAt: "2026-03-21T16:45:00Z",
    updatedAt: "2026-03-21T17:00:00Z",
  },
  {
    id: "ord-004",
    orderNumber: "MS-20260322-004",
    userId: "u1",
    status: "pending",
    items: [
      { id: "i10", orderId: "ord-004", productId: "p10", variantId: "v10", productName: "Wagyu Beef Steak", variantName: "300g", quantity: 2, unitPrice: 39.99, totalPrice: 79.98 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 79.98,
    shippingFee: 0,
    discount: 0,
    total: 79.98,
    paymentMethod: "Visa •••• 4242",
    paymentStatus: "pending",
    createdAt: "2026-03-22T08:00:00Z",
    updatedAt: "2026-03-22T08:00:00Z",
  },
  {
    id: "ord-005",
    orderNumber: "MS-20260310-005",
    userId: "u1",
    status: "cancelled",
    items: [
      { id: "i11", orderId: "ord-005", productId: "p11", variantId: "v11", productName: "Truffle Oil", variantName: "250ml", quantity: 1, unitPrice: 24.99, totalPrice: 24.99 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 24.99,
    shippingFee: 3.99,
    discount: 0,
    total: 28.98,
    paymentMethod: "Visa •••• 4242",
    paymentStatus: "refunded",
    createdAt: "2026-03-10T12:00:00Z",
    updatedAt: "2026-03-11T09:30:00Z",
  },
];

const STATUS_TABS: { value: string; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function OrdersView() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = SAMPLE_ORDERS.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab;
    const matchesSearch =
      !search ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
              <p className="text-sm text-muted-foreground">
                Track and manage your recent purchases
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Search */}
      <AnimatedSection delay={0.05}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by order number or product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-white/60 dark:bg-card/60 backdrop-blur-sm border-white/80 dark:border-border rounded-xl"
          />
        </div>
      </AnimatedSection>

      {/* Tabs + Content */}
      <AnimatedSection delay={0.1}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start gap-1 bg-white/50 dark:bg-card/50 backdrop-blur-sm border border-white/80 dark:border-border rounded-xl p-1.5 h-auto flex-wrap">
            {STATUS_TABS.map((tab) => {
              const count =
                tab.value === "all"
                  ? SAMPLE_ORDERS.length
                  : SAMPLE_ORDERS.filter((o) => o.status === tab.value).length;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none gap-1.5"
                >
                  {tab.label}
                  <span className="text-[10px] opacity-70 tabular-nums">
                    {count}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {STATUS_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {filtered.length === 0 ? (
                <EmptyOrders status={activeTab === "all" ? undefined : (activeTab as OrderStatus)} />
              ) : (
                <div className="space-y-4">
                  {filtered.map((order, i) => (
                    <AnimatedSection key={order.id} delay={i * 0.05}>
                      <OrderCard order={order} />
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </AnimatedSection>
    </div>
  );
}
