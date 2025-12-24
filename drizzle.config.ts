import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/electron/db/schema.ts",
  out: "./src/electron/db/migrations",
  dbCredentials: {
    url: "file:app.db",
  },
});
