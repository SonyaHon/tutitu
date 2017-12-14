var _ITEMS_ARR = {
    test_item: {
        name: 'test',
        price: 10,
        size: 1,
        description: 'Test item'
    },
    test_item_2: {
    	name: 'sword',
    	price: 22,
    	size: 10,
    	description: 'Glorious Iron sword with leather around  its grip...'
    }
}

function ITEMS() {
	PObject.call(this);

	this.items_temps = _ITEMS_ARR;

	this.on('item_changed', function(item_name, new_val) {
		this.items_temps[item_name] = new_val;
		this.fire('changed');
	}.bind(this));
	this.on('group_changed', function(regex, vals) {
		console.log(this.items_temps);
		var props = [];
		for(var i = 1; i < arguments.length; i++) {
			props.push(arguments[i]);
		}
		Object.keys(this.items_temps).forEach(function(item) {
			if(item.match(regex)) {
				props.forEach(function(prop) {
					this.items_temps[item][prop.prop] = prop.val;
				}.bind(this));
			}
		}.bind(this));
		this.fire('changed');
	}.bind(this));
}

ITEMS.prototype = Object.create(PObject.prototype);
ITEMS.prototype.constructor = ITEMS;

ITEMS.prototype.getItem = function(item_name) {
	return this.items_temps[item_name];
};

var _ITEMS = new ITEMS();
