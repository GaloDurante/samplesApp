import { useContext } from "react";
import { ThemeProviderContext } from "@/lib/theme/theme-context";

export function useTheme() {
  const ctx = useContext(ThemeProviderContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
