
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		 this.load.image('wordframe','assets/wordframe.png');
		 this.load.audio('jumpsound','assets/jumpsound.mp3');
		  this.load.audio('inroommusic','assets/inroommusic.mp3');
		    this.load.audio('longcoming','assets/longcoming.mp3');
		  this.load.audio('opendoor','assets/opendoor.wav');
		    this.load.image('bloodbar','assets/bloodbar.png');

		 this.load.audio('zhadan', 'assets/bomb.mp3');
		this.load.image('bg_world01-sheet0', 'assets/bg_world01-sheet0.png');
		this.load.image('bg_world02-sheet0', 'assets/bg_world02-sheet0.png');
		this.load.image('bg_intro01-sheet0', 'assets/bg_intro01-sheet0.png');
		this.load.image('bg_menu01-sheet1', 'assets/bg_menu01-sheet1.png');
		this.load.image('door', 'assets/door.png');
	    this.load.image('box', 'assets/box.png');
		this.load.image('bosslocation', 'assets/bosslocation.png');

		 this.load.image('bomb','assets/bomb.png');
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.background.scale.setTo(0.43,0.43);
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
		this.load.tilemap('tiletest', 'assets/haha.json', null, Phaser.Tilemap.TILED_JSON);
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlePage', 'assets/heroback.jpg');
		this.load.image('playButton', 'assets/playbutton.png');
		this.load.audio('titleMusic', ['assets/herostart.mp3']);
		//	+ lots of other required assets here
        this.load.image( 'logo', 'assets/phaser.png' );

        //this.load.image('background','assets/background.png');
        this.load.image('block','assets/block.png');
        this.load.image('water','assets/water.png');
        this.load.image('brige','assets/brige.png');
        this.load.image('word','assets/word.png');
        this.load.audio('walk','assets/walk.wav');
        this.load.audio('sadmusic','assets/sadmusic.mp3');
        this.load.audio('battlemusic','assets/battle.mp3');
         this.load.audio('lost','assets/death.mp3');


           this.load.spritesheet('queen','assets/queen.png',29.5,31.5,16,0,1.5);
        this.load.image('boy','assets/cowboy.png');
        this.load.image('author','assets/author.png');
        this.load.image('buttona','assets/buttona.jpg');
         this.load.image('buttonb','assets/buttonb.jpg');
          this.load.image('buttonc','assets/buttonc.jpg');
           this.load.image('buttond','assets/buttond.jpg');
                this.load.image('long','assets/long.png');
           this.load.spritesheet('this.player','assets/hero.png',29.5,31.5,12,0,1.5);
            this.load.spritesheet('laoren','assets/laoren.png',29.5,31.5,12,0,1.5);
            this.load.image('bullet', 'assets/bullet.png');
        this.load.image('enemyBullet', 'assets/longbullet.png');
        this.load.image('invader', 'assets/long.png');
        this.load.image('ship', 'assets/xiaoxingxing.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
        this.load.image('starfield', 'assets/earth.jpg');
        this.load.audio('enter', 'assets/enter.mp3');
        this.load.audio('death', 'assets/death.mp3');
        this.load.audio('gameover', 'assets/gameover.mp3');
        this.load.audio('laser', 'assets/laser.mp3');
        this.load.audio('bomb', 'assets/bomb.mp3');

   
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the this.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
