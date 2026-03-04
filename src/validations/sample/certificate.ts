import { z } from "zod";
import { sampleSchema } from "../sample.js";

export const certificateSchema = z.object({
  id: z.number().optional(),

  samplingDate: z
    .string({
      message: "Fecha de muestreo inválido.",
    })
    .optional(),

  entryDate: sampleSchema.shape.entryDate,
  testEndDate: sampleSchema.shape.testEndDate,
  sampleNumber: sampleSchema.shape.sampleNumber,

  otherReferences: z
    .string({
      message: "Otras referencias inválido.",
    })
    .nullable(),
  sealNumber: z
    .string({
      message: "N° precinto inválido.",
    })
    .nullable(),
  specie: z
    .string({
      message: "Especie es requerida.",
    })
    .min(3, {
      message: "Especie inválido.",
    }),
  location: z
    .string({
      message: "Ubicación inválida.",
    })
    .min(1, {
      message: "Ubicación es requerida.",
    }),
  otherDeter: z
    .string({
      message: "Otras determinaciones inválidas.",
    })
    .min(1, {
      message: "Otras determinaciones es requerida.",
    }),
});

export type CertificateType = z.infer<typeof certificateSchema>;
