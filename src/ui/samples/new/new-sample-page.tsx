// import { ClientForm } from "@/components/clients/client-form";
import { ReturnButton } from "@/components/return-button";

export default function NewSamplePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:p-16">
      <ReturnButton path="/samples" />
      <div className="min-w-full lg:min-w-3/6">
        <h1 className="text-2xl font-bold mb-2">Crear nueva muestra</h1>
        <p className="text-muted-foreground mb-8">
          Complete el formulario a continuación para registrar una nueva muestra en el sistema.
        </p>
        {/* <ClientForm /> */}
      </div>
    </div>
  );
}
