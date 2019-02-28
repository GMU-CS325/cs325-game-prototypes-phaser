"use strict";

BasicGame.MainMenu = function (game) {

	this.music = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');

		

	},

	update: function () {

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.startGame();
		}

	},

	startGame: function (pointer) {

		this.music.stop();
		// start the actual game
		//this.state.start('Game');
		this.state.start('Hallway');

	}

};
