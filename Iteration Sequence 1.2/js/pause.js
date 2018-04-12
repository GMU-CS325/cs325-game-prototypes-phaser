"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
   

    function returnGame() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('Game');

    }

    function render()
    {
        //game.debug.cameraInfo(game.camera, 32, 32);
    }

    function up()
    {
        console.log('button up', arguments);
    }

    function over()
    {
        console.log('button over');
    }

    function out()
    {
        console.log('button out');
    }

    function click_play()
    {
        console.log("Play");
    }

    function slow_down()
    {
        console.log('Collision');
    }

    
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            game.add.tileSprite(0, 0, 1300, 650, 'background');
            game.add.tileSprite(0, 0, 300, 200, 'stat');
            game.add.tileSprite(400, 0, 500, 200, 'stat');
            game.world.setBounds(0, 0, 900, 600);
            cursors = game.input.keyboard.createCursorKeys();

            button1 = game.add.sprite(250, 500, 'tile', 1);
            button1 = game.add.text(250, 500, 'S');
            button2 = game.add.sprite(400, 500, 'tile', 1);
            button1 = game.add.text(400, 500, 'R');
            button3 = game.add.sprite(550, 500, 'tile', 1);
            button1 = game.add.text(550, 500, 'I');
            button4 = game.add.sprite(700, 500, 'tile', 1);
            button1 = game.add.text(700, 500, 'L');
            button5 = game.add.sprite(850, 500, 'tile', 1);
            button6 = game.add.sprite(1000, 500, 'tile', 1);
            exit_button = game.add.sprite(0, 500, 'tile', 1);
            exit_button = game.add.text(0, 500, 'Exit');

            exit_button.inputEnabled = true;
            exit_button.events.onInputDown.add( function() { quitGame(); }, this );
            
            player = game.add.sprite(100, 500, 'man', 0);
            player.anchor.setTo(0.5, 0.5);
            player.scale.setTo(1, 1);

            player.animations.add('run', [0,9]);
            player.animations.play('run', 8, true);

            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

            stat_text = game.add.text(0, 0, 'Strength: \nResistance: \nIntuition: \nLuck: \nStat Points: ');
            //stat_text.font = 'Arial Black';
            //stat_text.fill = '#000000';

            stat_text2 = game.add.text(250, 0, stat_strength + '\n' + stat_resist + '\n' + stat_intuit + '\n' + stat_luck + '\n' + stat_remain);
            
            stat_change = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            stat_msg = game.add.text(450, 50, 'Use the arrow keys to move.\nUse the space key to attempt a trial for a stat boost.');
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
            //text.anchor.setTo( 0.5, 0.0 );
            
            // When you click on the sprite, you go back to the MainMenu.
            //bouncy.inputEnabled = true;
            //bouncy.events.onInputDown.add( function() { quitGame(); }, this );
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                if (player.x > 40)
                {
                    player.x -= 6;
                }
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                if (player.x < 860)
                {
                    player.x += 6;
                }
            }

            stat_change.onDown.add(changeStats, this);
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            
        }
    };
};
