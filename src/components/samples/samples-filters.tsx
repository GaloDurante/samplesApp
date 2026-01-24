import { useSearchParams } from "react-router";

import { Search } from "@/components/search";
import { DatePicker } from "@/components/date-picker";
import { ExportButton } from "@/components/samples/export-button";

export function SamplesFilters({ onExport }: { onExport: (scope: "page" | "all") => void }) {
  const [params, setParams] = useSearchParams();

  const from = params.get("dateFrom") ?? undefined;
  const to = params.get("dateTo") ?? undefined;

  const setOrDelete = (params: URLSearchParams, key: string, value?: string) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  };

  const handleDateChange = (from?: string, to?: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);

      setOrDelete(next, "dateFrom", from);
      setOrDelete(next, "dateTo", to);

      next.set("page", "1");
      return next;
    });
  };

  return (
    <>
      <Search
        parentClassName="w-full"
        placeholder="Buscar muestras"
        label="Filtra por solicitante, N° muestra, código, especie, marca o lote."
      />
      <div className="w-full">
        <DatePicker mode="range" from={from} to={to} onRangeChange={({ from, to }) => handleDateChange(from, to)} />
      </div>
      <ExportButton onConfirm={onExport} />
    </>
  );
}
