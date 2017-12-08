/*
 * Player has 3 stats - money, reputation, upgrades and level
 * money - ur money if u are in red, u lost. U can spend them to buy stuff and upgrades
 * reputation - how much customers u have. The more customers u have the harder to u to service them, and the faster u will nbe selling ur goods
 * level - each level requires some money to be rotated to achive. Each level u granted some money bonus and 1 of 3 perks to choose.
 * upgrades - already purchased upgrades
 * 
 * Player has a stock - place where he stores hos goods. It has 3 attributes - stock-size, stock-free-space, stock-goods
 * stock-size - maximum capacity of stock (can be changed throw upgrades and levels)
 * stock-free-space - free space of the stock
 * stock-goods - all goods stored in stock tight now
*/

function StatsItem(lbl, sign) {
    this.sign = sign;
    this.el = document.createElement('div');
    this.el.classList.add('player-stats-item');
    this.lbl = document.createElement('span');
    this.lbl.classList.add('player-stats-item-label');
    this.lbl.innerText = lbl + ':';
    this.value = document.createElement('span');
    this.value.innerText = '' + sign;
}

StatsItem.prototype.changeValue = function(value) {
    this.value.innerText = value + sign;
}

function PlayerST() {
    this.player_data = null;
    this.listeners = [];
    // Do not directly touch this
    // Only use public props
    this.__raw_data = {
        money: null,
        stock: null,
        level: null,
        reputation: null,
        upgrades: null
    }

    this.el = document.createElement('div');
    this.el.classList.add('player');
    this.stats = document.createElement('div');
    this.stats.classList.add('player-stats');
    this.stock = document.createElement('div');
    this.stock.classList.add('player-stock');

    var mitem = new StatsItem('money', '$');
    var litem = new StatsItem('level', '');
    var repitem = new StatsItem('reputation', '¢');

    this.stats.appendChild(mitem);
    this.stats.appendChild(repitem);
    this.stats.appendChild(litem);

    this.money = {
        set: function(value) {
            this.__raw_data.money = value;
            this.fire('prop_money_changed', value);
        },
        get: function() {
            return this.__raw_data.money;
        }
    }

    this.level = {
        set: function(value) {
            this.__raw_data.level = value;
            this.fire('prop_level_changed', value);
        },
        get: function() {
            return this.__raw_data.level;
        }
    }

    this.upgrades = {
        set: function(value) {
            this.__raw_data.upgrades = value;
            this.fire('prop_upgrades_changed', value);
        },
        get: function() {
            return this.__raw_data.upgrades;
        }
    }

    this.reputation = {
        set: function(value) {
            this.__raw_data.reputation = value;
            this.fire('prop_reputation_changed', value);
        },
        get: function() {
            return this.__raw_data.reputation;
        }
    }


    this.stock = {
        set: function(value) {
            this.__raw_data.stock = value;
        },
        get: function() {
            return this.__raw_data.stock;
        }
    }
}

PlayerST.prototype.init = function(player_data) {
    this.player_data = player_data;
    this.money.set(player_data.money);
    this.level.set(player_data.level);
    this.reputation.set(player_data.reputation);
    this.upgrades.set(player_data.upgrades);
    this.stock.set(player_data.stock);
}

PlayerST.prototype.add_listener = function(listener) {
    this.listeners.push(listener);
}

PlayerST.prototype.remove_listener = function(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
}

PlayerST.prototype.fire = function(name, data) {
    this.listeners.forEach(function(listener) {
        if(listener.on) listener.on(name, data);
        else throw Error("This lisnere missing on function", listener, name, data);
    }, this);
}