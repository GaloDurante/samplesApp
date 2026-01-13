import { useNavigate } from "react-router";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";

interface DeleteButtonProps {
  id: number;
  sampleNumber: string;
}

export function DeleteButton({ id, sampleNumber }: DeleteButtonProps) {
  const navigate = useNavigate();

  const handleDelete = async (id?: number) => {
    if (!id) return;

    try {
      const result = await window.api.samples.deleteSample(id);

      if (result.success) {
        toast.success(result.message);
        navigate("/samples");
      } else {
        toast.error(result.message || "No se pudo eliminar la muestra solicitada.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo eliminar la muestra solicitada.";
      toast.error(errorMessage);
    }
  };

  return (
    <ConfirmDialog
      trigger={
        <Button type="button" variant="destructive">
          Eliminar muestra
        </Button>
      }
      title="Eliminar muestra"
      description={
        <>
          Seguro que desea eliminar la muestra <span className="font-semibold text-foreground">{sampleNumber}</span>?
          Esta acción no se puede deshacer luego.
        </>
      }
      confirmLabel="Eliminar"
      onConfirm={() => handleDelete(id)}
      twoStepWord={`eliminar-${sampleNumber}`}
    />
  );
}
