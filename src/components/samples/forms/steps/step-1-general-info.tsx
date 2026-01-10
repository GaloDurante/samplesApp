import type { UseFormReturn } from "react-hook-form";

import type { Sample } from "@/types/sample";

import { speciesList } from "@/lib/constants";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/ui/separator";
import { ClientCombobox } from "@/components/clients/client-combobox";
import { CustomTooltip } from "@/components/custom-tooltip";

interface Step1GeneralInfoProps {
  form: UseFormReturn<Sample>;
}

export function Step1GeneralInfo({ form }: Step1GeneralInfoProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Información General</h3>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="sampleNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                N° Muestra
                <CustomTooltip helperText="Este campo es requerido">
                  <span className="text-destructive">*</span>
                </CustomTooltip>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: 3215/25" onWheel={(e) => e.currentTarget.blur()} {...field} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Fecha Ingreso{" "}
                <CustomTooltip helperText="Este campo es requerido">
                  <span className="text-destructive">*</span>
                </CustomTooltip>
              </FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} isError={!!form.formState.errors.entryDate} />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sampleCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cód. Muestra</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: GLS P 1210"
                  {...form.register(field.name, {
                    setValueAs: (v) => (!v ? undefined : v),
                  })}
                />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Solicitante{" "}
                <CustomTooltip helperText="Este campo es requerido">
                  <span className="text-destructive">*</span>
                </CustomTooltip>
              </FormLabel>

              <FormControl>
                <ClientCombobox
                  value={field.value}
                  onChange={field.onChange}
                  isError={!!form.formState.errors.clientId}
                />
              </FormControl>

              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colloquialSpecie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Especie{" "}
                <CustomTooltip helperText="Este campo es requerido">
                  <span className="text-destructive">*</span>
                </CustomTooltip>
              </FormLabel>
              <Select onValueChange={(val) => field.onChange(val ?? "")} value={field.value ? String(field.value) : ""}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una especie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {speciesList.map((specie) => {
                    return (
                      <SelectItem key={specie} value={specie}>
                        <span>{specie}</span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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
                Cultivar{" "}
                <CustomTooltip helperText="Este campo es requerido">
                  <span className="text-destructive">*</span>
                </CustomTooltip>
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
          name="harvestYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Año cosecha{" "}
                <CustomTooltip helperText="Este campo es requerido">
                  <span className="text-destructive">*</span>
                </CustomTooltip>
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
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: Semilla Premium"
                  {...form.register(field.name, {
                    setValueAs: (v) => (!v ? undefined : v),
                  })}
                />
              </FormControl>
              <FormMessage className="min-h-5" />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
