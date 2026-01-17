import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "../util.js";
import { getPreloadPath } from "../pathResolver.js";

export function createMainWindow() {
  const mainWindow = new BrowserWindow({
    frame: false,
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

  return mainWindow;
}
