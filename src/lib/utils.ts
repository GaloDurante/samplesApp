import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { parse, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildPageWindow(current: number, totalPages: number, windowSize = 2): (number | "...")[] {
  const pages: (number | "...")[] = [];

  pages.push(1);

  if (current - windowSize > 2) pages.push("...");

  for (let p = Math.max(2, current - windowSize); p <= Math.min(totalPages - 1, current + windowSize); p++) {
    pages.push(p);
  }

  if (current + windowSize < totalPages - 1) pages.push("...");

  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export function formatISODate(date: string, pattern = "dd/MM/yyyy") {
  return format(parse(date, "yyyy-MM-dd", new Date()), pattern);
}
