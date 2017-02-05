window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic

    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    "use strict";

    function asteroidHit(bullet, asteroid) {
        points += 10;
        scoreText.text = "Score " + points;
        bullet.kill();
        asteroid.kill();

    }

    function createAsteroid() {
        var asteroid = asteroids.create(game.world.width, (game.world.height - (game.world.height * 1 / 2 * Math.random())), 'asteroid');
        asteroid.body.velocity.x = -200;
        return asteroid;
    }

    function decrementScore(player, asteroid) {
        asteroid.kill();
        points -= 10;
        scoreText.text = "Score " + points;
    }

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
        preload: preload,
        create: create,
        update: update
    });

    var player;
    var platforms;
    var cursors;
    var weapon;
    var fireButton;
    var asteroids;
    var ground;
    var points;
    var scoreText;


    function preload() {
        // game.load.physics();
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
        game.load.image('asteroid', 'assets/diamond.png');
        points = 0;
        // game.load.spritesheet();
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');

        asteroids = game.add.group();
        asteroids.enableBody = true;

        // var asteroid = asteroids.create(game.world.width, game.world.height*.75, 'asteroid');
        // asteroid.body.gravity.y = 20;
        // asteroid.body.velocity.x = -50;
        // asteroid.body.bounce.y = 0;

        game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, createAsteroid, this);

        scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });

        platforms = game.add.group();
        platforms.enableBody = true;
        ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        // var ledge = platforms.create(400, 400, 'ground');
        // ledge.body.immovable = true;
        // ledge = platforms.create(-150, 200, 'ground');
        // ledge.body.immovable = true;

        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 800;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        weapon = game.add.weapon(30, 'star');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 350;
        weapon.fireRate = 400;
        weapon.trackSprite(player, 25, 25, true);

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


    }

    function update() {
        game.physics.arcade.collide(asteroids, ground);
        // getting asteroid collision with world bounds and decrementing player score
        // asteroids.forEach(decrementScore);
        game.physics.arcade.collide(player, asteroids, decrementScore);
        game.physics.arcade.collide(weapon.bullets, asteroids, asteroidHit, null, this);
        // game.physics.arcade.collide(weapon, asteroids, function(bullet, asteroid){bullet.kill(); asteroid.kill();});

        var hitPlatform = game.physics.arcade.collide(player, platforms);
        cursors = game.input.keyboard.createCursorKeys();
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -500;
        }

        if (fireButton.isDown) {
            weapon.fire()
        }

    }
};
