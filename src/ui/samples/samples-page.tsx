import { NavLink, useLoaderData, useLocation } from "react-router";

import type { FullSample, SampleFilters } from "@/types/sample";
import type { ExportScope } from "@/types/others";

import { Search as SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SamplesTable } from "@/components/samples/samples-table";
import { PaginationBar } from "@/components/pagination-bar";
import { SamplesFilters } from "@/components/samples/samples-filters";
import { toast } from "sonner";

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

  const handleExport = async (scope: ExportScope) => {
    const params = new URLSearchParams(location.search);

    const filters = {
      search: params.get("search") ?? undefined,
      dateFrom: params.get("dateFrom") ?? undefined,
      dateTo: params.get("dateTo") ?? undefined,
    };

    const request = scope === "page" ? { scope, filters, page, pageSize } : { scope };

    try {
      const result = await window.api.samples.exportSamples(request);
      if (result.success && result.filePath) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "No se pudo exportar la información solicitada.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo ejecutar la operación solicitada por un problema en el servidor.";
      toast.error(errorMessage);
    }
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
