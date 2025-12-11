import { createHashRouter, Navigate } from "react-router";

import Layout from "@/ui/layout";
import GeneralError from "@/components/general-error";

import ClientsPage from "@/ui/clients/clients-page";
import NewClientPage from "@/ui/clients/new/new-client-page";
import ClientPage from "@/ui/clients/id/client-page";
import ClientError from "@/components/clients/client-error";

import SamplesPage from "@/ui/samples/samples-page";
import NewSamplePage from "@/ui/samples/new/new-sample-page";
import SamplePage from "@/ui/samples/id/sample-page";
import SampleError from "@/components/samples/sample-error";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <GeneralError />,

    children: [
      {
        index: true,
        element: <Navigate to="/samples" replace />,
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

              const { clients, total } = await window.clientApi.getClients(page, pageSize, search);
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
              return { client: await window.clientApi.getClientById(Number(id)) };
            },
            Component: ClientPage,
            errorElement: <ClientError />,
          },
        ],
      },
      {
        path: "samples",
        children: [
          {
            index: true,
            loader: async () => {
              // const url = new URL(request.url);
              // const page = Number(url.searchParams.get("page") ?? 1);
              // const pageSize = Number(url.searchParams.get("pageSize") ?? 13);
              // const search = url.searchParams.get("search") ?? "";

              return { samples: await window.sampleApi.getSamples() };
            },
            Component: SamplesPage,
          },
          {
            path: "new",
            Component: NewSamplePage,
          },
          {
            path: ":id",
            // loader: async ({ params }) => {
            //   const id = params.id;
            //   return { client: await window.clientApi.getClientById(Number(id)) };
            // },
            Component: SamplePage,
            errorElement: <SampleError />,
          },
        ],
      },
    ],
  },
]);
