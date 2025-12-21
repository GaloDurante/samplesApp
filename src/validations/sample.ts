import { z } from "zod";

export const sampleSchema = z.object({
  id: z.number().int().optional(),

  client_id: z
    .number({
      message: "Cliente inválido.",
    })
    .int(),
  client_name: z
    .string({
      message: "Nombre del cliente inválido.",
    })
    .optional(),

  sample_number: z
    .string({
      message: "N° de muestra es requerido.",
    })
    .regex(/^\d+$/, "Solo admite números")
    .min(1, "N° de muestra es requerido."),

  entry_date: z.string({
    message: "Fecha de ingreso es requerida.",
  }),

  sample_code: z
    .string({
      message: "Código de muestra es requerido.",
    })
    .min(3, {
      message: "Código de muestra es muy corto.",
    }),

  colloquial_specie: z
    .string({
      message: "Especie es requerida.",
    })
    .min(3, {
      message: "Especie es muy corto.",
    }),

  cultivar: z
    .string({
      message: "Cultivar es requerido.",
    })
    .min(2, {
      message: "Cultivar es muy corto.",
    }),

  harvest_year: z
    .string({
      message: "Año de cosecha es requerido.",
    })
    .min(4, {
      message: "Año de cosecha inválido.",
    }),

  mark: z
    .string({
      message: "Marca es requerida.",
    })
    .min(4, {
      message: "Marca es muy corto.",
    }),

  lot_number: z
    .string({
      message: "N° de lote es requerido.",
    })
    .min(3, {
      message: "N° de lote inválido.",
    }),

  lot_weight: z
    .string({
      message: "Peso del lote es requerido.",
    })
    .refine((value) => /^\d+(\.\d+)?\s?(kg|t)$/i.test(value.trim()), {
      message: "Formato válido: número + kg o t.",
    }),

  test_end_date: z.string({
    message: "Fecha de finalización es requerida.",
  }),

  client: z
    .object({
      id: z.number().int(),
      name: z.string(),
      cuit: z.number(),
    })
    .optional()
    .nullable(),

  observations: z.string().optional(),
  sampling_date: z.string().optional(),
  other_references: z.string().optional(),
  seal_number: z.string().optional(),
  specie: z.string().optional(),
  other_deter: z.string().optional(),
});

export type SampleType = z.infer<typeof sampleSchema>;

export const sampleAnalysisSchema = z.object({
  id: z.number().int().optional(),
  sample_id: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  first_count: z.number({
    message: "1° recuento inválido.",
  }),
  pg: z.number({
    message: "PG inválido.",
  }),
  pg_curado: z.number({
    message: "PG curado inválido.",
  }),
  ct: z.number({
    message: "CT inválido.",
  }),
  ct_curado: z.number({
    message: "CT curado inválido.",
  }),
  ea: z.number({
    message: "EA de muestra inválido.",
  }),
  ea_curado: z.number({
    message: "EA curado inválido.",
  }),
  vigor_tz: z.number({
    message: "Vigor TZ inválido.",
  }),
  viability_tz: z.number({
    message: "Viabilidad TZ inválido.",
  }),
  e: z.number({
    message: "E inválido.",
  }),
  pms: z.number({
    message: "PMS inválido.",
  }),
  purity_percent: z.number({
    message: "Pureza % inválido.",
  }),
  other_analysis: z.string({
    message: "Otros análisis inválido.",
  }),
});

export type SampleAnalysisType = z.infer<typeof sampleAnalysisSchema>;

export const samplePuritySchema = z.object({
  id: z.number().int().nonnegative(),
  sample_id: z.number().int().nonnegative(),

  seed_pure: z.string().nullable(),
  inert_matter: z.string().nullable(),
  other_seeds: z.string().nullable(),
  type_inert_matter: z.string().nullable(),
  remarks: z.string().nullable(),
});

export type SamplePurityType = z.infer<typeof samplePuritySchema>;

export const sampleGerminationSchema = z.object({
  id: z.number().int().nonnegative(),
  sample_id: z.number().int().nonnegative(),

  days_number: z.string().nullable(),
  normal_seedlings: z.string().nullable(),
  hard_seeds: z.string().nullable(),
  fresh_seeds: z.string().nullable(),
  abnormal_seedlings: z.string().nullable(),
  dead_seeds: z.string().nullable(),
});

export type SampleGerminationType = z.infer<typeof sampleGerminationSchema>;

export const sampleHumiditySchema = z.object({
  id: z.number().int().nonnegative(),
  sample_id: z.number().int().nonnegative(),

  humidity: z.string().nullable(),
});

export type SampleHumidityType = z.infer<typeof sampleHumiditySchema>;
