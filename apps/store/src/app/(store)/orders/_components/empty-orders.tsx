import { Package, ShoppingBag } from "lucide-react";
import { Button } from "@modernstores/ui";
import Link from "next/link";
import type { OrderStatus } from "@modernstores/types";

const EMPTY_MESSAGES: Partial<Record<OrderStatus, string>> & { default: string } = {
  pending: "No pending orders right now.",
  processing: "No orders are being processed.",
  shipped: "No orders in transit.",
  delivered: "No delivered orders yet.",
  cancelled: "No cancelled orders — great!",
  default: "You haven't placed any orders yet.",
};

export function EmptyOrders({ status }: { status?: OrderStatus }) {
  const message = (status && EMPTY_MESSAGES[status]) || EMPTY_MESSAGES.default;

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-5">
        <Package className="h-8 w-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-base font-semibold mb-1.5">No orders found</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">{message}</p>
      <Button asChild size="sm" className="rounded-xl gap-2">
        <Link href="/products">
          <ShoppingBag className="h-4 w-4" />
          Start Shopping
        </Link>
      </Button>
    </div>
  );
}
