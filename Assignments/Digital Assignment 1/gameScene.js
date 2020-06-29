var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gameScene' });
        },

	create: function () {
        this.add.image(400, 300, 'background');

        //Enable world bounds, disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        ball = this.physics.add.sprite(400, 545, 'ball');
        player = this.physics.add.sprite(400, 570, 'paddle');

        greenBricks = this.physics.add.group({
            key: 'greenBrick',
            repeat: 9,
            immovable: true, //To make ball keep moving
            setXY: {
                x: 80,
                y: 190,
                stepX: 70
            }
        });

        blueBricks = this.physics.add.group({
            key: 'blueBrick',
            repeat: 9,
            immovable: true,
            setXY: {
                x: 80,
                y: 140,
                stepX: 70
            }
        });

        redBricks = this.physics.add.group({
            key: 'redBrick',
            repeat: 9,
            immovable: true,
            setXY: {
                x: 80,
                y: 90,
                stepX: 70
            }
        });

        openingText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Press SPACE to Start',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: '#fff'
            }
        );
        openingText.setOrigin(0.5);

        // Create game over text
        gameOverText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Game Over',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: 'black'
            }
        );
        gameOverText.setOrigin(0.5);
        // Make it invisible until the player loses
        gameOverText.setVisible(false);

        // Create the game won text
        playerWonText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'You won!',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: '#fff'
            }
        );
        playerWonText.setOrigin(0.5);
        // Make it invisible until the player wins
        playerWonText.setVisible(false);

        cursors = this.input.keyboard.createCursorKeys();
        player.setCollideWorldBounds(true);
        ball.setCollideWorldBounds(true);

        ball.setBounce(1, 1);

        this.physics.add.collider(ball, greenBricks, hitBrick, null, this);
        this.physics.add.collider(ball, redBricks, hitBrick, null, this);
        this.physics.add.collider(ball, blueBricks, hitBrick, null, this);
        player.setImmovable(true);
        this.physics.add.collider(ball, player, hitPlayer, null, this);

        var music = this.sound.add('theme');
        music.setLoop(true);
        music.play();
	},

	update: function () {
        // Check if the ball left the scene i.e. game over
        frameCounter++;
        if (isGameOver(this.physics.world)) {
            gameOverText.setVisible(true);
            ball.disableBody(true, true);
        }
        else if (isWon()) {
            playerWonText.setVisible(true);
            ball.disableBody(true, true);
        }
        else {
            // Put this in so that the player stays still if no key is being pressed
            player.body.setVelocityX(0);
            let chance = Math.random();
            let newSize = Math.random();
            if ((chance < 0.5) && (frameCounter % 25 == 0))
                player.setDisplaySize((newSize * 250), 24);

            //Be right above cursor
            if (!gameStarted) {
                ball.setX(player.x);
            }

            if (cursors.space.isDown) {
                gameStarted = true;
                ball.setVelocityY(-200);
                openingText.setVisible(false);
            }

            if (cursors.left.isDown) {
                player.body.setVelocityX(-500);
            }
            else if (cursors.right.isDown) {
                player.body.setVelocityX(500);
            }
        }
	}
});

export default GameScene;