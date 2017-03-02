"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
            game.load.image('loading','assets/loadingback.jpg');
               game.load.image('winword','assets/winword.png');
             game.load.image('gameoverword','assets/gameoverword.png');
                     game.load.image('bomb','assets/bomb.png');
                     game.load.image('gameoverpicture','assets/gameoverpicture.jpg');
              game.load.image('savetree','assets/savetree.jpg');
                        game.load.image('loading','assets/loadingback.jpg');
                 game.load.image('letsgo','assets/letsgo.png');
                game.load.image('instruction','assets/instruction.png');
             game.load.image('wings','assets/wings.png');
              game.load.image('xueping','assets/firstaid.png');
              game.load.image('skill1','assets/skill1.png');
                 game.load.image('zeus','assets/zeus.png');
              game.load.image('xingluo','assets/xingluo.png');
                game.load.image('blink','assets/blink.png');
                  game.load.image('skill3','assets/skill3.png');
                    game.load.image('skill4','assets/skill4.png');
                         game.load.spritesheet('leidian','assets/leidian.jpg',346,99,4,0,1.5);
                          game.load.spritesheet('secretskill','assets/secretskill.png',250,425,8,0,1.5);
            game.load.image('loadingphoto','assets/loadingphoto.jpg');
             game.load.image('tree','assets/tree.png');
             game.load.image('wordframe','assets/wordframe.png');
       game.load.image('background','assets/background1.png');
       game.load.image('bloodbar','assets/bloodbar.png');
       game.load.image('worldtree','assets/worldtree.png');
       game.load.spritesheet('player','assets/hero.png',20,24,20,0,1.5);
       game.load.spritesheet('playerattack','assets/hero-attack.png',27,29,6,0,0);
        game.load.spritesheet('playerattackright','assets/hero-attackright.png',27,29,6,0,0);
       game.load.spritesheet('monster1','assets/monster1.png',31,31,6,0.5,0.5);
        game.load.spritesheet('monster2','assets/monster2.png',27,30,6,0,0.9);
         game.load.spritesheet('monster3','assets/monster3.png',33,35,6,0.5,0.5);
          game.load.spritesheet('monster4','assets/monster4.png',31 ,29,6,0.6,0.6);
           game.load.spritesheet('monster5','assets/monster5.png',31,31,6,0.5,0.5);
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            background.scale.setTo(0.8,0.8);
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
        game.load.setPreloadSprite(preloadBar);

        //  Here we load the rest of the assets our game needs.
        //  As this is just a Project Template I've not provided these assets, swap them for your own.
        game.load.image('titlePage', 'assets/title.jpg');

        game.load.image('playButton', 'assets/playbutton.png');
       // game.load.atlas('playButton', 'assets/playbutton.png', 'assets/play_button.json');
        game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
         game.load.audio('welcome', 'assets/herostart.mp3');
                  game.load.audio('enter', 'assets/enter.mp3');
                   game.load.audio('death', 'assets/death.mp3');
                          game.load.audio('gameover', 'assets/gameover.mp3');


          game.load.audio('drink', 'assets/drink.mp3');
          game.load.audio('zhadan', 'assets/bomb.mp3');
         game.load.audio('backgroundmusic', 'assets/backgroundmusic.m4a');
           game.load.audio('laser', 'assets/laser.mp3');
           game.load.audio('disapper', 'assets/disapper.mp3');
           game.load.audio('loading', 'assets/loading.png');
             game.load.audio('hitsound', 'assets/hit.wav');
                game.load.audio('xingluosound', 'assets/xingluosound.wav');
               game.load.audio('skill1sound', 'assets/skill1sound.wav');
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
