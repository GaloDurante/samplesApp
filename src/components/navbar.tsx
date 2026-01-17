import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Terminal, Users, FlaskConical, Settings, Minus, Square, X } from "lucide-react";
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

  const handleControl = (action: "minimize" | "maximize" | "close") => {
    window.api.menu.send(`window-${action}`);
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const dragStyle: React.CSSProperties = {
    WebkitAppRegion: "drag",
  } as React.CSSProperties;

  const noDragStyle: React.CSSProperties = {
    WebkitAppRegion: "no-drag",
  } as React.CSSProperties;

  return (
    <header
      className="flex w-full items-center justify-between border-b bg-background h-9 select-none pl-4"
      style={dragStyle}
    >
      <div className="flex items-center gap-2" style={noDragStyle}>
        <Button
          variant={isActive("/samples") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => navigate("/samples")}
          className={cn("h-8", isActive("/samples") && "font-semibold text-primary")}
        >
          <FlaskConical size={16} className="mr-1" /> Muestras
        </Button>

        <Button
          variant={isActive("/clients") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => navigate("/clients")}
          className={cn("h-8", isActive("/clients") && "font-semibold text-primary")}
        >
          <Users size={16} className="mr-1" /> Clientes
        </Button>
      </div>

      <div className="flex items-center h-full" style={noDragStyle}>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <Settings size={16} className="mr-1" /> Configuración
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <ModeToggle />
              </div>
              <Separator />
              <DropdownMenuItem
                onClick={() => window.api.menu.send("open-dev-tools")}
                className="cursor-pointer mt-1.5"
              >
                <Terminal size={16} className="mr-1" /> Consola de Dev
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator orientation="vertical" className="mx-3" />

        <div className="flex items-center h-full">
          <Button variant="ghost" size="icon" className="rounded-none" onClick={() => handleControl("minimize")}>
            <Minus size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-none" onClick={() => handleControl("maximize")}>
            <Square size={12} />
          </Button>
          <Button
            variant="ghostDestructive"
            size="icon"
            className="rounded-none"
            onClick={() => handleControl("close")}
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
