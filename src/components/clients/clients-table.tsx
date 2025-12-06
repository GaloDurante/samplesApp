import { NavLink } from "react-router";

import type { Client } from "@/types/client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ClientsTableProps {
  list: Client[];
}

export default function ClientsTable({ list }: ClientsTableProps) {
  return (
    <Table parentClassName="border rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>CUIT</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.address}</TableCell>
            <TableCell>{row.cuit}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>
              <Button size="icon" variant="outline" asChild>
                <NavLink to={`/clients/${row.id}`}>
                  <Pencil />
                </NavLink>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
