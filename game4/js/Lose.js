"use strict";

BasicGame.Lose = function (game) {
	this.music = null;
};

BasicGame.Lose.prototype = {

	create: function () {

		 this.music = this.add.audio('lose');
        this.music.play();
		this.add.sprite(0, 0, 'losescreen');
		

	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.state.start('MainMenu');
		}

	}

};

