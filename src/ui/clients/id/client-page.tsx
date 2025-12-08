import { useLoaderData } from "react-router";

import type { Client } from "@/types/client";

import ReturnButton from "@/components/return-button";

export default function ClientPage() {
  const { client }: { client: Client } = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
      <ReturnButton path="/clients" />

      <h1>
        {client.name} {client.lastName}
      </h1>
    </div>
  );
}
