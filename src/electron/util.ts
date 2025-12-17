import type { Client } from "../types/client.js";
import type { FullSample, SampleFilters } from "../types/sample.js";
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
  const client =
    row[19] !== null
      ? {
          id: Number(row[19]),
          name: String(row[20]),
          cuit: Number(row[21]),
        }
      : null;

  return {
    id: Number(row[0]),
    client_id: Number(row[1]),
    client_name: String(row[2]),

    sample_number: Number(row[3]),
    entry_date: String(row[4]),
    sample_code: String(row[5]),
    colloquial_specie: String(row[6]),
    cultivar: String(row[7]),
    harvest_year: String(row[8]),
    mark: String(row[9]),
    lot_number: String(row[10]),
    lot_weight: String(row[11]),
    test_end_date: String(row[12]),
    observations: row[13] ? String(row[13]) : undefined,
    sampling_date: row[14] ? String(row[14]) : undefined,
    other_references: row[15] ? String(row[15]) : undefined,
    seal_number: row[16] ? String(row[16]) : undefined,
    specie: row[17] ? String(row[17]) : undefined,
    other_deter: row[18] ? String(row[18]) : undefined,

    client,

    analyses: null,
    purity: null,
    germination: null,
    humidity: null,
  };
}

export function buildSampleWhere(filters: SampleFilters) {
  const conditions: string[] = [];
  const params: SqlValue[] = [];

  const { search, dateFrom, dateTo } = filters;

  if (search && search.trim()) {
    const wildcard = `%${search}%`;
    conditions.push(`
      (
        s.sample_code LIKE ?
        OR s.sample_number LIKE ?
        OR s.lot_number LIKE ?
        OR s.colloquial_specie LIKE ?
        OR s.mark LIKE ?
        OR s.client_name LIKE ?
        OR c.name LIKE ?
      )
    `);
    params.push(wildcard, wildcard, wildcard, wildcard, wildcard, wildcard, wildcard);
  }

  if (dateFrom) {
    conditions.push(`s.entry_date >= ?`);
    params.push(dateFrom);
  }

  if (dateTo) {
    conditions.push(`s.entry_date <= ?`);
    params.push(dateTo);
  }

  const whereSQL = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  return { whereSQL, params };
}
