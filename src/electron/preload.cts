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

  search: (search: string) => electron.ipcRenderer.invoke("clients:search", search),
});

electron.contextBridge.exposeInMainWorld("sampleApi", {
  getSamples: (
    page: number,
    pageSize: number,
    filters: { search?: string; dateFrom?: string | null; dateTo?: string | null },
  ) => electron.ipcRenderer.invoke("get-samples", page, pageSize, filters),

  getFullSampleById: (sampleId: number) => electron.ipcRenderer.invoke("get-sample-by-id", sampleId),

  createSample: (sample: {
    client_id: number;
    client_name?: number;
    colloquial_specie: string;
    cultivar: string;
    entry_date: string;
    harvest_year: string;
    lot_number?: string;
    lot_weight?: string;
    mark?: string;
    observations?: string;
    sample_code?: string;
    sample_number: number;
    test_end_date: string;
  }) => electron.ipcRenderer.invoke("create-sample", sample),

  updateSample: (sample: {
    client_id: number;
    client_name?: number;
    colloquial_specie: string;
    cultivar: string;
    entry_date: string;
    harvest_year: string;
    lot_number?: string;
    lot_weight?: string;
    mark?: string;
    observations?: string;
    sample_code?: string;
    sample_number: number;
    test_end_date: string;
  }) => electron.ipcRenderer.invoke("update-sample", sample),

  deleteSample: (sampleId: number) => electron.ipcRenderer.invoke("delete-sample", sampleId),
});

electron.contextBridge.exposeInMainWorld("analysisApi", {
  createAnalysis: (analysis: {
    sample_id: number;
    first_count?: number;
    pg?: number;
    pg_curado?: number;
    ct?: number;
    ct_curado?: number;
    ea?: number;
    ea_curado?: number;
    vigor_tz?: number;
    viability_tz?: number;
    e?: number;
    pms?: number;
    purity_percent?: number;
    other_analysis?: string;
    id?: number | undefined;
  }) => electron.ipcRenderer.invoke("create-analysis", analysis),

  updateAnalysis: (analysis: {
    sample_id?: number;
    first_count?: number;
    pg?: number;
    pg_curado?: number;
    ct?: number;
    ct_curado?: number;
    ea?: number;
    ea_curado?: number;
    vigor_tz?: number;
    viability_tz?: number;
    e?: number;
    pms?: number;
    purity_percent?: number;
    other_analysis?: string;
    id?: number | undefined;
  }) => electron.ipcRenderer.invoke("update-analysis", analysis),
});
