const electron = require("electron");

electron.contextBridge.exposeInMainWorld("clientApi", {
  getClients: () => electron.ipcRenderer.invoke("get-clients"),
  createClient: (client: { name: string; lastName: string; address: string; cuit: number; phone: string }) =>
    electron.ipcRenderer.invoke("create-client", client),
  updateClient: (client: {
    id: number;
    name: string;
    lastName: string;
    address: string;
    cuit: number;
    phone: string;
  }) => electron.ipcRenderer.invoke("update-client", client),
  deleteClient: (clientId: number) => electron.ipcRenderer.invoke("delete-client", clientId),
});
