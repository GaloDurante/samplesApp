import { queryAll, execute, queryOne } from "../database/sql.js";
import { buildSampleWhere, mapSample, mapSampleAnalyses } from "../util.js";
import { sampleSchema } from "../../validations/sample.js";

import type { SampleFilters, Sample } from "../../types/sample.js";

function getTotalSamplesCount(filters: SampleFilters) {
  const { whereSQL, params } = buildSampleWhere(filters);

  const result = queryAll(
    `
      SELECT COUNT(*) as count
      FROM samples s
      LEFT JOIN clients c ON c.id = s.client_id
      ${whereSQL}
    `,
    params,
  );

  return result[0]?.[0] as number;
}

export function getSamples(page = 1, pageSize = 20, filters: SampleFilters = {}) {
  const offset = (page - 1) * pageSize;

  const { whereSQL, params } = buildSampleWhere(filters);

  const rows = queryAll(
    `
      SELECT
        s.id,
        s.client_id,
        s.client_name,
        s.sample_number,
        s.entry_date,
        s.sample_code,
        s.colloquial_specie,
        s.cultivar,
        s.harvest_year,
        s.mark,
        s.lot_number,
        s.lot_weight,
        s.test_end_date,
        s.observations,
        s.sampling_date,
        s.other_references,
        s.seal_number,
        s.specie,
        s.other_deter,

        c.id AS client_id,
        c.name AS client_name,
        c.cuit AS client_cuit,

        a.first_count AS first_count,
        a.pg AS pg,
        a.vigor_tz AS vigor_tz,
        a.pms AS pms,
        a.purity_percent AS purity_percent
        
      FROM samples s
      LEFT JOIN clients c ON c.id = s.client_id
      LEFT JOIN sample_analyses a ON a.sample_id = s.id
      ${whereSQL}
      ORDER BY s.id DESC
      LIMIT ? OFFSET ?
    `,
    [...params, pageSize, offset],
  ).map(mapSample);

  const total = getTotalSamplesCount(filters);

  return { samples: rows, total };
}

function getSampleById(id: number) {
  const row = queryOne(
    `
    SELECT
        s.id,
        s.client_id,
        s.client_name,
        s.sample_number,
        s.entry_date,
        s.sample_code,
        s.colloquial_specie,
        s.cultivar,
        s.harvest_year,
        s.mark,
        s.lot_number,
        s.lot_weight,
        s.test_end_date,
        s.observations,
        s.sampling_date,
        s.other_references,
        s.seal_number,
        s.specie,
        s.other_deter,

        c.id AS client_id,
        c.name AS client_name,
        c.cuit AS client_cuit
      FROM samples s
      LEFT JOIN clients c ON c.id = s.client_id 
    WHERE s.id = ?
    `,
    [id],
  );
  if (!row) throw new Error("Muestra no encontrada.");
  return mapSample(row);
}

function getSampleAnalyses(sampleId: number) {
  const row = queryOne(`SELECT * FROM sample_analyses WHERE sample_id = ?`, [sampleId]);
  return mapSampleAnalyses(row);
}

function getSamplePurity(sampleId: number) {
  return queryOne(`SELECT * FROM sample_purity WHERE sample_id = ?`, [sampleId]);
}

function getSampleGermination(sampleId: number) {
  return queryOne(`SELECT * FROM sample_germination WHERE sample_id = ?`, [sampleId]);
}

function getSampleHumidity(sampleId: number) {
  return queryOne(`SELECT * FROM sample_humidity WHERE sample_id = ?`, [sampleId]);
}

export function getFullSampleById(id: number) {
  if (!id) throw new Error("ID de la muestra es requerido.");

  const sample = getSampleById(id);

  return {
    ...sample,
    analyses: getSampleAnalyses(id),
    purity: getSamplePurity(id),
    germination: getSampleGermination(id),
    humidity: getSampleHumidity(id),
  };
}

export function createSample(sample: Sample) {
  const existing = queryOne("SELECT id, name FROM clients WHERE id = ?", [sample.client_id]);
  if (!existing) {
    throw new Error("El cliente seleccionado no existe.");
  }
  const client_name = String(existing[1]);

  const validationResult = sampleSchema.safeParse(sample);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }
  const validatedSample = validationResult.data;

  try {
    execute(
      `INSERT INTO samples (
        client_id, client_name, sample_number, entry_date, sample_code,
        colloquial_specie, cultivar, harvest_year, mark,
        lot_number, lot_weight, test_end_date, observations
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validatedSample.client_id,
        client_name,
        validatedSample.sample_number,
        validatedSample.entry_date,
        validatedSample.sample_code,
        validatedSample.colloquial_specie,
        validatedSample.cultivar,
        validatedSample.harvest_year,
        validatedSample.mark,
        validatedSample.lot_number,
        validatedSample.lot_weight,
        validatedSample.test_end_date,
        validatedSample.observations ?? null,
      ],
    );
  } catch (error) {
    console.warn(error);

    if (error instanceof Error) {
      const msg = error.message?.toLowerCase() ?? "";

      if (msg.includes("unique") && msg.includes("sample_number")) {
        throw new Error("El N° de muestra ingresado ya se encuentra registrado.");
      }

      throw new Error("Error al acceder a la base de datos");
    }

    throw new Error("No se pudo crear la muestra por un problema en el servidor.");
  }
}

export function updateSample(sample: Sample) {
  if (!sample.id) throw new Error("El ID de la muestra es requerido.");

  const existing = queryOne("SELECT id, name FROM clients WHERE id = ?", [sample.client_id]);
  if (!existing) {
    throw new Error("El cliente seleccionado no existe.");
  }
  const client_name = String(existing[1]);

  const validationResult = sampleSchema.safeParse(sample);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const validatedSample = validationResult.data;

  try {
    execute(
      `UPDATE samples
         SET client_id=?, client_name=?, sample_number=?, entry_date=?, sample_code=?,
             colloquial_specie=?, cultivar=?, harvest_year=?, mark=?,
             lot_number=?, lot_weight=?, test_end_date=?, observations=?
       WHERE id=?`,
      [
        validatedSample.client_id,
        client_name,
        validatedSample.sample_number,
        validatedSample.entry_date,
        validatedSample.sample_code,
        validatedSample.colloquial_specie,
        validatedSample.cultivar,
        validatedSample.harvest_year,
        validatedSample.mark,
        validatedSample.lot_number,
        validatedSample.lot_weight,
        validatedSample.test_end_date,
        validatedSample.observations ?? null,
        validatedSample.id ?? sample.id,
      ],
    );
  } catch (error) {
    console.warn(error);

    if (error instanceof Error) {
      const msg = error.message?.toLowerCase() ?? "";

      if (msg.includes("unique") && msg.includes("sample_number")) {
        throw new Error("El N° de muestra ingresado ya se encuentra registrado.");
      }

      throw new Error("Error al acceder a la base de datos");
    }

    throw new Error("No se pudo modificar la muestra por un problema en el servidor.");
  }
}

export function deleteSample(id: number) {
  if (!id) throw new Error("Debe indicar un ID válido");

  const existing = queryOne("SELECT id FROM samples WHERE id = ?", [id]);

  if (!existing) {
    throw new Error("La muestra que intenta eliminar no existe.");
  }

  try {
    execute("DELETE FROM samples WHERE id=?", [id]);
  } catch (error) {
    console.warn(error);
    throw new Error("No se pudo eliminar la muestra solicitada por un problema en el servidor.");
  }
}
