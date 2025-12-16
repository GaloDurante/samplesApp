import { useState } from "react";

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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  trigger: React.ReactNode;
  tooltip?: string;
  title: string;
  description: React.ReactNode | string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  twoStepWord?: string;
}

export function ConfirmDialog({
  trigger,
  tooltip,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  twoStepWord,
}: ConfirmDialogProps) {
  const [inputValue, setInputValue] = useState("");
  const isValid = twoStepWord ? twoStepWord.toLowerCase() === inputValue.toLowerCase() : true;

  const TriggerWrapper = tooltip ? (
    <Tooltip delayDuration={700} disableHoverableContent>
      <TooltipTrigger asChild>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  ) : (
    <DialogTrigger asChild>{trigger}</DialogTrigger>
  );

  return (
    <Dialog>
      {TriggerWrapper}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {twoStepWord && (
          <div>
            <p className="text-muted-foreground text-sm mb-1">
              Para confirmar, escribe <span className="text-foreground font-semibold">{`“${twoStepWord}“`}</span>.
            </p>
            <Input onChange={(e) => setInputValue(e.target.value)} />
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{cancelLabel}</Button>
          </DialogClose>

          <Button variant="destructive" onClick={onConfirm} disabled={!isValid}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
