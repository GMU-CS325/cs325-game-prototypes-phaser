"use strict";

GameStates.makeBoss = function( game, shared ) {
    // Create your own variables.
    var boss_bg;

    var player;
    var zombie;
    var fire;
    var boundaries;

    var stat_text;
    var stat_text2;
    var hp = 30;
 
    function returnMenu() {
        game.state.start('MainMenu');
    }

    function stopGravity(obj1, obj2)
    {
        obj1.body.gravity.y = 0;
        //console.log(obj1.y);
    }

    return {
    
        create: function () {
            boss_bg = game.add.tileSprite(0, 0, 1000, 600, 'boss_bg');
            game.add.tileSprite(0, 0, 300, 250, 'stat');
            stat_text = game.add.text(0, 0, 'Hit Points:\nStrength: \nResistance: \nSpeed: \nLuck: ');
            stat_text2 = game.add.text(250, 0, hp + '\n' + shared.stat_strength + '\n' + shared.stat_resist + '\n' + shared.stat_speed + '\n' + shared.stat_luck);
            
            zombie = game.add.sprite(700, 450, 'zombie', 0);
            zombie.anchor.setTo(0.5, 0.5);
            zombie.scale.setTo(1, 1);

            player = game.add.sprite(100, 450, 'man', 0);
            player.anchor.setTo(0.5, 0.5);
            player.scale.setTo(1, 1);

            zombie.animations.add('run', [6,7,8,12,13,14])
            zombie.animations.play('run', 8, true);

            player.animations.add('run', [0,9]);
            player.animations.play('run', 8, true);

            boundaries = game.add.sprite(0, 510, 'boundaries', 0);

            game.physics.startSystem(Phaser.Physics.ARCADE);

            //  Set the world (global) gravity
            game.physics.arcade.gravity.y = 1500;

            // Enable physics on those sprites
            game.physics.enable( [ player, zombie, boundaries ], Phaser.Physics.ARCADE);

            player.body.collideWorldBounds = true;
            player.body.bounce.y = 0;

            zombie.body.collideWorldBounds = true;
            zombie.body.bounce.y = 0;

            boundaries.body.allowGravity = false;
            boundaries.body.collideWolrdBounds = true;
            boundaries.visible = false;
            boundaries.body.immovable = true;
            //boundaries.body.setSize(999, 49, 1, 560);
            //boundaries.body.collideWorldBounds = true;
            //boundaries.body.immovable = true;
            //boundaries.visible = false;

        },
    
        update: function () {

            game.physics.arcade.collide(player, boundaries, stopGravity, null, this);
            game.physics.arcade.collide(zombie, boundaries, stopGravity, null, this);

            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                if (player.x > 40)
                {
                    player.x -= 6;
                }
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                if (player.x < 960)
                {
                    player.x += 6;
                }
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.y >= 455)
            {
                //player.body.gravity.y;
                player.body.velocity.y = -500;
            }
            
        }
    };
};
