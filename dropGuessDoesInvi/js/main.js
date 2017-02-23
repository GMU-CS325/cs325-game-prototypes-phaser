"use strict";

window.onload = function() {
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
//        game.load.spritesheet('duck','assets/fullduck.png', 240, 287, 20);
        game.load.spritesheet('duck','assets/dogesheet.png', 75, 80, 8);
//        game.load.spritesheet('duck', 'assets/dude.png', 32, 48);
//        game.load.image('background', 'assets/background.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('poopIMG', 'assets/poopIMG.png');
    }
    
    var player;
    var background;
    var music;
    var cursors;
    
    var poops;
    var outText;
    var score = 0;
    
    var platforms;
    var count = 1;
    var size = .25;
    
    function create() {

        game.stage.backgroundColor = "#4488AA";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
//        game.add.sprite(0, 0, 'sky');
        
        
        //Platform Initiation
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 30, 'ground');
//        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge = platforms.create(400, 450, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        //Player Settings
        player = game.add.sprite(32, game.world.height - 150, 'duck');
        player.anchor.setTo(0.5, 0);
        player.scale.setTo(size);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [9, 8, 7, 6, 5, 4, 3, 2, 1], 10, true);
        player.animations.add('right', [9, 8, 7, 6, 5, 4, 3, 2, 1], 10, true);

        //PowerUps
        poops = game.add.group();
        poops.enableBody = true;
        for (var i = 0; i < 4; i++)
        {
            var pop = poops.create(i * 180, 0, 'poopIMG');
            pop.scale.setTo(.08);

            pop.body.gravity.y = 300;

//            pop.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        
        //Score
        outText = game.add.text(16, 16, 'Poop Eaten: 0', { fontSize: '32px', fill: '#000' });

        //Input
        cursors = game.input.keyboard.createCursorKeys();

}
    
    function update() {

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(poops, platforms);

        game.physics.arcade.overlap(player, poops, growUp, null, this);

        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
            player.scale.setTo(size, size);

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
            player.scale.setTo(-size, size);
            

            player.animations.play('right');
        }
        else
        {
            player.animations.stop();

            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
            player.frame = 19;
        }

}    
    function growUp (player, pop) {
    
    // Removes the star from the screen
    pop.kill();
        player.body.velocity.y = 50;
        count++;
        size = size * count;
        player.scale.setTo(size);

    //  Add and update the score
    score += 1;
    outText.text = 'Poop Eaten: ' + score;

}
};
