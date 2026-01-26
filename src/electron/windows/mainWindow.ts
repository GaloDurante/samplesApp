import { app, BrowserWindow, Menu } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createMainWindow() {
  const mainWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(process.resourcesPath, "dist-electron", "electron", "preload.cjs")
        : path.join(__dirname, "../preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }

  Menu.setApplicationMenu(null);

  return mainWindow;
}
