var shapes;
var background;
var ground;
var obstacles;
var frameCounter;

class GameScene extends Phaser.Scene {

	constructor() {
		super({ key: 'gameScene' });
	}

	init() {
		frameCounter = 0;
	};

	preload() {
		 
	}

	create() {
		this.anims.create(
			{
				key: 'level_background',
				frames: [
					{ key: 'level_bg_001' },
					{ key: 'level_bg_002' },
					{ key: 'level_bg_003' },
					{ key: 'level_bg_004' },
					{ key: 'level_bg_005' },
					{ key: 'level_bg_006' },
					{ key: 'level_bg_007' },
					{ key: 'level_bg_008' },
				],
				frameRate: 10,
				repeat: -1
			});
		this.matter.world.setBounds(0, 0, 1200, 720);
		background = this.matter.add.sprite(600, 360, 'level_bg_001', { isStatic: true, ignoreGravity: true }).play('level_background');
		//ground = this.matter.add.sprite(600, 800, 'ground', null, { isStatic: true, ignoreGravity: true }).setDepth(2).setOrigin(0, 0);
		console.log(background.body);
		//background.body.setCollideWorldBounds(true);
		shapes = this.cache.json.get('shapes');

		//var obstacle = this.matter.add.sprite(Phaser.Math.Between(0, 1200), 250, 'sheet', 'spikyball');
	}

	update() {
		frameCounter = frameCounter + 1;
		
	}


	end() {

	}

}

export default GameScene;