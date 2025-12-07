import type { SqlValue } from "sql.js";

import { getDb, saveDb } from "./index.js";

export function queryAll(sql: string, params: SqlValue[] = []): SqlValue[][] {
  const db = getDb();
  const result = db.exec(sql, params);

  if (!result[0]) return [];
  return result[0].values;
}

export function queryOne(sql: string, params: SqlValue[] = []): SqlValue[] | null {
  const rows = queryAll(sql, params);
  return rows[0] ?? null;
}

export function execute(sql: string, params: SqlValue[] = []): void {
  const db = getDb();
  db.run(sql, params);
  saveDb();
}
