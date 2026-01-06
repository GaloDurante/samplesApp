import { db } from "../../db/client.js";
import { samplePurity } from "../../db/schema.js";

import { eq } from "drizzle-orm";

import { samplePuritySchema } from "../../../validations/sample/purity.js";
import type { SamplePurity } from "../../../types/sample.js";
import { SqliteError } from "better-sqlite3";

export function getSamplePurity(sampleId: number) {
  return db
    .select()
    .from(samplePurity)
    .where(eq(samplePurity.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}

export async function createSamplePurity(input: SamplePurity) {
  const parsed = samplePuritySchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const data = parsed.data;

  try {
    await db
      .insert(samplePurity)
      .values({
        sampleId: data.sampleId,

        seedPure: data.seedPure ?? null,
        inertMatter: data.inertMatter ?? null,
        otherSeeds: data.otherSeeds ?? null,
        typeInertMatter: data.typeInertMatter ?? null,
        remarks: data.remarks ?? null,
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
        throw new Error("La pureza para esta muestra ya existe.");
      }

      console.error("SQLite error creating analysis:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error creating analysis:", error);
    throw new Error("No se pudo crear la pureza por un problema en el servidor.");
  }
}

export async function updateSamplePurity(input: SamplePurity) {
  if (!Number.isInteger(input.id)) {
    throw new Error("El ID del análisis es requerido.");
  }

  const parsed = samplePuritySchema.safeParse(input);
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
      .update(samplePurity)
      .set({
        seedPure: data.seedPure ?? null,
        inertMatter: data.inertMatter ?? null,
        otherSeeds: data.otherSeeds ?? null,
        typeInertMatter: data.typeInertMatter ?? null,
        remarks: data.remarks ?? null,
        performedAt: data.performedAt ?? new Date().toISOString(),
      })
      .where(eq(samplePurity.id, id))
      .run();

    if (result.changes === 0) {
      throw new Error("La pureza que intenta modificar no existe.");
    }

    return { success: true };
  } catch (error) {
    console.error("updateSamplePurity failed:", error);

    if (error instanceof SqliteError) {
      const msg = error.message.toLowerCase();

      if (msg.includes("foreign key")) {
        throw new Error("La muestra asociada no existe.");
      }

      console.error("SQLite error updating purity:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error updating purity:", error);
    throw new Error("No se pudo modificar la pureza por un problema en el servidor.");
  }
}
