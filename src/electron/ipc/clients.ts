import { ipcMain } from "electron";
import { getClients, getClientById, createClient, updateClient, deleteClient } from "../services/clients.js";

export function registerClientsIPC() {
  ipcMain.handle("get-clients", () => getClients());

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
    updateClient(client);
    return { success: true };
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
}
