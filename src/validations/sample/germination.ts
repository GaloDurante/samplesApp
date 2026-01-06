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
    .optional(),
  normalSeedlings: z
    .number({
      message: "Plantulas normales inválido.",
    })
    .optional(),
  hardSeeds: z
    .number({
      message: "Semillas duras inválido.",
    })
    .optional(),
  freshSeeds: z
    .number({
      message: "Semillas frescas inválido.",
    })
    .optional(),
  abnormalSeedlings: z
    .number({
      message: "Plantulas anormales inválido.",
    })
    .optional(),
  deadSeeds: z
    .number({
      message: "Semillas muertas inválido.",
    })
    .optional(),
  performedAt: z.iso.datetime({ local: true, message: "Fecha de realización inválida." }),
});

export type SampleGerminationType = z.infer<typeof sampleGerminationSchema>;
