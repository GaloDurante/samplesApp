import { Client, PaginatedClients } from "@/types/client";
import { PaginatedSamples, SampleFilters, FullSample, SampleAnalysis, Sample } from "@/types/sample";
declare global {
  interface Window {
    clientApi: {
      createClient(client: Client): Promise<{ success: boolean; message: string; data?: Client }>;
      getClients(page: number, pageSize: number, search: string): Promise<PaginatedClients>;
      getClientById(id: number): Promise<{ success: boolean; message?: string; data?: Client }>;
      updateClient(client: Client): Promise<{ success: boolean; message: string }>;
      deleteClient(id: number): Promise<{ success: boolean; message: string }>;
      search(search: string): Promise<{ name: string; id: number }[]>;
    };

    sampleApi: {
      getSamples(page: number, pageSize: number, filters: SampleFilters): Promise<PaginatedSamples>;
      getFullSampleById(id: number): Promise<{ success: boolean; message?: string; data?: FullSample }>;
      createSample(sample: Sample): Promise<{ success: boolean; message: string; data?: Sample }>;
      updateSample(sample: Sample): Promise<{ success: boolean; message: string }>;
      deleteSample(id: number): Promise<{ success: boolean; message: string }>;
    };

    analysisApi: {
      createAnalysis(analysis: SampleAnalysis): Promise<{ success: boolean; message: string }>;
      updateAnalysis(analysis: SampleAnalysis): Promise<{ success: boolean; message: string }>;
    };
  }
}
