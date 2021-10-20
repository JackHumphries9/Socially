import {
	app,
	BrowserWindow,
	IpcMain,
	ipcMain,
	IpcMainInvokeEvent,
} from "electron";
import { join } from "path";
import { URL } from "url";

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
	app.quit();
	process.exit(0);
}

app.disableHardwareAcceleration();

app.setAboutPanelOptions({
	applicationName: "Socially",
	applicationVersion: "2.0",
	credits: "Jack Humphries",
	authors: ["Jack Humphries"],
	website: "https://getsocially.app",
});

// Install "Vue.js devtools"
if (import.meta.env.MODE === "development") {
	app.whenReady()
		.then(() => import("electron-devtools-installer"))
		.catch((e) => console.error("Failed install extension:", e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
	mainWindow = new BrowserWindow({
		show: false, // Use 'ready-to-show' event to show window
		frame: false, // add dev mode
		titleBarStyle: "hiddenInset",
		webPreferences: {
			nativeWindowOpen: true,
			webviewTag: true,
			preload: join(__dirname, "../../preload/dist/index.cjs"),
		},
	});

	/**
	 * If you install `show: true` then it can cause issues when trying to close the window.
	 * Use `show: false` and listener events `ready-to-show` to fix these issues.
	 *
	 * @see https://github.com/electron/electron/issues/25012
	 */
	mainWindow.on("ready-to-show", () => {
		mainWindow?.show();

		if (import.meta.env.MODE === "development") {
			mainWindow?.webContents.openDevTools();
		}
	});

	/**
	 * URL for main window.
	 * Vite dev server for development.
	 * `file://../renderer/index.html` for production and test
	 */
	const pageUrl =
		import.meta.env.MODE === "development" &&
		import.meta.env.VITE_DEV_SERVER_URL !== undefined
			? import.meta.env.VITE_DEV_SERVER_URL
			: new URL(
					"../renderer/dist/index.html",
					"file://" + __dirname
			  ).toString();

	ipcMain.on("minimize", () => {
		mainWindow?.minimize();
	});
	ipcMain.on("maximize", () => {
		mainWindow?.maximize();
	});
	ipcMain.on("close", () => {
		mainWindow?.close();
		app.quit();
	});
	ipcMain.on("restore", () => {
		mainWindow?.restore();
	});

	ipcMain.handle("isMaximized", (e: IpcMainInvokeEvent) => {
		const isMax = mainWindow?.isMaximized();
		return isMax;
	});

	ipcMain.handle("isFullscreen", (e: IpcMainInvokeEvent) => {
		const isFull = mainWindow?.isFullScreen();
		return isFull;
	});

	await mainWindow.loadURL(pageUrl);
};

app.on("second-instance", () => {
	// Someone tried to run a second instance, we should focus our window.
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.whenReady()
	.then(createWindow)
	.catch((e) => console.error("Failed create window:", e));

// Auto-updates
if (import.meta.env.PROD) {
	app.whenReady()
		.then(() => import("electron-updater"))
		.then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
		.catch((e) => console.error("Failed check updates:", e));
}
