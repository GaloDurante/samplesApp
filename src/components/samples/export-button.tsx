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
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
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
          <DialogTitle>Exportación de datos</DialogTitle>
          <DialogDescription>Selecciona una opción para continuar</DialogDescription>
        </DialogHeader>

        <RadioGroup value={scope} onValueChange={(value) => setScope(value as ExportScope)} className="my-4">
          <FieldLabel htmlFor="page">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Página actual</FieldTitle>
                <FieldDescription>Exporta únicamente las muestras visibles en la página actual.</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="page" id="page" />
            </Field>
          </FieldLabel>

          <FieldLabel htmlFor="all">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Todas las muestras</FieldTitle>
                <FieldDescription>
                  Exporta todas las muestras del sistema. Este proceso puede demorar varios minutos según el volumen de
                  datos.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="all" id="all" />
            </Field>
          </FieldLabel>
        </RadioGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleConfirm}>
              <FileOutput />
              Exportar datos
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
