"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var grid;
    var attack = false;
    var move = false;
    var attack_button;
    var move_button;

    var soldier;
    var sniper;
    var tank;
    var turret;

    var selected;

    var esc_key;
    var space_key;
    var a_key;
    var m_key;
    var p_key;

    var player;
    var cursors;
    
    var txt_style = {font: "20px Arial"};    
    var stat_msg;
    var stat_msg2;
    var unit_msg;
    var unit_msg2;
    var event_msg;
    var event_msg2;

    function createSoldier(soldier)
    {
        soldier.type = 'soldier';
        soldier.hp = 2;
        soldier.atk = 1;
        soldier.range = 1;
        soldier.move = 1;
        soldier.cost = 1;
        soldier.diagonal = false;

        soldier.inputEnabled = true;        
        soldier.events.onInputDown.add( controlUnit, this );
        
        //this.sprite = sprite;
        // might be a better way to implement this.
        //this.inputEnabled = true;        
        //this.events.onInputDown.add( displayStat, this );
    }

    function createSniper(sniper)
    {
        sniper.type = 'sniper';
        sniper.hp = 1;
        sniper.atk = 1;
        sniper.range = 1;
        sniper.move = 1;
        sniper.cost = 2;
        sniper.diagonal = true;

        sniper.inputEnabled = true;        
        sniper.events.onInputDown.add( controlUnit, this );
    }

    function createTank(tank)
    {
        tank.type = 'tank';
        tank.hp = 5;
        tank.atk = 1;
        tank.range = 1;
        tank.move = 1;
        tank.cost = 4;
        tank.diagonal = true;

        tank.inputEnabled = true;        
        tank.events.onInputDown.add( controlUnit, this );
    }

    function createTurret(turret)
    {
        turret.type = 'turret';
        turret.hp = 3;
        turret.atk = 2;
        turret.range = 1;
        turret.move = 0;
        turret.cost = 1;
        turret.diagonal = true;

        turret.inputEnabled = true;        
        turret.events.onInputDown.add( controlUnit, this );
    }

    function createGrid()
    {
        grid = new Array(4);

        for (let i = 0; i < grid.length; i++)
        {
            grid[i] = new Array(grid.length);

            for (let j = 0; j < grid[i].length; j++)
            {
                grid[i][j] = game.add.image(500 + 110 * j, 100 + 110 * i, 'grid');
            }
        }

    }

    function issueAttack()
    {
        //console.log('issueAttack');
        resetMove();

        if (attack == false)
        {
            attack = true;
            attack_button.loadTexture('attack', 1);
            console.log('A is down');
        }
        else
        {
            attack = false;
            attack_button.loadTexture('attack', 0);
            console.log('A is up');
        }
    }

    function issueMove()
    {
        resetAttack();

        if (move == false)
        {
            move = true;
            move_button.loadTexture('move', 1);
        }
        else
        {
            move = false;
            move_button.loadTexture('move', 0);
        }
    }

    function resetClick()
    {
        resetAttack();
        resetMove();
        selected = null;
        stat_msg2.setText('');
        unit_msg2.setText('');
    }

    function resetAttack()
    {
        if (attack == true)
        {
            attack = false;
            attack_button.loadTexture('attack', 0);
        }
    }

    function resetMove()
    {
         if (move == true)
        {
            move = false;
            move_button.loadTexture('move', 0);
        }
    }

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

    function controlUnit(unit)
    {
        //console.log('controlUnit');
        //console.log(attack);
        if (selected == null || (attack == false && move == false))
        {
            resetAttack();
            resetMove();
            stat_msg2.setText(unit.type + '\n' + unit.hp + '\n' + unit.atk + '\n' + unit.range + '\n' + unit.move + '\n' + unit.cost);
            unit_msg2.setText(unit.type);
            selected = unit;
        }
        else if (attack == true)
        {
            dealDamage(selected, unit);
            resetAttack();
        }
    }

    function checkRange(arg1, arg2)
    {

    }

    function dealDamage(arg1, arg2)
    {
        console.log(arg1 + ' Deal Damage to ' + arg2);
        arg2.hp -= arg1.atk;
        if (arg2.hp <= 0)
        {
            arg2.destroy();
        }
    }
    
    function pauseGame() {
        console.log('pauseGame');
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('Pause');

    }

    return {
    
        create: function () {
    
        console.log('Test Game');

            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            game.add.tileSprite(0, 0, 1024, 700, 'background');
            game.world.setBounds(0, 0, 1024, 700);

            cursors = game.input.keyboard.createCursorKeys();

            createGrid();

            soldier = game.add.sprite(400, 100, 'char', 7);
            createSoldier(soldier);
            sniper = game.add.sprite(400, 200, 'char', 1);
            createSniper(sniper);
            sniper = game.add.sprite(450, 200, 'char', 1);
            createSniper(sniper);
            tank = game.add.sprite(400, 300, 'tank', 0);
            tank.scale.setTo(0.5, 0.5);
            createTank(tank);
            turret = game.add.sprite(400, 400, 'turret');
            turret.scale.setTo(0.5, 0.5);
            createTurret(turret);

            attack_button = game.add.sprite(0, 500, 'attack', 0);
            move_button = game.add.sprite(100, 500, 'move', 0);

            a_key = game.input.keyboard.addKey(Phaser.Keyboard.A);
            m_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            p_key = game.input.keyboard.addKey(Phaser.Keyboard.P);
            esc_key = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            stat_msg = game.add.text(0, 0, 'Stats\nHP: \nAttack: \nRange: \nMovement: \nCost:');
            stat_msg2 = game.add.text(250, 0 , 'Test');

            unit_msg = game.add.text (0, 400, 'Selected: ');
            unit_msg2 = game.add.text (150, 400);

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
            a_key.onDown.addOnce(issueAttack, this);
            m_key.onDown.addOnce(issueMove, this);
            p_key.onDown.addOnce(pauseGame, this);
            esc_key.onDown.addOnce(resetClick, this);
            


            //stat_change.onDown.add(changeStats, this);
        }
    };
};
