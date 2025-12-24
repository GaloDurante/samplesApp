import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import { app } from "electron";

const dbPath = path.join(app.getPath("userData"), "app.db");

const sqlite = new Database(dbPath);

sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite);
