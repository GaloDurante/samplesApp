import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

import { initDatabase } from "./database/index.js";
import { registerClientsIPC } from "./ipc/clients.js";
import { registerSamplesIPC } from "./ipc/samples.js";
import { registerAnalysisIPC } from "./ipc/sample/analysis.js";

app.whenReady().then(async () => {
  await initDatabase();
  registerClientsIPC();
  registerSamplesIPC();
  registerAnalysisIPC();

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
