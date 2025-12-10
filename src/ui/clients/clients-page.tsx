import { useLoaderData, NavLink } from "react-router";

import type { Client } from "@/types/client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ClientsTable from "@/components/clients/clients-table";
import { PaginationBar } from "@/components/pagination-bar";

interface ClientsPageParams {
  clients: Client[];
  total: number;
  page: number;
  pageSize: number;
}

export default function ClientsPage() {
  const { clients, total, page, pageSize } = useLoaderData() as ClientsPageParams;

  return (
    <div className="p-4 md:p-8 min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2 justify-between items-center lg:flex-row">
        <div>Filters component</div>

        <Button asChild>
          <NavLink to={"/clients/new"}>Agregar Cliente</NavLink>
        </Button>
      </div>

      {clients.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <Search size={32} />
          <p className="text-lg font-medium mt-4">No se encontraron clientes.</p>
          <p className="text-sm mt-1 text-muted-foreground">Intenta ajustar los filtros o criterios de búsqueda.</p>
        </div>
      ) : (
        <>
          <ClientsTable list={clients} />
          <PaginationBar page={page} total={total} pageSize={pageSize} basePath="/clients" />
        </>
      )}
    </div>
  );
}
