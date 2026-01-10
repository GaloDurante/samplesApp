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
    .optional(),
  sealNumber: z
    .string({
      message: "N° precinto inválido.",
    })
    .optional(),
  specie: z
    .string({
      message: "Especie es requerida.",
    })
    .min(3, {
      message: "Especie inválido.",
    }),
  otherDeter: z
    .string({
      message: "Otras determinaciones es requerido.",
    })
    .min(3, {
      message: "Otras determinaciones muy corto.",
    }),
});

export type CertificateType = z.infer<typeof certificateSchema>;
