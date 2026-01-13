import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { certificateSchema } from "@/validations/sample/certificate";

import type { FullSample, Certificate } from "@/types/sample";

import { toast } from "sonner";

import { scientificSpeciesList } from "@/lib/constants";
import { parseScientificName } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CustomTooltip } from "@/components/custom-tooltip";

interface CertificateFormProps {
  editData: FullSample;
}

export function CertificateForm({ editData }: CertificateFormProps) {
  const revalidator = useRevalidator();

  const {
    samplingDate,
    entryDate,
    testEndDate,
    sampleNumber,
    otherReferences,
    sealNumber,
    specie,
    otherDeter,
    ...restData
  } = editData;

  const form = useForm({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      id: restData.id,
      samplingDate: samplingDate ?? "",
      entryDate: entryDate,
      testEndDate: testEndDate,
      sampleNumber: sampleNumber,
      otherReferences: otherReferences ?? "",
      sealNumber: sealNumber ?? "",
      specie: specie ?? "",
      otherDeter: otherDeter ?? "",
    },
    shouldUnregister: false,
  });

  const hasChanges = Object.keys(form.formState.dirtyFields).length > 0;
  const hasAllValues = Boolean(entryDate && testEndDate && sampleNumber && specie && otherDeter);

  const onSubmit = async (values: Certificate) => {
    try {
      const result = await window.api.samples.updateSampleCertificate(values);
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

  const generatePDF = async () => {
    try {
      const result = await window.api.certificate.generate(editData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "No se pudo generar el PDF solicitado.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "No se pudo generar el PDF solicitado por un error.";
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
              name="otherReferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otras referencias</FormLabel>
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
              name="sealNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° precinto</FormLabel>
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

            {/* select */}
            <FormField
              control={form.control}
              name="specie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {`Especie (nombre científico)`}
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
                      {scientificSpeciesList.map((specie) => {
                        const tokens = parseScientificName(specie);

                        return (
                          <SelectItem key={specie} value={specie}>
                            {tokens.map((t, i) => (t.italic ? <i key={i}>{t.text}</i> : <span key={i}>{t.text}</span>))}
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
              name="otherDeter"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>
                    Otras determinaciones
                    <CustomTooltip helperText="Este campo es requerido">
                      <span className="text-destructive">*</span>
                    </CustomTooltip>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Añadir notas sobre otras determinaciones aqui..."
                      className="resize-none min-h-25"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
        <Separator />

        <div className="flex justify-end items-center gap-4">
          <Button
            form="sample-form"
            type="submit"
            className="self-end"
            disabled={!hasChanges || form.formState.isSubmitting}
          >
            Guardar cambios
          </Button>

          <Button type="button" onClick={generatePDF} className="self-end" disabled={!hasAllValues || hasChanges}>
            Generar certificado
          </Button>
        </div>
      </Form>
    </div>
  );
}
