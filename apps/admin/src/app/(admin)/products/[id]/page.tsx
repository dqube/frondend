"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import {
  Badge,
  Button,
  Card,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@modernstores/ui";
import {
  Pencil,
  Trash2,
  Package,
  ImageIcon,
  Tag,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Copy,
} from "lucide-react";

// Mock data - in real app, fetch from API
const MOCK_PRODUCT = {
  id: "prod-1",
  sku: "FRU-001",
  name: "Organic Fuji Apples",
  slug: "organic-fuji-apples",
  description: "Fresh organic Fuji apples, crisp and sweet. Direct from local farms, these premium apples are perfect for snacking or cooking. High in fiber and vitamin C.",
  categoryId: "cat-1",
  category: { id: "cat-1", name: "Fruits", slug: "fruits", sortOrder: 1 },
  images: [
    { id: "img-1", url: "/images/apple.jpg", isPrimary: true, sortOrder: 0, altText: "Organic Fuji Apples" },
  ],
  variants: [
    { id: "v1", productId: "prod-1", name: "1 lb", sku: "FRU-001-1LB", price: 3.99, stockQuantity: 150, unit: "lb", attributes: {} },
    { id: "v2", productId: "prod-1", name: "3 lb", sku: "FRU-001-3LB", price: 9.99, compareAtPrice: 11.97, stockQuantity: 80, unit: "lb", attributes: {} },
  ],
  tags: ["organic", "fruits", "seasonal"],
  isActive: true,
  createdAt: "2025-11-01T10:00:00Z",
  updatedAt: "2025-12-15T14:30:00Z",
};

function getTotalStock(variants: typeof MOCK_PRODUCT.variants) {
  return variants.reduce((sum, v) => sum + v.stockQuantity, 0);
}

function getStockStatus(total: number) {
  if (total === 0) return { label: "Out of stock", color: "text-rose-600", dot: "bg-rose-500", badgeVariant: "destructive" as const };
  if (total < 50) return { label: "Low stock", color: "text-amber-600", dot: "bg-amber-500", badgeVariant: "secondary" as const };
  return { label: "In stock", color: "text-emerald-600", dot: "bg-emerald-500", badgeVariant: "default" as const };
}

export default function ProductViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  // In real app, fetch product data based on id
  const [product] = useState(MOCK_PRODUCT);
  const totalStock = getTotalStock(product.variants);
  const stockStatus = getStockStatus(totalStock);

  const handleCopySKU = () => {
    navigator.clipboard.writeText(product.sku);
  };

  return (
    <>
      <PageHeader 
        title={product.name} 
        description={`SKU: ${product.sku}`}
        backHref="/products"
      >
        <Button variant="outline" size="sm" onClick={handleCopySKU}>
          <Copy className="h-3.5 w-3.5 mr-2" />
          Copy SKU
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/products/${id}/edit`}>
            <Pencil className="h-3.5 w-3.5 mr-2" />
            Edit Product
          </Link>
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-3.5 w-3.5 mr-2" />
          Delete
        </Button>
      </PageHeader>

      <div className="space-y-6 p-4 md:p-6">
        {/* Status Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {product.isActive ? (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${totalStock === 0 ? 'bg-rose-100' : totalStock < 50 ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                {totalStock === 0 ? (
                  <AlertTriangle className="h-5 w-5 text-rose-600" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-lg font-bold ${stockStatus.color}`}>{totalStock}</span>
                  <span className="text-xs text-muted-foreground">{stockStatus.label}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
                <Tag className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Variants</p>
                <p className="text-lg font-bold mt-1">{product.variants.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <ImageIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Images</p>
                <p className="text-lg font-bold mt-1">{product.images.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Information</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                    <p className="mt-1 text-sm">{product.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">SKU</label>
                    <p className="mt-1 text-sm font-mono">{product.sku}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Slug</label>
                    <p className="mt-1 text-sm text-muted-foreground">{product.slug}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <p className="mt-1 text-sm">{product.category?.name}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="mt-2 text-sm leading-relaxed">{product.description}</p>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tags</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Created
                    </label>
                    <p className="mt-1 text-sm">
                      {new Date(product.createdAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Last Updated
                    </label>
                    <p className="mt-1 text-sm">
                      {new Date(product.updatedAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
              <div className="space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{variant.name}</h4>
                          <Badge variant="outline" className="font-mono text-xs">
                            {variant.sku}
                          </Badge>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Price</label>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-lg font-bold">RM {variant.price.toFixed(2)}</span>
                              {variant.compareAtPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  RM {variant.compareAtPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Stock</label>
                            <p className={`text-lg font-bold mt-1 ${
                              variant.stockQuantity === 0 ? 'text-rose-600' : 
                              variant.stockQuantity < 20 ? 'text-amber-600' : 
                              'text-emerald-600'
                            }`}>
                              {variant.stockQuantity} {variant.unit}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Unit</label>
                            <p className="text-sm mt-1">{variant.unit}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Images</h3>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {product.images.map((image) => (
                  <div key={image.id} className="group relative aspect-square rounded-lg border bg-muted overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.altText || product.name}
                      className="h-full w-full object-contain"
                    />
                    {image.isPrimary && (
                      <Badge className="absolute top-2 left-2">Primary</Badge>
                    )}
                  </div>
                ))}
                {product.images.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mb-2" />
                    <p className="text-sm">No images uploaded</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
