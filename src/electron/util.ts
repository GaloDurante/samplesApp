import type { Client } from "../types/client.js";
import type { SampleFilters, PartialSample } from "../types/sample.js";
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

export function mapSample(row: SqlValue[]): PartialSample {
  const client =
    row[19] != null
      ? {
          id: Number(row[19]),
          name: String(row[20]),
          cuit: Number(row[21]),
        }
      : null;
  const analysis =
    row[22] != null
      ? {
          first_count: Number(row[22]),
          pg: Number(row[23]),
          vigor_tz: Number(row[24]),
          pms: Number(row[25]),
          purity_percent: Number(row[26]),
        }
      : null;

  return {
    id: Number(row[0]),
    client_id: Number(row[1]),
    client_name: String(row[2]),

    sample_number: String(row[3]),
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
    analysis,
  };
}

export function mapSampleAnalysis(row: SqlValue[] | null) {
  if (!row) return null;

  return {
    id: Number(row[0]),
    sample_id: Number(row[1]),

    first_count: row[2] != null ? Number(row[2]) : null,
    pg: row[3] != null ? Number(row[3]) : null,
    pg_curado: row[4] != null ? Number(row[4]) : null,
    ct: row[5] != null ? Number(row[5]) : null,
    ct_curado: row[6] != null ? Number(row[6]) : null,
    ea: row[7] != null ? Number(row[7]) : null,
    ea_curado: row[8] != null ? Number(row[8]) : null,
    vigor_tz: row[9] != null ? Number(row[9]) : null,
    viability_tz: row[10] != null ? Number(row[10]) : null,
    e: row[11] != null ? Number(row[11]) : null,
    pms: row[12] != null ? Number(row[12]) : null,
    purity_percent: row[13] != null ? Number(row[13]) : null,
    other_analysis: row[14] != null ? String(row[14]) : null,
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
