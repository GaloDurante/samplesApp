import { ipcMain } from "electron";

export function registerMenuIPC() {
  ipcMain.on("open-dev-tools", (event) => {
    event.sender.openDevTools();
  });
}
