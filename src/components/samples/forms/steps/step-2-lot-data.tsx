import type { UseFormReturn } from "react-hook-form";

import type { Sample } from "@/types/sample";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Step2LotDataProps {
  form: UseFormReturn<Sample>;
}

export function Step2LotData({ form }: Step2LotDataProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Datos del Lote</h3>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="lotNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>N° Lote</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lotWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso del lote (kg / t)</FormLabel>
              <FormControl>
                <Input placeholder="Ej: 20 t" {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
