import { z } from "zod";

export const sampleHumiditySchema = z.object({
  id: z.number().int().nonnegative(),
  sampleId: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  humidity: z.string().optional(),
});

export type SampleHumidityType = z.infer<typeof sampleHumiditySchema>;
