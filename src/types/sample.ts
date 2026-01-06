import type { SampleType } from "../validations/sample.js";
import type { SampleAnalysisType } from "../validations/sample/analysis.js";
import type { SamplePurityType } from "../validations/sample/purity.js";
import type { SampleGerminationType } from "../validations/sample/germination.js";
import type { SampleHumidityType } from "../validations/sample/humidity.js";

export type Sample = SampleType;
export type SampleAnalysis = SampleAnalysisType;
export type SamplePurity = SamplePurityType;
export type SampleGermination = SampleGerminationType;
export type SampleHumidity = SampleHumidityType;

export type PartialSample = Sample & {
  client: {
    id: number;
    name: string;
  } | null;

  analysis: {
    firstCount?: number | null;
    pg?: number | null;
    vigorTz?: number | null;
    pms?: number | null;
    purityPercent?: number | null;
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
