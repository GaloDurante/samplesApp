import type { SampleType, SamplePurityType, SampleGerminationType, SampleHumidityType } from "../validations/sample.js";
import type { SampleAnalysisType } from "@/validations/sample/analysis";

export type Sample = SampleType;
export type SampleAnalysis = SampleAnalysisType;
export type SamplePurity = SamplePurityType;
export type SampleGermination = SampleGerminationType;
export type SampleHumidity = SampleHumidityType;

export type PartialSample = Sample & {
  client: {
    id: number;
    name: string;
    cuit: number;
  } | null;

  analysis: {
    first_count?: number | null;
    pg?: number | null;
    vigor_tz?: number | null;
    pms?: number | null;
    purity_percent?: number | null;
  } | null;
};

export type FullSample = Sample & {
  analysis: SampleAnalysis | null;
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
