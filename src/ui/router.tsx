import { createHashRouter, Navigate } from "react-router";

import Layout from "@/ui/layout";
import Error from "@/components/error";

import ClientsPage from "@/ui/clients/clients-page";
import NewClientPage from "@/ui/clients/new/new-client-page";
import ClientPage from "@/ui/clients/id/client-page";

import SamplesPage from "@/ui/samples/samples-page";
import NewSamplePage from "@/ui/samples/new/new-sample-page";
import SamplePage from "@/ui/samples/id/sample-page";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Navigate to="samples" replace />,
      },
      {
        path: "clients",
        children: [
          {
            index: true,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const page = Number(url.searchParams.get("page") ?? 1);
              const pageSize = Number(url.searchParams.get("pageSize") ?? 13);
              const search = url.searchParams.get("search") ?? "";

              const { clients, total } = await window.api.clients.getClients(page, pageSize, search);
              return { clients, total, page, pageSize, search };
            },
            Component: ClientsPage,
          },
          {
            path: "new",
            Component: NewClientPage,
          },
          {
            path: ":id",
            loader: async ({ params }) => {
              const id = params.id;
              const { data: client } = await window.api.clients.getClientById(Number(id));
              return { client };
            },
            Component: ClientPage,
            errorElement: (
              <Error
                path="/clients"
                title="Cliente no encontrado"
                description="No se encontró ningún cliente con los datos proporcionados. Por favor, verifique la información o cree un nuevo
        cliente."
              />
            ),
          },
        ],
      },
      {
        path: "samples",
        children: [
          {
            index: true,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const page = Number(url.searchParams.get("page") ?? 1);
              const pageSize = Number(url.searchParams.get("pageSize") ?? 20);
              const filters = {
                search: url.searchParams.get("search") ?? "",
                dateFrom: url.searchParams.get("dateFrom") ?? undefined,
                dateTo: url.searchParams.get("dateTo") ?? undefined,
              };

              const { samples, total } = await window.api.samples.getSamples(page, pageSize, filters);
              return { samples, total, page, pageSize, filters };
            },
            Component: SamplesPage,
          },
          {
            path: "new",
            Component: NewSamplePage,
          },
          {
            path: ":id",
            loader: async ({ params }) => {
              const id = params.id;
              const { data: sample } = await window.api.samples.getFullSampleById(Number(id));
              return { sample };
            },
            Component: SamplePage,
            errorElement: (
              <Error
                path="/samples"
                title="Muestra no encontrada"
                description="No se encontró ninguna muestra con los datos proporcionados. Por favor, verifique la información o cree una nueva
    muestra."
              />
            ),
          },
        ],
      },
    ],
  },
]);
