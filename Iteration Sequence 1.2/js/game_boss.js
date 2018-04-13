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
    var stat_text3;
    var tip_text;

    var player_hp = 50;
    var enemy_hp = 100;
    var tookDamage = false;
    var inputEnabled = false;

    /*
    var timer;
    var fire_group;
    function Fire(game) {

        var x = 600;
        var y = game.rnd.between(400, 600);

        Phaser.Sprite.call(this, game, x, y, 'fire', 1);

        game.physics.arcade.enable(this);
    }*/

    function returnMenu() {
        
        shared.stat_strength = 0;
        shared.stat_resist = 0;
        shared.stat_speed = 0;
        shared.stat_luck = 0;
        shared.stat_remain = 7;

        player_hp = 50;
        enemy_hp = 100;
        tookDamage = false;
        inputEnabled = false;
        
        game.state.start('MainMenu');
    }

    function stopGravity(obj1, obj2)
    {
        obj1.body.gravity.y = 0;
        //console.log(obj1.y);
    }

    function dealDamage(obj1, obj2)
    {
        var bonusDamage;
        switch (shared.stat_strength)
        {
            case 1:
                bonusDamage = 1;
                break;
            case 2:
                bonusDamage = 2;
                break;
            case 3:
                bonusDamage = 4;
                break;
            default:
                bonusDamage = 0;
                break;
        }

        enemy_hp = enemy_hp - 5 - bonusDamage;

        stat_text3.setText(enemy_hp);
        zombieAttack();
    }

    function zombieAttack()
    {
        player.x = 100;
    }

    function takeDamage(obj1, obj2)
    {
        var bonusResist;

        //console.log('TD: ' + tookDamage);
        if (tookDamage == false)
        {                
            //console.log('SSR: ' + shared.stat_resist);
            switch (shared.stat_resist)
            {
                case 1:
                    bonusResist = 1;
                    break;
                case 2:
                    bonusResist = 2;
                    break;
                case 3:
                    bonusResist = 4;
                    break;
                default:
                    bonusResist = 0;
                    break;
            }

            //console.log('Player hp = ' + player_hp);
            player_hp = player_hp - (8 - bonusResist);
            //console.log('Collision: hp = ' + player_hp);
            stat_text2.setText(player_hp);
            tookDamage = true;
            fire.body.checkCollision.none = true;
        }        

    }

    /*
    function spawnFire()
    {
        fire_group.add(new Fire(game));
    }
    */

    return {
    
        create: function () {
            
            boss_bg = game.add.tileSprite(0, 0, 1000, 600, 'boss_bg');
            //game.add.tileSprite(0, 0, 300, 250, 'stat');
            //game.add.tileSprite(400, 0, 300, 250, 'stat');
            //stat_text = game.add.text(0, 0, 'Hit Points:\nStrength: \nResistance: \nSpeed: \nLuck: ');
            //stat_text2 = game.add.text(250, 0, player_hp + '\n' + shared.stat_strength + '\n' + shared.stat_resist + '\n' + shared.stat_speed + '\n' + shared.stat_luck);
            stat_text = game.add.text(0, 0, 'Hit Points: ');
            stat_text2 = game.add.text(250, 0, player_hp);
            tip_text = game.add.text(0, 150, 'Use the arrow keys to move and jump.\nCollide with the zombie to deal damage.\nPlayers will lose hp if they collide with the fire.');

            game.add.text(600, 0, 'Hit Points: ');
            stat_text3 = game.add.text(750, 0, enemy_hp);

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

            fire = game.add.sprite(600, 450, 'fire', 0);

            game.physics.startSystem(Phaser.Physics.ARCADE);

            //  Set the world (global) gravity
            game.physics.arcade.gravity.y = 1500;

            // Enable physics on those sprites
            game.physics.enable( [ player, zombie, boundaries, fire ], Phaser.Physics.ARCADE);

            player.body.collideWorldBounds = true;
            player.body.bounce.y = 0;

            zombie.body.allowGravity = false;
            zombie.body.immovable = true;
            zombie.body.collideWorldBounds = true;
            //zombie.body.bounce.y = 0;
            zombie.body.setSize(60, 85, 10, 25);


            boundaries.body.allowGravity = false;
            boundaries.body.collideWolrdBounds = true;
            boundaries.visible = false;
            boundaries.body.immovable = true;
            
            /*
            timer = game.time.create();
            timer.loop(2000, spawnFire(), this);
            fire_group = game.add.group();
            timer.start();
            */

            fire.body.gravity.y = 0;
            fire.body.allowGravity = false;
            fire.body.velocity.x = -200;
            fire.body.checkCollision.up = false;
            fire.body.checkCollision.down = false;

        },
    
        update: function () {

            player.body.velocity.x = 0;
            fire.body.velocity.x = -200;

            game.physics.arcade.collide(player, boundaries, stopGravity, null, this);
            game.physics.arcade.collide(zombie, boundaries, stopGravity, null, this);
            game.physics.arcade.collide(player, fire, takeDamage, null, this);
            game.physics.arcade.collide(player, zombie, dealDamage, null, this);


            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                player.body.velocity.x = -(150 * (1 + shared.stat_speed));
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                player.body.velocity.x = 150 * (1 + shared.stat_speed);
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.y >= 455)
            {
                //player.body.gravity.y;
                player.body.velocity.y = -500 - 50 * shared.stat_speed;
            }

            if (fire.x < -200)
            {
                fire.x = 600;
                tookDamage = false;
                fire.body.checkCollision.none = false;
            }

            if (player_hp <= 0 && inputEnabled == false)
            {
                tip_text.setText('You lose. Click ESC to return to main menu.');
                inputEnabled = true;

            }
            else if (enemy_hp <= 0 && inputEnabled == false)
            {
                tip_text.setText('You win. Click ESC to return to main menu.');
                inputEnabled = true;

            }

            if (inputEnabled == true && game.input.keyboard.isDown(Phaser.Keyboard.ESC))
            {
                returnMenu();
            }

            if (inputEnabled == true)
            {
                player.body.moves = false;
                fire.body.moves = false;
            }
            
        }
    };
};
