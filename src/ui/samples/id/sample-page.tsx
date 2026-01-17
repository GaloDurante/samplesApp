import { useLoaderData } from "react-router";

import type { FullSample } from "@/types/sample";

import { Breadcrum } from "@/components/breadcrum";
import { FormsNavigation } from "@/components/samples/forms-navigation";

export default function SamplePage() {
  const { sample }: { sample: FullSample } = useLoaderData();

  return (
    <div className="flex flex-col h-full w-full">
      <Breadcrum baseUrl="/samples" baseUrlTitle="Muestras" currentPathTitle={`Detalle de muestra #${sample.id}`} />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-2">Modificar muestra</h1>
          <p className="text-muted-foreground mb-8">
            El formulario a continuación permite editar una muestra que ya se encuentra registrada en el sistema.
          </p>
          <FormsNavigation data={sample} />
        </div>
      </div>
    </div>
  );
}
