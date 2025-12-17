import { useRouteError } from "react-router";

import { ReturnButton } from "@/components/return-button";

interface ErrorProps {
  path?: string;
  title?: string;
  description?: string;
}

export default function Error({
  path,
  title = "Error encontrado",
  description = "Se produjo un error, por favor intente más tarde.",
}: ErrorProps) {
  const err = useRouteError();
  console.warn(err);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 lg:p-16">
      {path && <ReturnButton path={path} />}
      <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
      <p className="text-muted-foreground text-center md:max-w-2/6">{description}</p>
    </div>
  );
}
