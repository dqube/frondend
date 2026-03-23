"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "../lib/utils";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** date-fns format string, defaults to "LLL dd, y" */
  dateFormat?: string;
  /** Number of calendar months to display side-by-side */
  numberOfMonths?: number;
}

function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  disabled,
  className,
  dateFormat = "LLL dd, y",
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  // Support both controlled and uncontrolled usage
  const [internal, setInternal] = React.useState<DateRange | undefined>(undefined);
  const range = value !== undefined ? value : internal;

  function handleSelect(r: DateRange | undefined) {
    setInternal(r);
    onChange?.(r);
    // Auto-close once both ends are picked
    if (r?.from && r?.to) setOpen(false);
  }

  const label = React.useMemo(() => {
    if (!range?.from) return placeholder;
    if (!range.to) return format(range.from, dateFormat);
    return `${format(range.from, dateFormat)} – ${format(range.to, dateFormat)}`;
  }, [range, dateFormat, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 focus:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50",
            !range?.from && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">{label}</span>
          <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          numberOfMonths={numberOfMonths}
          initialFocus
          classNames={{
            selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
            day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-secondary/40 [&:has([aria-selected])]:bg-secondary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            range_middle:
              "aria-selected:bg-transparent aria-selected:text-secondary-foreground",
            range_end: "day-range-end",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DateRangePicker };
export type { DateRangePickerProps };
