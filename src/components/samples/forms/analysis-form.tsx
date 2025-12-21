import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sampleAnalysesSchema } from "@/validations/sample";

import type { SampleAnalyses } from "@/types/sample";

import { toast } from "sonner";
import { Percent } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";

interface AnalysisFormProps {
  sampleId: number;
  editData?: SampleAnalyses | null;
}

export function AnalysisForm({ editData, sampleId }: AnalysisFormProps) {
  const revalidator = useRevalidator();

  const form = useForm({
    resolver: zodResolver(sampleAnalysesSchema),
    defaultValues: editData ?? {
      sample_id: sampleId,
      other_analysis: "",
    },
    shouldUnregister: false,
  });

  const onSubmit = async (values: SampleAnalyses) => {
    try {
      if (editData) {
        const result = await window.analysisApi.updateAnalysis(values);
        if (result.success) {
          toast.success(result.message);
          form.reset(values);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo modificar el análisis solicitado.");
        }
      } else {
        const result = await window.analysisApi.createAnalysis(values);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
            <FormField
              control={form.control}
              name="first_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    1° recuento <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
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
                  <FormLabel>
                    PG <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pg_curado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    PG curado <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
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
                  <FormLabel>
                    CT <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ct_curado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    CT curado <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
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
                  <FormLabel>
                    EA <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ea_curado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    EA curado <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vigor_tz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vigor por TZ <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="viability_tz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Viabilidad por TZ <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
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
                  <FormLabel>
                    E <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
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
                  <FormLabel>
                    PMS <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purity_percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pureza <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="w-full">
                      <InputGroupInput
                        placeholder="Ej: 3215"
                        type="number"
                        className="no-spinner"
                        onWheel={(e) => e.currentTarget.blur()}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="other_analysis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Otros <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="min-h-5" />
                </FormItem>
              )}
            />
          </div>
        </form>
        <Button
          form="sample-form"
          type="submit"
          className="self-end"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
        >
          Guardar cambios
        </Button>
      </Form>
    </div>
  );
}
