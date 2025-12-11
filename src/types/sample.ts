import type {
  SampleType,
  SampleAnalysesType,
  SamplePurityType,
  SampleGerminationType,
  SampleHumidityType,
} from "@/validations/sample";

export type Sample = SampleType;
export type SampleAnalyses = SampleAnalysesType;
export type SamplePurity = SamplePurityType;
export type SampleGermination = SampleGerminationType;
export type SampleHumidity = SampleHumidityType;

export type FullSample = {
  sample: Sample;
  analyses: SampleAnalyses | null;
  purity: SamplePurity | null;
  germination: SampleGermination | null;
  humidity: SampleHumidity | null;
};
