var obstacle_bodies;
var yoshi_bodies;
var P1Controls;
var P2Controls;
var background;
var frameCounter;
var obstacles;
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

		obstacle_bodies = this.cache.json.get('obstacle_bodies');
		yoshi_bodies = this.cache.json.get('yoshi_bodies');

		//this.matter.add.sprite(300, -20, 'asheet', 'ball', { shape: shapes.ball })
		player1 = new Player(this, 100, 520, 'yoshi_shapes', 'yoshi_285.png');
		player2 = new Player(this, 1100, 520, 'yoshi_shapes', 'yoshi_01.png', { shape: yoshi_bodies.yoshi_01 }).setFlipX(true);
		//player1.setData({ 'up': P1Controls.A, 'down': P1Controls.S, 'left': P1Controls.A, 'right': P1Controls.D });

		obstacles = this.add.group({
			maxSize: 2,
			removeCallback: () => {
				console.log("Removed");
			}
		});

		/*this.matter.world.on('collisionactive', function (bodyA, bodyB) {
			if (bodyA.label != "Rectangle Body" || bodyB.label != "Rectangle Body")
				console.log("Ground hit!");
			else
				console.log("Yamete!");
        })*/
	},

	update: function () {
		player1.update(P1Controls);
		player2.update(P2Controls);
		frameCounter = frameCounter + 1;
		if ((frameCounter % 125 == 0) && (obstacles.isFull() == false)) {
			var x = Math.floor(Math.random() * 5);
			var obstacle;
			switch (x) {
				case 0:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -20, 'obstacle_shapes', 'ball.png', { shape: obstacle_bodies.ball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 1:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'obstacle_shapes', 'box.png', { shape: obstacle_bodies.box }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 2:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'obstacle_shapes', 'manyspike.png', { shape: obstacle_bodies.manyspike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 3:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'obstacle_shapes', 'spike.png', { shape: obstacle_bodies.spike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 4:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(300, 900), -50, 'obstacle_shapes', 'spikyball.png', { shape: obstacle_bodies.spikyball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
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