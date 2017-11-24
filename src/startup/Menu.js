function MenuOfChangeableProps(el, config) {
    this.el = el;
    this.config = config;
    this.el.style.display = 'flex';

    this.menu = document.createElement('div');
    this.menu.className = 'Menu';
    this.el.appendChild(this.menu);

    this.ctx = document.createElement('div');
    this.ctx.className = 'Menu-Content';
    this.el.appendChild(this.ctx);

    this.categories = [];

    for(var cat in this.config) {
        var ntab = new MenuTab(cat, this.categories.length, this.config[cat], this);
        this.categories.push(ntab);
        this.menu.appendChild(ntab.el);
    }
    this.on(0);
}

MenuOfChangeableProps.prototype.changeCtx = function(idx) {
    this.ctx.innerHTML = "";
    this.ctx.appendChild(this.categories[idx].ctx);
}

MenuOfChangeableProps.prototype.on = function(arg) {
    for(var i = 0; i < this.categories.length; i++) {
        if(i === arg) {
            this.categories[i].el.classList.remove('Menu-Tab-active');
            this.categories[i].el.classList.add('Menu-Tab-active');
            this.changeCtx(i);
        }
        else {
            this.categories[i].el.classList.remove('Menu-Tab-active');
        }
    }
}

function MenuTab(title, idx, config, listener) {
    this.el = document.createElement('div');
    this.el.className = 'Menu-Tab';
    this.title = document.createElement('span');
    this.title.className = 'Menu-Tab_title';
    this.title.innerText = title;
    this.el.appendChild(this.title);
    this.idx = idx;
    this.config = config;
    this.listener =  listener;
    this.el.addEventListener('click', function() {
        this.fire(this.idx);
    }.bind(this));
    this.createCtx();
}

MenuTab.prototype.fire = function(idx) {
    this.listener.on(idx);
}

MenuTab.prototype.createCtx = function() {
    this.ctx = document.createElement('div');
    this.ctx.className = 'Menu-Tab_content';
    this.props = [];
    
    for(var param in this.config) {
        var obj = this.config[param];
        if(obj.type === 'switch') {
            this.createSwitch(param, obj.value);
        }
        else if(obj.type === 'slider') {
           this.createSlider(param, obj.value, obj.props);
        }
        else if(obj.type.match(/input\|(.*)/)) {
            this.createInput(param, obj.value, obj.type.match(/input\|(.*)/)[1]);
        }
        else if(obj.type === 'list') {
            this.createList(param, obj.value, obj.props);
        }
    }
}

MenuTab.prototype.createSwitch = function (param, val) {
    var elem = document.createElement('div');
    elem.className = 'Menu-Prop';
    var name = document.createElement('span');
    name.className = 'Menu-Prop-name';
    name.innerText = param;
    var value = document.createElement('span');
    value.className = 'Menu-Prop-value';
    var switc = document.createElement('label');
    switc.className = 'switch';
    var input = document.createElement('input');
    input.type = 'checkbox';
    var sld = document.createElement('span');
    sld.className = "slider round";
    elem.appendChild(name);
    elem.appendChild(value);
    value.appendChild(switc);
    switc.appendChild(input);
    switc.appendChild(sld);
    input.checked = val;
    this.ctx.appendChild(elem);
}

MenuTab.prototype.createInput = function (param, val, type) {
    var elem = document.createElement('div');
    elem.className = 'Menu-Prop';
    var name = document.createElement('span');
    name.className = 'Menu-Prop-name';
    name.innerText = param;
    var value = document.createElement('span');
    value.className = 'Menu-Prop-value';

    let valuecompound = document.createElement('span');
    Object.assign(valuecompound.style, {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    });
    let input = document.createElement('input');
    if(type === 'num') {
        let minus  = document.createElement('i');
        minus.className = 'material-icons Menu-Prop-Num-Button';
        minus.innerText = 'remove';
        minus.addEventListener('click', function() {
            input.value = Number(input.value) - 1;
        });
        valuecompound.appendChild(minus);

        input.type = 'number'
        input.className = 'Menu-Prop-input Menu-Prop-input-num';
        valuecompound.appendChild(input);

        let plus  = document.createElement('i');
        plus.className = 'material-icons Menu-Prop-Num-Button';
        plus.innerText = 'add';
        plus.addEventListener('click', function() {
            input.value = Number(input.value) + 1;
        });
        valuecompound.appendChild(plus);
        
    }
    else {
        input.className = 'Menu-Prop-input Menu-Prop-input-text';
        valuecompound.appendChild(input);
    }

    input.value = val;

    value.appendChild(valuecompound);
    elem.appendChild(name);
    elem.appendChild(value);
    this.ctx.appendChild(elem);
}

