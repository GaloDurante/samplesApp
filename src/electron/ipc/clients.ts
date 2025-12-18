import { ipcMain } from "electron";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  searchClients,
} from "../services/clients.js";

export function registerClientsIPC() {
  ipcMain.handle("get-clients", (_event, page, pageSize, search) => getClients(page, pageSize, search));

  ipcMain.handle("get-client-by-id", (_event, id) => getClientById(id));

  ipcMain.handle("create-client", async (_event, client) => {
    try {
      createClient(client);
      return { success: true, message: "Cliente creado con éxito." };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo crear el cliente por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-client", (_event, client) => {
    try {
      updateClient(client);
      return { success: true, message: "Cliente modificado con éxito." };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo modificar el cliente por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("delete-client", (_event, id) => {
    try {
      deleteClient(id);
      return { success: true, message: "Cliente eliminado con éxito." };
    } catch (error) {
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
