function CTX_TEMPLATE(header) {
	PObject.call(this);

	this.el = document.createElement('div');
	this.el.classList.add('ctx_template_body');
	this.header = document.createElement('div');
	this.header.classList.add('ctx_template_header');
	this.header.innerText = header;
	this.el.appendChild(this.header);
	this.content = document.createElement('div');
	this.content.classList.add('ctx_template_content');
	this.el.appendChild(this.content);
}

CTX_TEMPLATE.prototype = Object.create(PObject.prototype);
CTX_TEMPLATE.prototype.constructor = CTX_TEMPLATE;

CTX_TEMPLATE.prototype.init = function() {};

CTX_TEMPLATE.prototype.appendChild = function(child) {
	this.content.appendChild(child);
};


// ------------------------------------------------------------------------------------------ BUY CONTEXT -------------------------------------------------------------

function BuyCtx(header) {
	CTX_TEMPLATE.call(this, header);
}

BuyCtx.prototype = Object.create(CTX_TEMPLATE.prototype);
BuyCtx.prototype.constructor = BuyCtx;

BuyCtx.prototype.init = function() {
	this.info = document.createElement('div');
	this.info.classList.add('buy_goods_info');


	this.items_list = document.createElement('div');
	this.items_list.classList.add('buy_good_item_list');
	
	this.appendChild(this.info);
	this.appendChild(this.items_list);
}

// ------------------------------------------------------------------------------------------ SELL CONTEXT -------------------------------------------------------------

// ------------------------------------------------------------------------------------------ UPGRADE CONTEXT -------------------------------------------------------------

// ------------------------------------------------------------------------------------------ SHOPS CONTEXT -------------------------------------------------------------