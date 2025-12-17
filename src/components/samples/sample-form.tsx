import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sampleSchema } from "@/validations/sample";
import { stepSchemas } from "@/validations/sample/steps";
import type { Sample } from "@/types/sample";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Stepper } from "@/components/ui/stepper";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Step1GeneralInfo, Step2LotData, Step3Others } from "@/components/samples/steps";
import { SAMPLE_FORM_STEPS } from "@/components/samples/steps/constants";
import { Separator } from "@/components/ui/separator";

interface SampleFormProps {
  editData?: Sample;
}

export function SampleForm({ editData }: SampleFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<Sample>({
    resolver: zodResolver(sampleSchema),
    defaultValues: editData ?? {
      sample_number: undefined,
      entry_date: undefined,
      sample_code: "",
      client_id: undefined,
      client_name: undefined,
      colloquial_specie: "",
      cultivar: "",
      harvest_year: "",
      mark: "",
      lot_number: "",
      lot_weight: "",
      test_end_date: undefined,
      observations: undefined,
    },
    mode: "onChange",
  });

  const validateStep = async (step: number): Promise<boolean> => {
    const values = form.getValues();
    const schema = stepSchemas[step];

    if (!schema) return false;

    const result = await schema.safeParseAsync(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        form.setError(fieldName as keyof Sample, {
          type: "manual",
          message: issue.message,
        });
      });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < SAMPLE_FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (values: Sample) => {
    try {
      if (editData) {
        const result = await window.sampleApi.createSample(values);

        if (result.success) {
          toast.success(result.message);
          form.reset(values);
        } else {
          toast.error(result.message || "No se pudo modificar la muestra solicitada.");
        }
      } else {
        const result = await window.sampleApi.createSample(values);
        if (result.success) {
          toast.success(result.message);
          form.reset();
          setCurrentStep(0);
        } else {
          toast.error(result.message || "No se pudo crear la muestra solicitada.");
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Step1GeneralInfo form={form} />;
      case 1:
        return <Step2LotData form={form} />;
      case 2:
        return <Step3Others form={form} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === SAMPLE_FORM_STEPS.length - 1;

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          id="sample-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card p-4 sm:p-8 rounded-md shadow-sm space-y-6"
        >
          <Stepper steps={SAMPLE_FORM_STEPS} currentStep={currentStep} />
          <div className="min-h-[400px]">{renderStepContent()}</div>

          <Separator />
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span className="hidden sm:block">Anterior</span>
            </Button>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button type="button" onClick={handleNext} disabled={isLastStep} variant="outline">
                <span className="hidden sm:block">Siguiente</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Button>

              <Button
                form="sample-form"
                type="submit"
                disabled={!isLastStep || (editData ? !form.formState.isDirty : form.formState.isSubmitting)}
              >
                {form.formState.isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
