import { Client, PaginatedClients } from "@/types/client";
import { PaginatedSamples, SampleFilters, Sample } from "@/types/sample";
declare global {
  interface Window {
    clientApi: {
      createClient(client: Client): Promise<{ success: boolean; message: string }>;
      getClients(page: number, pageSize: number, search: string): Promise<PaginatedClients>;
      getClientById(id: number): Promise<Client>;
      updateClient(client: Client): Promise<{ success: boolean; message: string }>;
      deleteClient(id: number): Promise<{ success: boolean; message: string }>;
    };

    sampleApi: {
      getSamples(page: number, pageSize: number, filters: SampleFilters): Promise<PaginatedSamples>;
      createSample(sample: Sample): Promise<{ success: boolean; message: string }>;
      deleteSample(id: number): Promise<{ success: boolean; message: string }>;
    };
  }
}
