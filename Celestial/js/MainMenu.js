"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
	var twinkleTimer = 0;

  function startGame(pointer) {
  	//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    music.stop();
    //	And start the actual game
    game.state.start('Game');
    }

  return {
  	create: function () {
    	//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
      music = game.add.audio('titleMusic');
			music.loop = true;
			music.volume = .3;
      music.play();

			let background = game.add.sprite(0, 0, 'titleBackground');
			background.width = 800;
			background.height = 600;
			// Sets up the button in the center of the screen.
			let playButtonFrame = game.add.sprite(game.world.centerX - 132, 350, 'buttonFrame');
      let playButton = game.add.button(game.world.centerX - 128, 353, 'buttons', startGame, null, 0, 1, 2);

			this.stars = game.add.group();
			for (var i = 0; i < 10; i++) {
				this.stars.add(game.add.sprite(Math.floor((Math.random() * 780) + 20), Math.floor((Math.random() * 300) + 20), 'twinkleStar'));
			}
			this.stars.callAll('animations.add', 'animations', 'twinkle', [0, 1, 2, 3, 4, 5, 6], 10, false);

			let title = game.add.sprite(0, 0, 'title');
			title.width = 800;
			title.height = 600;
		},

    update: function () {
			if (game.time.now > twinkleTimer) {
				 twinkleTimer = game.time.now + 1100;
				 let starNum = Math.floor(Math.random() * 9);
				 this.stars.getAt(starNum).animations.play('twinkle');
  		}
		}
  };
};
