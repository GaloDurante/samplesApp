import type { Client } from "../types/client.js";
import type { FullSample } from "../types/sample.js";
import type { SqlValue } from "sql.js";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function mapClient(row: SqlValue[]): Client {
  return {
    id: Number(row[0]),
    name: String(row[1]),
    cuit: Number(row[2]),
    address: String(row[3]),
    email: String(row[4]),
    phone: String(row[5]),
  };
}

export function mapSample(row: SqlValue[]): FullSample {
  return {
    id: Number(row[0]),
    client_id: Number(row[1]),
    sample_number: Number(row[2]),
    entry_date: String(row[3]),
    sample_code: String(row[4]),
    colloquial_specie: String(row[5]),
    cultivar: String(row[6]),
    harvest_year: String(row[7]),
    mark: String(row[8]),
    lot_number: String(row[9]),
    lot_weight: Number(row[10]),
    test_end_date: String(row[11]),
    observations: row[12] ? String(row[12]) : null,
    sampling_date: row[13] ? String(row[13]) : null,
    other_references: row[14] ? String(row[14]) : null,
    seal_number: row[15] ? String(row[15]) : null,
    specie: row[16] ? String(row[16]) : null,
    other_deter: row[17] ? String(row[17]) : null,

    client: {
      id: Number(row[18]),
      name: String(row[19]),
      cuit: Number(row[20]),
    },

    analyses: null,
    purity: null,
    germination: null,
    humidity: null,
  };
}
