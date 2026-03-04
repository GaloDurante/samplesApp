import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { samplePuritySchema } from "@/validations/sample/purity";

import type { SamplePurity } from "@/types/sample";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CustomTooltip } from "@/components/custom-tooltip";
import { CircleQuestionMark } from "lucide-react";

const mapPurityToForm = (sampleId: number, data?: SamplePurity | null) => ({
  sampleId: sampleId,

  id: data?.id,
  seedPure: data?.seedPure ?? null,
  inertMatter: data?.inertMatter ?? null,
  otherSeeds: data?.otherSeeds ?? null,
  typeInertMatter: data?.typeInertMatter ?? null,
  remarks: data?.remarks ?? null,
  performedAt: null,
});

interface PurityFormProps {
  sampleId: number;
  editData?: SamplePurity | null;
}

export function PurityForm({ editData, sampleId }: PurityFormProps) {
  const revalidator = useRevalidator();
  const formValues = mapPurityToForm(sampleId, editData);

  const form = useForm({
    resolver: zodResolver(samplePuritySchema),
    defaultValues: formValues,
    values: formValues,
    shouldUnregister: false,
  });

  const hasChanges = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = async (values: SamplePurity) => {
    try {
      if (editData) {
        const result = await window.api.purity.updatePurity(values);
        if (result.success) {
          toast.success(result.message);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo modificar la pureza solicitada.");
        }
      } else {
        const result = await window.api.purity.createPurity(values);
        if (result.success) {
          toast.success(result.message);
          form.reset(values);
          revalidator.revalidate();
        } else {
          toast.error(result.message || "No se pudo crear la pureza solicitada.");
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
              name="seedPure"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Semilla pura</FormLabel>
                  <FormControl>
                    <InputGroup className={`w-full ${fieldState.error && "border-destructive ring-destructive/20"}`}>
                      <InputGroupInput
                        placeholder="Ej: 27.3"
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
              name="inertMatter"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Materia inerte
                    <CustomTooltip helperText="Los valores inferiores a 0.05 % seran expresados como “TR” (Trazas) en el certificado excluyendo al 0.">
                      <CircleQuestionMark size={14} className="text-muted-foreground" />
                    </CustomTooltip>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className={`w-full ${fieldState.error && "border-destructive ring-destructive/20"}`}>
                      <InputGroupInput
                        placeholder="Ej: 27.3"
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
              name="otherSeeds"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Otras semillas
                    <CustomTooltip helperText="Los valores inferiores a 0.05 % seran expresados como “TR” (Trazas) en el certificado excluyendo al 0.">
                      <CircleQuestionMark size={14} className="text-muted-foreground" />
                    </CustomTooltip>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className={`w-full ${fieldState.error && "border-destructive ring-destructive/20"}`}>
                      <InputGroupInput
                        placeholder="Ej: 27.3"
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
              name="typeInertMatter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clase de materia inerte</FormLabel>
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

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otras semillas (texto)</FormLabel>
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
