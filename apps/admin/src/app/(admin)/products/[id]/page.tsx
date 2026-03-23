import { PageHeader } from "@/components/layout/page-header";

interface Props { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <PageHeader title="Edit Product" description={`Product ID: ${id}`} backHref="/products" />
      <div className="p-4 md:p-6">
        <p className="text-muted-foreground">Product editor coming soon.</p>
      </div>
    </>
  );
}
