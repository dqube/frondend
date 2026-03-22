"use client";

import { useState } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@modernstores/types";
import {
  DataTable,
  type DataTableFilterConfig,
  type DataTableRangeFilterConfig,
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DataGridColumnHeader,
} from "@modernstores/ui";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Copy,
  Download,
  Upload,
  Package2,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "cat-1", name: "Fruits", slug: "fruits", sortOrder: 1 },
  { id: "cat-2", name: "Vegetables", slug: "vegetables", sortOrder: 2 },
  { id: "cat-3", name: "Dairy", slug: "dairy", sortOrder: 3 },
  { id: "cat-4", name: "Bakery", slug: "bakery", sortOrder: 4 },
  { id: "cat-5", name: "Beverages", slug: "beverages", sortOrder: 5 },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    sku: "FRU-001",
    name: "Organic Fuji Apples",
    slug: "organic-fuji-apples",
    description: "Fresh organic Fuji apples, crisp and sweet",
    categoryId: "cat-1",
    category: CATEGORIES[0],
    images: [{ id: "img-1", url: "/images/apple.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v1", productId: "prod-1", name: "1 lb", sku: "FRU-001-1LB", price: 3.99, stockQuantity: 150, unit: "lb", attributes: {} },
      { id: "v2", productId: "prod-1", name: "3 lb", sku: "FRU-001-3LB", price: 9.99, stockQuantity: 80, unit: "lb", attributes: {} },
    ],
    tags: ["organic", "fruits"],
    isActive: true,
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-12-15T14:30:00Z",
  },
  {
    id: "prod-2",
    sku: "VEG-002",
    name: "Baby Spinach",
    slug: "baby-spinach",
    description: "Pre-washed baby spinach leaves",
    categoryId: "cat-2",
    category: CATEGORIES[1],
    images: [{ id: "img-2", url: "/images/spinach.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v3", productId: "prod-2", name: "5 oz", sku: "VEG-002-5OZ", price: 2.49, stockQuantity: 200, unit: "oz", attributes: {} },
    ],
    tags: ["organic", "leafy-greens"],
    isActive: true,
    createdAt: "2025-11-05T09:00:00Z",
    updatedAt: "2025-12-10T11:00:00Z",
  },
  {
    id: "prod-3",
    sku: "DAI-003",
    name: "Whole Milk",
    slug: "whole-milk",
    description: "Farm fresh whole milk, pasteurized",
    categoryId: "cat-3",
    category: CATEGORIES[2],
    images: [{ id: "img-3", url: "/images/milk.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v4", productId: "prod-3", name: "1 gal", sku: "DAI-003-1GAL", price: 4.29, stockQuantity: 90, unit: "gal", attributes: {} },
      { id: "v5", productId: "prod-3", name: "0.5 gal", sku: "DAI-003-HGAL", price: 2.49, stockQuantity: 120, unit: "gal", attributes: {} },
    ],
    tags: ["dairy", "essentials"],
    isActive: true,
    createdAt: "2025-10-20T08:00:00Z",
    updatedAt: "2025-12-18T16:45:00Z",
  },
  {
    id: "prod-4",
    sku: "BAK-004",
    name: "Sourdough Bread",
    slug: "sourdough-bread",
    description: "Artisan sourdough bread, freshly baked",
    categoryId: "cat-4",
    category: CATEGORIES[3],
    images: [{ id: "img-4", url: "/images/bread.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v6", productId: "prod-4", name: "1 loaf", sku: "BAK-004-LOAF", price: 5.99, stockQuantity: 45, unit: "loaf", attributes: {} },
    ],
    tags: ["bakery", "artisan"],
    isActive: false,
    createdAt: "2025-09-15T07:00:00Z",
    updatedAt: "2025-11-30T10:00:00Z",
  },
  {
    id: "prod-5",
    sku: "BEV-005",
    name: "Cold Brew Coffee",
    slug: "cold-brew-coffee",
    description: "Smooth cold brew concentrate",
    categoryId: "cat-5",
    category: CATEGORIES[4],
    images: [{ id: "img-5", url: "/images/coffee.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v7", productId: "prod-5", name: "32 oz", sku: "BEV-005-32OZ", price: 8.99, stockQuantity: 60, unit: "oz", attributes: {} },
    ],
    tags: ["beverages", "coffee"],
    isActive: true,
    createdAt: "2025-10-01T06:00:00Z",
    updatedAt: "2025-12-20T09:00:00Z",
  },
  {
    id: "prod-6",
    sku: "FRU-006",
    name: "Organic Bananas",
    slug: "organic-bananas",
    description: "Ripe organic bananas, great for smoothies",
    categoryId: "cat-1",
    category: CATEGORIES[0],
    images: [{ id: "img-6", url: "/images/banana.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v8", productId: "prod-6", name: "1 bunch", sku: "FRU-006-BUNCH", price: 1.99, stockQuantity: 300, unit: "bunch", attributes: {} },
    ],
    tags: ["organic", "fruits"],
    isActive: true,
    createdAt: "2025-11-10T10:00:00Z",
    updatedAt: "2025-12-19T12:00:00Z",
  },
  {
    id: "prod-7",
    sku: "VEG-007",
    name: "Roma Tomatoes",
    slug: "roma-tomatoes",
    description: "Vine-ripened Roma tomatoes",
    categoryId: "cat-2",
    category: CATEGORIES[1],
    images: [{ id: "img-7", url: "/images/tomato.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v9", productId: "prod-7", name: "1 lb", sku: "VEG-007-1LB", price: 2.99, stockQuantity: 0, unit: "lb", attributes: {} },
    ],
    tags: ["vegetables"],
    isActive: true,
    createdAt: "2025-11-12T10:00:00Z",
    updatedAt: "2025-12-17T15:00:00Z",
  },
  {
    id: "prod-8",
    sku: "DAI-008",
    name: "Greek Yogurt",
    slug: "greek-yogurt",
    description: "Plain non-fat Greek yogurt",
    categoryId: "cat-3",
    category: CATEGORIES[2],
    images: [{ id: "img-8", url: "/images/yogurt.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v10", productId: "prod-8", name: "32 oz", sku: "DAI-008-32OZ", price: 5.49, stockQuantity: 75, unit: "oz", attributes: {} },
    ],
    tags: ["dairy", "healthy"],
    isActive: true,
    createdAt: "2025-10-25T08:00:00Z",
    updatedAt: "2025-12-16T10:00:00Z",
  },
  {
    id: "prod-9",
    sku: "BAK-009",
    name: "Croissants",
    slug: "croissants",
    description: "Buttery flaky croissants, pack of 4",
    categoryId: "cat-4",
    category: CATEGORIES[3],
    images: [{ id: "img-9", url: "/images/croissant.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v11", productId: "prod-9", name: "4 pack", sku: "BAK-009-4PK", price: 6.99, stockQuantity: 25, unit: "pack", attributes: {} },
    ],
    tags: ["bakery", "pastry"],
    isActive: true,
    createdAt: "2025-09-20T07:00:00Z",
    updatedAt: "2025-12-14T08:00:00Z",
  },
  {
    id: "prod-10",
    sku: "BEV-010",
    name: "Sparkling Water",
    slug: "sparkling-water",
    description: "Naturally flavored sparkling water, lemon",
    categoryId: "cat-5",
    category: CATEGORIES[4],
    images: [{ id: "img-10", url: "/images/water.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v12", productId: "prod-10", name: "12 pack", sku: "BEV-010-12PK", price: 4.99, stockQuantity: 180, unit: "pack", attributes: {} },
    ],
    tags: ["beverages", "healthy"],
    isActive: false,
    createdAt: "2025-10-10T06:00:00Z",
    updatedAt: "2025-12-12T11:00:00Z",
  },
  {
    id: "prod-11",
    sku: "FRU-011",
    name: "Strawberries",
    slug: "strawberries",
    description: "Fresh California strawberries",
    categoryId: "cat-1",
    category: CATEGORIES[0],
    images: [{ id: "img-11", url: "/images/strawberries.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v13", productId: "prod-11", name: "1 lb", sku: "FRU-011-1LB", price: 4.49, stockQuantity: 100, unit: "lb", attributes: {} },
    ],
    tags: ["fruits", "seasonal"],
    isActive: true,
    createdAt: "2025-11-15T10:00:00Z",
    updatedAt: "2025-12-21T09:00:00Z",
  },
  {
    id: "prod-12",
    sku: "VEG-012",
    name: "Organic Carrots",
    slug: "organic-carrots",
    description: "Organic whole carrots, 2 lb bag",
    categoryId: "cat-2",
    category: CATEGORIES[1],
    images: [{ id: "img-12", url: "/images/carrots.jpg", isPrimary: true, sortOrder: 0 }],
    variants: [
      { id: "v14", productId: "prod-12", name: "2 lb", sku: "VEG-012-2LB", price: 2.79, stockQuantity: 160, unit: "lb", attributes: {} },
    ],
    tags: ["organic", "vegetables"],
    isActive: true,
    createdAt: "2025-11-18T10:00:00Z",
    updatedAt: "2025-12-20T14:00:00Z",
  },
];

