import { db } from "../db/client.js";
import { clients } from "../db/schema.js";
import { or, like, count, eq, asc } from "drizzle-orm";

import { clientSchema } from "../../validations/client.js";

import type { Client } from "../../types/client.js";
import { SqliteError } from "better-sqlite3";

export async function getClients(page = 1, pageSize = 20, search = "") {
  const offset = (page - 1) * pageSize;
  const wildcard = `%${search}%`;

  const where = search
    ? or(
        like(clients.name, wildcard),
        like(clients.cuit, wildcard),
        like(clients.address, wildcard),
        like(clients.email, wildcard),
      )
    : undefined;

  const clientsData = await db.query.clients.findMany({
    where,
    orderBy: (clients, { desc }) => [desc(clients.id)],
    limit: pageSize,
    offset,
  });

  const [{ total }] = await db.select({ total: count() }).from(clients).where(where);

  return {
    clients: clientsData,
    total,
  };
}

export async function getClientById(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Debe indicar un ID válido");
  }

  const client = await db.query.clients.findFirst({
    where: eq(clients.id, id),
  });

  if (!client) {
    throw new Error("Cliente no encontrado");
  }

  return client;
}

export async function createClient(input: Client) {
  const parsed = clientSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  try {
    const [created] = await db.insert(clients).values(parsed.data).returning();

    return created;
  } catch (err) {
    if (err instanceof SqliteError) {
      const msg = err.message.toLowerCase();

      if (msg.includes("clients.cuit")) {
        throw new Error("Ya existe un cliente con el CUIT ingresado");
      }

      if (msg.includes("clients.email")) {
        throw new Error("Ya existe un cliente con el Email ingresado");
      }

      console.error("SQLite error creating client:", err);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error creating client:", err);
    throw new Error("No se pudo crear el cliente por un problema interno");
  }
}

export async function updateClient(input: Client) {
  const parsed = clientSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const data = parsed.data;
  if (!data.id) {
    throw new Error("El ID del cliente es requerido");
  }

  try {
    const result = await db.update(clients).set(data).where(eq(clients.id, data.id)).run();

    if (result.changes === 0) {
      throw new Error("El cliente que intenta modificar no existe.");
    }

    return { success: true };
  } catch (err) {
    if (err instanceof SqliteError) {
      const msg = err.message.toLowerCase();

      if (msg.includes("clients.cuit")) {
        throw new Error("Ya existe un cliente con el CUIT ingresado");
      }

      if (msg.includes("clients.email")) {
        throw new Error("Ya existe un cliente con el Email ingresado");
      }

      console.error("SQLite error updating client:", err);
      throw new Error("Error al acceder a la base de datos");
    }
    throw err instanceof Error ? err : new Error("No se pudo modificar el cliente por un problema interno.");
  }
}

export async function deleteClient(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Debe indicar un ID válido");
  }

  try {
    const result = await db.delete(clients).where(eq(clients.id, id)).run();

    if (result.changes === 0) {
      throw new Error("El cliente que intenta eliminar no existe.");
    }

    return { deleted: true };
  } catch (err) {
    if (err instanceof SqliteError) {
      console.error("SQLite error deleting client:", err);
      throw new Error("Error al acceder a la base de datos");
    }

    throw err instanceof Error ? err : new Error("No se pudo eliminar el cliente solicitado por un problema interno.");
  }
}

export async function searchClients(search: string) {
  if (!search || !search.trim()) return [];

  const term = `%${search.trim()}%`;

  const rows = await db
    .select({
      id: clients.id,
      name: clients.name,
    })
    .from(clients)
    .where(or(like(clients.name, term), like(clients.id, term)))
    .orderBy(asc(clients.name))
    .limit(20);

  return rows;
}
