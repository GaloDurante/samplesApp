import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sampleAnalysisSchema } from "@/validations/sample/analysis";

import type { SampleAnalysis } from "@/types/sample";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const mapAnalysisToForm = (sampleId: number, data?: SampleAnalysis | null) => ({
  sampleId: sampleId,

  id: data?.id,
  firstCount: data?.firstCount ?? null,
  pg: data?.pg ?? null,
  pgCurado: data?.pgCurado ?? null,
  ct: data?.ct ?? null,
  ctCurado: data?.ctCurado ?? null,
  ea: data?.ea ?? null,
  eaCurado: data?.eaCurado ?? null,
  vigorTz: data?.vigorTz ?? null,
  viabilityTz: data?.viabilityTz ?? null,
  e: data?.e ?? null,
  pms: data?.pms ?? null,
  purityPercent: data?.purityPercent ?? null,
  otherAnalysis: data?.otherAnalysis || "",
  performedAt: null,
});

interface AnalysisFormProps {
  sampleId: number;
  editData?: SampleAnalysis | null;
}

export function AnalysisForm({ editData, sampleId }: AnalysisFormProps) {
  const revalidator = useRevalidator();
  const formValues = mapAnalysisToForm(sampleId, editData);

  const form = useForm({
    resolver: zodResolver(sampleAnalysisSchema),
    defaultValues: formValues,
    values: formValues,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
            <FormField
              control={form.control}
              name="firstCount"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>1° recuento</FormLabel>
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

            <FormField
              control={form.control}
              name="pg"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>PG</FormLabel>
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

            <FormField
              control={form.control}
              name="pgCurado"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>PG curado</FormLabel>
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

            <FormField
              control={form.control}
              name="ct"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>CT</FormLabel>
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

            <FormField
              control={form.control}
              name="ctCurado"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>CT curado</FormLabel>
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

            <FormField
              control={form.control}
              name="ea"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>EA</FormLabel>
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

            <FormField
              control={form.control}
              name="eaCurado"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>EA curado</FormLabel>
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

            <FormField
              control={form.control}
              name="vigorTz"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Vigor TZ</FormLabel>
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

            <FormField
              control={form.control}
              name="viabilityTz"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Viabilidad TZ</FormLabel>
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

            <FormField
              control={form.control}
              name="e"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>E</FormLabel>
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

            <FormField
              control={form.control}
              name="pms"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>PMS</FormLabel>
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

            <FormField
              control={form.control}
              name="purityPercent"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Pureza</FormLabel>
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

            <FormField
              control={form.control}
              name="otherAnalysis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otros análisis</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(field.name, {
                        setValueAs: (v) => (!v ? null : v),
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
