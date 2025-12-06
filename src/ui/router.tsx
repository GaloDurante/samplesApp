import { createHashRouter, Navigate } from "react-router";

import Layout from "@/ui/layout";
import ClientsPage from "@/ui/clients/ClientsPage";
import NewClientPage from "@/ui/clients/new/NewClientPage";
import ClientPage from "@/ui/clients/id/ClientPage";

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
            Component: ClientPage,
          },
        ],
      },
    ],
  },
]);
