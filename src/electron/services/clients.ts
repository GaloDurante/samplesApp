import { queryAll, queryOne, execute } from "../database/sql.js";

import type { Client } from "../../types/client.js";
import type { SqlValue } from "sql.js";

function mapClient(row: SqlValue[]): Client {
  return {
    id: Number(row[0]),
    name: String(row[1]),
    lastName: String(row[2]),
    address: String(row[3]),
    cuit: Number(row[4]),
    phone: String(row[5]),
  };
}

export function getClients(): Client[] {
  return queryAll("SELECT * FROM clients ORDER BY id DESC").map(mapClient);
}

export function getClientById(id: number): Client {
  if (!id) throw new Error("Client ID is required");

  const row = queryOne("SELECT * FROM clients WHERE id = ?", [id]);
  if (!row) throw new Error("Client not found");
  return mapClient(row);
}

export function createClient(client: Client) {
  execute(
    `INSERT INTO clients (name, last_name, address, cuit, phone)
     VALUES (?, ?, ?, ?, ?)`,
    [client.name, client.lastName, client.address, client.cuit, client.phone],
  );
}

export function updateClient(client: Client) {
  if (!client.id) throw new Error("Client must have ID");

  execute(
    `UPDATE clients
       SET name=?, last_name=?, address=?, cuit=?, phone=?
     WHERE id=?`,
    [client.name, client.lastName, client.address, client.cuit, client.phone, client.id],
  );
}

export function deleteClient(id: number) {
  execute("DELETE FROM clients WHERE id=?", [id]);
}
