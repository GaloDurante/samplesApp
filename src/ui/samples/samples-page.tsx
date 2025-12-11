import { NavLink, useLoaderData } from "react-router";

import type { FullSample, SampleFilters } from "@/types/sample";

import { Search as SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SamplesTable } from "@/components/samples/samples-table";
import { Search } from "@/components/search";
import { PaginationBar } from "@/components/pagination-bar";

interface SamplesPageParams {
  samples: FullSample[];
  total: number;
  page: number;
  pageSize: number;
  filters: SampleFilters;
}

export default function ClientsPage() {
  const { samples, total, page, pageSize, filters }: SamplesPageParams = useLoaderData();

  return (
    <div className="p-4 md:p-8 min-h-screen flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:min-w-md">
          <Search
            placeholder="Buscar muestras"
            label="Filtra por solicitante, N° muestra, código, especie, marca o lote."
          />
        </div>

        <Button asChild className="self-end">
          <NavLink to={"/samples/new"}>Agregar Muestra</NavLink>
        </Button>
      </div>

      {samples.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <SearchIcon size={32} />
          <p className="text-lg font-medium mt-4">No se encontraron muestras.</p>
          <p className="text-sm mt-1 text-muted-foreground">Intenta ajustar los filtros o criterios de búsqueda.</p>
        </div>
      ) : (
        <>
          <SamplesTable list={samples} />
          <PaginationBar
            page={page}
            total={total}
            pageSize={pageSize}
            basePath="/samples"
            extraParams={{ search: filters.search }}
          />
        </>
      )}
    </div>
  );
}
