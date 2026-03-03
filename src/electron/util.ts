import { parse, format } from "date-fns";

import path from "path";
import { app } from "electron";
import { fileURLToPath } from "node:url";

export function isDev() {
  return !app.isPackaged;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getImagePath() {
  return app.isPackaged ? path.join(process.resourcesPath, "logo.jpg") : path.join(__dirname, "../../build/logo.jpg");
}

export function safeFileName(value: string) {
  return value.replace("/", "-");
}

export function formatISODate(date: string, pattern = "dd/MM/yyyy") {
  return format(parse(date, "yyyy-MM-dd", new Date()), pattern);
}

type Token = {
  text: string;
  italic: boolean;
};

export function parseScientificName(name: string): Token[] {
  const tokens: Token[] = [];

  const parts = name.split(" ");

  parts.forEach((part, index) => {
    if (index === 0 || index === 1) {
      tokens.push({ text: part, italic: true });
      return;
    }

    if (part === "subsp.") {
      tokens.push({ text: part, italic: false });
      return;
    }

    if (parts[index - 1] === "subsp.") {
      tokens.push({ text: part, italic: true });
      return;
    }

    if (part === "s.l.") {
      tokens.push({ text: part, italic: true });
      return;
    }

    tokens.push({ text: part, italic: false });
  });

  return tokens;
}

type PurityField = "seedPure" | "inertMatter" | "otherSeeds";
export const formatPurityForCertificate = (value?: string | number, field?: PurityField): string | null => {
  if (value == null) return null;

  const n = Number(value);

  if (n === 0) return "0.0";
  if (n === 100) return "100.0";

  const appliesTraceRule = field === "inertMatter" || field === "otherSeeds";

  if (appliesTraceRule && n < 0.05) {
    return "TR";
  }

  return String(value);
};
