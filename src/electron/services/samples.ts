import { queryAll } from "../database/sql.js";
import { buildSampleWhere, mapSample } from "../util.js";

import type { SampleFilters } from "../../types/sample.js";

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
