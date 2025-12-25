import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sampleAnalysisSchema } from "@/validations/sample/analysis";

import type { SampleAnalysis } from "@/types/sample";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface AnalysisFormProps {
  sampleId: number;
  editData?: SampleAnalysis | null;
}

export function AnalysisForm({ editData, sampleId }: AnalysisFormProps) {
  const revalidator = useRevalidator();

  const form = useForm({
    resolver: zodResolver(sampleAnalysisSchema),
    defaultValues: {
      ...editData,
      sampleId: sampleId,
      otherAnalysis: editData?.otherAnalysis || "",
    },
    shouldUnregister: false,
  });

  const hasChanges = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = async (values: SampleAnalysis) => {
    try {
      if (editData) {
        const result = await window.api.analysis.updateAnalysis(values);
        if (result.success) {
          toast.success(result.message);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo modificar el análisis solicitado.");
        }
      } else {
        const result = await window.api.analysis.createAnalysis(values);
        if (result.success) {
          toast.success(result.message);
          form.reset(values);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo crear el análisis solicitado.");
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 min-h-100">
            <FormField
              control={form.control}
              name="firstCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1° recuento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="pg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PG</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="pgCurado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PG curado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="ct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CT</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="ctCurado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CT curado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="ea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EA</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="eaCurado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EA curado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="vigorTz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vigor por TZ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="viabilityTz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Viabilidad por TZ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="e"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="pms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PMS</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="purityPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pureza</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="%"
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
              name="otherAnalysis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otros</FormLabel>
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
