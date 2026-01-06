import { db } from "../../db/client.js";
import { sampleGermination } from "../../db/schema.js";

import { eq } from "drizzle-orm";

import { sampleGerminationSchema } from "../../../validations/sample/germination.js";
import type { SampleGermination } from "../../../types/sample.js";
import { SqliteError } from "better-sqlite3";

export function getSampleGermination(sampleId: number) {
  return db
    .select()
    .from(sampleGermination)
    .where(eq(sampleGermination.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}

export async function createSampleGermination(input: SampleGermination) {
  const parsed = sampleGerminationSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const data = parsed.data;

  try {
    await db
      .insert(sampleGermination)
      .values({
        sampleId: data.sampleId,

        daysNumber: data.daysNumber ?? null,
        normalSeedlings: data.normalSeedlings ?? null,
        hardSeeds: data.hardSeeds ?? null,
        freshSeeds: data.freshSeeds ?? null,
        abnormalSeedlings: data.abnormalSeedlings ?? null,
        deadSeeds: data.deadSeeds ?? null,
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
        throw new Error("La germinación para esta muestra ya existe.");
      }

      console.error("SQLite error creating germination:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error creating germination:", error);
    throw new Error("No se pudo crear la germinación por un problema en el servidor.");
  }
}

export async function updateSampleGermination(input: SampleGermination) {
  if (!Number.isInteger(input.id)) {
    throw new Error("El ID del análisis es requerido.");
  }

  const parsed = sampleGerminationSchema.safeParse(input);
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
      .update(sampleGermination)
      .set({
        daysNumber: data.daysNumber ?? null,
        normalSeedlings: data.normalSeedlings ?? null,
        hardSeeds: data.hardSeeds ?? null,
        freshSeeds: data.freshSeeds ?? null,
        abnormalSeedlings: data.abnormalSeedlings ?? null,
        deadSeeds: data.deadSeeds ?? null,
        performedAt: data.performedAt ?? new Date().toISOString(),
      })
      .where(eq(sampleGermination.id, id))
      .run();

    if (result.changes === 0) {
      throw new Error("La germinación que intenta modificar no existe.");
    }

    return { success: true };
  } catch (error) {
    console.error("updateSampleGermination failed:", error);

    if (error instanceof SqliteError) {
      const msg = error.message.toLowerCase();

      if (msg.includes("foreign key")) {
        throw new Error("La muestra asociada no existe.");
      }

      console.error("SQLite error updating germination:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error updating germination:", error);
    throw new Error("No se pudo modificar la germinación por un problema en el servidor.");
  }
}
