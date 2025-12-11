import { queryAll } from "../database/sql.js";
import { mapSample } from "../util.js";

export function getSamples() {
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
    ORDER BY s.id DESC;
    `,
  );

  return rows.map(mapSample);
}
