import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";

import ClientForm from "@/components/clients/client-form";

export default function NewClientPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
      <Button asChild variant="outline" className="absolute top-4 left-4">
        <NavLink to="/clients">Volver</NavLink>
      </Button>
      <div className="min-w-full lg:min-w-3/6">
        <h1 className="text-xl font-semibold mb-2">Cargar Cliente</h1>
        <p className="text-muted-foreground mb-8">Formulario para agregar un nuevo cliente al sistema.</p>
        <ClientForm />
      </div>
    </div>
  );
}
