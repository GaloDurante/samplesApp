import { formatISODate } from "@/lib/utils";
import type { FullSample } from "@/types/sample";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowActionButtons } from "@/components/samples/row-action-buttons";
import { ANALYSIS_COLUMNS } from "@/lib/constants";

interface SamplesTableProps {
  list: FullSample[];
  showValues: boolean;
}

export function SamplesTable({ list, showValues }: SamplesTableProps) {
  const renderAnalysisValue = (value: unknown, showValues: boolean) => {
    if (value == null) return "n/a";
    if (!showValues) return "X";
    return String(value);
  };

  return (
    <Table parentClassName="border rounded-md">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="w-[6%] text-center">Acciones</TableHead>
          <TableHead>N° muestra</TableHead>
          <TableHead>Fecha ingreso</TableHead>
          <TableHead>Código muestra</TableHead>
          <TableHead>Solicitante</TableHead>
          <TableHead>Especie</TableHead>
          <TableHead>Cultivar</TableHead>
          <TableHead>Año cosecha</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>N° lote</TableHead>
          <TableHead>Peso lote</TableHead>
          {ANALYSIS_COLUMNS.map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
          <TableHead>Finalización ensayo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <RowActionButtons row={row} />
            </TableCell>
            <TableCell>{row.sampleNumber}</TableCell>
            <TableCell>{formatISODate(row.entryDate)}</TableCell>
            <TableCell>{row.sampleCode ?? "-"}</TableCell>
            <TableCell>{row.client?.name ?? "-"}</TableCell>
            <TableCell>{row.colloquialSpecie}</TableCell>
            <TableCell>{row.cultivar}</TableCell>
            <TableCell>{row.harvestYear}</TableCell>
            <TableCell>{row.mark ?? "-"}</TableCell>
            <TableCell>{row.lotNumber ?? "-"}</TableCell>
            <TableCell>{row.lotWeight ?? "-"}</TableCell>
            {ANALYSIS_COLUMNS.map((col) => (
              <TableCell key={col.key} className="text-center">
                {renderAnalysisValue(row.analysis?.[col.key], showValues)}
              </TableCell>
            ))}
            <TableCell>{formatISODate(row.testEndDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
