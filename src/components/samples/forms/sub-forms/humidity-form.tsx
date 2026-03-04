import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sampleHumiditySchema } from "@/validations/sample/humidity";

import type { SampleHumidity } from "@/types/sample";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

const mapHumidityToForm = (sampleId: number, data?: SampleHumidity | null) => ({
  sampleId: sampleId,

  id: data?.id,
  humidity: data?.humidity ?? null,
  performedAt: null,
});

interface HumidityFormProps {
  sampleId: number;
  editData?: SampleHumidity | null;
}

export function HumidityForm({ editData, sampleId }: HumidityFormProps) {
  const revalidator = useRevalidator();
  const formValues = mapHumidityToForm(sampleId, editData);

  const form = useForm({
    resolver: zodResolver(sampleHumiditySchema),
    defaultValues: formValues,
    values: formValues,
    shouldUnregister: false,
  });

  const hasChanges = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = async (values: SampleHumidity) => {
    try {
      if (editData) {
        const result = await window.api.humidity.updateHumidity(values);
        if (result.success) {
          toast.success(result.message);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo modificar el contenido de humedad solicitado.");
        }
      } else {
        const result = await window.api.humidity.createHumidity(values);
        if (result.success) {
          toast.success(result.message);
          form.reset(values);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo crear el contenido de humedad solicitado.");
        }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
            <FormField
              control={form.control}
              name="humidity"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>N° porcentual</FormLabel>
                  <FormControl>
                    <InputGroup className={`w-full ${fieldState.error && "border-destructive ring-destructive/20"}`}>
                      <InputGroupInput
                        {...form.register(field.name, {
                          setValueAs: (v) => (!v ? null : Number(v)),
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <span>%</span>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />
          </div>
        </form>
        <Separator />

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
