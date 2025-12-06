import { Outlet } from "react-router";
import { ModeToggle } from "@/components/theme-toggle";

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
        <ModeToggle />
      </main>
    </>
  );
}
