import { useLoaderData, NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import ClientsTable from "@/components/clients/clients-table";

export default function ClientsPage() {
  const { clients } = useLoaderData();

  return (
    <div className="p-4 md:p-8 min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2 justify-between items-center lg:flex-row">
        <div>Filters component</div>

        <Button asChild>
          <NavLink to={"/clients/new"}>Agregar Cliente</NavLink>
        </Button>
      </div>

      {clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center opacity-70">
          <p className="text-lg">Todavía no tenés ningún cliente cargado.</p>
          <Button asChild>
            <NavLink to="/clients/new">Crear el primero</NavLink>
          </Button>
        </div>
      ) : (
        <ClientsTable list={clients} />
      )}
    </div>
  );
}
