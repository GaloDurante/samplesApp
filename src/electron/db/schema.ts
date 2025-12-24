import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  cuit: integer("cuit").notNull().unique(),
  address: text("address").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
});

export const samples = sqliteTable("samples", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "restrict" }),

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
});
