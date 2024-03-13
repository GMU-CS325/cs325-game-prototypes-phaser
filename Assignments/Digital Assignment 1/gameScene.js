var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gameScene' });
        },

    init: function () {
        this.data.set('score', 0);
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

        // Create game over text
        replayText = this.add.text(
            this.physics.world.bounds.width / 2 + 5,
            this.physics.world.bounds.height / 2 + 50,
            'Replay',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: 'black'
            }
        );
        replayText.setOrigin(0.5);
        // Make it invisible until the player loses
        replayText.setVisible(false);

        scoreText = this.add.text(
            this.physics.world.bounds.width - 95,
            15,
            'Score: ',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '25px',
                fill: '#fff'
            }
        );
        scoreText.setOrigin(0.5);

        highScoreText = this.add.text(
            this.physics.world.bounds.width - 135,
            45,
            'High Score: ',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '25px',
                fill: '#fff'
            }
        );
        highScoreText.setOrigin(0.5);
        highScoreText.setText([
            'High Score: ' + (parseInt(localStorage.getItem('highScore')) || 0)
        ]);

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

        this.input.keyboard.once('keydown-SPACE', () => {
            gameStarted = true;
            ball.setVelocityY(-200);
            openingText.setVisible(false);
            if(music.isPlaying == false)
                music.play();
        })
	},

	update: function () {
        // Check if the ball left the scene i.e. game over
        frameCounter++;
        this.data.set('score', bricksHit());
        //console.log(this.data.get('score'));
        //console.log(scoreText);
        scoreText.setText([
            'Score: ' + this.data.get('score')
        ]);
        if (!gameStarted) {
            //Be right above cursor
            ball.setX(player.x);
        }
        else {
            if (isGameOver(this.physics.world)) {
                gameOverText.setVisible(true);
                replayText.setVisible(true);
                replayText.setInteractive({ useHandCursor: true });
                replayText.on('pointerdown', () => this.scene.restart());
                ball.disableBody(true, true);

                var highScore = parseInt(localStorage.getItem('highScore')) || 0;
                if (highScore == 0) { //No high score available
                    localStorage.setItem('highScore', this.data.get('score'));
                }
                else if (this.data.get('score') > highScore) {
                    localStorage.setItem('highScore', this.data.get('score'));
                }
            }
            else if (isWon()) {
                playerWonText.setVisible(true);
                replayText.setVisible(true);
                replayText.setInteractive({ useHandCursor: true });
                replayText.on('pointerdown', () => this.scene.restart());
                ball.disableBody(true, true);
            }
            else {
                // Put this in so that the player stays still if no key is being pressed
                player.body.setVelocityX(0);
                let chance = Math.random();
                let newSize = Phaser.Math.Between(50, 250);
                if ((chance < 0.5) && (frameCounter % 75 == 0))
                    player.setDisplaySize((newSize), 24);

                if (cursors.left.isDown) {
                    player.body.setVelocityX(-500);
                }
                else if (cursors.right.isDown) {
                    player.body.setVelocityX(500);
                }
            }
        }
	}
});

export default GameScene;