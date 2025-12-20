import { ipcMain } from "electron";
import { createSample, getSamples, deleteSample, getSampleById } from "../services/samples.js";

export function registerSamplesIPC() {
  ipcMain.handle("get-samples", (_event, page, pageSize, filters) => getSamples(page, pageSize, filters));

  ipcMain.handle("get-sample-by-id", (_event, id) => getSampleById(id));

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

  ipcMain.handle("delete-sample", (_event, id) => {
    try {
      deleteSample(id);
      return { success: true, message: "Muestra eliminada con éxito." };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la muestra solicitada por un problema desconocido.";
      return { success: false, message };
    }
  });
}
