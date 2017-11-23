import { app, BrowserWindow } from 'electron';
import fs from 'fs';

let mainWindow;

let config = fs.readFileSync('./src/config.json');
config = JSON.parse(config);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(`file://${__dirname}/startup/starter.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
        mainWindow = null;
  });
};
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
