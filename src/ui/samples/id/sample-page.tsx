// import { useLoaderData } from "react-router";

// import type { Client } from "@/types/client";

import { ReturnButton } from "@/components/return-button";
// import { ClientForm } from "@/components/clients/client-form";

export default function SamplePage() {
  //   const { client }: { client: Client } = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:p-16">
      <ReturnButton path="/samples" />
      <div className="min-w-full lg:min-w-3/6">
        <h1 className="text-2xl font-bold mb-2">Modificar muestra</h1>
        <p className="text-muted-foreground mb-8">
          El formulario a continuación permite editar una muestra que ya se encuentra registrada en el sistema.
        </p>
        {/* <ClientForm editData={client} /> */}
      </div>
    </div>
  );
}
