"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var menuSelect = null;

  function startGame(pointer) {
    //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		menuSelect.play();
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

			menuSelect = game.add.audio('menuSelect');
			menuSelect.volume = .3;


			let background = game.add.sprite(0, 0, 'titleBackground');
	    let playButton = game.add.button(255, 350, 'startButton', startGame, null, 0, 1, 2);
			let title = game.add.text(250, 200, 'ASSIMILATE', {fill:'gold', fontSize:'50px', boundsAlignH:'center', boundsAlignV:'middle'});
	  },

	  update: function () {
      //	Do some nice funky main menu effect here
			
	  }
  };
};
