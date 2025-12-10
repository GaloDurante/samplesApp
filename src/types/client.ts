export type Client = {
  id?: number;
  name: string;
  address: string;
  cuit: number;
  email: string;
  phone: string;
};

export type PaginatedClients = {
  clients: Client[];
  total: number;
};
