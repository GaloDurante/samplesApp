import { and, or, like, gte, lte, desc, sql, eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { samples, clients, sampleAnalysis } from "../db/schema.js";
import { SqliteError } from "better-sqlite3";

import type { Sample, SampleFilters, Certificate } from "../../types/sample.js";
import { sampleSchema } from "../../validations/sample.js";
import { certificateSchema } from "../../validations/sample/certificate.js";

import { getSampleAnalysis } from "./sample/analysis.js";
import { getSamplePurity } from "./sample/purity.js";
import { getSampleGermination } from "./sample/germination.js";
import { getSampleHumidity } from "./sample/humidity.js";

export async function getSamples(page = 1, pageSize = 20, filters: SampleFilters = {}) {
  const offset = (page - 1) * pageSize;

  const conditions = [];

  if (filters.search?.trim()) {
    const q = `%${filters.search}%`;

    conditions.push(
      or(
        like(samples.sampleCode, q),
        like(samples.sampleNumber, q),
        like(samples.lotNumber, q),
        like(samples.colloquialSpecie, q),
        like(samples.mark, q),
        like(clients.name, q),
      ),
    );
  }

  if (filters.dateFrom) {
    conditions.push(gte(samples.entryDate, filters.dateFrom));
  }

  if (filters.dateTo) {
    conditions.push(lte(samples.entryDate, filters.dateTo));
  }

  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select({
      id: samples.id,
      sampleNumber: samples.sampleNumber,
      entryDate: samples.entryDate,
      sampleCode: samples.sampleCode,
      colloquialSpecie: samples.colloquialSpecie,
      cultivar: samples.cultivar,
      harvestYear: samples.harvestYear,
      mark: samples.mark,
      lotNumber: samples.lotNumber,
      lotWeight: samples.lotWeight,
      testEndDate: samples.testEndDate,
      observations: samples.observations,

      client: {
        id: clients.id,
        name: clients.name,
      },

      analysis: {
        id: sampleAnalysis.id,
        firstCount: sampleAnalysis.firstCount,
        pg: sampleAnalysis.pg,
        vigorTz: sampleAnalysis.vigorTz,
        viabilityTz: sampleAnalysis.viabilityTz,
        pms: sampleAnalysis.pms,
        purityPercent: sampleAnalysis.purityPercent,
      },
    })
    .from(samples)
    .leftJoin(clients, eq(samples.clientId, clients.id))
    .leftJoin(sampleAnalysis, eq(sampleAnalysis.sampleId, samples.id))
    .where(where)
    .orderBy(desc(samples.id))
    .limit(pageSize)
    .offset(offset);

  const total =
    db
      .select({ count: sql<number>`count(*)` })
      .from(samples)
      .leftJoin(clients, eq(samples.clientId, clients.id))
      .where(where)
      .get()?.count ?? 0;

  return {
    samples: rows,
    total,
  };
}

export async function getSampleById(id: number) {
  const rows = await db
    .select({
      id: samples.id,
      clientId: samples.clientId,
      sampleNumber: samples.sampleNumber,
      entryDate: samples.entryDate,
      sampleCode: samples.sampleCode,
      colloquialSpecie: samples.colloquialSpecie,
      cultivar: samples.cultivar,
      harvestYear: samples.harvestYear,
      mark: samples.mark,
      lotNumber: samples.lotNumber,
      lotWeight: samples.lotWeight,
      testEndDate: samples.testEndDate,
      observations: samples.observations,
      samplingDate: samples.samplingDate,
      otherReferences: samples.otherReferences,
      sealNumber: samples.sealNumber,
      specie: samples.specie,
      otherDeter: samples.otherDeter,

      client: {
        id: clients.id,
        name: clients.name,
        cuit: clients.cuit,
      },
    })
    .from(samples)
    .leftJoin(clients, eq(clients.id, samples.clientId))
    .where(eq(samples.id, id))
    .limit(1);

  if (rows.length === 0) {
    throw new Error("Muestra no encontrada.");
  }

  return rows[0];
}

export async function getFullSampleById(id: number) {
  if (!Number.isInteger(id)) {
    throw new Error("ID de la muestra es requerido.");
  }

  const sample = await getSampleById(id);

  const [analysis, purity, germination, humidity] = await Promise.all([
    getSampleAnalysis(id),
    getSamplePurity(id),
    getSampleGermination(id),
    getSampleHumidity(id),
  ]);

  return {
    ...sample,
    analysis,
    purity,
    germination,
    humidity,
  };
}

export async function createSample(input: Sample) {
  const parsed = sampleSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  try {
    const [created] = await db
      .insert(samples)
      .values({
        ...parsed.data,
        sampleCode: parsed.data.sampleCode ?? null,
        mark: parsed.data.mark ?? null,
        lotNumber: parsed.data.lotNumber ?? null,
        lotWeight: parsed.data.lotWeight ?? null,
        observations: parsed.data.observations ?? null,
      })
      .returning();

    return created;
  } catch (err) {
    if (err instanceof SqliteError) {
      const msg = err.message.toLowerCase();

      if (msg.includes("foreign key")) {
        throw new Error("El cliente seleccionado no existe.");
      }

      if (msg.includes("samples.sample_number")) {
        throw new Error("El N° de muestra ingresado ya se encuentra registrado.");
      }

      console.error("SQLite error creating sample:", err);
      throw new Error("Error al acceder a la base de datos.");
    }

    console.error("Unknown error creating sample:", err);
    throw new Error("No se pudo crear la muestra por un problema interno.");
  }
}

export async function updateSample(sample: Sample) {
  if (!Number.isInteger(sample.id)) {
    throw new Error("El ID de la muestra es requerido.");
  }

  const parsed = sampleSchema.safeParse(sample);
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
      .update(samples)
      .set({
        ...data,
        clientId: data.clientId ?? null,
        sampleCode: data.sampleCode ?? null,
        mark: data.mark ?? null,
        lotNumber: data.lotNumber ?? null,
        lotWeight: data.lotWeight ?? null,
        observations: data.observations ?? null,
      })
      .where(eq(samples.id, id))
      .run();

    if (result.changes === 0) {
      throw new Error("La muestra que intenta modificar no existe.");
    }

    return { success: true };
  } catch (error) {
    console.error("updateSample failed:", error);

    if (error instanceof Error) {
      const msg = error.message.toLowerCase();

      if (msg.includes("unique") && msg.includes("sample_number")) {
        throw new Error("El N° de muestra ingresado ya se encuentra registrado.");
      }

      if (msg.includes("foreign key")) {
        throw new Error("El cliente seleccionado no existe.");
      }
    }

    throw new Error("No se pudo modificar la muestra por un problema en el servidor.");
  }
}

