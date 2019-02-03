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

    var selected = null;
    var selected_square = null;

    var esc_key;
    var space_key;
    var a_key;
    var m_key;
    var p_key;

    var player1_square;
    var player2_square;

    var player;
    var player_turn;
    var player_array;

    var buy1_button;
    var buy2_button;
    var buy3_button;
    var buy4_button;
    var end_button;

    var x_count = 50;
    
    var txt_style = {font: "20px Arial"};    
    var stat_msg;
    var stat_msg2;
    var unit_msg;
    var unit_msg2;
    var event_msg;
    var event_msg2;

    function createPlayer(square, num)
    {
        this.num = num;
        this.money = 0;
        this.turn = false;
        this.turret = game.add.group();
        this.square = square;
    }

    function createSoldier(soldier)
    {
        soldier.type = 'soldier';
        soldier.hp = 2;
        soldier.atk = 1;
        soldier.range = 1;
        soldier.move = 1;
        soldier.cost = 1;

        soldier.inputEnabled = true;        
        soldier.events.onInputDown.add( clickUnit, this );
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
        sniper.events.onInputDown.add( clickUnit, this );
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
        tank.events.onInputUp.add( clickUnit, this );
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
        turret.events.onInputDown.add( clickUnit, this );
    }

    function createSquare(square, i, j)
    {
        square.items = game.add.group();
        square.items.visible = false;
        square.i = i;
        square.j = j;
        square.inputEnabled = true;
        square.events.onInputDown.add( clickSquare, this );
    }

    function createGrid()
    {
        grid = new Array(4);

        for (let i = 0; i < grid.length; i++)
        {
            grid[i] = new Array(grid.length);

            for (let j = 0; j < grid[i].length; j++)
            {
                if (i === 0 && j === 1)
                {
                    grid[i][j] = game.add.image(0 + 110 * j, 150 + 110 * i, 'gridA');
                    createSquare(grid[i][j], i , j);
                    player1_square = grid[i][j];
                }
                else if (i === 3 && j === 2)
                {
                    grid[i][j] = game.add.image(0 + 110 * j, 150 + 110 * i, 'gridB');
                    createSquare(grid[i][j], i , j);
                    player2_square = grid[i][j];
                }
                else
                {
                    grid[i][j] = game.add.image(0 + 110 * j, 150 + 110 * i, 'grid');
                    createSquare(grid[i][j]);
                }
            }
        }
    }

    function buySoldier()
    {
        if (player.money > 0)
        {
            player.money -= 1;
            soldier = player.square.items.create(400 + x_count, 100, 'char', 7);
            createSoldier(soldier);            
            x_count += 20;
        } 
    }

    function buySniper()
    {
        if (player.money > 1)
        {
            player.money -= 2;
            sniper = player.square.items.create(400 + x_count, 100, 'char', 1);
            createSniper(sniper);
            x_count += 20;
        }
    }

    function buyTank()
    {
        if (player.money > 3)
        {
            player.money -= 4;
            tank = player.square.items.create(400 + x_count, 100, 'tank', 1);
            tank.scale.setTo(0.5, 0.5);
            createTank(tank);
            x_count += 20;
        }
    }

    function buyTurret()
    {
        if (player.money > 0)
        {
            player.money -= 1;
            turret = player.square.items.create(400 + x_count, 100, 'turret');
            turret.scale.setTo(0.5, 0.5);
            createTurret(turret);
            x_count += 20;
        }
    }

    function issueAttack()
    {
        //console.log('issueAttack');
        if (move === true)
        {
            resetMove();
        }

        if (selected !== null)
        {
            if (attack === false)
            {
                attack = true;
                attack_button.tint = 0xFFFF00;
                //attack_button.loadTexture('attack', 1);
                console.log('A is down');
            }
            else
            {
                resetAttack();
                console.log('A is up');
            }
        }
    }

    function issueMove()
    {
        if (attack === true)
        {
            resetAttack();
        }

        if (selected !== null)
        {
            if (move === false)
            {
                move = true;
                move_button.tint = 0xFFFF00;
                console.log('move');
            }
            else
            {
                resetMove();
            }
        }
    }

    function resetUnit()
    {
        resetAttack();
        resetMove();
        selected_square = null;
        selected = null;
        stat_msg2.setText('');
        unit_msg2.setText('null');
    }

    // call this function when attack is true and need to swap to false;
    function resetAttack()
    {
        attack = false;
        attack_button.tint = 0xFFFFFF;
        //attack_button.loadTexture('attack', 0);
    }

    // call this function when move is true and need to swap back to false.
    function resetMove()
    {
        move = false;
        move_button.tint = 0xFFFFFF;
    }

    function swapTurn()
    {
        player.square.items.visible = false;
        selected = null;
        stat_msg2.setText('');
        unit_msg2.setText('null');

        // change player turn to the next person in the group.
        if (player_turn + 1 < player_array.length)
        {
            player = player_array[player_turn + 1];
            player_turn = player.num;
        }
        else
        {
            player = player_array[0];
            player_turn = player.num;
        }

        startTurn();
    }
        
    function startTurn()
    {
        let income = 2 + (player.turret.children.length / 2);
        player.money += income;
        
        selected_square = player.sqaure;
        player.square.items.visible = true;

        event_msg.setText('Player ' + (player_turn + 1) + '\'s turn');
        event_msg2.setText('Starting income: ' + income + '\nTotal money: ' + player.money);
    }

    /*
    function quitGame()
    {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    function bossFight()
    {

        if (shared.stat_remain === 0)
        {
            game.state.start('Boss');
        }
        else
        {
            stat_msg2.setText("Consume all your stat points before\nfighting the boss.")
        }
    }
    */

    // function called when square is clicked. Action depends on the state of the game.
    function clickSquare(square)
    {
        /// check if a unit is selected and the move option is enabled.
        if (selected !== null && move === true)
        {
            moveUnit(square);
            resetMove();
        }
        // Get a reference to the square that has just been selected and make the state of the square visible.
        else if (selected_square !== null)
        {
            selected_square.items.visible = false;
        }

        selected_square = square;
        selected_square.items.visible = true;
        
    }

    function moveUnit(square)
    {
        selected_square.items.remove(selected);
        square.items.add(selected);
    }

    function clickUnit(unit)
    {
        //console.log('clickUnit');
        //console.log(attack);

        /// check if there is no unit selected or if there is no attack/move command issued.
        /// change the selected unit if the above is true.
        if (selected === null || (attack === false && move === false))
        {
            selected = unit;
            stat_msg2.setText(unit.type + '\n' + unit.hp + '\n' + unit.atk + '\n' + unit.range + '\n' + unit.move + '\n' + unit.cost);
            unit_msg2.setText(unit.type);
        }
        else if (attack === true)
        {
            if (selected === unit)
            {
                event_msg.setText('Can\'t attack yourself.');
                resetAttack();
            }
            else
            {
                dealDamage(selected, unit);
                event_msg.setText('Attacking ' + unit.type);
                resetAttack();
            }
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
    
    function pauseGame()
    {
        //console.log('pauseGame');
        game.state.start('Pause');
    }

    return {
    
        create: function ()
        {
            console.log('Test Game');

            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            game.add.tileSprite(0, 0, 1024, 700, 'background');
            game.world.setBounds(0, 0, 1024, 700);

            createGrid();

            stat_msg = game.add.text(450, 300, 'Stats\nHP: \nAttack: \nRange: \nMovement: \nCost:');
            stat_msg2 = game.add.text(600, 300 , 'Test');

            unit_msg = game.add.text (450, 520, 'Selected: ');
            unit_msg2 = game.add.text (600, 520);

            event_msg = game.add.text(0, 0, 'Event MSG1');
            event_msg2 = game.add.text(0, 50, 'Event MSG2');
            
            player_array = [];
            player = new createPlayer(player1_square, 0);
            player_array.push(player);
            player = new createPlayer(player2_square, 1);
            player_array.push(player);            

            player = player_array[0];
            player_turn = player.num;

            // Set the starting player as player 1.
            startTurn();

            buy1_button = game.add.button(0, 600, 'buy', buySoldier, this);
            buy2_button = game.add.button(140, 600, 'buy', buySniper, this);
            buy3_button = game.add.button(280, 600, 'buy', buyTank, this);
            buy4_button = game.add.button(420, 600, 'buy', buyTurret, this);

            end_button = game.add.button(560, 600, 'end', swapTurn);

            attack_button = game.add.sprite(550, 200, 'attack', 0);
            move_button = game.add.sprite(650, 200, 'move', 0);

            a_key = game.input.keyboard.addKey(Phaser.Keyboard.A);
            m_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            p_key = game.input.keyboard.addKey(Phaser.Keyboard.P);
            esc_key = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            a_key.onDown.add(issueAttack, this);
            m_key.onDown.add(issueMove, this);
            p_key.onDown.add(pauseGame, this);
            esc_key.onDown.add(resetUnit, this);
        },
    
        update: function ()
        {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        }
    };
};
