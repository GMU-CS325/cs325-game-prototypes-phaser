"use strict";

window.onload = function () 
{
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    function preload()
    {
        // Load an image and call it 'logo'.
        game.load.image('logo', 'assets/phaser.png');
        game.load.spritesheet('fatEagle', 'assets/fatEagle125x72.png',125, 72);
        game.load.image('ground', 'assets/ground.png');
        game.load.image('poopIMG', 'assets/poopIMG.png');
        game.load.image('target', 'assets/trump.png');
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
    var bulletDelay = 20;
    var randomNumber = Math.random()*200;
    
    function create()
    {
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
        player.animations.add('left', [0,1,2,3], 10, true);
        player.animations.add('right', [0,1, 2,3], 10, true);
        
        
        //Screen Display        
        var text = game.add.text(game.world.centerX, 15, "Attack Eagle", style);
        text.anchor.setTo(0.5, 0.0);
        
        //Amunition
        poops = game.add.group();
        poops.enableBody = true;
        
        //Target Set Up
        target = game.add.sprite(100,400,'target');
        target.anchor.setTo(0.5,0);
        game.physics.arcade.enable(target);
        target.body.collideWorldBounds = true;
        game.physics.enable(target, Phaser.Physics.ARCADE);
        target.body.velocity.x = 100;
        target.body.gravity.y = 200;
        target.body.bounce.x = 1;
        
        //Player input
        cursors = game.input.keyboard.createCursorKeys();
    }
    
    
    function update()
    {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(poops, platforms);
        game.physics.arcade.collide(target, platforms);
        game.physics.arcade.collide(target, poops);
        game.physics.arcade.collide(target, player);
        player.angle = 0;
        target.body.velocity.x = randomNumber;
        poopTimer+=1;
        game.add.text(0, 15, randomNumber, style);

        //game.physics.arcade.overlap(player, poops, growUp, null, this);
        //game.physics.arcade.collide(poops, platforms, killPoop, null, this);

        //player.body.velocity.x = 0;
        if (game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            player.scale.setTo(2*size, 2*size); 
        }        
        if (game.input.keyboard.isDown(Phaser.Keyboard.D) && poopTimer > bulletDelay)// && !pop.body.touching.down)
        {
            var pop = poops.create(player.x, player.y, 'poopIMG');
            pop.scale.setTo(.08);
            randomNumber = rightMov? Math.random()*200: -Math.random()*200;
            //pop.body.velocity.x = player.body.velocity.x;
            //pop.body.velocity.y+=100;

            pop.body.gravity.y = 300;
            poopTimer = 0;
        }
        if (cursors.left.isDown)
        {
            rightMov = false;
            player.body.velocity.x = -250;
            player.scale.setTo(-size, size);

            player.animations.play('left');
            player.body.velocity.y = 0;
        }
        else if (cursors.right.isDown)
        {
            rightMov = true;
            player.body.velocity.x = 250;
            player.scale.setTo(size, size);
            

            player.animations.play('right');
            player.body.velocity.y = 0;
            
        }
        else
        {
            //player.animations.stop();

            //player.frame = 9;
        }
        if (cursors.up.isDown) //&& player.body.touching.down)
        {
            player.body.velocity.y = -150;
            
            //player.frame = 19;
            if(rightMov)
            {
                player.animations.play('right');
                player.angle=-25;
            }
            else{
                player.animations.play('left');
                player.angle=25;
            }
        }
        if (cursors.down.isDown) //&& player.body.touching.down)
        {
            player.body.velocity.y = 150;
            //player.frame = 19;
            player.angle-=1;
            if(rightMov)
            {
                player.animations.play('right');
                player.angle = 25;
            }
            else{
                player.animations.play('left');
                player.angle = -25;
            }
        }
        if (player.body.touching.down)
        {
            player.animations.stop();
        }
        else
        {
            if(rightMov)
            {
                player.animations.play('right');
            }
            else
            {
                player.animations.play('left');
            }
        }
    }
};
