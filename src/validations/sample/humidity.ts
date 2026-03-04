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
    .min(0, { message: "El contenido de humedad no puede ser menor a 0%." })
    .max(100, { message: "El contenido de humedad no puede ser mayor a 100%." })
    .nullable(),

  performedAt: z.iso.datetime({ local: true, message: "Fecha de realización inválida." }).optional().nullable(),
});

export type SampleHumidityType = z.infer<typeof sampleHumiditySchema>;
