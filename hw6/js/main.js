"use strict";
var attack=0;
window.onload = function() {

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
var game = new Phaser.Game(800,600, Phaser.AUTO,'game',null,true);
game.state.add("boot",GameStates.makeBoot);
game.state.add("Preloader",GameStates.makePreloader);
game.state.add("loadgame",GameStates.loadgame);
game.state.add("information",GameStates.information);
game.state.add("maingame",GameStates.maingame);
game.state.add("dead",GameStates.dead);
game.state.add("win",GameStates.win);
game.state.start("boot");



};
