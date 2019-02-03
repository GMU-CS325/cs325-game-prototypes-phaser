"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var button1;
    var button2;
    var button3;
    var button4;
    var button5;
    
    //var exit_button;
    var esc_key;
    var space_key;

    var player;
    var cursors;
    
    var txt_style = {font: "20px Arial"};
    var stat_text;
    var stat_text2;
    
    var stat_msg;
    var stat_msg2 = '';
    var stat_change;

    var RNG;


    function quitGame() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    function bossFight() {

        if (shared.stat_remain == 0)
        {
            game.state.start('Boss');
        }
        else
        {
            stat_msg2.setText("Consume all your stat points before\nfighting the boss.")
        }
    }

    
    function pauseGame() {
        console.log('pauseGame');
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('Pause');

    }

    /*
    function updateText()
    {
        stat_text2.setText(shared.stat_strength + '\n' + shared.stat_resist + '\n' + shared.stat_speed + '\n' + shared.stat_luck + '\n' + shared.stat_remain);
    }
    */

    function updateSuccess()
    {
        stat_msg2.setText('Success. Remaining stat points: ' + shared.stat_remain);
    }

    function updateFail()
    {
        stat_msg2.setText('Fail. Remaining stat points: ' + shared.stat_remain);
    }

    function updateStatError()
    {
        stat_msg2.setText('Not enough Stat points. Click on the boss icon.');
    }

    function updateMaxStat()
    {
        stat_msg2.setText("This stat is already maxed.");
    }

    function changeStats()
    {
        console.log('Change Stats');

        if (shared.stat_remain > 0)
        {
            if (player.x >= 250 && player.x < 320)
            {
                shared.stat_type = 1;
            }
            else if (player.x >= 400 && player.x < 470)
            {
                shared.stat_type = 2;
            }
            else if (player.x >= 550 && player.x < 620)
            {
                shared.stat_type = 3;
            }
            else if (player.x >= 700 && player.x < 770)
            {
                shared.stat_type = 4;
            }
            else
            {
                shared.stat_type = -1;
            }

            RNG = game.rnd.integerInRange(0, 99);


            switch (shared.stat_type)
            {
                case 1:
                    if (shared.stat_strength == 0 && RNG > 19 - (shared.stat_luck * 5))
                    {
                        shared.stat_strength++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_strength == 1 && RNG > 39 - (shared.stat_luck * 5))
                    {
                        shared.stat_strength++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_strength == 2 && RNG > 59 - (shared.stat_luck * 5))
                    {
                        shared.stat_strength++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_strength == 3)
                    {
                        updateMaxStat();
                    }
                    else
                    {
                        shared.stat_remain--;
                        updateFail();
                    }
                    break;
                case 2:
                    if (shared.stat_resist == 0 && RNG > 19 - (shared.stat_luck * 5))
                    {
                        shared.stat_resist++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_resist == 1 && RNG > 39 - (shared.stat_luck * 5))
                    {
                        shared.stat_resist++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_resist == 2 && RNG > 59 - (shared.stat_luck * 5))
                    {
                        shared.stat_resist++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_resist == 3)
                    {
                        updateMaxStat();
                    }
                    else
                    {
                        shared.stat_remain--;
                        updateFail();
                    }
                    break;
                case 3:
                    if (shared.stat_speed == 0 && RNG > 19 - (shared.stat_luck * 5))
                    {
                        shared.stat_speed++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_speed == 1 && RNG > 39 - (shared.stat_luck * 5))
                    {
                        shared.stat_speed++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_speed == 2 && RNG > 59 - (shared.stat_luck * 5))
                    {
                        shared.stat_speed++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_speed == 3)
                    {
                        updateMaxStat();
                    }
                    else
                    {
                        shared.stat_remain--;
                        updateFail();
                    }
                    break;
                case 4:
                    if (shared.stat_luck == 0 && RNG > 19 - (shared.stat_luck * 5))
                    {
                        shared.stat_luck++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_luck == 1 && RNG > 39 - (shared.stat_luck * 5))
                    {
                        shared.stat_luck++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_luck == 2 && RNG > 59 - (shared.stat_luck * 5))
                    {
                        shared.stat_luck++;
                        shared.stat_remain--;
                        updateSuccess();
                    }
                    else if (shared.stat_luck == 3)
                    {
                        updateMaxStat();
                    }
                    else
                    {
                        shared.stat_remain--;
                        updateFail();
                    }
                    break;
                default:
                    break;
            }    
        }
        else
        {
            updateStatError();
        }
    }
    
    return {
    
        create: function () {
    
        console.log('Test Game');

            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            game.add.tileSprite(0, 0, 1300, 650, 'background');
            //game.add.tileSprite(0, 0, 300, 200, 'stat');
            //game.add.tileSprite(400, 0, 500, 200, 'stat');
            game.world.setBounds(0, 0, 900, 600);
            cursors = game.input.keyboard.createCursorKeys();

            button1 = game.add.sprite(250, 500, 'tile', 1);
            button1 = game.add.text(250, 500, 'STR', txt_style);
            button2 = game.add.sprite(400, 500, 'tile', 1);
            button2 = game.add.text(400, 500, 'Resist', txt_style);
            button3 = game.add.sprite(550, 500, 'tile', 1);
            button3 = game.add.text(550, 500, 'Speed', txt_style);
            button4 = game.add.sprite(700, 500, 'tile', 1);
            button4 = game.add.text(700, 500, 'Luck', txt_style);
            button5 = game.add.sprite(850, 300, 'tile', 1);
            button5 = game.add.text(850, 300, 'Boss');
            
            //exit_button = game.add.sprite(0, 500, 'tile', 1);
            //exit_button = game.add.text(0, 500, 'Exit');

            //exit_button.inputEnabled = true;
            //exit_button.events.onInputDown.add( function() { quitGame(); }, this );
            
            button5.inputEnabled = true;
            button5.events.onInputDown.add( function() { bossFight(); }, this );


            player = game.add.sprite(100, 500, 'man', 0);
            player.anchor.setTo(0.5, 0.5);
            player.scale.setTo(1, 1);

            player.animations.add('run', [0,9]);
            player.animations.play('run', 8, true);

            esc_key = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            esc_key.onDown.addOnce(pauseGame, this);

            space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            /*
            stat_text = game.add.text(0, 0, 'Strength: \nResistance: \nSpeed: \nLuck: \nStat Points: ');
            stat_text2 = game.add.text(250, 0, shared.stat_strength + '\n' + shared.stat_resist + '\n' + shared.stat_speed + '\n' + shared.stat_luck + '\n' + shared.stat_remain);
            */

            stat_change = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            stat_msg = game.add.text(0, 0, 'Use the arrow keys to move.\nUse the space key to attempt a trial for a stat boost.\nOnce all the stat points are used, click on the boss button for a boss fight.\nClick the ESC key to check your stats.');
            stat_msg2 = game.add.text(0, 250 , 'Pick a stat of your choice to upgrade.');

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
                if (player.x < 960)
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
