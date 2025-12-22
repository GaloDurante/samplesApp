import { z } from "zod";

export const sampleAnalysisSchema = z.object({
  id: z.number().int().optional(),
  sample_id: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  first_count: z
    .number({
      message: "1° recuento inválido.",
    })
    .optional(),
  pg: z
    .number({
      message: "PG inválido.",
    })
    .optional(),
  pg_curado: z
    .number({
      message: "PG curado inválido.",
    })
    .optional(),
  ct: z
    .number({
      message: "CT inválido.",
    })
    .optional(),
  ct_curado: z
    .number({
      message: "CT curado inválido.",
    })
    .optional(),
  ea: z
    .number({
      message: "EA de muestra inválido.",
    })
    .optional(),
  ea_curado: z
    .number({
      message: "EA curado inválido.",
    })
    .optional(),
  vigor_tz: z
    .number({
      message: "Vigor TZ inválido.",
    })
    .optional(),
  viability_tz: z
    .number({
      message: "Viabilidad TZ inválido.",
    })
    .optional(),
  e: z
    .number({
      message: "E inválido.",
    })
    .optional(),
  pms: z
    .number({
      message: "PMS inválido.",
    })
    .optional(),
  purity_percent: z
    .number({
      message: "Pureza % inválido.",
    })
    .optional(),
  other_analysis: z
    .string({
      message: "Otros análisis inválido.",
    })
    .optional(),
});

export type SampleAnalysisType = z.infer<typeof sampleAnalysisSchema>;
