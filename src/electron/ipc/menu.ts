import { ipcMain, BrowserWindow } from "electron";

export function registerMenuIPC() {
  ipcMain.on("open-dev-tools", (event) => {
    event.sender.openDevTools();
  });

  ipcMain.on("window-minimize", () => {
    BrowserWindow.getFocusedWindow()?.minimize();
  });
  ipcMain.on("window-maximize", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win?.isMaximized()) win.unmaximize();
    else win?.maximize();
  });
  ipcMain.on("window-close", () => {
    BrowserWindow.getFocusedWindow()?.close();
  });
}
