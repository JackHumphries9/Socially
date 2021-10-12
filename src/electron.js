// Modules to control application life and create native browser window
const { app, BrowserWindow, shell, Menu } = require("electron");
const config = require("electron-json-config");
const path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let isDev = true;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 675,
        toolbar: false,
        titleBarStyle: "hiddenInset",
        frame: config.get("titlebar") === "native" ? true : false,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: "#1A2933",
        fullscreenable: false,
        fullscreen: false,
        icon: __dirname + `/src/assets/icons/app-icons/icon.icns`,
        webPreferences: {
            devTools: isDev,
            nodeIntegration: false,
            enableRemoteModule: true,
            webviewTag: true,
            scrollBounce: true,
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.setMenuBarVisibility(false);

    const isMac = process.platform === "darwin";

    const template = [
        // { role: 'appMenu' }
        ...(isMac
            ? [
                  {
                      label: app.name,
                      submenu: [
                          { role: "about" },
                          { type: "separator" },
                          { role: "services" },
                          { type: "separator" },
                          { role: "hide" },
                          { role: "hideothers" },
                          { role: "unhide" },
                          { type: "separator" },
                          { role: "quit" },
                      ],
                  },
              ]
            : []),
        // { role: 'fileMenu' }
        {
            label: "File",
            submenu: [isMac ? { role: "close" } : { role: "quit" }],
        },
        // { role: 'editMenu' }
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                ...(isMac
                    ? [
                          { role: "pasteAndMatchStyle" },
                          { role: "delete" },
                          { role: "selectAll" },
                          { type: "separator" },
                          {
                              label: "Speech",
                              submenu: [
                                  { role: "startSpeaking" },
                                  { role: "stopSpeaking" },
                              ],
                          },
                      ]
                    : [
                          { role: "delete" },
                          { type: "separator" },
                          { role: "selectAll" },
                      ]),
            ],
        },
        // { role: 'viewMenu' }
        {
            label: "View",
            submenu: [{ role: "reload" }],
        },
        // { role: 'windowMenu' }
        {
            label: "Window",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                ...(isMac
                    ? [
                          { type: "separator" },
                          { role: "front" },
                          { type: "separator" },
                          { role: "window" },
                      ]
                    : [{ role: "close" }]),
            ],
        },
        {
            role: "help",
            submenu: [
                {
                    label: "Learn More",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal("https://electronjs.org");
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // and load the index.html of the app.
    // DISABLE ON BUNDLE

    if (isDev) {
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadFile("build/index.html");
    }

    app.on("web-contents-created", (e, contents) => {
        // Check for a webview
        if (contents.getType() === "webview") {
            // Listen for any new window events
            contents.on("new-window", (e, url) => {
                e.preventDefault();
                shell.openExternal(url);
            });
        }
    });

    // Open the DevTools.
    if (isDev) {
        mainWindow.openDevTools({ detach: true });
    }

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
