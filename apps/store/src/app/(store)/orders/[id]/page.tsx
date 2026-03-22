import type { Metadata } from "next";
import { OrderDetailView } from "./_components/order-detail-view";

export const metadata: Metadata = { title: "Order Details" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  return <OrderDetailView orderId={id} />;
}
