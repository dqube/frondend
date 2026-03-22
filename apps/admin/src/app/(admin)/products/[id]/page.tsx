interface Props { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Edit Product</h1>
      <p className="text-muted-foreground">ID: {id}</p>
    </div>
  );
}
