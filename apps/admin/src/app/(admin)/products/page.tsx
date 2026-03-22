"use client";

import { useState } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@modernstores/types";
import {
  DataTable,
  type DataTableFilterConfig,
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
  Package,
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStockStatus(product: Product) {
  const total = product.variants.reduce((sum, v) => sum + v.stockQuantity, 0);
  if (total === 0) return { label: "Out of stock", variant: "destructive" as const };
  if (total < 50) return { label: "Low stock", variant: "secondary" as const };
  return { label: "In stock", variant: "default" as const };
}

function getBasePrice(product: Product) {
  if (product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((v) => v.price));
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
      return (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted shrink-0">
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm leading-tight truncate">{product.name}</p>
            <p className="text-xs text-muted-foreground leading-tight">{product.sku}</p>
          </div>
        </div>
      );
    },
    minSize: 200,
  },
  {
    id: "category",
    accessorFn: (row) => row.category?.name ?? "",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Category" />,
    cell: ({ getValue }) => <span className="text-sm">{getValue() as string}</span>,
    filterFn: (row, id, filterValues: string[]) => {
      return filterValues.includes(row.getValue(id) as string);
    },
    minSize: 100,
  },
  {
    id: "price",
    accessorFn: (row) => getBasePrice(row),
    header: ({ column }) => <DataGridColumnHeader column={column} title="Price" />,
    cell: ({ getValue }) => {
      const price = getValue() as number;
      return <span className="font-medium tabular-nums">${price.toFixed(2)}</span>;
    },
    size: 100,
  },
  {
    id: "stock",
    accessorFn: (row) => row.variants.reduce((sum, v) => sum + v.stockQuantity, 0),
    header: ({ column }) => <DataGridColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => {
      const status = getStockStatus(row.original);
      return <Badge variant={status.variant}>{status.label}</Badge>;
    },
    filterFn: (row, _id, filterValues: string[]) => {
      const status = getStockStatus(row.original);
      return filterValues.includes(status.label);
    },
    size: 110,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => {
      const active = getValue() as boolean;
      return (
        <Badge variant={active ? "default" : "secondary"}>
          {active ? "Active" : "Draft"}
        </Badge>
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
    cell: ({ getValue }) => <span className="text-sm tabular-nums">{getValue() as number}</span>,
    size: 80,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Updated" />,
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
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
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/products/${product.id}`}>
                <Eye className="mr-2 h-3.5 w-3.5" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/products/${product.id}`}>
                <Pencil className="mr-2 h-3.5 w-3.5" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.sku)}
            >
              <Copy className="mr-2 h-3.5 w-3.5" />
              Copy SKU
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [data] = useState(MOCK_PRODUCTS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        globalSearchColumn="name"
        globalSearchPlaceholder="Search products…"
        filters={filters}
        pageSizes={[10, 25, 50]}
        stripped
      />
    </div>
  );
}