// ─── Category styling ─────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<string, { emoji: string; bg: string; text: string; border: string }> = {
  Fruits:     { emoji: "🍎", bg: "bg-rose-50",   text: "text-rose-700",   border: "border-rose-200" },
  Vegetables: { emoji: "🥦", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Dairy:      { emoji: "🥛", bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200" },
  Bakery:     { emoji: "🍞", bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200" },
  Beverages:  { emoji: "☕", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

const DEFAULT_CATEGORY_CONFIG = { emoji: "📦", bg: "bg-muted", text: "text-muted-foreground", border: "border-border" };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTotalStock(product: Product) {
  return product.variants.reduce((sum, v) => sum + v.stockQuantity, 0);
}

function getStockStatus(product: Product) {
  const total = getTotalStock(product);
  if (total === 0) return { label: "Out of stock", color: "text-rose-600", dot: "bg-rose-500", bg: "bg-rose-50 border-rose-200" };
  if (total < 50) return { label: "Low stock",    color: "text-amber-600", dot: "bg-amber-500", bg: "bg-amber-50 border-amber-200" };
  return              { label: "In stock",        color: "text-emerald-600", dot: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-200" };
}

function getPriceDisplay(product: Product): string {
  if (product.variants.length === 0) return "—";
  const prices = product.variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return `$${min.toFixed(2)}`;
  return `$${min.toFixed(2)} – $${max.toFixed(2)}`;
}

function getBasePrice(product: Product) {
  if (product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((v) => v.price));
}

// ─── Summary stats ────────────────────────────────────────────────────────────

function computeStats(products: Product[]) {
  const total = products.length;
  const active = products.filter((p) => p.isActive).length;
  const outOfStock = products.filter((p) => getTotalStock(p) === 0).length;
  const lowStock = products.filter((p) => {
    const s = getTotalStock(p);
    return s > 0 && s < 50;
  }).length;
  return { total, active, lowStock, outOfStock };
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  iconBg: string;
}

function StatCard({ icon, label, value, iconBg }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold leading-none tracking-tight">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Product" />,
    cell: ({ row }) => {
      const product = row.original;
      const cat = product.category?.name ?? "";
      const cfg = CATEGORY_CONFIG[cat] ?? DEFAULT_CATEGORY_CONFIG;
      return (
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${cfg.bg} border ${cfg.border}`}>
            {cfg.emoji}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-tight truncate">{product.name}</p>
            <p className="text-[11px] text-muted-foreground leading-tight font-mono mt-0.5">{product.sku}</p>
          </div>
        </div>
      );
    },
    minSize: 220,
  },
  {
    id: "category",
    accessorFn: (row) => row.category?.name ?? "",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Category" />,
    cell: ({ getValue }) => {
      const cat = getValue() as string;
      const cfg = CATEGORY_CONFIG[cat] ?? DEFAULT_CATEGORY_CONFIG;
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${cfg.bg} ${cfg.text} ${cfg.border}`}>
          <span>{cfg.emoji}</span>
          {cat}
        </span>
      );
    },
    filterFn: (row, id, filterValues: string[]) => {
      return filterValues.includes(row.getValue(id) as string);
    },
    minSize: 130,
  },
  {
    id: "price",
    accessorFn: (row) => getBasePrice(row),
    header: ({ column }) => <DataGridColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const display = getPriceDisplay(row.original);
      const isRange = display.includes("–");
      return (
        <span className={`font-semibold tabular-nums text-sm ${isRange ? "text-muted-foreground" : ""}`}>
          {display}
        </span>
      );
    },
    filterFn: (row, id, range: [number | undefined, number | undefined]) => {
      const price = row.getValue(id) as number;
      const [min, max] = range;
      if (min !== undefined && price < min) return false;
      if (max !== undefined && price > max) return false;
      return true;
    },
    size: 130,
  },
  {
    id: "stock",
    accessorFn: (row) => getTotalStock(row),
    header: ({ column }) => <DataGridColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => {
      const total = getTotalStock(row.original);
      const status = getStockStatus(row.original);
      return (
        <div className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${status.bg}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          <span className={status.color}>{status.label}</span>
          {total > 0 && <span className="text-muted-foreground">({total})</span>}
        </div>
      );
    },
    filterFn: (row, _id, filterValues: string[]) => {
      const status = getStockStatus(row.original);
      return filterValues.includes(status.label);
    },
    size: 150,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => {
      const active = getValue() as boolean;
      return active ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
          Draft
        </span>
      );
    },
    filterFn: (row, id, filterValues: string[]) => {
      const val = row.getValue(id) as boolean;
      const label = val ? "Active" : "Draft";
      return filterValues.includes(label);
    },
    size: 100,
  },
  {
    id: "variants",
    accessorFn: (row) => row.variants.length,
    header: ({ column }) => <DataGridColumnHeader column={column} title="Variants" />,
    cell: ({ getValue }) => {
      const count = getValue() as number;
      return (
        <span className="inline-flex items-center justify-center rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium tabular-nums">
          {count}
        </span>
      );
    },
    size: 85,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Updated" />,
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      );
    },
    size: 130,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                <MoreHorizontal className="h-3.5 w-3.5" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link href={`/products/${product.id}`}>
                  <Eye className="mr-2 h-3.5 w-3.5" />
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/products/${product.id}/edit`}>
                  <Pencil className="mr-2 h-3.5 w-3.5" />
                  Edit product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.sku)}>
                <Copy className="mr-2 h-3.5 w-3.5" />
                Copy SKU
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 50,
    enableSorting: false,
    enableHiding: false,
  },
];

// ─── Filters ──────────────────────────────────────────────────────────────────

const filters: DataTableFilterConfig[] = [
  {
    columnId: "category",
    title: "Category",
    options: CATEGORIES.map((c) => ({ label: c.name, value: c.name })),
  },
  {
    columnId: "stock",
    title: "Stock",
    options: [
      { label: "In stock", value: "In stock" },
      { label: "Low stock", value: "Low stock" },
      { label: "Out of stock", value: "Out of stock" },
    ],
  },
  {
    columnId: "isActive",
    title: "Status",
    options: [
      { label: "Active", value: "Active" },
      { label: "Draft", value: "Draft" },
    ],
  },
];

const rangeFilters: DataTableRangeFilterConfig[] = [
  {
    columnId: "price",
    title: "Price",
    prefix: "$",
    min: 0,
    step: 0.01,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [data] = useState(MOCK_PRODUCTS);
  const stats = computeStats(data);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage inventory, pricing, and product listings
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
            <Upload className="h-3.5 w-3.5" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button asChild size="sm" className="h-9 gap-1.5">
            <Link href="/products/new">
              <Plus className="h-3.5 w-3.5" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={<LayoutGrid className="h-4 w-4 text-primary" />}
          label="Total products"
          value={stats.total}
          iconBg="bg-primary/10"
        />
        <StatCard
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          label="Active listings"
          value={stats.active}
          iconBg="bg-emerald-50"
        />
        <StatCard
          icon={<TrendingDown className="h-4 w-4 text-amber-600" />}
          label="Low stock"
          value={stats.lowStock}
          iconBg="bg-amber-50"
        />
        <StatCard
          icon={<AlertTriangle className="h-4 w-4 text-rose-600" />}
          label="Out of stock"
          value={stats.outOfStock}
          iconBg="bg-rose-50"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        globalSearchColumn="name"
        globalSearchPlaceholder="Search products…"
        filters={filters}
        rangeFilters={rangeFilters}
        pageSizes={[10, 25, 50]}
      />
    </div>
  );
}
