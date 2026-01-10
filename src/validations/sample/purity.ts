import { z } from "zod";

export const samplePuritySchema = z.object({
  id: z.number().int().optional(),
  sampleId: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  seedPure: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Semilla pura formato inválido.",
    })
    .optional(),

  inertMatter: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Materia inerte formato inválido.",
    })
    .optional(),

  otherSeeds: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Otras semillas formato inválido.",
    })
    .optional(),

  typeInertMatter: z
    .string({
      message: "Clase de materia inerte inválida.",
    })
    .min(3, {
      message: "Clase de materia inerte muy corto.",
    })
    .optional(),

  remarks: z
    .string({
      message: "Otras semillas inválido.",
    })
    .min(3, {
      message: "Otras semillas muy corto.",
    })
    .optional(),

  performedAt: z.iso.datetime({ local: true, message: "Fecha de realización inválida." }),
});

export type SamplePurityType = z.infer<typeof samplePuritySchema>;
