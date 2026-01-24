import { NavLink, useLoaderData, useLocation } from "react-router";

import type { FullSample, SampleFilters } from "@/types/sample";
import type { ExportScope } from "@/types/others";

import { Search as SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SamplesTable } from "@/components/samples/samples-table";
import { PaginationBar } from "@/components/pagination-bar";
import { SamplesFilters } from "@/components/samples/samples-filters";

interface SamplesPageParams {
  samples: FullSample[];
  total: number;
  page: number;
  pageSize: number;
  filters: SampleFilters;
}

export default function SamplesPage() {
  const { samples, total, page, pageSize, filters }: SamplesPageParams = useLoaderData();
  const location = useLocation();

  const handleExport = (scope: ExportScope) => {
    const params = new URLSearchParams(location.search);

    const request = {
      scope,
      filters: Object.fromEntries(params.entries()),
      ...(scope === "page" && { page, pageSize }),
    };

    console.log("EXPORT REQUEST", request);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:max-w-3xl flex gap-4">
          <SamplesFilters onExport={handleExport} />
        </div>

        <Button asChild className="self-end sm:self-auto">
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
