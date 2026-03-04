import { z } from "zod";

export const sampleAnalysisSchema = z.object({
  id: z.number().int().optional(),
  sampleId: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  firstCount: z
    .number({
      message: "1° recuento inválido.",
    })
    .min(0, { message: "1° recuento no puede ser menor a 0%." })
    .max(100, { message: "1° recuento no puede ser mayor a 100%." })
    .nullable(),
  pg: z
    .number({
      message: "PG inválido.",
    })
    .min(0, { message: "PG no puede ser menor a 0%." })
    .max(100, { message: "PG no puede ser mayor a 100%." })
    .nullable(),
  pgCurado: z
    .number({
      message: "PG curado inválido.",
    })
    .min(0, { message: "PG curado no puede ser menor a 0%." })
    .max(100, { message: "PG curado no puede ser mayor a 100%." })
    .nullable(),
  ct: z
    .number({
      message: "CT inválido.",
    })
    .min(0, { message: "CT no puede ser menor a 0%." })
    .max(100, { message: "CT no puede ser mayor a 100%." })
    .nullable(),
  ctCurado: z
    .number({
      message: "CT curado inválido.",
    })
    .min(0, { message: "CT curado no puede ser menor a 0%." })
    .max(100, { message: "CT curado no puede ser mayor a 100%." })
    .nullable(),
  ea: z
    .number({
      message: "EA de muestra inválido.",
    })
    .min(0, { message: "EA no puede ser menor a 0%." })
    .max(100, { message: "EA no puede ser mayor a 100%." })
    .nullable(),
  eaCurado: z
    .number({
      message: "EA curado inválido.",
    })
    .min(0, { message: "EA curado no puede ser menor a 0%." })
    .max(100, { message: "EA curado no puede ser mayor a 100%." })
    .nullable(),
  vigorTz: z
    .number({
      message: "Vigor TZ inválido.",
    })
    .min(0, { message: "Vigor TZ no puede ser menor a 0%." })
    .max(100, { message: "Vigor TZ no puede ser mayor a 100%." })
    .nullable(),
  viabilityTz: z
    .number({
      message: "Viabilidad TZ inválido.",
    })
    .min(0, { message: "Viabilidad TZ no puede ser menor a 0%." })
    .max(100, { message: "Viabilidad TZ no puede ser mayor a 100%." })
    .nullable(),
  e: z
    .number({
      message: "E inválido.",
    })
    .min(0, { message: "E no puede ser menor a 0%." })
    .max(100, { message: "E no puede ser mayor a 100%." })
    .nullable(),
  pms: z
    .number({
      message: "PMS inválido.",
    })
    .min(0, { message: "PMS no puede ser menor a 0%." })
    .max(100, { message: "PMS no puede ser mayor a 100%." })
    .nullable(),
  purityPercent: z
    .number({
      message: "Pureza % inválido.",
    })
    .min(0, { message: "Pureza % no puede ser menor a 0%." })
    .max(100, { message: "Pureza % no puede ser mayor a 100%." })
    .nullable(),
  otherAnalysis: z
    .string({
      message: "Otros análisis inválido.",
    })
    .nullable(),
  performedAt: z.iso.datetime({ local: true, message: "Fecha de realización inválida." }).optional().nullable(),
});

export type SampleAnalysisType = z.infer<typeof sampleAnalysisSchema>;
