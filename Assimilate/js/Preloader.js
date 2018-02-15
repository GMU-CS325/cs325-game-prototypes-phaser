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
			// Main meunu stuff
			game.load.spritesheet('startButton', 'assets/spritesheets/title_buttons.png', 297, 100)
			game.load.audio('titleMusic', ['assets/audio/Underclocked.mp3']);
			game.load.audio('menuSelect', 'assets/audio/menuSelect.wav');
			// Gray overlay for during ability use
			game.load.image('grayscale', 'assets/spritesheets/grayscale.png');
			// Map assets
			game.load.image('overworldTiles', 'assets/spritesheets/arMM_sprites/Overworld.png')
			game.load.tilemap('tilemap', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
			// Player and enemy assets
			game.load.atlas('playerAtlas', 'assets/spritesheets/arMM_sprites/character_sprites/character.png', 'assets/spritesheets/arMM_sprites/character_sprites/character.json')
			game.load.atlas('enemyLog', 'assets/spritesheets/arMM_sprites/enemy_sprites/enemy.png', 'assets/spritesheets/arMM_sprites/enemy_sprites/enemy.json');
			// Main game audio assets.
			game.load.audio('overworldMusic', ['assets/audio/ChibiNinja.mp3']);
			game.load.audio('abilityStart', 'assets/audio/abilityStart.wav');
			game.load.audio('abilityStop', 'assets/audio/abilityStop.wav');
			game.load.audio('abilityCooldown', 'assets/audio/abilityCooldown.wav');
			game.load.audio('abilityReady', 'assets/audio/abilityReady.wav');
			game.load.audio('attack', 'assets/audio/attack.wav');
			game.load.audio('enemyDamage', 'assets/audio/enemyDamage.wav');
			game.load.audio('playerDamage', 'assets/audio/playerDamage.wav');
			game.load.audio('playerDeath', 'assets/audio/playerDeath.wav');
			game.load.audio('playerSpawn', 'assets/audio/playerSpawn.wav');


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
