import { ipcMain, shell, app } from "electron";
import fs from "fs";
import path from "path";

import type { FullSample } from "../../types/sample.js";

import { generateCertificatePdfBuffer } from "../services/certificate.js";
import { safeFileName } from "../util.js";

export function registerCertificateIPC() {
  ipcMain.handle("certificate:generate", async (_event, data: FullSample) => {
    try {
      const buffer = await generateCertificatePdfBuffer(data);

      const downloadsDir = app.getPath("downloads");
      const filePath = path.join(downloadsDir, `certificado_${safeFileName(data.sampleNumber)}.pdf`);

      fs.writeFileSync(filePath, buffer);

      await shell.openPath(filePath);

      return { success: true, message: "PDF generado con éxito." };
    } catch (error) {
      console.error("Error generating certificate:", error);
      return { success: false, message: "Error generando el PDF solicitado." };
    }
  });
}
