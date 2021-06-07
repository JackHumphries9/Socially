const { remote, contextBridge, shell } = require("electron");
const config = require("electron-json-config");
const os = require("os");

console.log("Config file located at: " + config.file());

// TODO: Rewrite this file using IPC rather than remote

contextBridge.exposeInMainWorld("socially", {
	winControls: {
		close() {
			remote.app.exit();
		},
		minimize() {
			remote.getCurrentWindow().minimize();
		},
		maximize() {
			remote.getCurrentWindow().maximize();
		},
		restore() {
			remote.getCurrentWindow().unmaximize();
		},
		isMaximized() {
			return remote.getCurrentWindow().isMaximized();
		},
	},
	appdata: {
		clear() {
			config.purge();
			remote.app.relaunch();
			remote.app.exit(0);
		},
		getLastApp() {
			return config.get("lastApp");
		},
		setLastApp(name) {
			config.set("lastApp", name);
		},
		isEnabled(name) {
			return config.get(`app.${name}.enabled`);
		},
		setEnabled(name, value) {
			config.set(`app.${name}.enabled`, value);
		},
		getTitlebar() {
			if (config.get("titlebar") === undefined) {
				if (os.platform() === "win32") {
					config.set(`titlebar`, "win");
				} else if (os.platform() === "darwin") {
					config.set("titlebar", "mac");
				} else {
					config.set("titlebar", "native");
					remote.app.relaunch();
					remote.app.exit(0);
				}
			}

			if (config.get("titlebar") === "win") {
				return "win";
			} else if (config.get("titlebar") === "mac") {
				return "mac";
			} else if (config.get("titlebar") === "native") {
				return "native";
			} else {
				return "win";
			}
		},
		hasSetup() {
			return config.get("hasSetup");
		},
		welcome(socialData) {
			var p = 1;
			socialData.forEach((i) => {
				config.set(`app.${i.name}.enabled`, i.enabled);
				config.set(`app.${i.name}.position`, p);
				p = p + 1;
			});

			config.set("lastApp", "first-time");

			config.set("hasSetup", true);
			remote.app.relaunch();
			remote.app.exit(0);
		},
	},
	settings: {
		openSociallySite() {
			shell.openExternal("https://getsocially.app");
		},
		openJPH() {
			shell.openExternal("https://jackhumphries.co.uk");
		},
	},
});
