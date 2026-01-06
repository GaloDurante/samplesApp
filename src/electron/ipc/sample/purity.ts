import { ipcMain } from "electron";
import { createSamplePurity, updateSamplePurity } from "../../services/sample/purity.js";

export function registerPurityIPC() {
  ipcMain.handle("create-purity", async (_event, sample) => {
    try {
      await createSamplePurity(sample);
      return { success: true, message: "Pureza creada con éxito." };
    } catch (error) {
      console.error("IPC create-purity failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo crear la pureza por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-purity", async (_event, sample) => {
    try {
      await updateSamplePurity(sample);
      return { success: true, message: "Pureza modificada con éxito." };
    } catch (error) {
      console.error("IPC update-purity failed:", error);

      const message =
        error instanceof Error ? error.message : "No se pudo modificar la pureza por un problema desconocido.";
      return { success: false, message };
    }
  });
}
