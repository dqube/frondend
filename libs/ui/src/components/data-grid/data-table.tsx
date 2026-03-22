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
import { Search, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../button"
import { Input } from "../input"
import { Card, CardContent, CardHeader, CardTitle } from "../card"
import { DataGrid, DataGridContainer } from "./data-grid"
import { DataGridTable } from "./data-grid-table"
import { DataGridPagination } from "./data-grid-pagination"
import { DataGridColumnVisibility } from "./data-grid-column-visibility"
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

function GlobalSearch<TData>({
  table,
  column,
  placeholder,
}: {
  table: ReturnType<typeof useReactTable<TData>>
  column: string
  placeholder: string
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
        onChange={(e) => table.getColumn(column)?.setFilterValue(e.target.value)}
        className="h-8 w-48 pl-8 text-xs lg:w-64"
      />
    </div>
  )
}

export function DataTable<TData extends object, TValue>({
  title,
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
      {title && (
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg">{title}</CardTitle>
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
            width: "fixed",
          }}
        >
          {/* Toolbar */}
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 p-4">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {globalSearchColumn && (
                <GlobalSearch
                  table={table}
                  column={globalSearchColumn}
                  placeholder={globalSearchPlaceholder}
                />
              )}

              {filters.map((f) => {
                const col = table.getColumn(f.columnId)
                if (!col) return null
                return (
                  <DataGridColumnFilter
                    key={f.columnId}
                    column={col}
                    title={f.title}
                    options={f.options}
                  />
                )
              })}

              {rangeFilters.map((f) => {
                const [minVal, maxVal] = rangeValues[f.columnId] ?? ["", ""]
                const prefix = f.prefix ?? ""
                const isActive = minVal !== "" || maxVal !== ""
                return (
                  <div
                    key={f.columnId}
                    className={cn(
                      "flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs transition-colors",
                      isActive ? "border-primary/50 bg-primary/5" : "border-border"
                    )}
                  >
                    <span className="text-muted-foreground font-medium shrink-0">{f.title}:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">{prefix}</span>
                      <input
                        type="number"
                        value={minVal}
                        onChange={(e) =>
                          setRangeValues((prev) => ({
                            ...prev,
                            [f.columnId]: [e.target.value, prev[f.columnId]?.[1] ?? ""],
                          }))
                        }
                        placeholder={f.min !== undefined ? String(f.min) : "Min"}
                        min={f.min}
                        max={f.max}
                        step={f.step ?? 0.01}
                        className="w-14 bg-transparent outline-none placeholder:text-muted-foreground/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <span className="text-muted-foreground">–</span>
                      <span className="text-muted-foreground">{prefix}</span>
                      <input
                        type="number"
                        value={maxVal}
                        onChange={(e) =>
                          setRangeValues((prev) => ({
                            ...prev,
                            [f.columnId]: [prev[f.columnId]?.[0] ?? "", e.target.value],
                          }))
                        }
                        placeholder={f.max !== undefined ? String(f.max) : "Max"}
                        min={f.min}
                        max={f.max}
                        step={f.step ?? 0.01}
                        className="w-14 bg-transparent outline-none placeholder:text-muted-foreground/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>
                    {isActive && (
                      <button
                        onClick={() =>
                          setRangeValues((prev) => ({ ...prev, [f.columnId]: ["", ""] }))
                        }
                        className="ml-0.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )
              })}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8 gap-1 px-2 text-xs text-muted-foreground"
                >
                  <X className="h-3 w-3" />
                  Reset
                </Button>
              )}
            </div>

            <div className="shrink-0">
              <DataGridColumnVisibility table={table} />
            </div>
          </div>

          {/* Table */}
          <div className="px-4">
            <DataGridContainer className="overflow-x-auto rounded-md border" border={false}>
              <DataGridTable />
            </DataGridContainer>
          </div>

          {/* Pagination */}
          <div className="px-4 py-4">
            <DataGridPagination sizes={pageSizes} />
          </div>
        </DataGrid>
      </CardContent>
    </Card>
  )
}
