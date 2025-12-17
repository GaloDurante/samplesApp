import type { UseFormReturn } from "react-hook-form";

import type { Sample } from "@/types/sample";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface Step3OthersProps {
  form: UseFormReturn<Sample>;
}

export function Step3Others({ form }: Step3OthersProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Otros</h3>
      <Separator />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="test_end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Fecha finalizacion de ensayo <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  isError={!!form.formState.errors.test_end_date}
                />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Añadir notas adicionales sobre la muestra o el lote..."
                  className="resize-none min-h-[100px]"
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
