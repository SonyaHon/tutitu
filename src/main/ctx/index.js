/*
 *  Class for all menus, shops, upgrades, items etc.
 *  Needs functionality to change ctx to approperate menu
 *  with animations, blackjack and whores
 */



var CTXS = {

};

function Ctx(rootElelm) {
    this.rootElem = rootElelm;
    this.current_ctx = document.createElement('div');
    this.current_ctx.classList.add('ctx_body')
    this.current_ctx.classList.add('panel');
    this.rootElem.appendChild(this.current_ctx);
}

Ctx.prototype.change_ctx = function(ctx) {
	console.log(this.current_ctx);
	this.current_ctx.style.left = (this.current_ctx.clientWidth + 100) + 'px';

	while(this.current_ctx.firstChild) {
		this.current_ctx.removeChild(this.current_ctx.firstChild);
	}
	
	setTimeout(function() {
		this.current_ctx.appendChild(ctx.el);
		ctx.init();
		this.current_ctx.style.left = '0px';
	}.bind(this), 300);
};