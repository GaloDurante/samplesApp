import { useRouteError } from "react-router";

import { ReturnButton } from "@/components/return-button";

export default function SampleError() {
  const err = useRouteError();
  console.warn(err);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 md:p-16">
      <ReturnButton path="/samples" />
      <h1 className="text-2xl font-bold mb-2 text-center">Muestra no encontrada</h1>
      <p className="text-muted-foreground text-center md:max-w-2/6">
        No se encontró ninguna muestra con los datos proporcionados. Por favor, verifique la información o cree una
        nueva muestra.
      </p>
    </div>
  );
}
