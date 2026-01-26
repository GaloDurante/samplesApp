import { useLoaderData, NavLink } from "react-router";

import type { Client } from "@/types/client";

import { Search as SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ClientsTable } from "@/components/clients/clients-table";
import { PaginationBar } from "@/components/pagination-bar";
import { Search } from "@/components/search";

interface ClientsPageParams {
  clients: Client[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
}

export default function ClientsPage() {
  const { clients, total, page, pageSize, search }: ClientsPageParams = useLoaderData();

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 flex-1 h-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:max-w-md">
          <Search placeholder="Buscar por nombre, CUIT, dirección o email" />
        </div>

        <Button asChild className="self-end">
          <NavLink to={"/clients/new"}>Agregar Cliente</NavLink>
        </Button>
      </div>

      {clients.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <SearchIcon size={32} />
          <p className="text-lg font-medium mt-4">No se encontraron clientes.</p>
          <p className="text-sm mt-1 text-muted-foreground">Intenta ajustar los filtros o criterios de búsqueda.</p>
        </div>
      ) : (
        <>
          <ClientsTable list={clients} />
          <PaginationBar page={page} total={total} pageSize={pageSize} basePath="/clients" extraParams={{ search }} />
        </>
      )}
    </div>
  );
}
