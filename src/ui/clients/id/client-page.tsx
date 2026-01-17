import { useLoaderData } from "react-router";

import type { Client } from "@/types/client";

import { ClientForm } from "@/components/clients/client-form";
import { Breadcrum } from "@/components/breadcrum";

export default function ClientPage() {
  const { client }: { client: Client } = useLoaderData();

  return (
    <div className="flex flex-col h-full w-full">
      <Breadcrum baseUrl="/clients" baseUrlTitle="Clientes" currentPathTitle={`${client.name} #${client.id}`} />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-2">Modificar cliente</h1>
          <p className="text-muted-foreground mb-8">
            El formulario a continuación permite editar un cliente que ya se encuentra registrado en el sistema.
          </p>
          <ClientForm editData={client} />
        </div>
      </div>
    </div>
  );
}
