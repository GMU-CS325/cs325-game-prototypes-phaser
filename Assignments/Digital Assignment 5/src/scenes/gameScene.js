var shapes;
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
		/*this.anims.create(
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
			});*/
		//this.matter.add.sprite(0, 0, 'level_bg_001', { isStatic: true }).setOrigin(0, 0).play('level_background');
		ground = this.matter.add.sprite(600, 800, 'ground', null, { isStatic: true, ignoreGravity: true }).setOrigin(0, 0);
		//ground.setPosition(0 + ground.centerOfMass.x, 0 + ground.centerOfMass.y);
		//this.matter.add.
		console.log(ground);

		shapes = this.cache.json.get('shapes');
		obstacles = this.add.group({
			key: 'obstacles',
			maxSize: 10,
			//setXY: { x: Phaser.Math.Between(0, 1200), y: -50 }
			//classType: Phaser.Physics.Matter.Image(this.world, 0, 0, null, null, {}),
		});

		var obstacle = this.matter.add.sprite(Phaser.Math.Between(0, 1200), 250, 'sheet', 'Obstacle_06.png', { shape: shapes.spikyball});

		var cat1 = this.matter.world.nextCategory();
		obstacle.setCollisionCategory(cat1);
		ground.setCollisionCategory(cat1);
	}

	update() {
		frameCounter = frameCounter + 1;
		if (frameCounter % 125 == 0) {
			var x = Phaser.Math.Between(1,5);
			switch (x) {
				case 1:
					//var obstacle = this.matter.add.sprite(Phaser.Math.Between(0, 1200), -50, 'obstaclessheet', 'ball', { shape: obstaclesshapes.ball });
					//obstacles.add(obstacle);
					break;
			}
		}
	}


	end() {

	}

}

export default GameScene;