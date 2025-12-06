import { getDb, saveDb } from "../database/index.js";
import type { Client } from "../../types/client.js";
import { SqlValue } from "sql.js";

export function getClients(): Client[] {
  const db = getDb();
  const result = db.exec("SELECT * FROM clients ORDER BY id DESC");
  if (!result[0]) return [];
  return result[0].values.map((row: SqlValue[]) => ({
    id: Number(row[0]),
    name: String(row[1]),
    lastName: String(row[2]),
    address: String(row[3]),
    cuit: Number(row[4]),
    phone: String(row[5]),
  }));
}

export function getClientById(id: number): Client {
  const db = getDb();
  if (!id) throw new Error("Client ID is required");

  const result = db.exec(`SELECT * FROM clients WHERE id = ${id}`);
  if (!result[0] || result[0].values.length === 0) {
    throw new Error("Client not found");
  }

  const row = result[0].values[0];
  return {
    id: Number(row[0]),
    name: String(row[1]),
    lastName: String(row[2]),
    address: String(row[3]),
    cuit: Number(row[4]),
    phone: String(row[5]),
  };
}

export function createClient(client: Client) {
  const db = getDb();
  db.run("INSERT INTO clients (name, lastname, address, cuit, phone) VALUES (?, ?, ?, ?, ?)", [
    client.name,
    client.lastName,
    client.address,
    client.cuit,
    client.phone,
  ]);
  saveDb();
}

export function updateClient(client: Client) {
  if (!client.id) throw new Error("Client not found");
  const db = getDb();
  db.run("UPDATE clients SET name=?, lastname=?, address=?, cuit=?, phone=? WHERE id=?", [
    client.name,
    client.lastName,
    client.address,
    client.cuit,
    client.phone,
    client.id,
  ]);
  saveDb();
}

export function deleteClient(id: number) {
  const db = getDb();
  db.run("DELETE FROM clients WHERE id=?", [id]);
  saveDb();
}
