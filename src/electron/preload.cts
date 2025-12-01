const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  getSamples: () => console.log("getSamples"),
});
