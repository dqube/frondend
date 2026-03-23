import { PageHeader } from "@/components/layout/page-header";

interface Props { params: Promise<{ id: string }> }

export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <PageHeader title={`Customer ${id}`} backHref="/customers" />
      <div className="p-4 md:p-6">
      </div>
    </>
  );
}
