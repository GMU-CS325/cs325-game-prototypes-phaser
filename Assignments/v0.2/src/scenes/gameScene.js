var P1Controls;
var P2Controls;

var frameCounter;

var backgroundImage;

var config;

var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gameScene' });
		},

	init: function () {
		frameCounter = 0;
		config = this.sys.game.config;
	},

	create: function () {
		this.Fkey = this.input.keyboard.addKey('F');

        this.Fkey.on('down', function () {
            this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen();
        }, this);
		
		P1Controls = this.input.keyboard.addKeys({
			up: 'W',
			down: 'S',
			left: 'A',
			right: 'D'
		});

		P2Controls = this.input.keyboard.addKeys({
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right'
		});

		//backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
		//backgroundImage.displayHeight = config.height;
		//backgroundImage.displayWidth = config.width;

		const map = this.make.tilemap({ key: 'map'});
		const tileset = map.addTilesetImage('platformer','platformer_tiles');
		const background_tileset = map.addTilesetImage('sprites', 'background_sprites');
		console.log(background_tileset)

		//720 of canvas height - (64 for tile size * 11 tiles in height) = 16
		const platforms = map.createLayer('Ground', tileset, 0, 16);
		console.log(platforms)
		platforms.setCollisionByExclusion(-1, true);

		console.log(this);
		const doors = this.add.group({
			allowGravity: false,
			immovable: true
		});

		const doorObjects = map.getObjectLayer('Doors')['objects'];

		console.log(doorObjects)
		// Now we create spikes in our sprite group for each object in our map
		doorObjects.forEach(doorObject => {
			var door;
			if(typeof(doorObject.properties[0].value) == "string")
				door = this.add.sprite(doorObject.x, doorObject.y + 150 - doorObject.height, doorObject.properties[0].value).setOrigin(0, 0);
  		});

		  var backgroundb = map.getObjectLayer('Background')['objects'];
		  console.log(backgroundb)
		  //backgroundb = this.add.image(0, 0,'background_sprites').setOrigin(0, 0);

	},

	update: function (time, delta) {
		
		
	}

});

export default GameScene;