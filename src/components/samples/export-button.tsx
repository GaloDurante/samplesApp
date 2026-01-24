import { useState } from "react";

import type { ExportScope } from "@/types/others";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FileOutput } from "lucide-react";

interface ExportButtonProps {
  onConfirm: (scope: ExportScope) => void;
}

export function ExportButton({ onConfirm }: ExportButtonProps) {
  const [scope, setScope] = useState<ExportScope>("page");

  const handleConfirm = () => {
    onConfirm(scope);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <FileOutput />
          Exportar datos
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar Datos</DialogTitle>
          <DialogDescription>Selecciona una opción para exportar la información</DialogDescription>
        </DialogHeader>

        <RadioGroup value={scope} onValueChange={(value) => setScope(value as ExportScope)} className="my-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="page" id="page" />
            <Label htmlFor="page">Página actual</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">Todas las muestras (más lento)</Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleConfirm}>
              <FileOutput />
              Exportar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
