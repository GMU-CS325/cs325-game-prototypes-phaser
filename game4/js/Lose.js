"use strict";

BasicGame.Lose = function (game) {

};

BasicGame.Lose.prototype = {

	create: function () {

		
		this.add.sprite(0, 0, 'losescreen');
		

	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.state.start('MainMenu');
		}

	}

};

