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
  if (!app.isPackaged) {
    return path.join(__dirname, "../../public/assets/logo.jpg");
  }

  return path.join(process.resourcesPath, "assets", "logo.jpg");
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
