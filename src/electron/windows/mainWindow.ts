import { app, BrowserWindow, Menu } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import windowStateKeeper from "electron-window-state";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createMainWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1280,
    defaultHeight: 800,
  });

  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    show: false,
    frame: false,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(process.resourcesPath, "dist-electron", "electron", "preload.cjs")
        : path.join(__dirname, "../preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindowState.manage(mainWindow);

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  Menu.setApplicationMenu(null);

  return mainWindow;
}
