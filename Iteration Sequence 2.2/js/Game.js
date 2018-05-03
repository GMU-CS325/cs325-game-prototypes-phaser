"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own letiables.
    let grid;
    let attack = false;
    let move = false;
    let attack_button;
    let move_button;

    let soldier;
    let sniper;
    let tank;
    let turret;

    let selected = null;
    let selected_square = null;

    let esc_key;
    let space_key;
    let a_key;
    let m_key;
    let p_key;

    let moved_group;

    let player1_square;
    let player2_square;

    let player;
    let player_turn;
    let player_array;

    let buy1_button;
    let buy2_button;
    let buy3_button;
    let buy4_button;
    let end_button;

    let x_count = 50;
    
    let txt_style = {font: "20px Arial"};    
    let stat_msg;
    let stat_msg2;
    let unit_msg;
    let unit_msg2;
    
    let event_msg;
    let event_msg2;
    let event_msg3;
    let event_msg4;

    function createPlayer(square, num)
    {
        this.num = num;
        this.money = 0;
        this.turn = false; 
        this.turret = 1;
        this.square = square;
    }

    function createSoldier(soldier, num)
    {
        soldier.type = 'soldier';
        soldier.hp = 2;
        soldier.atk = 1;
        soldier.range = 1;
        soldier.move = 1;
        soldier.cost = 1;
        soldier.num = num;
        soldier.moved = false;

        if (soldier.num === 0)
        {
            soldier.tint = 0xFF00FF;
            soldier.i = player1_square.i;
            soldier.j = player1_square.j;
        }
        if (soldier.num === 1)
        {
            soldier.tint = 0xCCCC00;
            soldier.i = player2_square.i;
            soldier.j = player2_square.j;
        }

        soldier.inputEnabled = true;        
        soldier.events.onInputDown.add( clickUnit, this );
    }

    function createSniper(sniper, num)
    {
        sniper.type = 'sniper';
        sniper.hp = 1;
        sniper.atk = 1;
        sniper.range = 1;
        sniper.move = 1;
        sniper.cost = 2;
        sniper.diagonal = true;
        sniper.num = num;
        sniper.moved = false;

        if (sniper.num === 0)
        {
            sniper.tint = 0xFF00FF;
            sniper.i = player1_square.i;
            sniper.j = player1_square.j;
        }
        if (sniper.num === 1)
        {
            sniper.tint = 0xCCCC00;
            sniper.i = player2_square.i;
            sniper.j = player2_square.j;
        }

        sniper.inputEnabled = true;        
        sniper.events.onInputDown.add( clickUnit, this );
    }

    function createTank(tank, num)
    {
        tank.type = 'tank';
        tank.hp = 5;
        tank.atk = 1;
        tank.range = 1;
        tank.move = 1;
        tank.cost = 4;
        tank.diagonal = true;
        tank.num = num;
        tank.moved = false;

        if (tank.num === 0)
        {
            tank.tint = 0xFF00FF;
            tank.i = player1_square.i;
            tank.j = player1_square.j;
        }
        if (tank.num === 1)
        {
            tank.tint = 0xCCCC00;
            tank.i = player2_square.i;
            tank.j = player2_square.j;
        }

        tank.inputEnabled = true;        
        tank.events.onInputUp.add( clickUnit, this );
    }

    function createTurret(turret, num)
    {
        turret.type = 'turret';
        turret.hp = 3;
        turret.atk = 2;
        turret.range = 1;
        turret.move = 0;
        turret.cost = 1;
        turret.diagonal = true;
        turret.num = num;
        turret.moved = false;

        if (turret.num === 0)
        {
            turret.tint = 0xFF00FF;
        }
        if (turret.num === 1)
        {
            turret.tint = 0xCCCC00;
        }

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
            createSoldier(soldier, player.num);            
            x_count += 20;
            event_msg3.setText('Total money: ' + player.money);
            event_msg4.setText('Purchasing a soldier.');
        }
        else
        {
            event_msg4.setText('Not enough money to buy a soldier.');
        }
    }

    function buySniper()
    {
        if (player.money > 1)
        {
            player.money -= 2;
            sniper = player.square.items.create(400 + x_count, 100, 'char', 1);
            createSniper(sniper, player.num);
            x_count += 20;
            event_msg3.setText('Total money: ' + player.money);
            event_msg4.setText('Purchasing a sniper.');
        }
        else
        {
            event_msg4.setText('Not enough money to buy a sniper.');
        }
    }

    function buyTank()
    {
        if (player.money > 3)
        {
            player.money -= 4;
            tank = player.square.items.create(400 + x_count, 100, 'tank', 0);
            tank.scale.setTo(0.5, 0.5);
            createTank(tank, player.num);
            x_count += 20;
            event_msg3.setText('Total money: ' + player.money);
            event_msg4.setText('Purchasing a tank.');
        }
        else
        {
            event_msg4.setText('Not enough money to buy a tank.');
        }
    }

    function buyTurret()
    {
        if (player.money > 0)
        {
            player.money -= 1;
            player.turret++;
            turret = player.square.items.create(400 + x_count, 100, 'turret');
            turret.scale.setTo(0.5, 0.5);
            createTurret(turret, player.num);
            x_count += 20;
            event_msg3.setText('Total money: ' + player.money);
            event_msg4.setText('Constructing a turret.');
        }
        else
        {
            event_msg4.setText('Not enough money to buy a turret.');
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
        if (selected_square !== null)
        {
            selected_square.tint = 0xFFFFFF;
            selected_square.items.visible = false;
        }
        if (selected !== null)
        {
            if (selected.num === 0)
            {
                selected.tint = 0xFF00FF;
            }
            if (selected.num === 1)
            {
                selected.tint = 0xCCCC00;
            }
        }
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
        resetUnit();

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
        let income = 2 + Math.floor(player.turret / 2);
        player.money += income;

        event_msg.setText('Player ' + (player_turn + 1) + '\'s turn');
        event_msg2.setText('Income: ' + income);
        event_msg3.setText('Total money: ' + player.money);
        event_msg4.setText('');
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
        console.log(square);
        console.log(square.j);
        /// check if a unit is selected and the move option is enabled.
        if (selected !== null && move === true)
        {
            if (selected.moved === true)
            {
                event_msg4.setText('This unit has already moved this turn.');
                resetMove();
            }
            else
            {
                let x = Math.hypot((selected.i - square.i), (selected.j - square.j));
                console.log(selected.i);
                console.log(selected.j);
                console.log(square.i);
                console.log(square.j);

                switch(selected.type)
                {
                    case 'soldier':
                        if (x <= 1)
                        {
                            moveUnit(square);
                            event_msg4.setText('Moving to ' + selected.i + ', ' + selected.j);
                            resetMove();
                        }
                        else
                        {   
                            console.log(x);
                            event_msg4.setText('That square is too far away.');
                            resetMove();
                        }
                        break;
                    case 'sniper':
                        if (x <= 1)
                        {
                            moveUnit(square);
                            event_msg4.setText('Moving to ' + selected.i + ', ' + selected.j);
                            resetMove();
                        }
                        else
                        {
                            event_msg4.setText('That square is too far away.');
                            resetMove();
                        }
                        break;
                    case 'tank':
                        if (x <= 1)
                        {
                            moveUnit(square);
                            event_msg4.setText('Moving to ' + selected.i + ', ' + selected.j);
                            resetMove();
                        }
                        else
                        {
                            event_msg4.setText('That square is too far away.');
                            resetMove();
                        }
                        break;
                    case 'turret':
                        event_msg4.setText('This unit can\'t move.');
                        break
                    default:
                        break;
                }
            }
        }
        // Get a reference to the square that has just been selected and make the state of the square visible.
        else
        {
            if (selected_square !== null)
            {
                selected_square.items.visible = false;
                selected_square.tint = 0xFFFFFF;
            }

            selected_square = square;
            selected_square.items.visible = true;
            selected_square.tint = 0x999999;
        }
    }

    function moveUnit(square)
    {
        selected.moved = true;
        selected.i = square.i;
        selected.j = square.j;
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
            if (selected !== null)
            {
                if (selected.num === 0)
                {
                    selected.tint = 0xFF00FF;
                }
                if (selected.num === 1)
                {
                    selected.tint = 0xCCCC00;
                }
            }
            selected = unit;
            selected.tint = 0xFFFFFF;
            stat_msg2.setText('\n' + unit.hp + '\n' + unit.atk + '\n' + unit.range + '\n' + unit.move + '\n' + unit.cost);
            unit_msg2.setText(unit.type);
        }
        else if (attack === true)
        {
            if (selected.num !== player.num)
            {
                event_msg4.setText('Can\'t attack with opponent\'s unit.');
                resetAttack();
            }
            else if (selected === unit)
            {
                event_msg4.setText('Can\'t attack yourself.');
                resetAttack();
            }
            else if (selected.num === unit.num)
            {
                event_msg4.setText('Can\'t attack your allies.');
                resetAttack();
            }
            else
            {
                let x = Math.hypot((selected.i - unit.i), (selected.j - unit.j));

                switch (selected.type)
                {
                    case 'soldier':
                        console.log('soldier');
                        console.log(x);
                        if (x <= 1)
                        {
                            dealDamage(selected, unit);
                            event_msg4.setText('Attacking ' + unit.type);
                            resetAttack();
                        }
                        else
                        {
                            event_msg4.setText('That unit is too far away.');
                            resetAttack();
                        }
                        break;
                    case 'sniper':
                        console.log('sniper');
                        console.log(x);
                        if (x <= 2)
                        {
                            dealDamage(selected, unit);
                            event_msg4.setText('Attacking ' + unit.type);
                            resetAttack();
                        }
                        else
                        {
                            event_msg4.setText('That unit is too far away.');
                            resetAttack();
                        }
                        break;
                    case 'tank':
                        console.log('tank');
                        console.log(x);
                        if (x <= 1.5)
                        {
                            dealDamage(selected, unit);
                            event_msg4.setText('Attacking ' + unit.type);
                            resetAttack();
                        }
                        else
                        {
                            event_msg4.setText('That unit is too far away.');
                            resetAttack();
                        }
                        break;
                    case 'turret':
                        console.log('turret');
                        console.log(x);
                        if (x <= 1.5)
                        {
                            dealDamage(selected, unit);
                            event_msg4.setText('Attacking ' + unit.type);
                            resetAttack();
                        }
                        else
                        {
                            event_msg4.setText('That unit is too far away.');
                            resetAttack();
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    function dealDamage(arg1, arg2)
    {
        console.log(arg1 + ' Deal Damage to ' + arg2);
        arg2.hp -= arg1.atk;
        if (arg2.hp <= 0)
        {
            let id = arg2.num;
            player_array[id].turret--;
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
            stat_msg2 = game.add.text(600, 300 , '');

            unit_msg = game.add.text (450, 520, 'Selected: ');
            unit_msg2 = game.add.text (600, 520);

            event_msg = game.add.text(0, 0, 'Event MSG1');
            event_msg2 = game.add.text(0, 40, 'Event MSG2');
            event_msg3 = game.add.text(210, 40, 'Event MSG3');
            event_msg4 = game.add.text(0, 80, '');
            
            moved_group = game.add.group();
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
