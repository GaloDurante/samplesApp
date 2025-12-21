import { ipcMain } from "electron";
import { createAnalysis, updateAnalysis } from "../../services/sample/analysis.js";

export function registerAnalysisIPC() {
  ipcMain.handle("create-analysis", async (_event, sample) => {
    try {
      createAnalysis(sample);
      return { success: true, message: "Análisis creado con éxito." };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo crear el análisis por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-analysis", (_event, sample) => {
    try {
      updateAnalysis(sample);
      return { success: true, message: "Análisis modificado con éxito." };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo modificar el análisis por un problema desconocido.";
      return { success: false, message };
    }
  });
}
