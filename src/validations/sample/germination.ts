import { z } from "zod";

export const sampleGerminationSchema = z.object({
  id: z.number().int().optional(),
  sampleId: z
    .number({
      message: "ID de muestra inválido.",
    })
    .int(),

  daysNumber: z
    .number({
      message: "N° de días inválido.",
    })
    .min(0, { message: "N° de días no puede ser menor a 0." })
    .nullable(),
  normalSeedlings: z
    .number({
      message: "Plantulas normales inválido.",
    })
    .min(0, { message: "Plantulas normales no puede ser menor a 0%." })
    .max(100, { message: "Plantulas normales no puede ser mayor a 100%." })
    .nullable(),
  hardSeeds: z
    .number({
      message: "Semillas duras inválido.",
    })
    .min(0, { message: "Semillas duras no puede ser menor a 0%." })
    .max(100, { message: "Semillas duras no puede ser mayor a 100%." })
    .nullable(),
  freshSeeds: z
    .number({
      message: "Semillas frescas inválido.",
    })
    .min(0, { message: "Semillas frescas no puede ser menor a 0%." })
    .max(100, { message: "Semillas frescas no puede ser mayor a 100%." })
    .nullable(),
  abnormalSeedlings: z
    .number({
      message: "Plantulas anormales inválido.",
    })
    .min(0, { message: "Plantulas anormales no puede ser menor a 0%." })
    .max(100, { message: "Plantulas anormales no puede ser mayor a 100%." })
    .nullable(),
  deadSeeds: z
    .number({
      message: "Semillas muertas inválido.",
    })
    .min(0, { message: "Semillas muertas no puede ser menor a 0%." })
    .max(100, { message: "Semillas muertas no puede ser mayor a 100%." })
    .nullable(),
  performedAt: z.iso.datetime({ local: true, message: "Fecha de realización inválida." }).optional().nullable(),
});

export type SampleGerminationType = z.infer<typeof sampleGerminationSchema>;
