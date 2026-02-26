import Error from "@/components/error";

import { CustomNavbar } from "@/components/navbar";

export default function ErrorPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <CustomNavbar />

      <main className="overflow-auto flex-1">
        <Error />
      </main>
    </div>
  );
}
