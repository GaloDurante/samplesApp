import { Outlet } from "react-router";
import { ModeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
        <ModeToggle />
        <Toaster richColors position="top-center" />
      </main>
    </>
  );
}
