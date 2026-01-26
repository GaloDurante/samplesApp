import { app } from "electron";

import { createMainWindow } from "./windows/mainWindow.js";

import { initDatabase } from "./database/init.js";
import { registerClientsIPC } from "./ipc/clients.js";
import { registerSamplesIPC } from "./ipc/samples.js";
import { registerAnalysisIPC } from "./ipc/sample/analysis.js";
import { registerPurityIPC } from "./ipc/sample/purity.js";
import { registerGerminationIPC } from "./ipc/sample/germination.js";
import { registerHumidityIPC } from "./ipc/sample/humidity.js";
import { registerCertificateIPC } from "./ipc/certificate.js";
import { registerMenuIPC } from "./ipc/menu.js";

app.whenReady().then(async () => {
  try {
    await initDatabase();
  } catch {
    console.warn("Failed to initialize database, quitting app");
    app.quit();
    return;
  }
  registerClientsIPC();
  registerSamplesIPC();
  registerAnalysisIPC();
  registerPurityIPC();
  registerGerminationIPC();
  registerHumidityIPC();
  registerCertificateIPC();
  registerMenuIPC();

  createMainWindow();
});
