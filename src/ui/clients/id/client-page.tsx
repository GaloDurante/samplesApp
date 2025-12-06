import { useLoaderData, NavLink } from "react-router";

import type { Client } from "@/types/client";

import { Button } from "@/components/ui/button";

export default function ClientPage() {
  const { client }: { client: Client } = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
      <Button asChild variant="outline" className="absolute top-4 left-4">
        <NavLink to="/clients">Volver</NavLink>
      </Button>
      <h1>
        {client.name} {client.lastName}
      </h1>
    </div>
  );
}
