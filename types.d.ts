export interface Client {
  id?: number;
  name: string;
  lastName: string;
  address: string;
  cuit: number;
  phone: string;
}

declare global {
  interface Window {
    clientApi: {
      createClient(client: Client): Promise<{ success: boolean }>;
      getClients(): Promise<Client[]>;
      updateClient(client: Client): Promise<{ success: boolean }>;
      deleteClient(id: number): Promise<{ success: boolean }>;
    };
  }
}
