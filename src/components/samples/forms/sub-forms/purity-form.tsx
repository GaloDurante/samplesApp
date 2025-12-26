// import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { samplePuritySchema } from "@/validations/sample/purity";

import type { SamplePurity } from "@/types/sample";

// import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface PurityFormProps {
  sampleId: number;
  editData?: SamplePurity | null;
}

export function PurityForm({ editData, sampleId }: PurityFormProps) {
  // const revalidator = useRevalidator();

  const form = useForm({
    resolver: zodResolver(samplePuritySchema),
    defaultValues: {
      ...editData,
      sampleId: sampleId,
    },
    shouldUnregister: false,
  });

  const hasChanges = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = async (values: SamplePurity) => {
    console.log(values);

    // try {
    //   if (editData) {
    //     const result = await window.api.analysis.updateAnalysis(values);
    //     if (result.success) {
    //       toast.success(result.message);
    //       revalidator.revalidate();
    //     } else {
    //       toast.error(result.message || "No se pudo modificar el análisis solicitado.");
    //     }
    //   } else {
    //     const result = await window.api.analysis.createAnalysis(values);
    //     if (result.success) {
    //       toast.success(result.message);
    //       form.reset(values);
    //       revalidator.revalidate();
    //     } else {
    //       toast.error(result.message || "No se pudo crear el análisis solicitado.");
    //     }
    //   }
    // } catch (error) {
    //   const errorMessage =
    //     error instanceof Error
    //       ? error.message
    //       : "No se pudo ejecutar la operación solicitada por un problema en el servidor.";
    //   toast.error(errorMessage);
    // }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form id="sample-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 ">
            <FormField
              control={form.control}
              name="seedPure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semilla pura</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: 27.30"
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
              name="inertMatter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Materia inerte</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: 27.30"
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
              name="otherSeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otras semillas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: 27.30"
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
              name="typeInertMatter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clase de materia inerte</FormLabel>
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
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otras semillas</FormLabel>
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
