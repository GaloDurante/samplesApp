import { Client, PaginatedClients } from "@/types/client";
declare global {
  interface Window {
    clientApi: {
      createClient(client: Client): Promise<{ success: boolean; message: string }>;
      getClients(page: number, pageSize: number, search: string): Promise<PaginatedClients>;
      getClientById(id: number): Promise<Client>;
      updateClient(client: Client): Promise<{ success: boolean }>;
      deleteClient(id: number): Promise<{ success: boolean; message: string }>;
    };
  }
}
