"use strict";

BasicGame.Win = function (game) {
	this.music = null;
};

BasicGame.Win.prototype = {

	create: function () {
		this.music = this.add.audio('yay');
        this.music.play();
		this.add.sprite(0, 0, 'winscreen');
	
	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.state.start('MainMenu');
		}

	}

};
