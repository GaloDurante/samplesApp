import type { ClientType } from "../validations/client.js";

export type Client = ClientType;

export type PaginatedClients = {
  clients: Client[];
  total: number;
};

export type ClientPreview = {
  id: number;
  name: string;
  cuit: number;
};
