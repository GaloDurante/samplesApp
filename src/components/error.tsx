import { useRouteError } from "react-router";

interface ErrorProps {
  title?: string;
  description?: string;
}

export default function Error({
  title = "Error encontrado",
  description = "Se produjo un error, por favor intente más tarde.",
}: ErrorProps) {
  const err = useRouteError();
  console.warn(err);

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 py-16 lg:p-16">
      <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
      <p className="text-muted-foreground text-center md:max-w-2/6">{description}</p>
    </div>
  );
}
