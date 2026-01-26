import { Outlet, useMatches } from "react-router";
import { useEffect } from "react";

import type { RouteHandle } from "@/types/others";

import { Toaster } from "@/components/ui/sonner";
import { CustomNavbar } from "@/components/navbar";

const APP_NAME = "Sistema de Muestras";

export default function Layout() {
  const matches = useMatches();

  useEffect(() => {
    const matchWithTitle = [...matches]
      .reverse()
      .find(
        (match): match is typeof match & { handle: RouteHandle } =>
          typeof match.handle === "object" && match.handle !== null && "title" in match.handle,
      );

    const pageTitle = matchWithTitle?.handle?.title;

    document.title = pageTitle ? `${pageTitle} - ${APP_NAME}` : APP_NAME;
  }, [matches]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <CustomNavbar />

      <main className="overflow-auto flex-1">
        <Outlet />
        <Toaster richColors position="top-center" />
      </main>
    </div>
  );
}
