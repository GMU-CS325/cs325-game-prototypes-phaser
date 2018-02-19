"use strict";

GameStates.makeGame = function( game, shared ) {
  // Create your own variables.
var counter = 0;
  function quitGame() {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    game.state.start('MainMenu');
  }

  function selectStar(star) {
    if (star.animations.paused == true) {
      star.animations.paused = false;
      star.animations.play('twinkle');
    }
    else {
      star.animations.stop(null, true);
      star.animations.paused = true;
    }
  }

  return {
    create: function () {
      let background = game.add.sprite(0, 0, 'background');
      background.width = 800;
			background.height = 600;

      this.stars = game.add.group();
			for (var i = 0; i < 10; i++) {
				this.stars.add(game.add.sprite(Math.floor((Math.random() * 780) + 20), Math.floor((Math.random() * 400) + 20), 'twinkleStar'));
        this.stars.getAt(i).inputEnabled = true;
        this.stars.getAt(i).events.onInputDown.add(selectStar, this);
			}
			this.stars.callAll('animations.add', 'animations', 'twinkle', [0, 1, 2, 3, 4, 5, 6], 10, true);
      this.stars.forEach((star) => {
        star.animations.paused = true;
      })
    },

    update: function () {


    }
  };
};
