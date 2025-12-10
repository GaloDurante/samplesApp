const electron = require("electron");

electron.contextBridge.exposeInMainWorld("clientApi", {
  getClients: (page: number, pageSize: number, search: string) =>
    electron.ipcRenderer.invoke("get-clients", page, pageSize, search),

  getClientById: (clientId: number) => electron.ipcRenderer.invoke("get-client-by-id", clientId),

  createClient: (client: { name: string; cuit: number; address: string; email: string; phone: string }) =>
    electron.ipcRenderer.invoke("create-client", client),

  updateClient: (client: { id: number; name: string; cuit: number; address: string; email: string; phone: string }) =>
    electron.ipcRenderer.invoke("update-client", client),

  deleteClient: (clientId: number) => electron.ipcRenderer.invoke("delete-client", clientId),
});
