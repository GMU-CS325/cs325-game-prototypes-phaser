var P1Controls;
var P2Controls;

var frameCounter;

var backgroundImage;
var atlasTexture;
var frames;

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

		atlasTexture = this.textures.get('background_images');
		frames = atlasTexture.getFrameNames();

		backgroundImage = this.add.image(0, 0, 'background_images', frames[0]).setOrigin(0, 0);
		backgroundImage.displayHeight = config.height;
		backgroundImage.displayWidth = config.width;

		const map = this.make.tilemap({ key: 'map'});
		const tileset = map.addTilesetImage('platformer','platformer_tiles');
		const background_tileset = map.addTilesetImage('sprites', 'background_sprites');

		//720 of canvas height - (64 for tile size * 11 tiles in height) = 16
		const platforms = map.createStaticLayer('Ground', tileset, 0, 16);
		//console.log(platforms)
		platforms.setCollisionByExclusion(-1, true);

		console.log(this);
		const doors = this.add.group({
			allowGravity: false,
			immovable: true
		});

		const doorObjects = map.getObjectLayer('Doors')['objects'];

		//console.log(doorObjects)
		// Now we create spikes in our sprite group for each object in our map
		doorObjects.forEach(doorObject => {
			var door;
			if(typeof(doorObject.properties[0].value) == "string")
				door = this.add.sprite(doorObject.x, doorObject.y + 150 - doorObject.height, doorObject.properties[0].value).setOrigin(0, 0);
  		});

	},

	update: function (time, delta) {
		frameCounter += delta;
		frameCounter %= 2250;
		const animationFrameIndex = Math.floor(frameCounter / 75);
		backgroundImage.setTexture('background_images', frames[animationFrameIndex])
	}

});

export default GameScene;