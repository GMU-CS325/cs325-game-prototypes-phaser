"use strict";

window.onload = function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('logo', 'assets/phaser.png');
        game.load.spritesheet('fatEagle', 'assets/fatEagle125x72.png', 125, 72);
        game.load.image('ground', 'assets/ground.png');
        game.load.image('poopIMG', 'assets/poopIMG.png');
        //game.load.image('target', 'assets/trump.png');
        game.load.spritesheet('target', 'assets/scott.png', 110, 120);
    }

    var player;
    var topText;
    var poops;
    var platforms;
    var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    var cursors;
    var size = 0.5;
    var rightMov = true;
    var poopTimer = 0;
    var target;
    var bulletDelay = 100;
    var randomNumber = (Math.random() * 200).toFixed(2);
    var pop;
    var score;
    var numScore = 0;
    var reloadPer = (poopTimer / bulletDelay * 100).toFixed(0);
    var targetRight = true;
    
    function create() {
    //Scenery Set Up
        game.stage.backgroundColor = "#4488AA";

        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 30, 'ground');
        ground.body.immovable = true;

    //PLAYER SET UP
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'fatEagle');
        player.anchor.setTo(0.5, 0);
        player.scale.setTo(size);

    //Player Physics
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.09;
        player.body.gravity.y = 20;
        player.body.collideWorldBounds = true;
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.velocity.x = 100;

    //Player Animation
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);


    //Screen Display        
        var text = game.add.text(game.world.centerX, 15, "Attack Eagle", style);
        text.anchor.setTo(0.5, 0.0);

    //Amunition
        poops = game.add.group();
        poops.enableBody = true;

    //Target Set Up
        target = game.add.sprite(100, 400, 'target');
        target.anchor.setTo(0.5, 0);
        game.physics.arcade.enable(target);
        target.body.collideWorldBounds = true;
        game.physics.enable(target, Phaser.Physics.ARCADE);
        target.body.velocity.x = 100;
        target.body.gravity.y = 200;
        target.body.bounce.x = 1;
        target.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        target.animations.play('right');

    //Player input
        cursors = game.input.keyboard.createCursorKeys();

        topText = game.add.text(0, 15, randomNumber, style);
        score = game.add.text(600, 15, "Score: 0", style)
    }


    function update() {
    //PHYSICS-COLLISION RESOLUTION
        if (game.physics.arcade.collide(poops, platforms)) {
            pop.kill();
        }
        game.physics.arcade.collide(target, platforms);
        if (game.physics.arcade.collide(target, pop)) {
            numScore += 100;
            score.text = "Score: " + numScore;
            pop.kill()
        }
        if (game.physics.arcade.collide(target, player)){
            player.body.velocity.y = -950;
            player.scale.setTo(size, -size);
        }
        game.physics.arcade.collide(player, platforms);
        
    //GAME TEXT        
        reloadPer = (poopTimer / bulletDelay * 100).toFixed(0);
        reloadPer = reloadPer > 100 ? 100 : reloadPer;
        player.body.bounce.y = 0.09;
        topText.text = "Reloading\n%" + reloadPer;
        
    //VARIABLE UPDATE
        player.angle = 0;
        target.body.velocity.x = randomNumber;
        poopTimer += 1;
        if (target.body.touching.right){
            target.scale.setTo(-1, 1);
            target.animations.play('right');
            target.body.velocity.x = -250;
        }
        if(target.body.touching.left){
            target.animations.play('right');
            target.scale.setTo(-1, 1);
            target.body.velocity.x = 250;
        }
        
        
    //PLAYER MOVEMENT
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && poopTimer > bulletDelay){
            pop = poops.create(player.x, player.y, 'poopIMG');
            pop.scale.setTo(.08);
            randomNumber = rightMov ? (Math.random() * 200).toFixed(2) : (-Math.random() * 200).toFixed(2);

            pop.body.gravity.y = 300;
            poopTimer = 0;
        }
        if (cursors.left.isDown) {
            rightMov = false;
            player.body.velocity.x = -250;
            player.scale.setTo(-size, size);

            player.animations.play('left');
            player.body.velocity.y = 0;
        }
        else if (cursors.right.isDown) {
            rightMov = true;
            player.body.velocity.x = 250;
            player.scale.setTo(size, size);


            player.animations.play('right');
            player.body.velocity.y = 0;

        }
        if (cursors.up.isDown){
            player.body.velocity.y = -150;

            //player.frame = 19;
            if (rightMov) {
                player.animations.play('right');
                player.angle = -25;
            }
            else {
                player.animations.play('left');
                player.angle = 25;
            }
        }
        if (cursors.down.isDown){
            player.body.velocity.y = 150;
            //player.frame = 19;
            player.angle -= 1;
            if (rightMov) {
                player.animations.play('right');
                player.angle = 25;
            }
            else {
                player.animations.play('left');
                player.angle = -25;
            }
        }
        if (player.body.touching.down) {
            player.animations.stop();
        }
        else {
            if (rightMov) {
                player.animations.play('right');
            }
            else {
                player.animations.play('left');
            }
        }
    }//END UPDATE
    
    
    function killPoop(player, pop) {

        // Removes the star from the screen
        pop.kill();

        //  Add and update the score

    }
};
