import { PageHeader } from "@/components/layout/page-header";

interface Props { params: Promise<{ id: string }> }

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <PageHeader title={`Order #${id}`} backHref="/orders" />
      <div className="p-4 md:p-6">
      </div>
    </>
  );
}
