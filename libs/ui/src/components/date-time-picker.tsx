"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "../lib/utils";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** date-fns format string, defaults to "PPP HH:mm" */
  dateFormat?: string;
  /** Show seconds input. Defaults to false. */
  showSeconds?: boolean;
}

function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick date & time",
  disabled,
  className,
  dateFormat = "PPP HH:mm",
  showSeconds = false,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Internal draft state — kept separate from external value until Apply
  const [draftDate, setDraftDate] = React.useState<Date | undefined>(value);
  const [time, setTime] = React.useState<string>(() => {
    if (value) return showSeconds ? format(value, "HH:mm:ss") : format(value, "HH:mm");
    return showSeconds ? "00:00:00" : "00:00";
  });

  // Sync draft when popover opens or external value changes
  React.useEffect(() => {
    if (open) {
      setDraftDate(value);
      setTime(value
        ? showSeconds ? format(value, "HH:mm:ss") : format(value, "HH:mm")
        : showSeconds ? "00:00:00" : "00:00"
      );
    }
  }, [open, value, showSeconds]);

  function buildCombined(day: Date | undefined, timeStr: string): Date | undefined {
    if (!day) return undefined;
    const parts = timeStr.split(":").map(Number);
    const combined = new Date(day);
    combined.setHours(parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, 0);
    return combined;
  }

  function handleDaySelect(day: Date | undefined) {
    setDraftDate(buildCombined(day, time));
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const t = e.target.value;
    setTime(t);
    setDraftDate((prev) => buildCombined(prev, t));
  }

  function handleApply() {
    onChange?.(draftDate);
    setOpen(false);
  }

  function handleClear() {
    setDraftDate(undefined);
    setTime(showSeconds ? "00:00:00" : "00:00");
    onChange?.(undefined);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 focus:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {value ? format(value, dateFormat) : placeholder}
          </span>
          <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={draftDate}
          onSelect={handleDaySelect}
          initialFocus
        />

        {/* Time row */}
        <div className="border-t px-3 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground font-medium">Time</span>
            <input
              type="time"
              value={time}
              step={showSeconds ? 1 : 60}
              onChange={handleTimeChange}
              className="ml-auto h-8 w-32 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-primary focus:ring-[1px] focus:ring-primary/20"
            />
          </div>

          {draftDate && (
            <p className="text-xs text-muted-foreground text-center">
              {format(draftDate, dateFormat)}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={handleApply}
              disabled={!draftDate}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DateTimePicker };
export type { DateTimePickerProps };
