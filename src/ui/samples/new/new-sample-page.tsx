import { Breadcrum } from "@/components/breadcrum";
import { SampleCreateForm } from "@/components/samples/forms/create-form";

export default function NewSamplePage() {
  return (
    <div className="flex flex-col h-full w-full">
      <Breadcrum baseUrl="/samples" baseUrlTitle="Muestras" currentPathTitle="Nueva muestra" />

      <div className="flex-1 flex flex-col justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Crear nueva muestra</h1>
          <p className="text-muted-foreground mb-6">
            Complete el formulario a continuación para registrar una nueva muestra en el sistema.
          </p>
          <SampleCreateForm />
        </div>
      </div>
    </div>
  );
}
