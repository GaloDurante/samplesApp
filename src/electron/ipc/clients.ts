import { ipcMain } from "electron";
import {
  getClients,
  createClient,
  deleteClient,
  getClientById,
  updateClient,
  searchClients,
} from "../services/clients.js";

export function registerClientsIPC() {
  ipcMain.handle("get-clients", async (_event, page, pageSize, search) => {
    try {
      const result = await getClients(page, pageSize, search);
      return result;
    } catch (error) {
      console.error("IPC get-clients failed:", error);

      const message = error instanceof Error ? error.message : "No se pudo obtener los clientes.";
      return { success: false, message };
    }
  });

  ipcMain.handle("get-client-by-id", async (_event, id) => {
    try {
      const client = await getClientById(id);
      return { success: true, data: client };
    } catch (error) {
      console.error("IPC create-client failed:", error);

      const message = error instanceof Error ? error.message : "No se pudo obtener el cliente.";
      return { success: false, message };
    }
  });

  ipcMain.handle("create-client", async (_event, client) => {
    try {
      const createdClient = await createClient(client);
      return { success: true, message: "Cliente creado con éxito.", data: createdClient };
    } catch (error) {
      console.error("IPC create-client failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo crear el cliente por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-client", async (_event, client) => {
    try {
      await updateClient(client);
      return { success: true, message: "Cliente actualizado con éxito." };
    } catch (error) {
      console.error("IPC update-client failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo modificar el cliente por un problema desconocido.";

      return { success: false, message };
    }
  });

  ipcMain.handle("delete-client", async (_event, id) => {
    try {
      await deleteClient(id);
      return { success: true, message: "Cliente eliminado con éxito." };
    } catch (error) {
      console.error("IPC delete-client failed:", error);

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el cliente solicitado por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("clients:search", (_event, search: string) => {
    return searchClients(search);
  });
}
