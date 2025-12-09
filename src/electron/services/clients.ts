import { queryAll, queryOne, execute } from "../database/sql.js";
import { clientSchema } from "../../validations/client.js";

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
  const validationResult = clientSchema.safeParse(client);

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const validatedClient = validationResult.data;

  try {
    execute(
      `INSERT INTO clients (name, last_name, address, cuit, phone)
       VALUES (?, ?, ?, ?, ?)`,
      [
        validatedClient.name,
        validatedClient.lastName,
        validatedClient.address,
        validatedClient.cuit,
        validatedClient.phone,
      ],
    );
  } catch (error) {
    console.warn(error);

    if (error instanceof Error) {
      const msg = error.message?.toLowerCase() ?? "";

      if (msg.includes("unique")) {
        throw new Error("Ya existe un cliente con el CUIT ingresado");
      }

      throw new Error("Error al acceder a la base de datos");
    }

    throw new Error("No se pudo crear el cliente por un problema en el servidor.");
  }
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
  if (!id) throw new Error("Debe indicar un ID válido");

  const existing = queryOne("SELECT id FROM clients WHERE id = ?", [id]);

  if (!existing) {
    throw new Error("El cliente que intenta eliminar no existe.");
  }

  try {
    execute("DELETE FROM clients WHERE id=?", [id]);
  } catch (error) {
    console.warn(error);
    throw new Error("No se pudo eliminar el cliente solicitado por un problema en el servidor.");
  }
}
