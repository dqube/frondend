"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Badge } from "./badge";

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  image?: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  maxDisplay?: number;
}

function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select items…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results found.",
  disabled,
  className,
  maxDisplay = 3,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const selectedOptions = options.filter((opt) => value.includes(opt.value));
  const displayOptions = selectedOptions.slice(0, maxDisplay);
  const remainingCount = selectedOptions.length - maxDisplay;

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onValueChange?.(newValue);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onValueChange?.(value.filter((v) => v !== optionValue));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 focus:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {displayOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant="secondary"
                  className="gap-1 pr-1 py-0.5"
                >
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  )}
                  <span className="truncate max-w-[120px]">{option.label}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    className="rounded-sm p-0.5 hover:bg-accent transition-colors"
                    onClick={(e) => handleRemove(option.value, e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleRemove(option.value, e);
                      }
                    }}
                  >
                    <X className="h-3 w-3" />
                  </span>
                </Badge>
              ))}
              {remainingCount > 0 && (
                <Badge variant="outline" className="py-0.5">
                  +{remainingCount} more
                </Badge>
              )}
            </div>
          )}
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
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
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <CommandPrimitive.Item
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => handleSelect(option.value)}
                  className="relative flex cursor-default select-none items-start gap-2 rounded-sm px-2 py-2 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      className="h-8 w-8 rounded-full object-cover shrink-0"
                    />
                  )}
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="font-medium truncate">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground line-clamp-2">
                        {option.description}
                      </span>
                    )}
                  </div>
                </CommandPrimitive.Item>
              );
            })}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
