"use strict";

GameStates.makePreloader = function( game )
{

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(500, 300, 'preloaderBar');
            preloadBar.anchor.setTo(0.5);
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/title.jpg');
            game.load.atlas('playButton', 'assets/Play.png', 'assets/play_button.json');
            //	+ lots of other required assets here

            // My Assets
            game.load.image('background','assets/temp_bg.jpg');
            game.load.image('boss_bg', 'assets/boss_bg.png');
            game.load.image('stat','assets/stat.png');
            game.load.spritesheet('fire','assets/Fire.png', 76, 74);

            game.load.spritesheet('boundaries', 'assets/boundaries.png', 1000, 100);
            game.load.spritesheet('tile','assets/sheet.png', 70, 70);
            game.load.spritesheet('man','assets/adventurer_tilesheet.png', 80, 110);
            game.load.spritesheet('zombie','assets/zombie_tilesheet.png', 80, 110);
        },
    
        create: function ()
        {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function ()
        {
    
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
                game.state.start('MainMenu');
            }
            /*    
            if (ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }*/
        }
    
    };
};
