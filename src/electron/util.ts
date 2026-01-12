import { parse, format } from "date-fns";

import path from "path";
import { app } from "electron";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function getImagePath() {
  const assetsPath = app.isPackaged
    ? path.join(process.resourcesPath, "app.asar.unpacked", "dist", "assets", "logo.jpg")
    : path.join(app.getAppPath(), "public", "assets", "logo.jpg");

  return assetsPath;
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
