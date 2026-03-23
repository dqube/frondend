"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  DataGrid,
  DataGridContainer,
  DataGridTable,
  DataGridPagination,
  DataGridColumnHeader,
} from "@modernstores/ui";
import { Badge } from "@modernstores/ui";
import { Input } from "@modernstores/ui";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@modernstores/types";

const columns: ColumnDef<Product>[] = [
  {
    id: "image",
    header: "",
    size: 64,
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const img = row.original.images.find((i) => i.isPrimary) ?? row.original.images[0];
      return img ? (
        <Image
          src={img.url}
          alt={img.altText ?? row.original.name}
          width={40}
          height={40}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="h-10 w-10 rounded-md bg-muted" />
      );
    },
  },
  {
    accessorKey: "name",
    size: 240,
    header: ({ column }) => <DataGridColumnHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original.slug}`}
        className="font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "sku",
    size: 130,
    header: ({ column }) => <DataGridColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.original.sku}</span>
    ),
  },
  {
    id: "category",
    size: 140,
    header: ({ column }) => <DataGridColumnHeader column={column} title="Category" />,
    accessorFn: (row) => row.category?.name ?? "—",
    cell: ({ getValue }) => <span className="text-sm">{getValue() as string}</span>,
  },
  {
    id: "price",
    size: 110,
    header: ({ column }) => <DataGridColumnHeader column={column} title="Price" />,
    accessorFn: (row) => row.variants[0]?.price ?? 0,
    cell: ({ row }) => {
      const variant = row.original.variants[0];
      if (!variant) return <span className="text-muted-foreground">—</span>;
      return (
        <div className="flex flex-col">
          <span className="font-medium">RM {variant.price.toFixed(2)}</span>
          {variant.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              RM {variant.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "stock",
    size: 100,
    header: ({ column }) => <DataGridColumnHeader column={column} title="Stock" />,
    accessorFn: (row) =>
      row.variants.reduce((sum, v) => sum + v.stockQuantity, 0),
    cell: ({ getValue }) => {
      const qty = getValue() as number;
      return (
        <Badge variant={qty === 0 ? "destructive" : qty < 10 ? "outline" : "secondary"}>
          {qty === 0 ? "Out of stock" : `${qty} units`}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    size: 100,
    header: ({ column }) => <DataGridColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => (
      <Badge variant={getValue() ? "default" : "outline"}>
        {getValue() ? "Active" : "Inactive"}
      </Badge>
    ),
  },
];

export function ProductsDataGrid() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 25 });

  const { data, isLoading } = useProducts({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const products = data?.items ?? [];
  const total = data?.total ?? 0;

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, columnFilters, globalFilter, pagination },
    pageCount: Math.ceil(total / pagination.pageSize),
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <DataGrid table={table} recordCount={total} loading={isLoading} stripped>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search products..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="h-9 w-64"
        />
      </div>
      <DataGridContainer>
        <DataGridTable />
      </DataGridContainer>
      <DataGridPagination />
    </DataGrid>
  );
}
