import { db } from "../../db/client.js";
import { sampleAnalysis } from "../../db/schema.js";

import { eq } from "drizzle-orm";
import { SqliteError } from "better-sqlite3";

import { sampleAnalysisSchema } from "../../../validations/sample/analysis.js";
import type { SampleAnalysis } from "../../../types/sample.js";

export function getSampleAnalysis(sampleId: number) {
  return db
    .select()
    .from(sampleAnalysis)
    .where(eq(sampleAnalysis.sampleId, sampleId))
    .limit(1)
    .then((r) => r[0] ?? null);
}

export async function createSampleAnalysis(input: SampleAnalysis) {
  const parsed = sampleAnalysisSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const data = parsed.data;

  try {
    await db
      .insert(sampleAnalysis)
      .values({
        sampleId: data.sampleId,

        firstCount: data.firstCount ?? null,
        pg: data.pg ?? null,
        pgCurado: data.pgCurado ?? null,
        ct: data.ct ?? null,
        ctCurado: data.ctCurado ?? null,
        ea: data.ea ?? null,
        eaCurado: data.eaCurado ?? null,
        vigorTz: data.vigorTz ?? null,
        viabilityTz: data.viabilityTz ?? null,
        e: data.e ?? null,
        pms: data.pms ?? null,
        purityPercent: data.purityPercent ?? null,
        otherAnalysis: data.otherAnalysis ?? null,
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
        throw new Error("El análisis para esta muestra ya existe.");
      }

      console.error("SQLite error creating analysis:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error creating analysis:", error);
    throw new Error("No se pudo crear el análisis por un problema en el servidor.");
  }
}

export async function updateSampleAnalysis(input: SampleAnalysis) {
  if (!Number.isInteger(input.id)) {
    throw new Error("El ID del análisis es requerido.");
  }

  const parsed = sampleAnalysisSchema.safeParse(input);
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
      .update(sampleAnalysis)
      .set({
        firstCount: data.firstCount ?? null,
        pg: data.pg ?? null,
        pgCurado: data.pgCurado ?? null,
        ct: data.ct ?? null,
        ctCurado: data.ctCurado ?? null,
        ea: data.ea ?? null,
        eaCurado: data.eaCurado ?? null,
        vigorTz: data.vigorTz ?? null,
        viabilityTz: data.viabilityTz ?? null,
        e: data.e ?? null,
        pms: data.pms ?? null,
        purityPercent: data.purityPercent ?? null,
        otherAnalysis: data.otherAnalysis ?? null,
        performedAt: data.performedAt ?? new Date().toISOString(),
      })
      .where(eq(sampleAnalysis.id, id))
      .run();

    if (result.changes === 0) {
      throw new Error("El análisis que intenta modificar no existe.");
    }

    return { success: true };
  } catch (error) {
    console.error("updateSampleAnalysis failed:", error);

    if (error instanceof SqliteError) {
      const msg = error.message.toLowerCase();

      if (msg.includes("foreign key")) {
        throw new Error("La muestra asociada no existe.");
      }

      console.error("SQLite error updating analysis:", error);
      throw new Error("Error al acceder a la base de datos");
    }

    console.error("Unknown error updating analysis:", error);
    throw new Error("No se pudo modificar el análisis por un problema en el servidor.");
  }
}
