import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sampleGerminationSchema } from "@/validations/sample/germination";

import type { SampleGermination } from "@/types/sample";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface GerminationFormProps {
  sampleId: number;
  editData?: SampleGermination | null;
}

export function GerminationForm({ editData, sampleId }: GerminationFormProps) {
  const revalidator = useRevalidator();

  const form = useForm({
    resolver: zodResolver(sampleGerminationSchema),
    defaultValues: {
      ...editData,
      sampleId: sampleId,
      performedAt: new Date().toISOString(),
    },
    shouldUnregister: false,
  });

  const hasChanges = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = async (values: SampleGermination) => {
    try {
      if (editData) {
        const result = await window.api.germination.updateGermination(values);
        if (result.success) {
          toast.success(result.message);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo modificar la germinación solicitada.");
        }
      } else {
        const result = await window.api.germination.createGermination(values);
        if (result.success) {
          toast.success(result.message);
          form.reset(values);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo crear la germinación solicitada.");
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
        <form id="sample-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-h-120">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
            <FormField
              control={form.control}
              name="daysNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° de días</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(field.name, {
                        setValueAs: (v) => (!v ? undefined : Number(v)),
                      })}
                    />
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="normalSeedlings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plantulas normales</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(field.name, {
                        setValueAs: (v) => (!v ? undefined : Number(v)),
                      })}
                    />
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hardSeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semillas duras</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(field.name, {
                        setValueAs: (v) => (!v ? undefined : Number(v)),
                      })}
                    />
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="freshSeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semillas frescas</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(field.name, {
                        setValueAs: (v) => (!v ? undefined : Number(v)),
                      })}
                    />
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abnormalSeedlings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plantulas anormales</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(field.name, {
                        setValueAs: (v) => (!v ? undefined : Number(v)),
                      })}
                    />
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadSeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semillas muertas</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(field.name, {
                        setValueAs: (v) => (!v ? undefined : Number(v)),
                      })}
                    />
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
