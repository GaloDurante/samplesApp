import { ipcMain } from "electron";
import { getSamples } from "../services/samples.js";

export function registerSamplesIPC() {
  ipcMain.handle("get-samples", () => getSamples());
}
