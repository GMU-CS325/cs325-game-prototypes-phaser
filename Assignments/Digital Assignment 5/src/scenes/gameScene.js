var shapes;
var stickshapes;
var background;
var frameCounter;
var obstacles;

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
		//var timer = this.time.delayedCall(30000, callback, args, scope); for the countdown event
		this.anims.create(
			{
				key: 'level_background',
				frames: [
					{ key: 'bg1' },
					{ key: 'bg2' },
					{ key: 'bg3' },
					{ key: 'bg4' },
					{ key: 'bg5' },
					{ key: 'bg6' },
					{ key: 'bg7' },
					{ key: 'bg8' },
				],
				frameRate: 10,
				repeat: -1
			});
		this.matter.world.setBounds(0, -100, 1200, 770, 64, true, true, false, true);
		background = this.add.sprite(600, 360, 'bg1').play('level_background');

		shapes = this.cache.json.get('ashapes');
		stickshapes = this.cache.json.get('sshapes');

		obstacles = this.add.group({
			key: 'obstacles',
			maxSize: 15, //Only 14 spawned?
			//setXY: { x: Phaser.Math.Between(0, 1200), y: -50 }
			//classType: Phaser.Physics.Matter.Image(this.world, 0, 0, null, null, {}),
		});
		console.log(shapes);
		console.log(stickshapes);
		//this.matter.add.sprite(300, -20, 'asheet', 'ball', { shape: shapes.ball })
		this.matter.add.sprite(300, -20, 'ssheet', 'P1', { shape: shapes.P1 })
	}

	update() {
		frameCounter = frameCounter + 1;
		if ( (frameCounter % 125 == 0) && (obstacles.isFull() == false)) {
			var x = Math.floor(Math.random() * 5);
			switch (x) {
				case 0:
					var obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -20, 'asheet', 'ball', { shape: shapes.ball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 1:
					var obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'box', { shape: shapes.box }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 2:
					var obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'manyspike', { shape: shapes.manyspike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 3:
					var obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'spike', { shape: shapes.spike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 4:
					var obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'spikyball', { shape: shapes.spikyball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
			}
		}
	}


	end() {

	}

}

export default GameScene;