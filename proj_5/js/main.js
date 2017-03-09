window.onload = function() {

    "use strict";

    function asteroidHit(bullet, asteroid) {
        points += 10;
        scoreText.text = "Score " + points;
        moo.play();
        bullet.kill();
        asteroid.kill();

    }

    function createAsteroid() {
        var asteroid = asteroids.create(game.world.width, ((game.world.height - 128) - (game.world.height * 1 / 2 * Math.random())), 'asteroid');
        asteroid.scale.setTo(2, 2);
        asteroid.body.velocity.x = cowSpeed;
        return asteroid;
    }

    function createPowerup() {
        var r = Math.random();
        if (r <= .4) {
            powerupType = 'powerupStar';
        } else if (r <= .8) {
            powerupType = 'powerupBolt';
        } else {
            powerupType = 'powerupPill';
        }
        var powerup = powerups.create(game.world.width, ((game.world.height - 128) - (game.world.height * 1 / 2 * Math.random())), powerupType);
        powerup.body.velocity.x = cowSpeed / 2;
        return powerup;
    }

    function collectPowerup(player, currentPowerup) {
        powerupfx.play();
        // powerupType = 'powerupBolt';
        switch (powerupType) {
            case 'powerupStar':
                hasStarPowerUp = true;
                game.time.events.add(Phaser.Timer.SECOND * 6, resetPowerup, this);
                break;
            case 'powerupPill':
                numLife += 1;
                numLifeText.text = "X " + String(numLife);
                break;
            case 'powerupBolt':
                weapon.fireRate = 300;
                game.time.events.add(Phaser.Timer.SECOND * 6, resetPowerup, this);
                break;
            default:
                break;
        }
        currentPowerup.kill();
    }

    function resetPowerup() {
        switch (powerupType) {
            case 'powerupStar':
                hasStarPowerUp = false;
                break;
            case 'powerupPill':
                break;
            case 'powerupBolt':
                weapon.fireRate = 1000;
                break;
            default:
                break;
        }
        powerupType = 'none';

    }

    function playerHit(player, asteroid) {
        asteroid.kill();
        if(!hasStarPowerUp && !isGameOver){
            numLife -= 1;
            numLifeText.text = "X " + String(numLife);
            for (let i = 0; i < 10; i++) {
                player.alpha = 0;
                var tween = game.add.tween(player).to({
                    alpha: 1
                }, 2000, "Linear", true);
            }
        }
    }

    function bossHitPlayer(player, bullet){
        bullet.kill();
        if(!hasStarPowerUp){
            numLife -= 1;
            numLifeText.text = "X " + String(numLife);
            for (let i = 0; i < 10; i++) {
                player.alpha = 0;
                var tween = game.add.tween(player).to({
                    alpha: 1
                }, 2000, "Linear", true);
            }
        }
    }

    function createBoss(){
        boss = game.add.sprite(game.world.width * 3 / 4, game.world.height / 2, 'asteroid');
        game.physics.arcade.enable(boss);
        boss.anchor.setTo(.5);
        boss.scale.setTo(-5,5);
        boss.body.immovable = true;
        boss.body.collideWorldBounds = true;
        bossWeapon = game.add.weapon(30, 'laserred')
        bossWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        bossWeapon.bulletSpeed = 350;
        bossWeapon.autofire = false;
        bossWeapon.fireRate = 1000;
        bossWeapon.bulletSpeed = -350;
        bossWeapon.trackSprite(boss, 50, 25, true);
        bossShoot = game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, fireBossWeapon, this);
        game.time.events.repeat(Phaser.Timer.SECOND * 3, 1000, bossMove, this);
        bossHealth = 10;
        bossHealthBar = game.add.sprite(game.world.width /2, game.world.height - 32, 'bossHealthBar');
        bossHealthBar.anchor.setTo(.5);
        bossHealthBar.scale.setTo(bossHealth,1);
        bossMove();
    }

    function damageBoss(boss, bullet){
        bullet.kill();
        bossHealth-=1;
        bossHealthBar.scale.setTo(bossHealth,1);
        if(bossHealth == 0){
            points += 100;
            scoreText.text = "Score " + points;
            game.time.events.remove(bossShoot);
            boss.kill();
        }
        for (let i = 0; i < 10; i++) {
            boss.alpha = 0;
            var tween = game.add.tween(boss).to({
                alpha: 1
            }, 2000, "Linear", true);
        }
    }

    function bossMove(){
        var r = Math.random();
        if (r <= .4) {
            boss.body.velocity.y = -50;
        } else if (r <= .8) {
            boss.body.velocity.y = 50;
        } else {
            boss.body.velocity.y = 100;
        }

    }

    function fireBossWeapon(){
        if(bossWeapon.fire()){
            laser.play();
        }
    }

    function gameOver(){
        game.add.sprite(game.world.width / 4, game.world.height / 4, 'gameOver');

    }

    var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game', {
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
    var sky;
    var cowRate;
    var cowSpeed;
    var lastPoints;
    var laser;
    var moo;
    var jumpfx;
    var powerupfx;
    var powerups;
    var powerupType;
    var hasStarPowerUp;
    var numLife;
    var numLifeText;
    var boss;
    var bossHealth;
    var bossHealthBar;
    var bossShoot;
    var bossSpawned;
    var bossWeapon;
    var isGameOver;
    var bgm;


    function preload() {
        // game image assets
        game.load.image('sky', 'assets/earth_sky.png');
        game.load.image('ground', 'assets/moon_surface.png');
        game.load.image('asteroid', 'assets/spr_cow_0.png');
        game.load.spritesheet('astronaut', 'assets/orange.png', 128, 128);
        game.load.image('laserblue', 'assets/laserBlue01.png');
        game.load.image('powerupBolt', 'assets/bold_silver.png');
        game.load.image('powerupPill', 'assets/pill_blue.png');
        game.load.image('powerupStar', 'assets/star_gold.png');
        game.load.image('laserred', 'assets/laserRed04.png');
        game.load.image('bossHealthBar', 'assets/laserRed12.png');
        game.load.image('gameOver', 'assets/gameover_zpse663rlsp.png');



        // game sounds
        game.load.audio('sfx', 'assets/laser.wav');
        game.load.audio('moofx', 'assets/cow_moo.wav');
        game.load.audio('jumpfx', 'assets/jump.wav');
        game.load.audio('powerupfx', 'assets/powerup.wav');
        game.load.audio('bgm', 'assets/01 A Night Of Dizzy Spells.mp3');


        points = 0;
    }

    function create() {
        isGameOver = false;
        bossSpawned = false;
        hasStarPowerUp = false;
        numLife = 3;
        cowRate = 2;
        cowSpeed = -300;
        lastPoints = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        sky = game.add.sprite(0, 0, 'sky');
        sky.scale.setTo(1, 1);

        // add audio triggers
        laser = game.add.audio('sfx');
        moo = game.add.audio('moofx');
        jumpfx = game.add.audio('jumpfx');
        powerupfx = game.add.audio('powerupfx');
        bgm = game.add.audio('bgm');
        bgm.play();

        // create groups
        powerups = game.add.group();
        powerups.enableBody = true;

        asteroids = game.add.group();
        asteroids.enableBody = true;

        game.time.events.repeat(Phaser.Timer.SECOND * cowRate, 1000, createAsteroid, this);
        game.time.events.repeat(Phaser.Timer.SECOND * cowRate * 8, 1000, createPowerup, this);

        scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: 'white'
        });

        platforms = game.add.group();
        platforms.enableBody = true;
        ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(.5, 1);
        ground.body.immovable = true;

        game.add.sprite(16, 64, 'astronaut').scale.setTo(.5, .5);
        numLifeText = game.add.text(70, 70, 'X' + String(numLife), {
            fontSize: '32px',
            fill: 'white'
        });
        player = game.add.sprite(32, game.world.height / 2, 'astronaut');
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 800;
        player.body.collideWorldBounds = true;
        player.scale.setTo(.5, .5);

        player.animations.add('left', [8, 9, 10, 11], 10, true);
        player.animations.add('right', [4, 5, 6, 7], 10, true);

        weapon = game.add.weapon(30, 'laserblue');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 350;
        weapon.autofire = false;
        weapon.fireRate = 1000;
        weapon.trackSprite(player, 50, 25, true);

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);




    }

    function update() {
        if (points % 100 === 0 && points > lastPoints) {
            cowRate += 1;
            cowSpeed -= 50;
            lastPoints = points;
        }

        if(points == 100 && bossSpawned == false){
            bossSpawned = true;
            createBoss();
        }

        if (numLife == 0 && !isGameOver) {
            // game over
            isGameOver = true;
            gameOver();
        }

        game.physics.arcade.collide(player, asteroids, playerHit);
        game.physics.arcade.collide(weapon.bullets, asteroids, asteroidHit, null, this);
        game.physics.arcade.collide(player, powerups, collectPowerup);
        if(bossSpawned){
            game.physics.arcade.collide(bossWeapon.bullets, player, bossHitPlayer, null, this);
            game.physics.arcade.collide(weapon.bullets, boss, damageBoss, null, this);
            // bossMove();
        }


        var hitPlatform = game.physics.arcade.collide(player, platforms);
        cursors = game.input.keyboard.createCursorKeys();
        player.body.velocity.x = 0;

        if (cursors.left.isDown && !isGameOver) {
            player.body.velocity.x = -200;
            player.animations.play('left');
        } else if (cursors.right.isDown && !isGameOver) {
            player.body.velocity.x = 200;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down && hitPlatform && !isGameOver) {
            player.body.velocity.y = -700;
            jumpfx.play();
        }

        if (fireButton.isDown && !isGameOver) {
            if (weapon.fire()) {
                laser.play();
            }

        }

    }
};
