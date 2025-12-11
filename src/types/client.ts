import type { ClientType } from "@/validations/client";

export type Client = ClientType;

export type PaginatedClients = {
  clients: Client[];
  total: number;
};
