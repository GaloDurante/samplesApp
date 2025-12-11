import { NavLink, useLoaderData } from "react-router";

import type { FullSample } from "@/types/sample";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SamplesTable } from "@/components/samples/samples-table";
// import { PaginationBar } from "@/components/pagination-bar";
// import { ClientFilter } from "@/components/clients/client-filter";

interface SamplesPageParams {
  samples: FullSample[];
}

export default function ClientsPage() {
  const { samples }: SamplesPageParams = useLoaderData();

  return (
    <div className="p-4 md:p-8 min-h-screen flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>Filter component</div>

        <Button asChild className="self-end">
          <NavLink to={"/samples/new"}>Agregar Muestra</NavLink>
        </Button>
      </div>

      {samples.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <Search size={32} />
          <p className="text-lg font-medium mt-4">No se encontraron muestras.</p>
          <p className="text-sm mt-1 text-muted-foreground">Intenta ajustar los filtros o criterios de búsqueda.</p>
        </div>
      ) : (
        <>
          <SamplesTable list={samples} />
          {/* <PaginationBar page={page} total={total} pageSize={pageSize} basePath="/clients" extraParams={{ search }} /> */}
        </>
      )}
    </div>
  );
}
