import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";

interface ReturnButton {
  path: string;
  label?: string;
}

export function ReturnButton({ path, label = "Volver" }: ReturnButton) {
  return (
    <Button asChild variant="outline" className="absolute top-4 left-4">
      <NavLink to={path}>{label}</NavLink>
    </Button>
  );
}
