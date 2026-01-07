import { Client, PaginatedClients } from "@/types/client";
import {
  PaginatedSamples,
  SampleFilters,
  FullSample,
  SampleAnalysis,
  Sample,
  SamplePurity,
  SampleGermination,
  type SampleHumidity,
} from "@/types/sample";
declare global {
  interface Window {
    api: {
      clients: {
        createClient(client: Client): Promise<{ success: boolean; message: string; data?: Client }>;
        getClients(page: number, pageSize: number, search: string): Promise<PaginatedClients>;
        getClientById(id: number): Promise<{ success: boolean; message?: string; data?: Client }>;
        updateClient(client: Client): Promise<{ success: boolean; message: string }>;
        deleteClient(id: number): Promise<{ success: boolean; message: string }>;
        search(search: string): Promise<{ name: string; id: number }[]>;
      };

      samples: {
        getSamples(page: number, pageSize: number, filters: SampleFilters): Promise<PaginatedSamples>;
        getFullSampleById(id: number): Promise<{ success: boolean; message?: string; data?: FullSample }>;
        createSample(sample: Sample): Promise<{ success: boolean; message: string; data?: Sample }>;
        updateSample(sample: Sample): Promise<{ success: boolean; message: string }>;
        deleteSample(id: number): Promise<{ success: boolean; message: string }>;
      };

      analysis: {
        createAnalysis(analysis: SampleAnalysis): Promise<{ success: boolean; message: string }>;
        updateAnalysis(analysis: SampleAnalysis): Promise<{ success: boolean; message: string }>;
      };

      purity: {
        createPurity(purity: SamplePurity): Promise<{ success: boolean; message: string }>;
        updatePurity(purity: SamplePurity): Promise<{ success: boolean; message: string }>;
      };

      germination: {
        createGermination(germination: SampleGermination): Promise<{ success: boolean; message: string }>;
        updateGermination(germination: SampleGermination): Promise<{ success: boolean; message: string }>;
      };

      humidity: {
        createHumidity(humidity: SampleHumidity): Promise<{ success: boolean; message: string }>;
        updateHumidity(humidity: SampleHumidity): Promise<{ success: boolean; message: string }>;
      };
    };
  }
}
