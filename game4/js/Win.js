"use strict";

BasicGame.Win = function (game) {

};

BasicGame.Win.prototype = {

	create: function () {

		
		this.add.sprite(0, 0, 'winscreen');
		

	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.state.start('MainMenu');
		}

	}

};
