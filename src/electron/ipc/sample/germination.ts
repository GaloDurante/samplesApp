import { ipcMain } from "electron";
import { createSampleGermination, updateSampleGermination } from "../../services/sample/germination.js";

export function registerGerminationIPC() {
  ipcMain.handle("create-germination", async (_event, sample) => {
    try {
      await createSampleGermination(sample);
      return { success: true, message: "Germinación creada con éxito." };
    } catch (error) {
      console.error("IPC create-germination failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo crear la pureza por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-germination", async (_event, sample) => {
    try {
      await updateSampleGermination(sample);
      return { success: true, message: "Germinación modificada con éxito." };
    } catch (error) {
      console.error("IPC update-germination failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo modificar la germinación por un problema desconocido.";
      return { success: false, message };
    }
  });
}
