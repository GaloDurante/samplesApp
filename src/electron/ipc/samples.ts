import { ipcMain } from "electron";
import { getSamples } from "../services/samples.js";

export function registerSamplesIPC() {
  ipcMain.handle("get-samples", (_event, page, pageSize, filters) => getSamples(page, pageSize, filters));
}
