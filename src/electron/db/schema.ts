import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";

export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  cuit: integer("cuit").notNull().unique(),
  address: text("address").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
});

export const samples = sqliteTable(
  "samples",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    clientId: integer("client_id").references(() => clients.id, { onDelete: "set null" }),

    sampleNumber: text("sample_number").notNull().unique(),
    entryDate: text("entry_date").notNull(),
    sampleCode: text("sample_code"),
    colloquialSpecie: text("colloquial_specie").notNull(),
    cultivar: text("cultivar").notNull(),
    harvestYear: text("harvest_year").notNull(),
    mark: text("mark"),
    lotNumber: text("lot_number"),
    lotWeight: text("lot_weight"),
    testEndDate: text("test_end_date").notNull(),
    observations: text("observations"),

    samplingDate: text("sampling_date"),
    otherReferences: text("other_references"),
    sealNumber: text("seal_number"),
    specie: text("specie"),
    otherDeter: text("other_deter"),
  },
  (table) => [index("idx_samples_client_id").on(table.clientId), index("idx_samples_entry_date").on(table.entryDate)],
);

export const sampleAnalysis = sqliteTable(
  "sample_analysis",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    sampleId: integer("sample_id")
      .notNull()
      .unique()
      .references(() => samples.id, { onDelete: "cascade" }),

    firstCount: integer("first_count"),
    pg: integer("pg"),
    pgCurado: integer("pg_curado"),
    ct: integer("ct"),
    ctCurado: integer("ct_curado"),
    ea: integer("ea"),
    eaCurado: integer("ea_curado"),
    vigorTz: integer("vigor_tz"),
    viabilityTz: integer("viability_tz"),
    e: integer("e"),
    pms: integer("pms"),
    purityPercent: integer("purity_percent"),
    otherAnalysis: text("other_analysis"),
    performedAt: text("performed_at").notNull(),
  },

  (table) => [
    index("idx_sample_analysis_sample_id").on(table.sampleId),
    index("idx_sample_analysis_sample_date").on(table.sampleId, table.performedAt),
  ],
);

export const samplePurity = sqliteTable(
  "sample_purity",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    sampleId: integer("sample_id")
      .notNull()
      .unique()
      .references(() => samples.id, { onDelete: "cascade" }),

    seedPure: text("seed_pure"),
    inertMatter: text("inert_matter"),
    otherSeeds: text("other_seeds"),
    typeInertMatter: text("type_inert_matter"),
    remarks: text("remarks"),
    performedAt: text("performed_at").notNull(),
  },
  (table) => [
    index("idx_sample_purity_sample_id").on(table.sampleId),
    index("idx_sample_purity_sample_date").on(table.sampleId, table.performedAt),
  ],
);

export const sampleGermination = sqliteTable(
  "sample_germination",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    sampleId: integer("sample_id")
      .notNull()
      .unique()
      .references(() => samples.id, { onDelete: "cascade" }),

    daysNumber: text("days_number"),
    normalSeedlings: text("normal_seedlings"),
    hardSeeds: text("hard_seeds"),
    freshSeeds: text("fresh_seeds"),
    abnormalSeedlings: text("abnormal_seedlings"),
    deadSeeds: text("dead_seeds"),
    performedAt: text("performed_at").notNull(),
  },
  (table) => [
    index("idx_sample_germination_sample_id").on(table.sampleId),
    index("idx_sample_germination_sample_date").on(table.sampleId, table.performedAt),
  ],
);

export const sampleHumidity = sqliteTable(
  "sample_humidity",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    sampleId: integer("sample_id")
      .notNull()
      .unique()
      .references(() => samples.id, { onDelete: "cascade" }),

    humidity: text("humidity"),
    performedAt: text("performed_at").notNull(),
  },
  (table) => [
    index("idx_sample_humidity_sample_id").on(table.sampleId),
    index("idx_sample_humidity_sample_date").on(table.sampleId, table.performedAt),
  ],
);
