import { Client } from "@/types/client";
declare global {
  interface Window {
    clientApi: {
      createClient(client: Client): Promise<{ success: boolean }>;
      getClients(): Promise<Client[]>;
      getClientById(id: number): Promise<Client>;
      updateClient(client: Client): Promise<{ success: boolean }>;
      deleteClient(id: number): Promise<{ success: boolean }>;
    };
  }
}
