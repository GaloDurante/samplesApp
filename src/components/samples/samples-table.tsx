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
            <TableCell>{row.sample_number}</TableCell>
            <TableCell>{formatISODate(row.entry_date)}</TableCell>
            <TableCell>{row.sample_code}</TableCell>
            <TableCell>{row.client?.name ?? row.client_name}</TableCell>
            <TableCell>{row.colloquial_specie}</TableCell>
            <TableCell>{row.cultivar}</TableCell>
            <TableCell>{row.harvest_year}</TableCell>
            <TableCell>{row.mark}</TableCell>
            <TableCell>{row.lot_number}</TableCell>
            <TableCell>{row.lot_weight}</TableCell>
            <TableCell className="text-center">{row.analyses?.first_count ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analyses?.pg ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analyses?.vigor_tz ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analyses?.viability_tz ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analyses?.pms ? "X" : "n/a"}</TableCell>
            <TableCell className="text-center">{row.analyses?.purity_percent ? "X" : "n/a"}</TableCell>
            <TableCell>{formatISODate(row.test_end_date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
