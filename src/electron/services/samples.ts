import { queryAll, execute, queryOne } from "../database/sql.js";
import { buildSampleWhere, mapSample } from "../util.js";
import { sampleSchema } from "../../validations/sample.js";

import type { SampleFilters, Sample } from "../../types/sample.js";

function getTotalSamplesCount(filters: SampleFilters) {
  const { whereSQL, params } = buildSampleWhere(filters);

  const result = queryAll(
    `
      SELECT COUNT(*) as count
      FROM samples s
      JOIN clients c ON c.id = s.client_id
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
    JOIN clients c ON c.id = s.client_id
      ${whereSQL}
      ORDER BY s.id DESC
      LIMIT ? OFFSET ?
    `,
    [...params, pageSize, offset],
  ).map(mapSample);

  const total = getTotalSamplesCount(filters);

  return { samples: rows, total };
}

export function createSample(sample: Sample) {
  const existing = queryOne("SELECT id FROM clients WHERE id = ?", [sample.client_id]);

  if (!existing) {
    throw new Error("El cliente seleccionado no existe.");
  }

  const validationResult = sampleSchema.safeParse(sample);

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message || "Error de validación");
  }

  const validatedSample = validationResult.data;

  try {
    execute(
      `INSERT INTO samples (
        client_id, sample_number, entry_date, sample_code,
        colloquial_specie, cultivar, harvest_year, mark,
        lot_number, lot_weight, test_end_date, observations
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validatedSample.client_id,
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

