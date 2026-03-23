"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  MapPin,
  Package,
  PackageCheck,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import { Badge, Button, Card, Separator } from "@modernstores/ui";
import { AnimatedSection } from "@/components/layout/animated-section";
import type { Order, OrderStatus, PaymentStatus } from "@modernstores/types";

/* ── sample data (same shape as the list page, keyed by id) ── */
const ORDERS_MAP: Record<string, Order> = {
  "ord-001": {
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
    subtotal: 29.46, shippingFee: 0, discount: 2.95, total: 26.51,
    paymentMethod: "Visa •••• 4242", paymentStatus: "paid",
    createdAt: "2026-03-18T10:30:00Z", updatedAt: "2026-03-20T14:00:00Z",
  },
  "ord-002": {
    id: "ord-002",
    orderNumber: "MS-20260320-002",
    userId: "u1",
    status: "shipped",
    items: [
      { id: "i4", orderId: "ord-002", productId: "p4", variantId: "v4", productName: "Fresh Salmon Fillet", variantName: "500g", quantity: 1, unitPrice: 14.99, totalPrice: 14.99 },
      { id: "i5", orderId: "ord-002", productId: "p5", variantId: "v5", productName: "Greek Yogurt", variantName: "500g", quantity: 3, unitPrice: 3.49, totalPrice: 10.47 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 25.46, shippingFee: 3.99, discount: 0, total: 29.45,
    paymentMethod: "Apple Pay", paymentStatus: "paid",
    createdAt: "2026-03-20T09:15:00Z", updatedAt: "2026-03-21T11:00:00Z",
  },
  "ord-003": {
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
    subtotal: 34.43, shippingFee: 0, discount: 5.0, total: 29.43,
    paymentMethod: "Visa •••• 4242", paymentStatus: "paid",
    createdAt: "2026-03-21T16:45:00Z", updatedAt: "2026-03-21T17:00:00Z",
  },
  "ord-004": {
    id: "ord-004",
    orderNumber: "MS-20260322-004",
    userId: "u1",
    status: "pending",
    items: [
      { id: "i10", orderId: "ord-004", productId: "p10", variantId: "v10", productName: "Wagyu Beef Steak", variantName: "300g", quantity: 2, unitPrice: 39.99, totalPrice: 79.98 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 79.98, shippingFee: 0, discount: 0, total: 79.98,
    paymentMethod: "Visa •••• 4242", paymentStatus: "pending",
    createdAt: "2026-03-22T08:00:00Z", updatedAt: "2026-03-22T08:00:00Z",
  },
  "ord-005": {
    id: "ord-005",
    orderNumber: "MS-20260310-005",
    userId: "u1",
    status: "cancelled",
    items: [
      { id: "i11", orderId: "ord-005", productId: "p11", variantId: "v11", productName: "Truffle Oil", variantName: "250ml", quantity: 1, unitPrice: 24.99, totalPrice: 24.99 },
    ],
    shippingAddress: { line1: "42 Market Street", city: "San Francisco", state: "CA", postalCode: "94105", country: "US" },
    subtotal: 24.99, shippingFee: 3.99, discount: 0, total: 28.98,
    paymentMethod: "Visa •••• 4242", paymentStatus: "refunded",
    createdAt: "2026-03-10T12:00:00Z", updatedAt: "2026-03-11T09:30:00Z",
  },
};

/* ── helpers ── */

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  pending: { label: "Pending", icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40" },
  confirmed: { label: "Confirmed", icon: CheckCircle2, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
  processing: { label: "Processing", icon: RotateCcw, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/40" },
  shipped: { label: "Shipped", icon: Truck, color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/40" },
  delivered: { label: "Delivered", icon: PackageCheck, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40" },
  refunded: { label: "Refunded", icon: RotateCcw, color: "text-gray-500 dark:text-gray-400", bg: "bg-gray-50 dark:bg-gray-900/40" },
};

const TIMELINE_STEPS: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered"];

function stepIndex(status: OrderStatus) {
  const idx = TIMELINE_STEPS.indexOf(status);
  return idx === -1 ? -1 : idx;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
}

function formatCurrency(amount: number) {
  return "RM " + new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

/* ── component ── */

export function OrderDetailView({ orderId }: { orderId: string }) {
  const order = ORDERS_MAP[orderId];

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/50 mb-4">
          <Package className="h-7 w-7 text-muted-foreground/50" />
        </div>
        <h3 className="text-base font-semibold mb-1.5">Order not found</h3>
        <p className="text-sm text-muted-foreground mb-6">We couldn&apos;t find this order.</p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  const config = STATUS_CONFIG[order.status];
  const StatusIcon = config.icon;
  const currentStep = stepIndex(order.status);
  const isCancelled = order.status === "cancelled" || order.status === "refunded";
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back link */}
      <AnimatedSection>
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>
      </AnimatedSection>

      {/* Header card */}
      <AnimatedSection delay={0.05}>
        <Card className="overflow-hidden border-border/50 dark:border-border bg-card/70 dark:bg-card/70 backdrop-blur-md">
          <div className="px-5 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.bg}`}>
                  <StatusIcon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold tracking-tight">{order.orderNumber}</h1>
                    <button
                      onClick={() => navigator.clipboard.writeText(order.orderNumber)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy order number"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Placed on {formatDateTime(order.createdAt)} · {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <Badge
                className={`text-xs font-semibold self-start ${config.bg} ${config.color} border-transparent`}
              >
                {config.label}
              </Badge>
            </div>
          </div>

          {/* Progress timeline */}
          {!isCancelled && (
            <div className="px-5 pb-5">
              <div className="flex items-center gap-0">
                {TIMELINE_STEPS.map((step, i) => {
                  const isActive = i <= currentStep;
                  const isCurrent = i === currentStep;
                  const stepConfig = STATUS_CONFIG[step];
                  const StepIcon = stepConfig.icon;
                  return (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                            isCurrent
                              ? `${stepConfig.bg} ${stepConfig.color} border-current scale-110`
                              : isActive
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-muted/50 text-muted-foreground/40 border-border/50"
                          }`}
                        >
                          <StepIcon className="h-3.5 w-3.5" />
                        </div>
                        <span
                          className={`text-[10px] font-medium text-center leading-tight hidden sm:block ${
                            isActive ? "text-foreground" : "text-muted-foreground/50"
                          }`}
                        >
                          {stepConfig.label}
                        </span>
                      </div>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 mx-1 rounded-full transition-colors ${
                            i < currentStep ? "bg-primary/40" : "bg-border/50"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </AnimatedSection>

      {/* Items card */}
      <AnimatedSection delay={0.1}>
        <Card className="border-border/50 dark:border-border bg-card/70 dark:bg-card/70 backdrop-blur-md">
          <div className="px-5 py-4">
            <h2 className="text-sm font-semibold mb-4">Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 text-sm font-semibold text-muted-foreground">
                    {item.quantity}×
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">{item.variantName} · {formatCurrency(item.unitPrice)} each</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums shrink-0">
                    {formatCurrency(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="tabular-nums">
                  {order.shippingFee === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Free</span>
                  ) : (
                    formatCurrency(order.shippingFee)
                  )}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-emerald-600 dark:text-emerald-400 tabular-nums font-medium">
                    −{formatCurrency(order.discount)}
                  </span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Info cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Shipping address */}
        <AnimatedSection delay={0.15}>
          <Card className="border-border/50 dark:border-border bg-card/70 dark:bg-card/70 backdrop-blur-md h-full">
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Delivery Address</h2>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        {/* Payment info */}
        <AnimatedSection delay={0.2}>
          <Card className="border-border/50 dark:border-border bg-card/70 dark:bg-card/70 backdrop-blur-md h-full">
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Payment</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      order.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50"
                        : order.paymentStatus === "pending"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200/50 dark:border-red-800/50"
                    }`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-xs tabular-nums">{formatDate(order.updatedAt)}</span>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </div>

      {/* Actions */}
      <AnimatedSection delay={0.25}>
        <div className="flex flex-wrap gap-3">
          {order.status === "delivered" && (
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href={`/orders/${order.id}/review`}>Write a Review</Link>
            </Button>
          )}
          {(order.status === "shipped" || order.status === "delivered") && (
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href={`/orders/${order.id}/track`}>Track Package</Link>
            </Button>
          )}
          {order.status === "delivered" && (
            <Button asChild size="sm" className="rounded-xl">
              <Link href="/reorder">Reorder</Link>
            </Button>
          )}
          {order.status === "delivered" && (
            <Button asChild variant="ghost" size="sm" className="rounded-xl">
              <Link href="/returns">Request Return</Link>
            </Button>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
