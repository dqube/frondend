"use client";

import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  RotateCcw,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { Badge, Card, Separator } from "@modernstores/ui";
import type { Order, OrderStatus, PaymentStatus } from "@modernstores/types";

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

const PAYMENT_COLORS: Record<PaymentStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50",
  paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200/50 dark:border-red-800/50",
  refunded: "bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return "RM " + new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

export function OrderCard({ order }: { order: Order }) {
  const config = STATUS_CONFIG[order.status];
  const StatusIcon = config.icon;
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const previewItems = order.items.slice(0, 3);
  const remainingCount = order.items.length - 3;

  return (
    <Link href={`/orders/${order.id}`} className="block group">
      <Card className="overflow-hidden border-border/50 dark:border-border bg-card/70 dark:bg-card/70 backdrop-blur-md hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
        {/* Top bar — status + date */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-dashed border-border/50">
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center rounded-lg p-1.5 ${config.bg}`}>
              <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
            </div>
            <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`text-[10px] font-medium ${PAYMENT_COLORS[order.paymentStatus]} border`}>
              {order.paymentStatus === "paid" ? "Paid" : order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </Badge>
            <span className="text-xs text-muted-foreground tabular-nums">
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            {/* Order info left */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Order number */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight">{order.orderNumber}</span>
                <span className="text-xs text-muted-foreground">
                  · {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items preview */}
              <div className="space-y-1.5">
                {previewItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-sm">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-xs">
                      {item.quantity}×
                    </div>
                    <span className="truncate text-muted-foreground">{item.productName}</span>
                    <span className="ml-auto shrink-0 text-xs tabular-nums font-medium">{formatCurrency(item.totalPrice)}</span>
                  </div>
                ))}
                {remainingCount > 0 && (
                  <span className="text-xs text-muted-foreground pl-9">
                    +{remainingCount} more {remainingCount === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
            </div>

            {/* Right side — total + arrow */}
            <div className="flex flex-col items-end justify-between gap-6 shrink-0">
              <div className="text-right">
                <div className="text-lg font-bold tabular-nums tracking-tight">{formatCurrency(order.total)}</div>
                {order.discount > 0 && (
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    You saved {formatCurrency(order.discount)}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                <span className="hidden sm:inline">Details</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer — payment method */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-muted/30 border-t border-border/30">
          <CreditCard className="h-3 w-3 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">{order.paymentMethod}</span>
        </div>
      </Card>
    </Link>
  );
}
