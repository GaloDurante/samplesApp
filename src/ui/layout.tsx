import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { CustomNavbar } from "@/components/navbar";

export default function Layout() {
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
