var P1Controls;
var P2Controls;

var frameCounter;

var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gameScene' });
		},

	init: function () {
		frameCounter = 0;
	},

	create: function () {
		P1Controls = this.input.keyboard.addKeys({
			up: 'W',
			down: 'S',
			left: 'A',
			right: 'D'
		});

		P2Controls = this.input.keyboard.addKeys({
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right'
		});
	},

	update: function () {
	
	}

});

export default GameScene;