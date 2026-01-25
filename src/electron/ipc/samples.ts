import { ipcMain } from "electron";
import {
  getSamples,
  createSample,
  deleteSample,
  getFullSampleById,
  updateSample,
  updateSampleCertificate,
  exportSamples,
} from "../services/samples.js";

export function registerSamplesIPC() {
  ipcMain.handle("get-samples", async (_event, page, pageSize, filters) => {
    try {
      const result = await getSamples(page, pageSize, filters);
      return result;
    } catch (error) {
      console.error("IPC get-samples failed:", error);

      const message = error instanceof Error ? error.message : "No se pudo obtener las muestras.";
      return { success: false, message };
    }
  });

  ipcMain.handle("get-sample-by-id", async (_event, id) => {
    try {
      const sample = await getFullSampleById(id);

      return { success: true, data: sample };
    } catch (error) {
      console.error("IPC get-sample-by-id failed:", error);

      const message = error instanceof Error ? error.message : "No se pudo obtener la muestra.";

      return { success: false, message };
    }
  });

  ipcMain.handle("create-sample", async (_event, sample) => {
    try {
      const result = await createSample(sample);
      return { success: true, message: "Muestra creada con éxito.", data: result };
    } catch (error) {
      console.error("IPC create-sample failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo crear la muestra por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-sample", async (_event, sample) => {
    try {
      await updateSample(sample);
      return { success: true, message: "Muestra modificada con éxito." };
    } catch (error) {
      console.error("IPC update-sample failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo modificar la muestra por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("delete-sample", async (_event, id) => {
    try {
      await deleteSample(id);
      return { success: true, message: "Muestra eliminada con éxito." };
    } catch (error) {
      console.error("IPC delete-sample failed:", error);

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la muestra solicitada por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-sample-certificate", async (_event, sample) => {
    try {
      await updateSampleCertificate(sample);
      return { success: true, message: "Muestra modificada con éxito." };
    } catch (error) {
      console.error("IPC update-sample-certificate failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo modificar la muestra por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("samples:export", async (_event, request) => {
    try {
      const filePath = await exportSamples(request);

      return {
        success: true,
        message: "Datos exportados con éxito.",
        filePath,
      };
    } catch (error) {
      console.error("IPC samples:export failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo exportar los datos por un problema desconocido.";
      return { success: false, message };
    }
  });
}
