import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';

let mainWindow;

let config = fs.readFileSync('./src/config.json');
config = JSON.parse(config);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true
  });

  mainWindow.loadURL(`file://${__dirname}/startup/starter.html`);
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

app.on('browser-window-created', function(evt, window) {
  window.setMenu(null);
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
    mainWindow.setResizable(false);
  }
});

ipcMain.on('getconfig', function(evt, arg) {
  evt.returnValue = JSON.stringify(config);
}); 

ipcMain.on('getplayerdata', function(evt, arg) {
  var dt = fs.readFileSync('./src/player_data.json');
  evt.returnValue = JSON.stringify(JSON.parse(dt));
}); 

ipcMain.on('newConfig', function(evt, arg) {

  var str = JSON.stringify(arg);
  fs.writeFileSync('./src/config.json', str);
  evt.returnValue = "OK";
});

ipcMain.on('exitApp', function(evt, arg) {
  app.quit();
});

ipcMain.on('startApp', function(evt, arg) {

  mainWindow.hide();
  var config = JSON.parse(fs.readFileSync('./src/config.json'));
  config = config.window;


  // U can get ur window prefs here from config.window

  var screen = config['window-resolution']
  screen = screen.props.data[screen.value].split(' x ');
  

  mainWindow = new BrowserWindow({
    width: parseInt(screen[0]),
    height: parseInt(screen[1]),
    fullscreen: config.fullscreen.value,
    resizable: false,  
    useContentSize: true
  }); 

  mainWindow.loadURL(`file://${__dirname}/main/index.html`);
  mainWindow.webContents.openDevTools();

  // U can send the new loading config parts to not shown page.

  mainWindow.show();
  mainWindow.on('closed', () => {
    mainWindow = null;
});

});