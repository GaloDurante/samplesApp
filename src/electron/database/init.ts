import path from "path";
import { fileURLToPath } from "url";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "../db/client.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDatabase() {
  const migrationsFolder = path.join(__dirname, "../db/migrations");

  try {
    await migrate(db, { migrationsFolder });
  } catch (err) {
    console.error("❌ DB migration failed", err);
    throw err;
  }
}
