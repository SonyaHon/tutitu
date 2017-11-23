let tabs = document.querySelector('.tabs');
let content = document.querySelector('.tab_content');

function Tab(title, idx, ctx, listener) {
    this.el = document.createElement('div');
    this.el.classList.add('Tab');
    this.title = document.createElement('span');
    this.title.classList.add('Tab-title');
    this.title.innerText = title;
    this.listener = listener;
    this.content = ctx;   
    this.el.appendChild(this.title);
    this.el.addEventListener('click', function() {
        this.fire('tab_chosed', idx);
    }.bind(this));
}

Tab.prototype.fire = function(event, args) {
    this.listener.on(event, args);
}

Tab.prototype.setCtx = function() {
    content.innerHTML = this.content.el || this.content;
}

function TabBar(bar, context) {
    this.el = bar;
    this.tabs = [];
    this.ctx = context;
}

TabBar.prototype.addTab = function(title, ctx) {
    let tab = new Tab(title, this.tabs.length, ctx, this);
    this.tabs.push(tab);
    this.el.appendChild(tab.el);

    this.updateSizes();

}

TabBar.prototype.updateSizes = function() {
    var amount = this.tabs.length;
    var one = 100 / amount;
    for(var i = 0; i < amount; i++) {
        this.tabs[i].el.style.width = one + '%';
    }
}

TabBar.prototype.on = function(evt, arg) {
    
    if(evt === 'tab_chosed') {

        for(var i = 0; i < this.tabs.length; i++) {
            if(i === arg) {
                this.tabs[i].el.classList.remove('Tab-active');
                this.tabs[i].el.classList.add('Tab-active');
                this.setCtx(i);
            }
            else {
                this.tabs[i].el.classList.remove('Tab-active');
            }
        }
    }
}

TabBar.prototype.setCtx = function(idx) {
    this.ctx.innerHTML = "";
    this.ctx.appendChild(this.tabs[idx].content);
}

var tabsbar = new TabBar(tabs, content);

var start = document.createElement('div');
var stbtn = document.createElement('button');
stbtn.innerText = "Start App";
stbtn.className = 'Button-Big';
start.appendChild(stbtn);
tabsbar.addTab('Launch', start);

var settings = document.createElement('div');
settings.innerText = 'Settings';

tabsbar.addTab('Settings', settings);
tabsbar.on('tab_chosed', 0);