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

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
        preload: preload,
        create: create,
        update: update
    });

    function geCollide(player, groundEnemies){
        player.loadTexture('playerDead');
    }

    function preload() {
        // Load an image and call it 'logo'.
        // game.load.image('logo', 'assets/phaser.png');
        game.load.image('bg1', 'assets/set2_background.png');
        game.load.image('bg2', 'assets/set2_hills.png');
        game.load.image('player', 'assets/playerBlue_stand.png');
        game.load.image('playerDead', 'assets/playerBlue_dead.png');
        game.load.image('plaform', 'assets/blockBrown.png');
        game.load.image('genemy', 'assets/enemySpikey_1.png');
        game.load.image('flenemy', 'assets/enemyFloating_1.png');

    }

    // var bouncy;
    var cursors;
    var bg1;
    var bg2;
    var player;
    var platforms;
    // var ground;
    var invisibleButton;
    var groundEnemies;
    var floatEnemies;

    function create() {
        bg1 = game.add.sprite(0, 0, 'bg1');
        bg2 = game.add.sprite(0, 0, 'bg2');
        bg1.scale.setTo(1.25, 1.25);
        bg2.scale.setTo(1.25, 1.25);

        player = game.add.sprite(32, game.world.height / 2, 'player');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 800;
        player.body.collideWorldBounds = true;
        invisibleButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        platforms = game.add.group();
        platforms.enableBody = true;

        var grndhelper = 0;
        for(let i = 0; i < 13; i ++){
            var ground = platforms.create(grndhelper, game.world.height - 64, 'plaform');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            ground.body.collideWorldBounds = true;
            game.physics.arcade.enable(ground);
            grndhelper += 64;
        }


        groundEnemies = game.add.group();
        groundEnemies.enableBody = true;
        floatEnemies = game.add.group();
        floatEnemies.enableBody = true;
        var genemyHelper = 80;
        for(let i = 0; i < 13; i ++){
            var genemy = groundEnemies.create(genemyHelper,game.world.height - 100, 'genemy');
            // ground.scale.setTo(1, 1);
            genemy.body.immovable = true;
            // ground.body.collideWorldBounds = true;
            game.physics.arcade.enable(genemy);
            // grndhelper += 64;
            genemyHelper+=320;
        }
        var flenemyHelper = 200;
        for(let i = 0; i < 13; i ++){
            var flenemy = floatEnemies.create(flenemyHelper,game.world.height - 250, 'flenemy');
            // ground.scale.setTo(1, 1);
            flenemy.body.immovable = true;
            // ground.body.collideWorldBounds = true;
            game.physics.arcade.enable(flenemy);
            // grndhelper += 64;
            flenemyHelper+=320;
        }
        // var genemy = groundEnemies.create(80,game.world.height - 100, 'genemy');

    }

    function update() {
        game.physics.arcade.collide(platforms, player);
        game.physics.arcade.collide(groundEnemies, player, geCollide);
        game.physics.arcade.collide(floatEnemies, player, geCollide);

        cursors = game.input.keyboard.createCursorKeys();
        if (invisibleButton.isDown) {
            player.alpha = 0.5;
        } else {
            player.alpha = 1;
        }
        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
            // player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
            // player.animations.play('right');
        } else {
            player.body.velocity.x = 0;
            // player.animations.stop();
            // player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down && !invisibleButton.isDown) {
            player.body.velocity.y = -400;
            // jumpfx.play();
        }

    }
};
