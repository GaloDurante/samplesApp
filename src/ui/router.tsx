import { createHashRouter, Navigate } from "react-router";

import Layout from "@/ui/layout";
import ClientsPage from "@/ui/clients/clients-page";
import NewClientPage from "@/ui/clients/new/new-client-page";
import ClientPage from "@/ui/clients/id/client-page";
import ClientError from "@/components/clients/client-error";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <Navigate to="/clients" replace />,
      },
      {
        path: "clients",
        children: [
          {
            index: true,
            loader: async () => {
              return { clients: await window.clientApi.getClients() };
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
    ],
  },
]);
