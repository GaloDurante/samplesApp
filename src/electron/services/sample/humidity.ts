import { db } from "../../db/client.js";
import { sampleHumidity } from "../../db/schema.js";

import { eq } from "drizzle-orm";
import { SqliteError } from "better-sqlite3";

import { sampleHumiditySchema } from "../../../validations/sample/humidity.js";
import type { SampleHumidity } from "../../../types/sample.js";

export function getSampleHumidity(sampleId: number) {
  return db
    .select()
    .from(sampleHumidity)
    .where(eq(sampleHumidity.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}

export async function createSampleHumidity(input: SampleHumidity) {
  const parsed = sampleHumiditySchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const data = parsed.data;

  try {
    await db
      .insert(sampleHumidity)
      .values({
        sampleId: data.sampleId,
        humidity: data.humidity ?? null,
        performedAt: data.performedAt ?? new Date().toISOString(),
      })
      .run();

    return { success: true };
  } catch (error) {
    if (error instanceof SqliteError) {
      const msg = error.message.toLowerCase();

      if (msg.includes("foreign key")) {
        throw new Error("La muestra seleccionada no existe.");
      }

      if (msg.includes("unique")) {
        throw new Error("El contenido de humedad para esta muestra ya existe.");
      }

      console.error("SQLite error creating humidity:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error creating humidity:", error);
    throw new Error("No se pudo crear el contenido de humedad por un problema en el servidor.");
  }
}

export async function updateSampleHumidity(input: SampleHumidity) {
  if (!Number.isInteger(input.id)) {
    throw new Error("El ID del análisis es requerido.");
  }

  const parsed = sampleHumiditySchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const { id, ...data } = parsed.data;
  if (id === undefined) {
    throw new Error("El ID de la muestra es requerido.");
  }

  try {
    const result = await db
      .update(sampleHumidity)
      .set({
        humidity: data.humidity ?? null,
        performedAt: data.performedAt ?? new Date().toISOString(),
      })
      .where(eq(sampleHumidity.id, id))
      .run();

    if (result.changes === 0) {
      throw new Error("El contenido de humedad que intenta modificar no existe.");
    }

    return { success: true };
  } catch (error) {
    console.error("updateSampleHumidity failed:", error);

    if (error instanceof SqliteError) {
      const msg = error.message.toLowerCase();

      if (msg.includes("foreign key")) {
        throw new Error("La muestra asociada no existe.");
      }

      console.error("SQLite error updating humidity:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error updating humidity:", error);
    throw new Error("No se pudo modificar el contenido de humedad por un problema en el servidor.");
  }
}
