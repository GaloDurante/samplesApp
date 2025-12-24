import fs from "fs";
import path from "path";

const src = path.resolve("src/electron/db/migrations");
const dest = path.resolve("dist-electron/electron/db/migrations");

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });
