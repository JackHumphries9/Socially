import { contextBridge, ipcRenderer } from "electron";
const apiKey = "electron";
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  versions: process.versions,
  isFullscreen: false,
  minimize: () => {
    ipcRenderer.send("minimize");
  },
  maximize: () => {
    ipcRenderer.send("maximize");
  },
  close: () => {
    ipcRenderer.send("close");
  },
  restore: () => {
    ipcRenderer.send("restore");
  },
  getPlatform: () => {
    return process.platform;
  },
  isMaximised: async () => {
    const r: Promise<boolean> = await ipcRenderer.invoke("isMaximized");
    return r;
  },
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
