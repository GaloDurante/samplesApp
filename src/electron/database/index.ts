import initSqlJs, { Database } from "sql.js";
import fs from "fs";
import path from "path";
import { app } from "electron";

let db: Database;

const dbPath = path.join(app.getPath("userData"), "app.db");

export async function initDatabase() {
  const SQL = await initSqlJs();

  try {
    const filebuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(filebuffer);
  } catch (e) {
    console.log("No DB found, creating a new one.", e);
    db = new SQL.Database();

    db.run(`
      CREATE TABLE clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        address TEXT NOT NULL,
        cuit INTEGER NOT NULL,
        phone TEXT NOT NULL
      );
    `);

    saveDb();
  }
}

export function getDb() {
  if (!db) throw new Error("Database not initialized");
  return db;
}

export function saveDb() {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}