export async function deleteSample(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Debe indicar un ID válido");
  }

  try {
    const result = await db.delete(samples).where(eq(samples.id, id)).run();

    if (result.changes === 0) {
      throw new Error("La muestra que intenta eliminar no existe.");
    }

    return { deleted: true };
  } catch (err) {
    if (err instanceof SqliteError) {
      console.error("SQLite error deleting sample:", err);
      throw new Error("Error al acceder a la base de datos");
    }

    throw err instanceof Error ? err : new Error("No se pudo eliminar la muestra solicitada por un problema interno.");
  }
}

export async function updateSampleCertificate(sample: Certificate) {
  if (!Number.isInteger(sample.id)) {
    throw new Error("El ID de la muestra es requerido.");
  }

  const parsed = certificateSchema.safeParse(sample);
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
      .update(samples)
      .set({
        ...data,
        samplingDate: data.samplingDate ?? null,

        entryDate: data.entryDate,
        testEndDate: data.testEndDate,
        sampleNumber: data.sampleNumber,

        otherReferences: data.otherReferences ?? null,
        sealNumber: data.sealNumber ?? null,
        specie: data.specie ?? null,
        otherDeter: data.otherDeter ?? null,
      })
      .where(eq(samples.id, id))
      .run();

    if (result.changes === 0) {
      throw new Error("La muestra que intenta modificar no existe.");
    }

    return { success: true };
  } catch (error) {
    console.error("updateSampleCertificate failed:", error);

    if (error instanceof Error) {
      const msg = error.message.toLowerCase();

      if (msg.includes("unique") && msg.includes("sample_number")) {
        throw new Error("El N° de muestra ingresado ya se encuentra registrado.");
      }

      if (msg.includes("foreign key")) {
        throw new Error("El cliente seleccionado no existe.");
      }
    }

    throw new Error("No se pudo modificar la muestra por un problema en el servidor.");
  }
}
