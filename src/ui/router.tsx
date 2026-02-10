import { createHashRouter, Navigate } from "react-router";

import Layout from "@/ui/layout";
import Error from "@/components/error";
import ErrorPage from "@/ui/error/error-page";

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
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Navigate to="samples" replace />,
      },
      {
        path: "clients",
        handle: { title: "Clientes" },
        children: [
          {
            index: true,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const page = Number(url.searchParams.get("page") ?? 1);
              const pageSize = Number(url.searchParams.get("pageSize") ?? 20);
              const search = url.searchParams.get("search") ?? "";

              const { clients, total } = await window.api.clients.getClients(page, pageSize, search);
              return { clients, total, page, pageSize, search };
            },
            Component: ClientsPage,
          },
          {
            path: "new",
            handle: { title: "Nuevo cliente" },
            Component: NewClientPage,
          },
          {
            path: ":id",
            handle: { title: "Detalle de cliente" },
            loader: async ({ params }) => {
              const id = params.id;
              const { data: client } = await window.api.clients.getClientById(Number(id));
              return { client };
            },
            Component: ClientPage,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "samples",
        handle: { title: "Muestras" },
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
                showValues: url.searchParams.get("showValues") ?? "false",
              };

              const { samples, total } = await window.api.samples.getSamples(page, pageSize, filters);
              return { samples, total, page, pageSize, filters };
            },
            Component: SamplesPage,
          },
          {
            path: "new",
            handle: { title: "Nueva muestra" },
            Component: NewSamplePage,
          },
          {
            path: ":id",
            handle: { title: "Detalle de muestra" },
            loader: async ({ params }) => {
              const id = params.id;
              const { data: sample } = await window.api.samples.getFullSampleById(Number(id));
              return { sample };
            },
            Component: SamplePage,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
]);
