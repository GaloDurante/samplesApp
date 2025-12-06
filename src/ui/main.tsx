import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/ui/index.css";
import App from "@/ui/App";
import { ThemeProvider } from "@/lib/theme/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
