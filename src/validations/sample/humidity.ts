import { z } from "zod";

export const sampleHumiditySchema = z.object({
  id: z.number().int().optional(),
  sampleId: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  humidity: z
    .number({
      message: "N° porcentual inválido.",
    })
    .optional(),

  performedAt: z.iso.datetime({ local: true, message: "Fecha de realización inválida." }),
});

export type SampleHumidityType = z.infer<typeof sampleHumiditySchema>;
