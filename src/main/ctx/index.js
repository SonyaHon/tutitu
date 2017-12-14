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