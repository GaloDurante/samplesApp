import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  value?: string;
  onChange: (value?: string) => void;
  isError?: boolean;
}

export function DatePicker({ value, onChange, isError }: DatePickerProps) {
  const date = value ? new Date(`${value}T00:00:00`) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          data-error={isError}
          className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground data-[error=true]:border-destructive!"
        >
          <CalendarIcon />
          {date ? format(date, "P", { locale: es }) : <span>Seleccione una fecha</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selected) => {
            if (!selected) {
              onChange(undefined);
              return;
            }

            onChange(format(selected, "yyyy-MM-dd"));
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
