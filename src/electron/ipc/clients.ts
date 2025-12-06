import { ipcMain } from "electron";
import { getClients, createClient, updateClient, deleteClient } from "../services/clients.js";

export function registerClientsIPC() {
  ipcMain.handle("get-clients", () => getClients());
  ipcMain.handle("create-client", (_event, client) => {
    createClient(client);
    return { success: true };
  });
  ipcMain.handle("update-client", (_event, client) => {
    updateClient(client);
    return { success: true };
  });
  ipcMain.handle("delete-client", (_event, id) => {
    deleteClient(id);
    return { success: true };
  });
}
