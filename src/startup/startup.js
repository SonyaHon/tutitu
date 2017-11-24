var tabs = document.querySelector('.tabs');
var content = document.querySelector('.tab_content');
var {ipcRenderer} = require('electron');

content.style.height = (window.innerHeight - 41) + 'px'

var tabsbar = new TabBar(tabs, content);

var start = document.createElement('div');
Object.assign(start.style, {
    display: 'flex',
    flexDirection: 'column'
})
var stbtn = document.createElement('button');
stbtn.innerText = "Start App";
stbtn.className = 'Button Button-Big';
start.appendChild(stbtn);

var exbtn = document.createElement('button');
exbtn.innerText = 'EXIT';
exbtn.className = 'Button Button-Big Button-Accent';
start.appendChild(exbtn);

stbtn.addEventListener('click', function() {
    console.log('App launched');
});
exbtn.addEventListener('click', function() {
    console.log('Exit App');
});

tabsbar.addTab('Launch', start);

var settings = document.createElement('div');
Object.assign(settings.style, {
    width: '100%',
    height: '100%'
});
var config = JSON.parse(ipcRenderer.sendSync('getconfig'));
var menu = new MenuOfChangeableProps(settings, config);

tabsbar.addTab('Settings', settings);

tabsbar.on(0);
