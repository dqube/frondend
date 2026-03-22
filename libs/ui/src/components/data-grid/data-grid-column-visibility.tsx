"use client"

import { ReactElement } from "react"
import { getColumnHeaderLabel } from "./data-grid"
import { Table } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../dropdown-menu"
import { Button } from "../button"
import { Settings2 } from "lucide-react"

function DataGridColumnVisibility<TData>({
  table,
  trigger,
}: {
  table?: Table<TData>
  trigger?: ReactElement<Record<string, unknown>>
}) {
  // When used inside DataGrid context without explicit table/trigger
  const defaultTrigger = (
    <Button variant="outline" size="sm" className="whitespace-nowrap">
      <Settings2 className="size-4" />
      Columns
    </Button>
  )

  const resolvedTrigger = trigger || defaultTrigger

  if (!table) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{resolvedTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-medium">
            Toggle Columns
          </DropdownMenuLabel>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onSelect={(event) => event.preventDefault()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {getColumnHeaderLabel(column)}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DataGridColumnVisibility }
