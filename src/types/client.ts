import type { ClientType } from "../validations/client.js";

export type Client = ClientType;

export type PaginatedClients = {
  clients: Client[];
  total: number;
};
