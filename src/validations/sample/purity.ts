import { z } from "zod";

export const samplePuritySchema = z.object({
  id: z.number().int().optional(),
  sampleId: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  seedPure: z
    .number({
      message: "Semilla pura debe ser un número.",
    })
    .min(0, { message: "Semilla pura no puede ser menor a 0%." })
    .max(100, { message: "Semilla pura no puede ser mayor a 100%." })
    .nullable(),

  inertMatter: z
    .number({
      message: "Materia inerte debe ser un número.",
    })
    .min(0, { message: "Materia inerte no puede ser menor a 0%." })
    .max(100, { message: "Materia inerte no puede ser mayor a 100%." })
    .nullable(),

  otherSeeds: z
    .number({
      message: "Otras semillas debe ser un número.",
    })
    .min(0, { message: "Otras semillas no puede ser menor a 0%." })
    .max(100, { message: "Otras semillas no puede ser mayor a 100%." })
    .nullable(),

  typeInertMatter: z
    .string({
      message: "Clase de materia inerte inválida.",
    })
    .min(3, {
      message: "Clase de materia inerte muy corto.",
    })
    .nullable(),

  remarks: z
    .string({
      message: "Otras semillas inválido.",
    })
    .min(1, {
      message: "Otras semillas muy corto.",
    })
    .nullable(),

  performedAt: z.iso.datetime({ local: true, message: "Fecha de realización inválida." }).optional().nullable(),
});

export type SamplePurityType = z.infer<typeof samplePuritySchema>;
