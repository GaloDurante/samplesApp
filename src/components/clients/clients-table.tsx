import type { Client } from "@/types/client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClientsTableProps {
  list: Client[];
}

export default function ClientsTable({ list }: ClientsTableProps) {
  return (
    <Table>
      <TableCaption>Lista de todos los clientes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>CUIT</TableHead>
          <TableHead>Teléfono</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row) => (
          <TableRow>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.address}</TableCell>
            <TableCell>{row.cuit}</TableCell>
            <TableCell>{row.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
