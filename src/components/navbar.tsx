import { useNavigate, useLocation } from "react-router";
import { Terminal, Users, FlaskConical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const openDevTools = () => {
    window.api.menu.send("open-dev-tools");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="flex w-full items-center justify-between border-b bg-background py-1.5 px-4 md:px-8">
      <div className="flex items-center gap-2">
        <Button
          variant={isActive("/samples") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => navigate("/samples")}
          className={cn("transition-colors", isActive("/samples") && "font-semibold text-primary")}
        >
          <FlaskConical size={16} className="mr-1" /> Muestras
        </Button>

        <Button
          variant={isActive("/clients") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => navigate("/clients")}
          className={cn("transition-colors", isActive("/clients") && "font-semibold text-primary")}
        >
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
