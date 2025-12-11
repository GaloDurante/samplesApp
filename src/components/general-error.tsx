import { useRouteError } from "react-router";

export default function GeneralError() {
  const err = useRouteError();
  console.warn(err);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 md:p-16">
      <h1 className="text-2xl font-bold mb-2 text-center">Error encontrado</h1>
      <p className="text-muted-foreground text-center md:max-w-2/6">
        Se produjo un error, por favor intente más tarde.
      </p>
    </div>
  );
}
