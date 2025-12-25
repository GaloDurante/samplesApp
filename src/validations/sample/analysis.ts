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
    .optional(),
  pg: z
    .number({
      message: "PG inválido.",
    })
    .optional(),
  pgCurado: z
    .number({
      message: "PG curado inválido.",
    })
    .optional(),
  ct: z
    .number({
      message: "CT inválido.",
    })
    .optional(),
  ctCurado: z
    .number({
      message: "CT curado inválido.",
    })
    .optional(),
  ea: z
    .number({
      message: "EA de muestra inválido.",
    })
    .optional(),
  eaCurado: z
    .number({
      message: "EA curado inválido.",
    })
    .optional(),
  vigorTz: z
    .number({
      message: "Vigor TZ inválido.",
    })
    .optional(),
  viabilityTz: z
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
  purityPercent: z
    .number({
      message: "Pureza % inválido.",
    })
    .optional(),
  otherAnalysis: z
    .string({
      message: "Otros análisis inválido.",
    })
    .optional(),
  performancedAt: z.string({
    message: "Fecha de realización inválida.",
  }),
});

export type SampleAnalysisType = z.infer<typeof sampleAnalysisSchema>;
