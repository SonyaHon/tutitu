/*
 * Player has 3 stats - money, reputation, upgrades and level
 * money - ur money if u are in red, u lost. U can spend them to buy stuff and upgrades
 * reputation - how much customers u have. The more customers u have the harder to u to service them, and the faster u will nbe selling ur goods
 * level - each level requires some money to be rotated to achive. Each level u granted some money bonus and 1 of 3 perks to choose.
 * upgrades - already purchased upgrades
 * 
 * Player has a stock - place where he stores hos goods. It has 3 attributes - stock-size, stock-free-space, stock-goods
 * stock-size - maximum capacity of stock (can be changed throw upgrades and levels)
 * stock-filled-space - free space of the stock
 * stock-goods - all goods stored in stock tight now
*/

function StockItem(item) {
    this.el = document.createElement('div');
    this.el.classList.add('player-stock-list-item');
    this.name = document.createElement('span');
    this.name.innerText = item.item.name;
    this.priceForOne = document.createElement('span');
    this.priceForOne.innerText = item.item.price;
    this.amount = document.createElement('span');
    this.amount.innerText = item.amount;
    this.el.appendChild(this.name);
    this.el.appendChild(this.priceForOne);
    this.el.appendChild(this.amount);
}

function StockList() {
    this.stock = [];
    this.stock_els = [];
    this.el = document.createElement('div');
    this.el.classList.add('player-stock-list');
}

StockList.prototype.update = function(list) {
    this.stock = list;
    this.stock_els = [];
    this.stock.forEach(function(elem) {
        var item = new StockItem(elem);
        this.stock_els.push(item);
    }.bind(this));
    while(this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
    }
    this.stock_els.forEach(function(elem) {
        this.el.appendChild(elem.el);
    }.bind(this));
}

function StockData() {
    this.maxcap = document.createElement('span');
    this.filledspace = document.createElement('span');
    this.el = document.createElement('span');
    this.max_cap_impl = 0;
    this.filled_space_impl = 0;
    this.maxcap.innerText = this.max_cap_impl;
    this.filledspace.innerText = this.filled_space_impl;
    var sepp = document.createElement('span');
    sepp.innerText = '/';
    this.el.appendChild(this.filledspace);
    this.el.appendChild(sepp);
    this.el.appendChild(this.maxcap);
}

StockData.prototype.changeMaxCap = function(val) {
    this.max_cap_impl = val;
    this.maxcap.innerText = val;
}

StockData.prototype.changeFilledSpace = function(val) {
    this.filled_space_impl = val;
    this.filledspace.innerText = val;
}

StockData.prototype.changeValues = function(max, filled) {
    this.changeMaxCap(max);
    this.changeFilledSpace(filled);
}

function StatsItem(lbl, sign) {
    this.sign = sign;
    this.el = document.createElement('div');
    this.el.classList.add('player-stats-item');
    this.lbl = document.createElement('span');
    this.lbl.classList.add('player-stats-item-label');
    this.lbl.innerText = lbl + ':';
    this.value = document.createElement('span');
    this.value.classList.add('player-stats-item-value');
    this.value.innerText = '' + sign;
    this.el.appendChild(this.lbl);
    this.el.appendChild(this.value);
}

StatsItem.prototype.changeValue = function(value) {
    this.value.innerText = value + this.sign;
}

