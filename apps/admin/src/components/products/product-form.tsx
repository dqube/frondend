"use client";

import { useState, useCallback } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Eye, Tag, X } from "lucide-react";
import { toast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@modernstores/ui";
import { adminProductsApi } from "@modernstores/api-client/admin";
import { ImageUploader, type UploadedImage } from "./image-uploader";
import { VariantsEditor } from "./variants-editor";

// ─── Schema ──────────────────────────────────────────────────────────────────

const variantSchema = z.object({
  name:            z.string().min(1, "Required"),
  sku:             z.string().default(""),
  price:           z.number({ invalid_type_error: "Required" }).min(0),
  compareAtPrice:  z.number().min(0).optional(),
  stockQuantity:   z.number().min(0).default(0),
  unit:            z.string().min(1),
});

export const productSchema = z.object({
  name:        z.string().min(2, "Name must be at least 2 characters"),
  slug:        z.string().default(""),
  sku:         z.string().default(""),
  description: z.string().default(""),
  categoryId:  z.string().min(1, "Category is required"),
  tags:        z.array(z.string()).default([]),
  isActive:    z.boolean().default(false),
  variants:    z.array(variantSchema).min(1, "Add at least one variant"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// ─── Mock categories ──────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "cat-1", name: "Fruits & Vegetables" },
  { id: "cat-2", name: "Dairy & Eggs" },
  { id: "cat-3", name: "Bakery & Bread" },
  { id: "cat-4", name: "Beverages" },
  { id: "cat-5", name: "Meat & Seafood" },
  { id: "cat-6", name: "Pantry & Dry Goods" },
  { id: "cat-7", name: "Frozen Foods" },
  { id: "cat-8", name: "Health & Organic" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductForm() {
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishMode, setPublishMode] = useState<"draft" | "publish">("draft");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: "",
      slug: "",
      sku: "",
      description: "",
      categoryId: "",
      tags: [],
      isActive: false,
      variants: [],
    },
  });

  const tags = watch("tags");
  const nameValue = watch("name");

  // Auto-generate slug from name
  const handleNameBlur = useCallback(() => {
    const slug = nameValue
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setValue("slug", slug, { shouldValidate: false });
  }, [nameValue, setValue]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setValue("tags", [...tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setValue("tags", tags.filter((t) => t !== tag));

  const onSubmit = async (data: ProductFormValues, publish: boolean) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        isActive: publish,
        images: images.map((img, i) => ({
          url: img.previewUrl,
          altText: img.altText,
          isPrimary: img.isPrimary,
          sortOrder: i,
        })),
      };
      await adminProductsApi.create(payload);
      toast.success(publish ? "Product published!" : "Draft saved");
      router.push("/products");
    } catch {
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, publishMode === "publish"))}
      noValidate
    >
      {/* ─── Header ─── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Add Product
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Fill in the details below to add a new product to your catalog.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            onClick={() => setPublishMode("draft")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-60"
          >
            {saving && publishMode === "draft" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Draft
          </button>
          <button
            type="submit"
            disabled={saving}
            onClick={() => setPublishMode("publish")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving && publishMode === "publish" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            Publish
          </button>
        </div>
      </div>

      {/* ─── Layout ─── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* ── Left column (main content) ── */}
        <div className="space-y-5 lg:col-span-2">

          {/* Basic Info */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Basic Information</h2>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register("name")}
                  onBlur={handleNameBlur}
                  placeholder="e.g. Organic Strawberries"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-rose-500">{errors.name.message}</p>
                )}
              </div>

              {/* Slug + SKU row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">URL Slug</label>
                  <input
                    {...register("slug")}
                    placeholder="organic-strawberries"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-mono placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Auto-filled from name</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Product SKU</label>
                  <input
                    {...register("sku")}
                    placeholder="PRD-001"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-mono placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Describe the product, its origin, freshness, and key highlights…"
                  className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Product Images */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold text-foreground">Product Images</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Upload up to 10 images. The primary image appears in listings.
            </p>
            <ImageUploader images={images} onChange={setImages} />
          </section>

          {/* Variants */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-1 flex items-start justify-between">
              <h2 className="text-sm font-semibold text-foreground">Variants</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {watch("variants")?.length ?? 0}
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Each variant represents a purchasable option (size, weight, pack).
            </p>
            <VariantsEditor control={control} register={register} errors={errors} />
            {errors.variants && typeof errors.variants.message === "string" && (
              <p className="mt-2 text-xs text-rose-500">{errors.variants.message}</p>
            )}
          </section>
        </div>

        {/* ── Right column (sidebar) ── */}
        <div className="space-y-5">

          {/* Status */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Active</p>
                <p className="text-xs text-muted-foreground">Visible in the store</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-border after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-primary/20" />
              </label>
            </div>
          </section>

          {/* Organization */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Organization</h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Category <span className="text-rose-500">*</span>
              </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue placeholder="Select a category…" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="mt-1.5 text-xs text-rose-500">{errors.categoryId.message}</p>
              )}
            </div>
          </section>

          {/* Tags */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold text-foreground">Tags</h2>
            <p className="mb-3 text-xs text-muted-foreground">
              Add keywords to improve search and filtering.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); addTag(); }
                  }}
                  placeholder="organic, fresh…"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-8 pr-3 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={addTag}
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="rounded-full p-0.5 hover:bg-primary/20 transition-colors"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Summary */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Summary</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Images</dt>
                <dd className="font-medium">{images.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Variants</dt>
                <dd className="font-medium">{watch("variants")?.length ?? 0}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tags</dt>
                <dd className="font-medium">{tags.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd className={watch("isActive") ? "font-medium text-emerald-600" : "font-medium text-muted-foreground"}>
                  {watch("isActive") ? "Active" : "Draft"}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {/* ─── Bottom action bar ─── */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
        <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Cancel and discard changes
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            onClick={() => setPublishMode("draft")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted disabled:opacity-60"
          >
            {saving && publishMode === "draft" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Draft
          </button>
          <button
            type="submit"
            disabled={saving}
            onClick={() => setPublishMode("publish")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving && publishMode === "publish" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            Publish Product
          </button>
        </div>
      </div>
    </form>
  );
}