MenuTab.prototype.createSlider = function (param, val, props) {
    var elem = document.createElement('div');
    elem.className = 'Menu-Prop';
    var name = document.createElement('span');
    name.className = 'Menu-Prop-name';
    name.innerText = param;
    var value = document.createElement('span');
    value.className = 'Menu-Prop-value';

    let input = document.createElement('input');
    input.type = 'range';
    input.min = props.from;
    input.max = props.to;
    input.step = props.step;
    input.value = val;
    input.className = 'Menu-Prop-Slider-slider';
    value.appendChild(input);

    let t2 = document.createElement('span');
    t2.className = 'Menu-Prop-Slider-value';
    t2.innerText = input.value;
    value.appendChild(t2);
    input.addEventListener('input', function() {
       t2.innerText = input.value; 
    });

    elem.appendChild(name);
    elem.appendChild(value);
    this.ctx.appendChild(elem);
}

MenuTab.prototype.createList = function (param, val, props) {
    var elem = document.createElement('div');
    elem.className = 'Menu-Prop';
    var name = document.createElement('span');
    name.className = 'Menu-Prop-name';
    name.innerText = param;
    var value = document.createElement('span');
    value.className = 'Menu-Prop-value';

    let list = new List(val, props.data);
    value.appendChild(list.el);

    let btn = document.createElement('i');
    btn.className = 'material-icons Menu-Prop-List-Btn Menu-Prop-List-Btn-Unchecked';
    btn.innerText = 'more_horiz';
    btn.toggled = false;
    value.appendChild(btn);

    btn.addEventListener('click', function() {
        btn.toggled = !btn.toggled;
        if(btn.toggled) {
            btn.classList.add('Menu-Prop-List-Btn-Checked');
            btn.classList.remove('Menu-Prop-List-Btn-Unchecked');
            list.show();
        }
        else {
            btn.classList.remove('Menu-Prop-List-Btn-Checked');
            btn.classList.add('Menu-Prop-List-Btn-Unchecked');
            list.close();
        }
    });

    elem.appendChild(name);
    elem.appendChild(value);
    this.ctx.appendChild(elem);
}

function List(val, props) {
    this.max_elems = 7;
    this.el = document.createElement('div');
    this.el.className = 'List List-Collapsed';

    this.labels = [];

    this.toggled = false;
    this.choosen = val;
    this.props = props;

    this.heightOfTheBox = props.length < this.max_elems ? props.length : this.max_elems;
    this.createLabel(this.props[this.choosen]);
    this.el.appendChild(this.labels[0]);
}
List.prototype.listLableCallback = function() {}

List.prototype.createLabel = function(text) {
    let lable = document.createElement('div');
    lable.className = 'List-Label List-Lable-Inline';
    lable.innerText = text;
    this.labels.push(lable);
}

List.prototype.show = function() {
    // create new labels
    this.labels = [];
    this.el.innerHTML = "";
    this.el.classList.remove('List-Collapsed');
    this.el.classList.add('List-Shown');
    console.log(this.choosen);
    for(var i = 0; i < this.heightOfTheBox; i++) {
        this.createLabel(this.props[i]);
        this.el.appendChild(this.labels[i]);
        this.labels[i].classList.remove('List-Lable-Inline');
        this.labels[i].classList.add('List-Lable-Unchoosed');
        if(i === this.choosen) {
            this.labels[i].classList.remove('List-Lable-Unchoosed');
            this.labels[i].classList.add('List-Lable-Choosed');   
        }
    }

    // count how much up or down i need to go
    

}

List.prototype.close = function() {

    this.labels = [];
    this.el.innerHTML = "";
    this.el.classList.add('List-Collapsed');
    this.el.classList.remove('List-Shown');
    this.createLabel(this.props[this.choosen]);
    this.el.appendChild(this.labels[0]);
}
//TODO: finish up the list type of input 