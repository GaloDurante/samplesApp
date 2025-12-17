import { ipcMain } from "electron";
import { createSample, getSamples } from "../services/samples.js";

export function registerSamplesIPC() {
  ipcMain.handle("get-samples", (_event, page, pageSize, filters) => getSamples(page, pageSize, filters));

  ipcMain.handle("create-sample", async (_event, sample) => {
    try {
      createSample(sample);
      return { success: true, message: "Muestra creada con éxito." };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo crear la muestra por un problema desconocido.";
      return { success: false, message };
    }
  });
}
