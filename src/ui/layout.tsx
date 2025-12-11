import { Outlet } from "react-router";
import { ModeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { NavigationTest } from "@/components/navigation-test";

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
        <ModeToggle />
        <NavigationTest />
        <Toaster richColors position="top-center" />
      </main>
    </>
  );
}
