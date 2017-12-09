var {ipcRenderer} = require('electron');
var config = JSON.parse(ipcRenderer.sendSync('getconfig'));
var player_data = JSON.parse(ipcRenderer.sendSync('getplayerdata'));

var current_player_data = {
    player: {
        money: 100,
        level: 0,
        reputation: 0,
        upgrades: [],
        stock: {maxCap: 100, freeSps: 100, st: []}
    }
}

var pl = new PlayerST();
pl.init(current_player_data.player);
document.getElementById("player").appendChild(pl.el);
pl.on('prop_money_changed', function(val) {
    current_player_data.player.money = val;
});
pl.on('prop_level_changed', function(val) {
    current_player_data.player.level = val;
});
pl.on('prop_reputation_changed', function(val) {
    current_player_data.player.reputation = val;
});
pl.on('prop_upgrades_changed', function(val) {
    current_player_data.player.upgrades = val;
});
pl.on('prop_stock_changed', function(val) {
    current_player_data.player.stock = val;
});