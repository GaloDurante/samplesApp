import { useLoaderData } from "react-router";

import type { Client } from "@/types/client";

import { ClientForm } from "@/components/clients/client-form";
import { Breadcrum } from "@/components/breadcrum";

export default function ClientPage() {
  const { client }: { client: Client } = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:p-16">
      <Breadcrum baseUrl="/clients" baseUrlTitle="Clientes" currentPathTitle={`${client.name}`} />

      <div className="min-w-full lg:min-w-3/6">
        <h1 className="text-2xl font-bold mb-2">Modificar cliente</h1>
        <p className="text-muted-foreground mb-6">
          El formulario a continuación permite editar un cliente que ya se encuentra registrado en el sistema.
        </p>
        <ClientForm editData={client} />
      </div>
    </div>
  );
}
