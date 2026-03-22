"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
}

function Autocomplete({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results found.",
  disabled,
  className,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const selected = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-ring/50 focus:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? selected.label : placeholder}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {value && (
              <span
                role="button"
                tabIndex={0}
                className="rounded-sm p-0.5 hover:bg-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  onValueChange?.("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    onValueChange?.("");
                  }
                }}
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            )}
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <CommandPrimitive className="flex flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          <div className="flex items-center border-b px-3">
            <CommandPrimitive.Input
              value={search}
              onValueChange={setSearch}
              placeholder={searchPlaceholder}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandPrimitive.List className="max-h-60 overflow-y-auto p-1">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </CommandPrimitive.Empty>
            {options.map((option) => (
              <CommandPrimitive.Item
                key={option.value}
                value={option.label}
                disabled={option.disabled}
                onSelect={() => {
                  onValueChange?.(option.value === value ? "" : option.value);
                  setOpen(false);
                  setSearch("");
                }}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 shrink-0",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="truncate">{option.label}</span>
              </CommandPrimitive.Item>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </PopoverContent>
    </Popover>
  );
}

export { Autocomplete };
