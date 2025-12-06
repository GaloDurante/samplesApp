import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";

export default function NewClientPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
      <Button asChild variant="outline" className="absolute top-4 left-4">
        <NavLink to="/clients">Volver</NavLink>
      </Button>
      <h1>New Client Page</h1>
    </div>
  );
}
