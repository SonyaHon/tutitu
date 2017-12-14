/**
 * Class that supports event system
 */
function PObject() {
	this.listeners = [];
	this.tracked_callbacks = {};
	this.add_listener(this);
}


/**
 * Fire an event
 * @param  {string} evt_name event name
 * @param  {any} arg      1 argument
 * @return {void}          none
 */
PObject.prototype.fire = function(evt_name, arg) {
	var args = [];
	for(var i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}

	this.listeners.forEach(function(listener) {
		if(listener.tracked_callbacks && listener.tracked_callbacks[evt_name]) {
			listener.tracked_callbacks[evt_name].apply(listener, args);
		}
	});
};

/**
 * attach callback to the event
 * @param  {string} evt_name event name
 * @param  {function} clb      callback
 */
PObject.prototype.on = function(evt_name, clb) {
	this.tracked_callbacks[evt_name] = clb;
};

PObject.prototype.add_listener = function(listener) {
	if(this.listeners.indexOf(listener) === -1) {
		this.listeners.push(listener);
	}
};
PObject.prototype.remove_listener = function(listener) {
	if(this.listeners.indexOf(listener) !== -1) {
		this.listeners.splice(this.listeners.indexOf(listener), 1);
	}	
};