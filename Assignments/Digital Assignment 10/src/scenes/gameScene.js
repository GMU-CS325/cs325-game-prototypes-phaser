var obstacle_bodies;
var yoshi_bodies;

var P1Controls;
var P2Controls;

var background;
var ground;

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

	init: function () {
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

		ground = this.matter.add.image(600, 720, 'ground').setOrigin(0).setVisible(false).setDepth(2);
		ground.setName("ground");

		this.matter.world.setBounds(0, 0, 1200, 720, 64, true, true, false, true);
		background = this.add.sprite(600, 360, 'bg1').play('level_background');

		obstacle_bodies = this.cache.json.get('obstacle_bodies');
		yoshi_bodies = this.cache.json.get('yoshi_bodies');
		

		//this.matter.add.sprite(300, -20, 'asheet', 'ball', { shape: shapes.ball })
		player1 = new Player(this, 100, 520, 'yoshi_shapes', 'yoshi_01.png');
		player2 = new Player(this, 1100, 520, 'yoshi_shapes', 'yoshi_01.png').setFlipX(true);
		
		//this.matter.add.sprite(600, 600, 'yoshi_01');
		player1.name = "Player 1";
		player2.name = "Player 2";
		console.log(player2.body);
		console.log(player2);

		obstacles = this.add.group({
			maxSize: 10,
			removeCallback: () => {
				//console.log(obstacle);
			}
		});

		this.matterCollision.addOnCollideStart({
			objectA: player1,
			callback: eventData => {
				if (eventData.gameObjectB !== undefined && eventData.gameObjectB.texture.key === "obstacle_shapes") {
					this.matterCollision.removeAllCollideListeners();
					console.log("P1 hit");
					eventData.gameObjectB.scene.scene.manager.start('endScene', { winner: 'Player 2' });
                }
			}
		});

		this.matterCollision.addOnCollideStart({
			objectA: player2,
			callback: eventData => {
				if (eventData.gameObjectB !== undefined && eventData.gameObjectB.texture.key === "obstacle_shapes") {
					this.matterCollision.removeAllCollideListeners();
					console.log("P2 hit");
					eventData.gameObjectB.scene.scene.manager.start('endScene', { winner: 'Player 1' });
				}
			}
		});

		console.log(obstacles);
	},

	update: function () {
		player1.update(P1Controls);
		player2.update(P2Controls);
		frameCounter = frameCounter + 1;
		if ((frameCounter % 125 == 0) && (obstacles.isFull() == false)) {
			var obstacle;
			var x = Math.floor(Math.random() * 5);

			switch (x) {
				case 0:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(200, 1000), -20, 'obstacle_shapes', 'ball.png', { shape: obstacle_bodies.ball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 1:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(200, 1000), -50, 'obstacle_shapes', 'box.png', { shape: obstacle_bodies.box }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 2:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(200, 1000), -50, 'obstacle_shapes', 'manyspike.png', { shape: obstacle_bodies.manyspike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 3:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(200, 1000), -50, 'obstacle_shapes', 'spike.png', { shape: obstacle_bodies.spike }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
					obstacles.add(obstacle);
					break;
				case 4:
					obstacle = this.matter.add.sprite(Phaser.Math.Between(200, 1000), -50, 'obstacle_shapes', 'spikyball.png', { shape: obstacle_bodies.spikyball }).setVelocity(Phaser.Math.Between(-5, 5), Phaser.Math.Between(-30, 30));
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