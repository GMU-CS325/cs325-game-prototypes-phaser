"use strict";

BasicGame.End = function (game) {

	//this.music = null;
	//this.playButton = null;
	this.winvalue;
};

BasicGame.End.prototype = {
	init: function(win) {
		//this.winvalue = win;
		this.winvalue = win;
	},

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();
		if(this.winvalue == 1) {
			this.add.sprite(0, 0, 'background');
		} else {
			this.add.sprite(0, 0, 'losescreen');
		}

	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.state.start('Hallway');
		}

	}

};
