export const schema = [
  `
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cuit INTEGER NOT NULL UNIQUE,
      address TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS samples (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      client_id INTEGER NOT NULL,
      client_name TEXT NOT NULL,

      sample_number TEXT NOT NULL UNIQUE,
      entry_date TEXT NOT NULL,
      sample_code TEXT NOT NULL,
      colloquial_specie TEXT NOT NULL,
      cultivar TEXT NOT NULL,
      harvest_year TEXT NOT NULL,
      mark TEXT NOT NULL,
      lot_number TEXT NOT NULL,
      lot_weight TEXT NOT NULL,
      test_end_date TEXT NOT NULL,
      observations TEXT,

      sampling_date TEXT,
      other_references TEXT,
      seal_number TEXT,
      specie TEXT,
      other_deter TEXT,

      FOREIGN KEY (client_id) REFERENCES clients(id)
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS sample_analyses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sample_id INTEGER NOT NULL,

      first_count INTEGER,
      pg INTEGER,
      pg_curado INTEGER,
      ct INTEGER,
      ct_curado INTEGER,
      ea INTEGER,
      ea_curado INTEGER,
      vigor_tz INTEGER,
      viability_tz INTEGER,
      e INTEGER,
      pms INTEGER,
      purity_percent INTEGER,
      other_analysis TEXT,

      FOREIGN KEY (sample_id) REFERENCES samples(id) ON DELETE CASCADE
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS sample_purity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sample_id INTEGER NOT NULL,

      seed_pure TEXT,
      inert_matter TEXT,
      other_seeds TEXT,
      type_inert_matter TEXT,
      remarks TEXT,

      FOREIGN KEY (sample_id) REFERENCES samples(id) ON DELETE CASCADE
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS sample_germination (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sample_id INTEGER NOT NULL,

      days_number TEXT,
      normal_seedlings TEXT,
      hard_seeds TEXT,
      fresh_seeds TEXT,
      abnormal_seedlings TEXT,
      dead_seeds TEXT,

      FOREIGN KEY (sample_id) REFERENCES samples(id) ON DELETE CASCADE
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS sample_humidity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sample_id INTEGER NOT NULL,

      humidity TEXT,

      FOREIGN KEY (sample_id) REFERENCES samples(id) ON DELETE CASCADE
    );
  `,
];
