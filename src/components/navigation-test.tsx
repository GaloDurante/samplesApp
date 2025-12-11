import { useNavigate } from "react-router";

import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavigationTest() {
  const navigate = useNavigate();

  const handleRoute = (route: string) => {
    navigate(route);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="fixed bottom-3 left-3 z-50 rounded-full shadow-lg">
        <Button variant="outline" size="icon">
          <MapPin className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleRoute("/clients")}>Clientes</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoute("/samples")}>Muestras</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
