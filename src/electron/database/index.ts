import initSqlJs, { type Database } from "sql.js";
import fs from "fs";
import path from "path";
import { app } from "electron";
import { schema } from "./schema.js";

let db: Database;

const dbPath = path.join(app.getPath("userData"), "app.db");

export async function initDatabase() {
  const SQL = await initSqlJs();

  try {
    const filebuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(filebuffer);
  } catch {
    db = new SQL.Database();
  }

  schema.forEach((stmt) => db.run(stmt));
  saveDb();
}

export function getDb() {
  if (!db) throw new Error("Database not initialized");
  return db;
}

export function saveDb() {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}
