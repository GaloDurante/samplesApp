import type { UseFormReturn } from "react-hook-form";

import type { Sample } from "@/types/sample";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/ui/separator";

interface Step1GeneralInfoProps {
  form: UseFormReturn<Sample>;
}

const clients = [
  { name: "Ignacio", id: 1 },
  { name: "Martin", id: 2 },
];

export function Step1GeneralInfo({ form }: Step1GeneralInfoProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Información General</h3>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="sample_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                N° Muestra <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: 3215"
                  type="number"
                  className="no-spinner"
                  onWheel={(e) => e.currentTarget.blur()}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  value={field.value ? String(field.value) : ""}
                />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entry_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Fecha Ingreso <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  isError={!!form.formState.errors.entry_date}
                />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sample_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cód. Muestra <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: GLS P 1210" {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Solicitante <span className="text-destructive">*</span>
              </FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
                value={field.value ? String(field.value) : ""}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper">
                  {clients.map((cl) => (
                    <SelectItem key={cl.id} value={String(cl.id)}>
                      {cl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colloquial_specie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Especie <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: Trigo" {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cultivar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cultivar <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: Ceibo" {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="harvest_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Año cosecha <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: 2024-2025" {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Marca <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: Semilla Premium" {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
