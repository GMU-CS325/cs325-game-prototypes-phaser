var shapes;
var yoshi_bodies;
var WASD;
var testshapes;
var background;
var frameCounter;
var obstacles;
var cursors;
var player1;
var player2;

var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gameScene' });
		},

	init: function() {
		frameCounter = 0;
	},

	create: function () {

		cursors = this.input.keyboard.createCursorKeys();
		WASD = this.input.keyboard.addKeys('W,A,S,D,TAB');
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
		testshapes = this.cache.json.get('testshapes');
		yoshi_bodies = this.cache.json.get('testshapes');

		//this.matter.add.sprite(300, -20, 'asheet', 'ball', { shape: shapes.ball })
		player1 = new Player(this, 100, 520, 'yoshi_shapes', 'yoshi_285.png');
		player2 = new Player(this, 1100, 520, 'yoshi_shapes', 'yoshi_285.png').setFlipX(true);

		obstacles = this.add.group({
			key: 'obstacles',
			maxSize: 2, //Only 3 spawned?
			//classType: Phaser.Physics.Matter.Image(this.world, 0, 0, null, null, {}),
		});

		/*this.matter.world.on('collisionactive', function (bodyA, bodyB) {
			if (bodyA.label != "Rectangle Body" || bodyB.label != "Rectangle Body")
				console.log("Ground hit!");
			else
				console.log("Yamete!");
        })*/
	},

	update: function (time, delta) {
		player2.update(time, delta);
		//console.log(player2.anims.currentAnim);
		frameCounter = frameCounter + 1;
		if ((frameCounter % 125 == 0) && (obstacles.isFull() == false)) {
			var x = Math.floor(Math.random() * 5);
			var obstacle;
			switch (x) {
				case 0:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -20, 'asheet', 'ball', { shape: shapes.ball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 1:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'box', { shape: shapes.box }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 2:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'manyspike', { shape: shapes.manyspike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 3:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'spike', { shape: shapes.spike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 4:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'asheet', 'spikyball', { shape: shapes.spikyball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
			}
			obstacle.setBounce(1.25);
			
			var timer = this.time.addEvent({
				delay: 6000,
				callback: function () {
					obstacles.killAndHide(obstacle);
					obstacle.destroy();
				},
			})

		}
	}

});

export default GameScene;