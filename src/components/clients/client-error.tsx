import { useRouteError, NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function ClientError() {
  const err = useRouteError();
  console.warn(err);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
        <Button asChild variant="outline" className="absolute top-4 left-4">
          <NavLink to="/clients">Volver</NavLink>
        </Button>
        <h1 className="text-2xl font-bold mb-2 text-center">Cliente no encontrado</h1>
        <p className="text-muted-foreground mb-6 text-center md:max-w-2/6">
          No se encontró ningún cliente con los datos proporcionados. Por favor, verifique la información o cree un
          nuevo cliente.
        </p>
      </div>
    </>
  );
}
