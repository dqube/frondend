"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import {
  Button,
  Card,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Badge,
  Separator,
} from "@modernstores/ui";
import { Save, X, Plus, Trash2 } from "lucide-react";

// Mock categories
const CATEGORIES = [
  { id: "cat-1", name: "Fruits" },
  { id: "cat-2", name: "Vegetables" },
  { id: "cat-3", name: "Dairy" },
  { id: "cat-4", name: "Bakery" },
  { id: "cat-5", name: "Beverages" },
];

// Mock product data
const MOCK_PRODUCT = {
  id: "prod-1",
  sku: "FRU-001",
  name: "Organic Fuji Apples",
  slug: "organic-fuji-apples",
  description: "Fresh organic Fuji apples, crisp and sweet. Direct from local farms.",
  categoryId: "cat-1",
  tags: ["organic", "fruits", "seasonal"],
  isActive: true,
  variants: [
    { id: "v1", name: "1 lb", sku: "FRU-001-1LB", price: 3.99, stockQuantity: 150, unit: "lb" },
    { id: "v2", name: "3 lb", sku: "FRU-001-3LB", price: 9.99, compareAtPrice: 11.97, stockQuantity: 80, unit: "lb" },
  ],
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // In real app, fetch product data based on id
  const [formData, setFormData] = useState(MOCK_PRODUCT);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Saving product:", formData);
    setIsSubmitting(false);
    router.push(`/products/${id}`);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value } as typeof updatedVariants[number];
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleAddVariant = () => {
    const newVariant = {
      id: `v${Date.now()}`,
      name: "",
      sku: "",
      price: 0,
      stockQuantity: 0,
      unit: "lb",
    };
    setFormData({
      ...formData,
      variants: [...formData.variants, newVariant],
    });
  };

  const handleRemoveVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <PageHeader
        title={`Edit Product`}
        description={`SKU: ${formData.sku}`}
        backHref={`/products/${id}`}
      >
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <X className="h-3.5 w-3.5 mr-2" />
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
          <Save className="h-3.5 w-3.5 mr-2" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </PageHeader>

      <div className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g., FRU-001"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., organic-fuji-apples"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Product Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this product {formData.isActive ? "active" : "draft"}
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </Card>

          {/* Variants */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Variants</h3>
              <Button type="button" onClick={handleAddVariant} size="sm" variant="outline">
                <Plus className="h-3.5 w-3.5 mr-2" />
                Add Variant
              </Button>
            </div>
            <div className="space-y-4">
              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium">Variant {index + 1}</h4>
                    {formData.variants.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveVariant(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Variant Name *</Label>
                      <Input
                        value={variant.name}
                        onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                        placeholder="e.g., 1 lb"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>SKU *</Label>
                      <Input
                        value={variant.sku}
                        onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                        placeholder="e.g., FRU-001-1LB"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Input
                        value={variant.unit}
                        onChange={(e) => handleVariantChange(index, "unit", e.target.value)}
                        placeholder="e.g., lb, kg, oz"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="space-y-2">
                      <Label>Price (RM) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, "price", parseFloat(e.target.value))}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Compare At Price (RM)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={variant.compareAtPrice || ""}
                        onChange={(e) =>
                          handleVariantChange(index, "compareAtPrice", e.target.value ? parseFloat(e.target.value) : undefined)
                        }
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stock Quantity *</Label>
                      <Input
                        type="number"
                        value={variant.stockQuantity}
                        onChange={(e) => handleVariantChange(index, "stockQuantity", parseInt(e.target.value))}
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
