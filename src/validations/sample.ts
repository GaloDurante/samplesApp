import { z } from "zod";

export const sampleSchema = z.object({
  id: z.number().int().nonnegative(),
  client_id: z.number().int().nonnegative(),

  sample_number: z.number().int().nonnegative(),
  entry_date: z.string().min(1),

  sample_code: z.string().min(1),
  colloquial_specie: z.string().min(1),
  cultivar: z.string().min(1),
  harvest_year: z.string().min(1),
  mark: z.string().min(1),
  lot_number: z.string().min(1),
  lot_weight: z.number(),

  test_end_date: z.string().min(1),
  observations: z.string().nullable(),

  sampling_date: z.string().nullable(),
  other_references: z.string().nullable(),
  seal_number: z.string().nullable(),
  specie: z.string().nullable(),
  other_deter: z.string().nullable(),
});

export type SampleType = z.infer<typeof sampleSchema>;

export const sampleAnalysesSchema = z.object({
  id: z.number().int().nonnegative(),
  sample_id: z.number().int().nonnegative(),

  first_count: z.number().nullable(),
  pg: z.number().nullable(),
  pg_curado: z.number().nullable(),
  ct: z.number().nullable(),
  ct_curado: z.number().nullable(),
  e4: z.number().nullable(),
  e4_curado: z.number().nullable(),
  vigor_tz: z.number().nullable(),
  viability_tz: z.number().nullable(),
  e: z.number().nullable(),
  pms: z.number().nullable(),
  purity_percent: z.number().nullable(),
  other_analysis: z.string().nullable(),
});

export type SampleAnalysesType = z.infer<typeof sampleAnalysesSchema>;

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
