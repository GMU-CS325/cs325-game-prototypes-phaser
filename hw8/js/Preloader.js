"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
            game.load.tilemap('tiletest', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
           // game.load.image('loading','assets/loadingback.jpg');
           game.load.image('street1','assets/street1.png');
            game.load.image('street2','assets/street2.png');
            game.load.image('redlight','assets/redlight.png');
            game.load.image('greenlight','assets/greenlight.png');
           game.load.audio('lettersound', 'assets/lettersound.wav');
                  game.load.audio('feelinggood', 'assets/feelinggood.wav');
             game.load.audio('break', 'assets/break.wav');
                game.load.audio('welcome', 'assets/lettermusic.mp3');
                game.load.audio('win', 'assets/win.wav');
                game.load.audio('get', 'assets/get.mp3');
                 game.load.audio('lost', 'assets/lost.mp3');
                   game.load.image('jiantou','assets/jiantou.png');
                game.load.image('wutai1','assets/wutai1.png');
                     game.load.image('aixin','assets/aixin.png');
             game.load.image('gameoverword','assets/gameoverword.png');
               game.load.image('title','assets/aixin2.png');
          
                     game.load.image('gameoverpicture','assets/gameoverpicture.jpg');
              game.load.image('savetree','assets/savetree.jpg');
               game.load.image('loading','assets/background.jpg');
                 game.load.image('letsgo','assets/letsgo.png');
                game.load.image('instruction','assets/instruction.png');
                            game.load.image('boss','assets/boss.jpg');
                  game.load.image('skill3','assets/skill3.png');
                    game.load.image('skill4','assets/skill4.png');
                           game.load.image('powermax','assets/powermax.png');
                    game.load.spritesheet('leidian','assets/leidian.png',64,47);
            game.load.spritesheet('secretskill','assets/secretskill.png',250,425,8,0,1.5);
            game.load.image('loadingphoto','assets/loadingphoto.jpg');

             game.load.image('deadword','assets/deadword.png');
               game.load.image('winphoto','assets/winphoto.jpg');
             game.load.image('wordframe','assets/wordframe.png');
       game.load.image('background','assets/background1.png');
       game.load.image('bloodbar','assets/playerblood.png');
       game.load.image('worldtree','assets/worldtree.png');
             game.load.image('daozi','assets/daozi.jpg');
              game.load.image('deadgongzhu','assets/caraccident.jpg');
       game.load.spritesheet('player','assets/man1.png',32,48,16,0,0);
           game.load.spritesheet('man1','assets/man1.png',32,46,16,0,0);
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            background.scale.setTo(0.25,0.25);
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
        game.load.setPreloadSprite(preloadBar);

        //  Here we load the rest of the assets our game needs.
        //  As this is just a Project Template I've not provided these assets, swap them for your own.
        game.load.image('titlePage', 'assets/title.jpg');

        game.load.image('playButton', 'assets/playbutton.png');
       // game.load.atlas('playButton', 'assets/playbutton.png', 'assets/play_button.json');
        game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
       //  game.load.audio('welcome', 'assets/herostart.mp3');
                 // game.load.audio('enter', 'assets/enter.mp3');
                 //  game.load.audio('death', 'assets/death.mp3');
                   //       game.load.audio('gameover', 'assets/gameover.mp3');


          game.load.audio('drink', 'assets/drink.mp3');
            game.load.audio('kiss', 'assets/kiss.wav');
              game.load.audio('insidemusic', 'assets/insidemusic.mp3');
         game.load.audio('backgroundmusic', 'assets/backgroundmusic.m4a');
        //   game.load.audio('laser', 'assets/laser.mp3');
           game.load.audio('disapper', 'assets/disapper.mp3');
           game.load.audio('loading', 'assets/loading.png');
            // game.load.audio('hitsound', 'assets/hit.wav');
              //  game.load.audio('xingluosound', 'assets/xingluosound.wav');
              // game.load.audio('skill1sound', 'assets/skill1sound.wav');
        //  + lots of other required assets here
        //  + lots of other required assets here
    //    game.load.image( 'logo', 'assets/phaser.png' );
    
            //	This sets the preloadBar sprite as a loader sprite.
   // block = game.load.spritesheet('fangkuai', 'assets/fangkuai.png',20,20);
   // game.load.image('bg', 'assets/bg.png');
  //  game.load.image('right_bar', 'assets/right.png');
    game.load.image('scoreText', 'assets/points.png');
    game.load.image('next', 'assets/next_blocks.png');
    game.load.image('level', 'assets/helptimes.png');
 //   game.load.image('pause', 'assets/pause.png');
  //  game.load.image('sound', 'assets/sound.png');
    game.load.image('block','assets/block.png');

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
