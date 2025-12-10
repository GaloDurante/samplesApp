import type { Client } from "@/types/client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowActionButtons } from "@/components/clients/row-action-buttons";

interface ClientsTableProps {
  list: Client[];
}

export function ClientsTable({ list }: ClientsTableProps) {
  return (
    <Table parentClassName="border rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>CUIT</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.cuit}</TableCell>
            <TableCell>{row.address}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>
              <RowActionButtons row={row} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
