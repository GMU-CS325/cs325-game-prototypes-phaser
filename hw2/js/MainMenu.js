	
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.smallhero=null;
	this.titlegroup=null;
	this.word;
	this.smallhero;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');
	   // this.word=this.add.sprite(50, 100, 'word');
	    this.add.sprite(0, 430, 'author');
	   // this.smallhero = this.add.sprite(650,150, 'this.player');
	 
	            this.titlegroup=this.add.group();
	            this.titlegroup.create(0,0,'word');
	            this.smallhero=this.titlegroup.create(600, 50, 'this.player')
	            this.smallhero.animations.add('go', [0,1,2], 5, true);
	            this.smallhero.animations.play('go');
	         	    this.titlegroup.x = 80;
		this.titlegroup.y = 100;
	         this.add.tween(this.titlegroup).to({ y: 10 },1000,null,true,0,Number.MAX_VALUE,true); 



		this.playButton = this.add.button( 300, 300, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.playButton.scale.setTo(0.3,0.3);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