function PlayerST() {
    this.player_data = null;
    this.listeners = [];
    this.eventclbs = {};
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
    this.el.classList.add('player-main');
    this.stats = document.createElement('div');
    this.stats.classList.add('player-stats');
    this.stats.classList.add('panel');
    this.stock = document.createElement('div');
    this.stock.classList.add('player-stock');
    this.stock.classList.add('panel');
 

    // ----------------------------------------------------- STATS AND ACTIONS ---------------------
    this.mitem = new StatsItem('Money', '$');
    this.litem = new StatsItem('Level', '');
    this.repitem = new StatsItem('Reputation', '¢');

    this.stats.appendChild(this.mitem.el);
    this.stats.appendChild(this.repitem.el);
    this.stats.appendChild(this.litem.el);

    this.act_buy = document.createElement('button');
    this.act_buy.classList.add('Button');
    this.act_buy.classList.add('Button-small');
    this.act_buy.innerText = 'Buy Goods';
    this.act_buy.addEventListener('click', function() {
        // Mess with buy goods stuff
    }.bind(this))
    this.stats.appendChild(this.act_buy);

    this.act_buy_ups = document.createElement('button');
    this.act_buy_ups.classList.add('Button');
    this.act_buy_ups.classList.add('Button-small');
    this.act_buy_ups.innerText = 'Buy Upgrades';
    this.act_buy_ups.addEventListener('click', function() {
        // Mess with buy upgrades stuff
    }.bind(this))
    this.stats.appendChild(this.act_buy_ups);
    
    this.act_sell = document.createElement('button');
    this.act_sell.classList.add('Button');
    this.act_sell.classList.add('Button-small');
    this.act_sell.innerText = 'Sell Goods';
    this.act_sell.addEventListener('click', function() {
        // Mess with sell goods stuff
    }.bind(this))
    this.stats.appendChild(this.act_sell);
    this.el.appendChild(this.stats);

    // ----------------------------------------------------- STOCK ---------------------------------
    
    this.stock_general_data = document.createElement('div');
    this.stock_general_data.classList.add('player-stock-general');
    var st_name = document.createElement('span');
    st_name.innerText = "Stock:";
    this.stock_data = new StockData();
    this.stock_general_data.appendChild(st_name);
    this.stock_general_data.appendChild(this.stock_data.el);
    this.stock.appendChild(this.stock_general_data);

    var hr = document.createElement('hr');
    this.stock.appendChild(hr);

    this.stock_list = new StockList();
    this.stock.appendChild(this.stock_list.el);

    this.el.appendChild(this.stock);

    // ----------------------------------------------------- Player Data ----------------------------
    this.money = {
        set: function(value) {
            this.__raw_data.money = value;
            this.mitem.changeValue(value);
            this.fire('prop_money_changed', value);
        }.bind(this),
        get: function() {
            return this.__raw_data.money;
        }.bind(this)
    }

    this.level = {
        set: function(value) {
            this.__raw_data.level = value;
            this.litem.changeValue(value);
            this.fire('prop_level_changed', value);
        }.bind(this),
        get: function() {
            return this.__raw_data.level;
        }.bind(this)
    }

    this.upgrades = {
        set: function(value) {
            this.__raw_data.upgrades = value;
            this.fire('prop_upgrades_changed', value);
        }.bind(this),
        get: function() {
            return this.__raw_data.upgrades;
        }.bind(this)
    }

    this.reputation = {
        set: function(value) {
            this.__raw_data.reputation = value;
            this.repitem.changeValue(value);
            this.fire('prop_reputation_changed', value);
        }.bind(this),
        get: function() {
            return this.__raw_data.reputation;
        }.bind(this)
    }


    this.stock = {
        set: function(value) {
            this.__raw_data.stock = value;
            this.stock_data.changeValues(value.max_capacity, value.filled_space);
            this.stock_list.update(value.items);
        }.bind(this),
        get: function() {
            return this.__raw_data.stock;
        }.bind(this)
    }
}

PlayerST.prototype.init = function(player_data) {
    this.player_data = player_data;
    this.money.set(player_data.money);
    this.level.set(player_data.level);
    this.reputation.set(player_data.reputation);
    this.upgrades.set(player_data.upgrades);
    this.stock.set(player_data.stock);
    this.add_listener(this);
}

PlayerST.prototype.add_listener = function(listener) {
    this.listeners.push(listener);
}

PlayerST.prototype.remove_listener = function(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
}

PlayerST.prototype.on = function(name, clb) {
    if(!this.eventclbs[name]){
        this.eventclbs[name] = [];
    }
    this.eventclbs[name].push(clb);
}

PlayerST.prototype.fire = function(name, data) {
    this.listeners.forEach(function(listener) {
        if(listener.eventclbs && listener.eventclbs[name]) {
             this.eventclbs[name].forEach(function(elem) {
                 elem(data);
             });
        }
        else throw Error("This lisnere missing on function", listener, name, data);
    }, this);
}