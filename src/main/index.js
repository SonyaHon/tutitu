var actionsNstats = document.getElementById('actionsNstats');
var stock = document.getElementById('stock');
var {ipcRenderer} = require('electron');
var config = JSON.parse(ipcRenderer.sendSync('getconfig'));
var player_data = JSON.parse(ipcRenderer.sendSync('getplayerdata'));

