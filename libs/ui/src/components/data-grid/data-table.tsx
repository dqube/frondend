"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Check, Search, SlidersHorizontal, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../button"
import { Input } from "../input"
import { Label } from "../label"
import { Checkbox } from "../checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../sheet"
import { DataGrid, getColumnHeaderLabel } from "./data-grid"
import { DataGridTable } from "./data-grid-table"
import { DataGridPagination } from "./data-grid-pagination"
import { DataGridColumnFilter, type DataGridColumnFilterProps } from "./data-grid-column-filter"

export interface DataTableFilterConfig {
  columnId: string
  title: string
  options: DataGridColumnFilterProps<unknown, unknown>["options"]
}

export interface DataTableRangeFilterConfig {
  columnId: string
  title: string
  prefix?: string
  min?: number
  max?: number
  step?: number
}

export interface DataTableProps<TData, TValue> {
  title?: string
  actions?: React.ReactNode
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  globalSearchPlaceholder?: string
  globalSearchColumn?: string
  filters?: DataTableFilterConfig[]
  rangeFilters?: DataTableRangeFilterConfig[]
  pageSizes?: number[]
  dense?: boolean
  stripped?: boolean
  cellBorder?: boolean
  className?: string
}

export function DataTable<TData extends object, TValue>({
  title,
  actions,
  columns,
  data,
  loading = false,
  globalSearchPlaceholder = "Search…",
  globalSearchColumn,
  filters = [],
  rangeFilters = [],
  pageSizes = [10, 25, 50],
  dense = false,
  stripped = false,
  cellBorder = false,
  className,
}: DataTableProps<TData, TValue>) {
  const [mounted, setMounted] = React.useState(false)
  const [filterOpen, setFilterOpen] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])

  // Range filter local state: columnId → [min, max]
  const [rangeValues, setRangeValues] = React.useState<Record<string, [string, string]>>(() =>
    Object.fromEntries(rangeFilters.map((f) => [f.columnId, ["", ""]]))
  )

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, columnOrder, rowSelection },
    autoResetAll: false,
  })

  // Sync range inputs → column filter values
  React.useEffect(() => {
    rangeFilters.forEach((f) => {
      const [minStr, maxStr] = rangeValues[f.columnId] ?? ["", ""]
      const min = minStr !== "" ? Number(minStr) : undefined
      const max = maxStr !== "" ? Number(maxStr) : undefined
      const col = table.getColumn(f.columnId)
      if (min === undefined && max === undefined) {
        col?.setFilterValue(undefined)
      } else {
        col?.setFilterValue([min, max])
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValues])

  const hasActiveRangeFilter = rangeFilters.some(
    (f) => rangeValues[f.columnId]?.[0] !== "" || rangeValues[f.columnId]?.[1] !== ""
  )

  const hasActiveFilters =
    columnFilters.length > 0 ||
    Boolean(globalSearchColumn && table.getColumn(globalSearchColumn)?.getFilterValue()) ||
    hasActiveRangeFilter

  const activeFilterCount =
    columnFilters.filter((cf) => cf.id !== globalSearchColumn).length +
    rangeFilters.filter((f) => rangeValues[f.columnId]?.[0] !== "" || rangeValues[f.columnId]?.[1] !== "").length

  function resetFilters() {
    table.resetColumnFilters()
    if (globalSearchColumn) {
      table.getColumn(globalSearchColumn)?.setFilterValue("")
    }
    setRangeValues(Object.fromEntries(rangeFilters.map((f) => [f.columnId, ["", ""]])))
  }

  if (!mounted) return null

  return (
    <Card className={cn("flex flex-col gap-0", className)}>
      {(title || actions) && (
        <CardHeader className="border-b py-3">
          <div className="flex items-center justify-between gap-3">
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
          </div>
        </CardHeader>
      )}

      <CardContent className="p-0 min-w-0">
        <DataGrid
          table={table}
          recordCount={data.length}
          isLoading={loading}
          loadingMode="skeleton"
          tableLayout={{
            dense,
            stripped,
            cellBorder,
            rowBorder: true,
            headerBackground: true,
            headerBorder: true,
            headerSticky: true,
            width: "fixed",
          }}
        >
          {/* Toolbar: search + filters button */}
          <div className="flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center">
            {globalSearchColumn && (
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={globalSearchPlaceholder}
                  value={(table.getColumn(globalSearchColumn)?.getFilterValue() as string) ?? ""}
                  onChange={(e) => table.getColumn(globalSearchColumn)?.setFilterValue(e.target.value)}
                  className="h-8 pl-8 text-sm"
                />
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterOpen(true)}
              className="h-8 w-full shrink-0 gap-1.5 rounded-full sm:w-auto"
            >
              <SlidersHorizontal className="size-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filter & columns sheet */}
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetContent side="right" className="flex w-[min(90vw,340px)] flex-col gap-0 p-0 sm:w-[400px]">
              <SheetHeader className="border-b px-6 py-5 text-left">
                <SheetTitle>Filters &amp; Columns</SheetTitle>
                <SheetDescription>Refine results and customise visible columns</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto">
                {/* Faceted column filters */}
                {filters.length > 0 && (
                  <div className="px-6 py-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filters</p>
                    <div className="space-y-3">
                      {filters.map((f) => {
                        const col = table.getColumn(f.columnId)
                        if (!col) return null
                        return (
                          <div key={f.columnId}>
                            <Label className="mb-1.5 block text-sm font-medium">{f.title}</Label>
                            <div className="[&>button]:w-full [&>button]:justify-start">
                              <DataGridColumnFilter column={col} title={f.title} options={f.options} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Range filters */}
                {rangeFilters.length > 0 && (
                  <div className={filters.length > 0 ? "border-t px-6 py-5" : "px-6 py-5"}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Range Filters</p>
                    <div className="space-y-3">
                      {rangeFilters.map((f) => {
                        const [minVal, maxVal] = rangeValues[f.columnId] ?? ["", ""]
                        const prefix = f.prefix ?? ""
                        const isActive = minVal !== "" || maxVal !== ""
                        return (
                          <div key={f.columnId}>
                            <div className="mb-1.5 flex items-center justify-between">
                              <Label className="text-sm font-medium">{f.title}</Label>
                              {isActive && (
                                <button
                                  onClick={() => setRangeValues((prev) => ({ ...prev, [f.columnId]: ["", ""] }))}
                                  className="flex items-center justify-center rounded-full w-5 h-5 bg-accent text-accent-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:rotate-90 hover:scale-110 active:bg-primary active:text-primary-foreground active:scale-95"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-1.5 rounded-md border bg-background px-3 py-2">
                                <span className="shrink-0 text-xs text-muted-foreground">{prefix}Min</span>
                                <input
                                  type="number"
                                  value={minVal}
                                  onChange={(e) =>
                                    setRangeValues((prev) => ({
                                      ...prev,
                                      [f.columnId]: [e.target.value, prev[f.columnId]?.[1] ?? ""],
                                    }))
                                  }
                                  placeholder={f.min !== undefined ? String(f.min) : "0"}
                                  min={f.min}
                                  max={f.max}
                                  step={f.step ?? 0.01}
                                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                              </div>
                              <div className="flex items-center gap-1.5 rounded-md border bg-background px-3 py-2">
                                <span className="shrink-0 text-xs text-muted-foreground">{prefix}Max</span>
                                <input
                                  type="number"
                                  value={maxVal}
                                  onChange={(e) =>
                                    setRangeValues((prev) => ({
                                      ...prev,
                                      [f.columnId]: [prev[f.columnId]?.[0] ?? "", e.target.value],
                                    }))
                                  }
                                  placeholder={f.max !== undefined ? String(f.max) : "∞"}
                                  min={f.min}
                                  max={f.max}
                                  step={f.step ?? 0.01}
                                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Column visibility — pill toggles in a card */}
                <div className={filters.length > 0 || rangeFilters.length > 0 ? "border-t px-6 py-5" : "px-6 py-5"}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Columns</p>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <div className="flex flex-wrap gap-2">
                      {table
                        .getAllColumns()
                        .filter((col) => col.getCanHide())
                        .map((col) => (
                          <button
                            key={col.id}
                            type="button"
                            onClick={() => col.toggleVisibility(!col.getIsVisible())}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                              col.getIsVisible()
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            )}
                          >
                            {col.getIsVisible() && <Check className="size-3" />}
                            {getColumnHeaderLabel(col)}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t px-6 py-4">
                {hasActiveFilters ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="gap-1.5 text-muted-foreground"
                  >
                    <X className="size-3" />
                    Reset all
                  </Button>
                ) : (
                  <span />
                )}
                <SheetClose asChild>
                  <Button size="sm">Done</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          {/* Table — horizontal scroll on narrow screens */}
          <div className="overflow-x-auto">
            <DataGridTable />
          </div>

          {/* Pagination */}
          <div className="border-t px-4 py-4">
            <DataGridPagination sizes={pageSizes} />
          </div>
        </DataGrid>
      </CardContent>
    </Card>
  )
}
