export const schema = [
  `
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      address TEXT NOT NULL,
      cuit INTEGER NOT NULL UNIQUE,
      phone TEXT NOT NULL
    );
    `,
];
