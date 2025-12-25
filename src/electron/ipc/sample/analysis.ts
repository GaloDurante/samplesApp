import { ipcMain } from "electron";
import { createSampleAnalysis, updateSampleAnalysis } from "../../services/sample/analysis.js";

export function registerAnalysisIPC() {
  ipcMain.handle("create-analysis", async (_event, sample) => {
    try {
      await createSampleAnalysis(sample);
      return { success: true, message: "Análisis creado con éxito." };
    } catch (error) {
      console.error("IPC create-analysis failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo crear el análisis por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-analysis", async (_event, sample) => {
    try {
      await updateSampleAnalysis(sample);
      return { success: true, message: "Análisis modificado con éxito." };
    } catch (error) {
      console.error("IPC update-analysis failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo modificar el análisis por un problema desconocido.";
      return { success: false, message };
    }
  });
}
