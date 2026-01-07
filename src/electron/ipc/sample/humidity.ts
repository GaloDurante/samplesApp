import { ipcMain } from "electron";
import { createSampleHumidity, updateSampleHumidity } from "../../services/sample/humidity.js";

export function registerHumidityIPC() {
  ipcMain.handle("create-humidity", async (_event, sample) => {
    try {
      await createSampleHumidity(sample);
      return { success: true, message: "Contenido de humedad creado con éxito." };
    } catch (error) {
      console.error("IPC create-humidity failed:", error);

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo crear el contenido de humedad por un problema desconocido.";
      return { success: false, message };
    }
  });

  ipcMain.handle("update-humidity", async (_event, sample) => {
    try {
      await updateSampleHumidity(sample);
      return { success: true, message: "Contenido de humedad modificado con éxito." };
    } catch (error) {
      console.error("IPC update-humidity failed:", error);

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo modificar el contenido de humedad por un problema desconocido.";
      return { success: false, message };
    }
  });
}
