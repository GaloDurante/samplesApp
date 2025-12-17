import { Breadcrum } from "@/components/breadcrum";
import { SampleForm } from "@/components/samples/sample-form";

export default function NewSamplePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-16 lg:p-16">
      <Breadcrum baseUrl="/samples" baseUrlTitle="Muestras" currentPathTitle="Nueva muestra" />

      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Crear nueva muestra</h1>
        <p className="text-muted-foreground mb-6">
          Complete el formulario a continuación para registrar una nueva muestra en el sistema.
        </p>
        <SampleForm />
      </div>
    </div>
  );
}
