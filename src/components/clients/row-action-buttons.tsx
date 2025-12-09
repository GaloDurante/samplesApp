import { NavLink, useRevalidator } from "react-router";

import type { Client } from "@/types/client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash } from "lucide-react";

export default function RowActionButtons({ row }: { row: Client }) {
  const revalidator = useRevalidator();

  const handleDelete = async (client: Client) => {
    if (!client.id) return;
    if (!confirm(`Seguro que desea eliminar al cliente ${client.name} ${client.lastName}`)) return;

    try {
      const result = await window.clientApi.deleteClient(client.id);

      if (result.success) {
        toast.success(result.message);
        revalidator.revalidate();
      } else {
        toast.error(result.message || "No se pudo eliminar el cliente solicitado.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo eliminar el cliente solicitado.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Button size="icon" variant="outline" asChild>
        <NavLink to={`/clients/${row.id}`}>
          <Pencil />
        </NavLink>
      </Button>
      <Button className="ml-2" size="icon" variant="destructive" onClick={() => handleDelete(row)}>
        <Trash />
      </Button>
    </>
  );
}
