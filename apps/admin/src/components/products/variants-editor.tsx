"use client";

import { useFieldArray, type UseFormRegister, type Control, type FieldErrors } from "react-hook-form";
import { Plus, Trash2, Package } from "lucide-react";
import type { ProductFormValues } from "./product-form";

interface VariantsEditorProps {
  control: Control<ProductFormValues, unknown, ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

const UNITS = ["kg", "g", "lb", "oz", "L", "ml", "pcs", "pack", "box", "bunch", "each"];

export function VariantsEditor({ control, register, errors }: VariantsEditorProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "variants" });

  const addVariant = () =>
    append({ name: "", sku: "", price: 0, compareAtPrice: undefined, stockQuantity: 0, unit: "each" });

  return (
    <div className="space-y-4">
      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">No variants yet</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Add variants for different sizes, weights, or packaging
            </p>
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add First Variant
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="rounded-2xl border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/30"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Variant {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {/* Name */}
                <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    {...register(`variants.${idx}.name`, { required: true })}
                    placeholder="e.g. 500g"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                  {errors.variants?.[idx]?.name && (
                    <p className="mt-1 text-xs text-rose-500">Required</p>
                  )}
                </div>

                {/* SKU */}
                <div className="col-span-1">
                  <label className="mb-1 block text-xs font-medium text-foreground">SKU</label>
                  <input
                    {...register(`variants.${idx}.sku`)}
                    placeholder="PRD-001"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>

                {/* Price */}
                <div className="col-span-1">
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Price ($) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    {...register(`variants.${idx}.price`, { required: true, valueAsNumber: true, min: 0 })}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                  {errors.variants?.[idx]?.price && (
                    <p className="mt-1 text-xs text-rose-500">Required</p>
                  )}
                </div>

                {/* Compare at price */}
                <div className="col-span-1">
                  <label className="mb-1 block text-xs font-medium text-foreground">Compare At</label>
                  <input
                    {...register(`variants.${idx}.compareAtPrice`, { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>

                {/* Stock */}
                <div className="col-span-1">
                  <label className="mb-1 block text-xs font-medium text-foreground">Stock</label>
                  <input
                    {...register(`variants.${idx}.stockQuantity`, { valueAsNumber: true, min: 0 })}
                    type="number"
                    min="0"
                    placeholder="0"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>
              </div>

              {/* Unit */}
              <div className="mt-3 w-40">
                <label className="mb-1 block text-xs font-medium text-foreground">Unit</label>
                <select
                  {...register(`variants.${idx}.unit`)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Plus className="h-4 w-4" />
            Add Another Variant
          </button>
        </div>
      )}
    </div>
  );
}
