"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            background.scale.setTo(1.3,1.4);
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
        game.load.setPreloadSprite(preloadBar);

        //  Here we load the rest of the assets our game needs.
        //  As this is just a Project Template I've not provided these assets, swap them for your own.
        game.load.image('titlePage', 'assets/title.jpg');
        game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
        game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
         game.load.audio('welcome', 'assets/welcome.mp3');
         game.load.audio('backgroundmusic', 'assets/backgroundmusic.m4a');
           game.load.audio('laser', 'assets/laser.mp3');
           game.load.audio('disapper', 'assets/disapper.mp3');
           game.load.audio('loading', 'assets/loading.png');
        //  + lots of other required assets here
        //  + lots of other required assets here
        game.load.image( 'logo', 'assets/phaser.png' );
    
            //	This sets the preloadBar sprite as a loader sprite.
   // block = game.load.spritesheet('fangkuai', 'assets/fangkuai.png',20,20);
    game.load.image('bg', 'assets/bg.png');
    game.load.image('right_bar', 'assets/right.png');
    game.load.image('scoreText', 'assets/points.png');
    game.load.image('next', 'assets/next_blocks.png');
    game.load.image('level', 'assets/helptimes.png');
    game.load.image('pause', 'assets/pause.png');
    game.load.image('sound', 'assets/sound.png');
    game.load.image('block','assets/block.png');
    game.load.image('rotate', 'assets/btn4.png');
    game.load.image('left', 'assets/btn3.png');
    game.load.image('right', 'assets/btn2.png');
    game.load.image('down', 'assets/btn1.png');
    game.load.image('fudai', 'assets/commit.png');
    game.load.image('helpbutton','assets/Help-button.png');
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (ready == false)
            {
                ready = true;
                game.state.start('loadgame');
            }
    
        }
    
    };
};
