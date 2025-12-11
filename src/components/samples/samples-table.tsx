import type { FullSample } from "@/types/sample";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowActionButtons } from "@/components/samples/row-action-buttons";

interface SamplesTableProps {
  list: FullSample[];
}

export function SamplesTable({ list }: SamplesTableProps) {
  return (
    <Table parentClassName="border rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[6%]">Acciones</TableHead>
          <TableHead>Nro muestra</TableHead>
          <TableHead>Fecha ingreso</TableHead>
          <TableHead>Código muestra</TableHead>
          <TableHead>Solicitante</TableHead>
          <TableHead>Especie</TableHead>
          <TableHead>Cultivar</TableHead>
          <TableHead>Año cosecha</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Nro lote</TableHead>
          <TableHead>Peso lote</TableHead>
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
            <TableCell>{row.entry_date}</TableCell>
            <TableCell>{row.sample_code}</TableCell>
            <TableCell>{row.client.name}</TableCell>
            <TableCell>{row.colloquial_specie}</TableCell>
            <TableCell>{row.cultivar}</TableCell>
            <TableCell>{row.harvest_year}</TableCell>
            <TableCell>{row.mark}</TableCell>
            <TableCell>{row.lot_number}</TableCell>
            <TableCell>{row.lot_weight}</TableCell>
            <TableCell>{row.test_end_date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
