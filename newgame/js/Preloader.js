"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;
	var ready = false;

	return {
  	preload: function () {
			//	These are the assets we loaded in Boot.js
	    //	A background and a loading progress bar
	    background = game.add.sprite(0, 0, 'titleBackground');
	    preloadBar = game.add.sprite(200, 350, 'preloaderBar');

	    //	This sets the preloadBar sprite as a loader sprite.
	    //	What that does is automatically crop the sprite from 0 to full-width
	    //	as the files below are loaded in.
	    game.load.setPreloadSprite(preloadBar);

	    //	Here we load the rest of the assets our game needs.
			game.load.spritesheet('startButton', 'assets/spritesheets/title_buttons.png', 297, 100)
			game.load.audio('titleMusic', ['assets/audio/Underclocked.mp3']);

			game.load.image('grayscale', 'assets/spritesheets/grayscale.png');

			game.load.image('overworldTiles', 'assets/spritesheets/arMM_sprites/Overworld.png')
			game.load.tilemap('tilemap', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
			//game.load.spritesheet('player', 'assets/spritesheets/arMM_sprites/character.png', 16, 32);
			game.load.atlas('playerAtlas', 'assets/spritesheets/arMM_sprites/character_sprites/character.png', 'assets/spritesheets/arMM_sprites/character_sprites/character.json')
			game.load.audio('overworldMusic', ['assets/audio/ChibiNinja.mp3']);

			game.load.atlas('enemyLog', 'assets/spritesheets/arMM_sprites/enemy_sprites/enemy.png', 'assets/spritesheets/arMM_sprites/enemy_sprites/enemy.json');
    },

    create: function () {
	    //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
	    preloadBar.cropEnabled = false;
    },

    update: function () {
	    if (game.cache.isSoundDecoded('titleMusic') && ready == false) {
	      ready = true;
	      game.state.start('MainMenu');
	    }
    }
  };
};
