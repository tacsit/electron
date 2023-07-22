import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { app, shell, BrowserWindow, globalShortcut, ipcMain } from "electron";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";

let mainWindow;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 750,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === "linux" ? {} : {}),
		webPreferences: {
			preload: path.join(__dirname, "../preload/index.js"),
			nodeIntegration: true,
		},
	});

	mainWindow.on("ready-to-show", () => {
		mainWindow.show();
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
		mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
	} else {
		// start a local server to serve the renderer

		const server = http
			.createServer((req, res) => {
				const url = req.url === "/" ? "/index.html" : req.url;
				const filePath = path.join(__dirname, "../renderer", url);
				const ext = path.extname(filePath);
				const contentType =
					{
						".html": "text/html",
						".js": "text/javascript",
						".css": "text/css",
						".json": "application/json",
						".png": "image/png",
						".jpg": "image/jpg",
						".gif": "image/gif",
						".svg": "image/svg+xml",
						".wav": "audio/wav",
						".mp4": "video/mp4",
						".woff": "application/font-woff",
						".ttf": "application/font-ttf",
						".eot": "application/vnd.ms-fontobject",
						".otf": "application/font-otf",
						".wasm": "application/wasm",
					}[ext] || "application/octet-stream";

				// read file from file system
				fs.readFile(filePath, (error, content) => {
					_handleError(error, res);
					res.writeHead(200, { "Content-Type": contentType });
					res.write(content, "utf-8");
					res.end();

					function _handleError(error, res) {
						if (error) {
							if (error.code === "ENOENT") {
								res.writeHead(404);
								res.end("Not Found");
							} else {
								res.writeHead(500);
								res.end("Internal Server Error");
							}
						}
					}
				});
			})
			.listen(3000);

		mainWindow.loadURL("http://localhost:3000");
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows

	electronApp.setAppUserModelId("com.electron");

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
