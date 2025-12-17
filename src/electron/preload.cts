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

electron.contextBridge.exposeInMainWorld("sampleApi", {
  getSamples: (
    page: number,
    pageSize: number,
    filters: { search?: string; dateFrom?: string | null; dateTo?: string | null },
  ) => electron.ipcRenderer.invoke("get-samples", page, pageSize, filters),

  createSample: (sample: {
    client_id: number;
    colloquial_specie: string;
    cultivar: string;
    entry_date: string;
    harvest_year: string;
    lot_number: string;
    lot_weight: string;
    mark: string;
    observations?: string;
    sample_code: string;
    sample_number: number;
    test_end_date: string;
  }) => electron.ipcRenderer.invoke("create-sample", sample),
});
