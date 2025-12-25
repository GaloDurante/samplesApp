import { z } from "zod";
import { sampleSchema } from "../sample";

export const step1Schema = z.object({
  sampleNumber: sampleSchema.shape.sampleNumber,
  entryDate: sampleSchema.shape.entryDate,
  sampleCode: sampleSchema.shape.sampleCode,
  clientId: sampleSchema.shape.clientId,
  colloquialSpecie: sampleSchema.shape.colloquialSpecie,
  cultivar: sampleSchema.shape.cultivar,
  harvestYear: sampleSchema.shape.harvestYear,
  mark: sampleSchema.shape.mark,
});

export const step2Schema = z.object({
  lotNumber: sampleSchema.shape.lotNumber,
  lotWeight: sampleSchema.shape.lotWeight,
});

export const step3Schema = z.object({
  testEndDate: sampleSchema.shape.testEndDate,
  observations: sampleSchema.shape.observations,
});

export const stepSchemas = [step1Schema, step2Schema, step3Schema] as const;
