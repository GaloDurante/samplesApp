import { formatISODate } from "@/lib/utils";
import type { FullSample } from "@/types/sample";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowActionButtons } from "@/components/samples/row-action-buttons";

interface SamplesTableProps {
  list: FullSample[];
}

export function SamplesTable({ list }: SamplesTableProps) {
  return (
    <Table parentClassName="border rounded-md">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="w-[6%]">Acciones</TableHead>
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
          <TableHead>1° recuento</TableHead>
          <TableHead>PG</TableHead>
          <TableHead>Vigor TZ</TableHead>
          <TableHead>Viabilidad TZ</TableHead>
          <TableHead>PMS</TableHead>
          <TableHead>Pureza</TableHead>
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
            <TableCell className="text-center">{row.analysis?.firstCount ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analysis?.pg ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analysis?.vigorTz ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analysis?.viabilityTz ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analysis?.pms ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analysis?.purityPercent ? "X" : "n/a"}</TableCell>
            <TableCell>{formatISODate(row.testEndDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
