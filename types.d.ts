import { Client, PaginatedClients } from "@/types/client";
import { PaginatedSamples, SampleFilters, FullSample } from "@/types/sample";
declare global {
  interface Window {
    clientApi: {
      createClient(client: Client): Promise<{ success: boolean; message: string }>;
      getClients(page: number, pageSize: number, search: string): Promise<PaginatedClients>;
      getClientById(id: number): Promise<Client>;
      updateClient(client: Client): Promise<{ success: boolean; message: string }>;
      deleteClient(id: number): Promise<{ success: boolean; message: string }>;
      search(search: string): Promise<{ name: string; id: number }[]>;
    };

    sampleApi: {
      getSamples(page: number, pageSize: number, filters: SampleFilters): Promise<PaginatedSamples>;
      getSampleById(id: number): Promise<FullSample>;
      createSample(sample: Sample): Promise<{ success: boolean; message: string }>;
      updateSample(sample: Sample): Promise<{ success: boolean; message: string }>;
      deleteSample(id: number): Promise<{ success: boolean; message: string }>;
    };
  }
}
