import { NavLink, useRevalidator } from "react-router";

import type { Client } from "@/types/client";

import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";

export function RowActionButtons({ row }: { row: Client }) {
  const revalidator = useRevalidator();

  const handleDelete = async (id?: number) => {
    if (!id) return;

    try {
      const result = await window.api.clients.deleteClient(id);

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
      <Tooltip delayDuration={700} disableHoverableContent>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" asChild>
            <NavLink to={`/clients/${row.id}`}>
              <Pencil />
            </NavLink>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Editar</p>
        </TooltipContent>
      </Tooltip>

      <ConfirmDialog
        trigger={
          <Button className="ml-2" size="icon" variant="ghostDestructive">
            <Trash />
          </Button>
        }
        tooltip="Eliminar"
        title="Eliminar cliente"
        description={
          <>
            Seguro que desea eliminar al cliente <span className="font-semibold text-foreground">{row.name}</span>? Esta
            acción no se puede deshacer luego.
          </>
        }
        confirmLabel="Eliminar"
        onConfirm={() => handleDelete(row.id)}
        twoStepWord={`eliminar-${row.email}`}
      />
    </>
  );
}
