import PlayerDBZ from "../player/PlayerDBZ";

var player;

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

		atlasTexture = this.textures.get('background_images');
		frames = atlasTexture.getFrameNames();

		backgroundImage = this.add.image(0, 0, 'background_images', frames[0]).setOrigin(0, 0);
		backgroundImage.displayHeight = config.height;
		backgroundImage.displayWidth = config.width;

		const map = this.make.tilemap({ key: 'map'});
		const tileset = map.addTilesetImage('platformer','platformer_tiles');

		//720 of canvas height - (64 for tile size * 11 tiles in height) = 16
		const platforms = map.createLayer('Ground', tileset, 0, 16);
		platforms.setCollisionByProperty({collides: true});
		this.matter.world.convertTilemapLayer(platforms);
		createDebugGraphic(this, map, platforms);

		const doorObjects = map.getObjectLayer('Doors')['objects'];

		// Now we create spikes in our sprite group for each object in our map
		doorObjects.forEach(doorObject => {
			if(typeof(doorObject.properties[0].value) == "string")
				doorObject = this.add.sprite(doorObject.x, doorObject.y + 150 - doorObject.height, doorObject.properties[0].value).setOrigin(0, 0);
  		});

		player = new PlayerDBZ(this, 200, 600);

	},

	update: function (time, delta) {
		frameCounter += delta;
		frameCounter %= 2250;
		const animationFrameIndex = Math.floor(frameCounter / 75);
		backgroundImage.setTexture('background_images', frames[animationFrameIndex]);

		player.update();
	}

});

function createDebugGraphic(scene, map, platforms) {
	var debugGraphics = scene.add.graphics();
		map.renderDebug(debugGraphics, {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
			faceColor: new Phaser.Display.Color(40, 39, 37, 255),
		}, platforms);
}

export default GameScene;