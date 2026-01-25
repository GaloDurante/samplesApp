import type { SampleFilters } from "./sample.js";

export type ExportScope = "page" | "all";

export interface ExportSamplesRequest {
  scope: ExportScope;
  filters?: SampleFilters;
  page?: number;
  pageSize?: number;
}
