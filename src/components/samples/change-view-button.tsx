import { useSearchParams } from "react-router";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ChangeViewButton() {
  const [params, setParams] = useSearchParams();

  const showValues = params.get("showValues") === "true";

  const onCheckedChange = (checked: boolean) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("showValues", String(checked));

      return next;
    });
  };

  return (
    <div className="flex items-center gap-2 min-w-fit">
      <Switch id="show-values" checked={showValues} onCheckedChange={onCheckedChange} className="cursor-pointer" />
      <Label htmlFor="show-values" className="cursor-pointer">
        Mostrar valores
      </Label>
    </div>
  );
}
