import type {
  SampleType,
  SampleAnalysesType,
  SamplePurityType,
  SampleGerminationType,
  SampleHumidityType,
} from "../validations/sample.js";

export type Sample = SampleType;
export type SampleAnalyses = SampleAnalysesType;
export type SamplePurity = SamplePurityType;
export type SampleGermination = SampleGerminationType;
export type SampleHumidity = SampleHumidityType;

export type FullSample = Sample & {
  analyses: SampleAnalyses | null;
  purity: SamplePurity | null;
  germination: SampleGermination | null;
  humidity: SampleHumidity | null;
};

export type SampleFilters = {
  search?: string;
  dateFrom?: string | null;
  dateTo?: string | null;
};

export type PaginatedSamples = {
  samples: FullSample[];
  total: number;
};
