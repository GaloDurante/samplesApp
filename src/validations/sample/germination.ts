import { z } from "zod";

export const sampleGerminationSchema = z.object({
  id: z.number().int().nonnegative(),
  sampleId: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  days_number: z.string().optional(),
  normal_seedlings: z.string().optional(),
  hard_seeds: z.string().optional(),
  fresh_seeds: z.string().optional(),
  abnormal_seedlings: z.string().optional(),
  dead_seeds: z.string().optional(),
});

export type SampleGerminationType = z.infer<typeof sampleGerminationSchema>;
