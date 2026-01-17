import { useNavigate } from "react-router";
import { Terminal, Users, FlaskConical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export function CustomNavbar() {
  const navigate = useNavigate();

  const openDevTools = () => {
    window.api.menu.send("open-dev-tools");
  };

  return (
    <header className="flex w-full items-center justify-between border-b bg-background py-1 px-2 md:px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/samples")}>
          <FlaskConical size={16} className="mr-1" /> Muestras
        </Button>
        <Button variant="ghost" size="sm" onClick={() => navigate("/clients")}>
          <Users size={16} className="mr-1" /> Clientes
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings size={16} className="mr-1" /> Configuración
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <ModeToggle />
            </div>

            <Separator />

            <DropdownMenuItem onClick={openDevTools} className="cursor-pointer mt-1.5">
              <Terminal size={16} className="mr-1" /> Consola de Dev
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
