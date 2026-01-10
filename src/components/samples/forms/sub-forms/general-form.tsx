import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sampleSchema } from "@/validations/sample";
import type { Sample } from "@/types/sample";

import { toast } from "sonner";

import { speciesList } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { ClientCombobox } from "@/components/clients/client-combobox";
import { CustomTooltip } from "@/components/custom-tooltip";

interface SampleGeneralFormProps {
  editData: Sample;
}

export function SampleGeneralForm({ editData }: SampleGeneralFormProps) {
  const revalidator = useRevalidator();

  const form = useForm({
    resolver: zodResolver(sampleSchema),
    defaultValues: {
      ...editData,
      clientId: editData.client ? editData.client.id : undefined,
      client: undefined,
      sampleCode: editData.sampleCode || "",
      mark: editData.mark || "",
      lotNumber: editData.lotNumber || "",
      lotWeight: editData.lotWeight || "",
      observations: editData.observations || "",
    },
  });

  const hasChanges = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = async (values: Sample) => {
    try {
      const result = await window.api.samples.updateSample(values);
      if (result.success) {
        toast.success(result.message);
        revalidator.revalidate();
      } else {
        toast.error(result.message || "No se pudo modificar la muestra solicitada.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo ejecutar la operación solicitada por un problema en el servidor.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form id="sample-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <section className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
              <FormField
                control={form.control}
                name="sampleNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      N° Muestra{" "}
                      <CustomTooltip helperText="Este campo es requerido">
                        <span className="text-destructive">*</span>
                      </CustomTooltip>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 3215/25" {...field} />
                    </FormControl>
                    <FormMessage className="min-h-5" />
                  </FormItem>
                )}
              />

              {/* fecha ingreso */}
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
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        isError={!!form.formState.errors.entryDate}
                      />
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
                    <Select
                      onValueChange={(val) => field.onChange(val ?? "")}
                      value={field.value ? String(field.value) : ""}
                    >
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

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Datos del Lote</h3>
            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
              <FormField
                control={form.control}
                name="lotNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>N° Lote</FormLabel>
                    <FormControl>
                      <Input
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
                name="lotWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso del lote (kg / t)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: 20 t"
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

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Otros</h3>

            <Separator />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
              {/* Fecha finalizacion de ensayo */}
              <FormField
                control={form.control}
                name="testEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Fecha finalizacion de ensayo{" "}
                      <CustomTooltip helperText="Este campo es requerido">
                        <span className="text-destructive">*</span>
                      </CustomTooltip>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        isError={!!form.formState.errors.testEndDate}
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
                        className="resize-none min-h-25"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </section>
        </form>
        <Button
          form="sample-form"
          type="submit"
          className="self-end"
          disabled={!hasChanges || form.formState.isSubmitting}
        >
          Guardar cambios
        </Button>
      </Form>
    </div>
  );
}
