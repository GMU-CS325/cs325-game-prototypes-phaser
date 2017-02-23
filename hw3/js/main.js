"use strict";

window.onload = function() {

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
var game = new Phaser.Game(800,600, Phaser.AUTO,'game',null,true);
game.state.add("boot",GameStates.makeBoot);
game.state.add("Preloader",GameStates.makePreloader);
game.state.add("loadgame",GameStates.loadgame);
game.state.add("maingame",GameStates.maingame);
game.state.start("boot");


};
