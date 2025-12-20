import { useLoaderData } from "react-router";

import type { FullSample } from "@/types/sample";

import { Breadcrum } from "@/components/breadcrum";
import { SampleEditForm } from "@/components/samples/forms/edit-form";

export default function SamplePage() {
  const { sample }: { sample: FullSample } = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 lg:p-16">
      <Breadcrum baseUrl="/samples" baseUrlTitle="Muestras" currentPathTitle={`Detalle de muestra #${122}`} />

      <div className="min-w-full lg:min-w-3/6">
        <h1 className="text-2xl font-bold mb-2">Modificar muestra</h1>
        <p className="text-muted-foreground mb-8">
          El formulario a continuación permite editar una muestra que ya se encuentra registrada en el sistema.
        </p>
        <SampleEditForm editData={sample} />
      </div>
    </div>
  );
}
