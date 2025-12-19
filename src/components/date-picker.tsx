import { format } from "date-fns";

import type { DateRange } from "react-day-picker";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  mode?: "single" | "range";
  value?: string;
  from?: string;
  to?: string;
  onChange?: (value?: string) => void;
  onRangeChange?: (range: { from?: string; to?: string }) => void;
  isError?: boolean;
}

export function DatePicker({ mode = "single", value, from, to, onChange, onRangeChange, isError }: DatePickerProps) {
  const singleDate = value ? new Date(`${value}T00:00:00`) : undefined;

  const range: DateRange | undefined =
    from || to
      ? {
          from: from ? new Date(`${from}T00:00:00`) : undefined,
          to: to ? new Date(`${to}T23:59:59.999`) : undefined,
        }
      : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={mode === "single" ? !singleDate : !range?.from}
          data-error={isError}
          className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground data-[error=true]:border-destructive! w-full"
        >
          <CalendarIcon />
          {mode === "single" && singleDate && format(singleDate, "dd/MM/yyyy")}
          {mode === "range" && range?.from && (
            <>
              {format(range.from, "dd/MM/yyyy")}
              {range.to && ` – ${format(range.to, "dd/MM/yyyy")}`}
            </>
          )}
          {!singleDate && !range?.from && <span>Seleccionar fecha</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        {mode === "single" ? (
          <Calendar
            mode="single"
            selected={singleDate}
            onSelect={(d) => onChange?.(d ? format(d, "yyyy-MM-dd") : undefined)}
          />
        ) : (
          <Calendar
            mode="range"
            selected={range}
            onSelect={(r) =>
              onRangeChange?.({
                from: r?.from ? format(r.from, "yyyy-MM-dd") : undefined,
                to: r?.to ? format(r.to, "yyyy-MM-dd") : undefined,
              })
            }
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
