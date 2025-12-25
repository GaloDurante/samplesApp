import { z } from "zod";

export const sampleSchema = z.object({
  id: z.number().int().optional(),

  clientId: z
    .number({
      message: "Cliente inválido.",
    })
    .int(),

  sampleNumber: z
    .string({
      message: "N° de muestra es requerido.",
    })
    .regex(/^\d+$/, "N° de muestra solo admite números")
    .min(1, "N° de muestra es requerido."),

  entryDate: z.iso.date({
    message: "Fecha de ingreso inválida.",
  }),

  sampleCode: z
    .string({
      message: "Código de muestra es requerido.",
    })
    .min(3, {
      message: "Código de muestra es muy corto.",
    })
    .optional(),

  colloquialSpecie: z
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

  harvestYear: z
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
    })
    .optional(),

  lotNumber: z
    .string({
      message: "N° de lote es requerido.",
    })
    .min(3, {
      message: "N° de lote inválido.",
    })
    .optional(),

  lotWeight: z
    .string({
      message: "Peso del lote es requerido.",
    })
    .refine((value) => /^\d+(\.\d+)?\s?(kg|t)$/i.test(value.trim()), {
      message: "Formato válido: número + kg o t.",
    })
    .optional(),

  testEndDate: z.iso.date({
    message: "Fecha de finalización inválida.",
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

  samplingDate: z.string().optional().nullable(),
  otherReferences: z.string().optional().nullable(),
  sealNumber: z.string().optional().nullable(),
  specie: z.string().optional().nullable(),
  otherDeter: z.string().optional().nullable(),
});

export type SampleType = z.infer<typeof sampleSchema>;

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
