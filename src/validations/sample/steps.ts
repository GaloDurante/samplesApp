import { z } from "zod";
import { sampleSchema } from "../sample";

export const step1Schema = z.object({
  sample_number: sampleSchema.shape.sample_number,
  entry_date: sampleSchema.shape.entry_date,
  sample_code: sampleSchema.shape.sample_code,
  client_id: sampleSchema.shape.client_id,
  colloquial_specie: sampleSchema.shape.colloquial_specie,
  cultivar: sampleSchema.shape.cultivar,
  harvest_year: sampleSchema.shape.harvest_year,
  mark: sampleSchema.shape.mark,
});

export const step2Schema = z.object({
  lot_number: sampleSchema.shape.lot_number,
  lot_weight: sampleSchema.shape.lot_weight,
});

export const step3Schema = z.object({
  test_end_date: sampleSchema.shape.test_end_date,
  observations: sampleSchema.shape.observations,
});

export const stepSchemas = [step1Schema, step2Schema, step3Schema] as const;

