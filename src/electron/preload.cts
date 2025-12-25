const electron = require("electron");

electron.contextBridge.exposeInMainWorld("api", {
  clients: {
    getClients: (page: number, pageSize: number, search: string) =>
      electron.ipcRenderer.invoke("get-clients", page, pageSize, search),

    getClientById: (clientId: number) => electron.ipcRenderer.invoke("get-client-by-id", clientId),

    createClient: (client: { name: string; cuit: number; address: string; email: string; phone: string }) =>
      electron.ipcRenderer.invoke("create-client", client),

    updateClient: (client: { id: number; name: string; cuit: number; address: string; email: string; phone: string }) =>
      electron.ipcRenderer.invoke("update-client", client),

    deleteClient: (clientId: number) => electron.ipcRenderer.invoke("delete-client", clientId),

    search: (search: string) => electron.ipcRenderer.invoke("clients:search", search),
  },

  samples: {
    getSamples: (
      page: number,
      pageSize: number,
      filters: { search?: string; dateFrom?: string | null; dateTo?: string | null },
    ) => electron.ipcRenderer.invoke("get-samples", page, pageSize, filters),

    getFullSampleById: (sampleId: number) => electron.ipcRenderer.invoke("get-sample-by-id", sampleId),

    createSample: (sample: {
      clientId: number;
      clientName?: number;
      colloquialSpecie: string;
      cultivar: string;
      entryDate: string;
      harvestYear: string;
      lotNumber?: string;
      lotWeight?: string;
      mark?: string;
      observations?: string;
      sampleCode?: string;
      sampleNumber: number;
      testEndDate: string;
    }) => electron.ipcRenderer.invoke("create-sample", sample),

    updateSample: (sample: {
      clientId: number;
      clientName?: number;
      colloquialSpecie: string;
      cultivar: string;
      entryDate: string;
      harvestYear: string;
      lotNumber?: string;
      lotWeight?: string;
      mark?: string;
      observations?: string;
      sampleCode?: string;
      sampleNumber: number;
      testEndDate: string;
    }) => electron.ipcRenderer.invoke("update-sample", sample),

    deleteSample: (sampleId: number) => electron.ipcRenderer.invoke("delete-sample", sampleId),
  },

  analysis: {
    createAnalysis: (analysis: {
      sampleId: number;
      firstCount?: number;
      pg?: number;
      pgCurado?: number;
      ct?: number;
      ctCurado?: number;
      ea?: number;
      eaCurado?: number;
      vigorTz?: number;
      viabilityTz?: number;
      e?: number;
      pms?: number;
      purityPercent?: number;
      otherAnalysis?: string;
      performancedAt?: string;
      id?: number | undefined;
    }) => electron.ipcRenderer.invoke("create-analysis", analysis),

    updateAnalysis: (analysis: {
      sampleId: number;
      firstCount?: number;
      pg?: number;
      pgCurado?: number;
      ct?: number;
      ctCurado?: number;
      ea?: number;
      eaCurado?: number;
      vigorTz?: number;
      viabilityTz?: number;
      e?: number;
      pms?: number;
      purityPercent?: number;
      otherAnalysis?: string;
      performancedAt?: string;
      id?: number | undefined;
    }) => electron.ipcRenderer.invoke("update-analysis", analysis),
  },
});
