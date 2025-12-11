import { NavLink } from "react-router";

// import type { Client } from "@/types/client";

// import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { ClientsTable } from "@/components/clients/clients-table";
// import { PaginationBar } from "@/components/pagination-bar";
// import { ClientFilter } from "@/components/clients/client-filter";

// interface ClientsPageParams {
//   clients: Client[];
//   total: number;
//   page: number;
//   pageSize: number;
//   search: string;
// }

export default function ClientsPage() {
  //   const { clients, total, page, pageSize, search }: ClientsPageParams = useLoaderData();

  return (
    <div className="p-4 md:p-8 min-h-screen flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>Filter component</div>

        <Button asChild className="self-end">
          <NavLink to={"/samples/new"}>Agregar Muestra</NavLink>
        </Button>
      </div>

      <div>Table</div>

      {/* {clients.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <Search size={32} />
          <p className="text-lg font-medium mt-4">No se encontraron muestras.</p>
          <p className="text-sm mt-1 text-muted-foreground">Intenta ajustar los filtros o criterios de búsqueda.</p>
        </div>
      ) : (
        <>
          
          <ClientsTable list={clients} />
          <PaginationBar page={page} total={total} pageSize={pageSize} basePath="/clients" extraParams={{ search }} />
        </>
      )} */}
    </div>
  );
}
