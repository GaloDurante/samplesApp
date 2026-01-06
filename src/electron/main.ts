import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

import { initDatabase } from "./database/init.js";
import { registerClientsIPC } from "./ipc/clients.js";
import { registerSamplesIPC } from "./ipc/samples.js";
import { registerAnalysisIPC } from "./ipc/sample/analysis.js";
import { registerPurityIPC } from "./ipc/sample/purity.js";

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

  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }
});
