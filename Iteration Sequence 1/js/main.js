"use strict";

window.onload = function()
{
	var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

	function preload()
	{		
	    game.load.image('background','assets/temp_bg.jpg');
	    game.load.image('stat','assets/stat.png');
	    game.load.spritesheet('tile','assets/sheet.png', 70, 70);
	    game.load.spritesheet('man','assets/adventurer_tilesheet.png', 80, 110);
	    //game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');
	}

	var button1;
	var button2;
	var button3;
	var button4;
	var button5;
	var button6;

	var stat_text;
	var stat_text2;
	var stat_msg;;
	
	var stat_change;

	var stat_type = -1;
	var stat_strength = 0;
	var stat_resist = 0;
	var stat_intuit = 0;
	var stat_luck = 0;
	var stat_remain = 7;

	var RNG;

	var player;
	var cursors;

	function create()
	{
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
	}


	function update()
	{			
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
   
	    /*
	    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
	    {
	        player.y -= 4;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	    {
	        player.y += 4;
	    }
	    */
	}

	function updateText()
	{
		stat_text2.setText(stat_strength + '\n' + stat_resist + '\n' + stat_intuit + '\n' + stat_luck + '\n' + stat_remain);
	}

	function updateSuccess()
	{
		stat_msg.setText('Success');
	}

	function updateFail()
	{
		stat_msg.setText('Fail');
	}

	function updateStatError()
	{
		stat_msg.setText('Not enough Stat points');
	}

	function updateMaxStat()
	{
		stat_msg.setText("Stat is already maxed");
	}

	function changeStats()
	{
		console.log('Change Stats');

		if (stat_remain > 0)
		{
			if (player.x >= 250 && player.x < 320)
			{
				stat_type = 1;
			}
			else if (player.x >= 400 && player.x < 470)
			{
				stat_type = 2;
			}
			else if (player.x >= 550 && player.x < 620)
			{
				stat_type = 3;
			}
			else if (player.x >= 700 && player.x < 770)
			{
				stat_type = 4;
			}
			else
			{
				stat_type = -1;
			}

			RNG = game.rnd.integerInRange(0, 99);


			switch (stat_type)
			{
				case 1:
					if (stat_strength == 0 && RNG > 19)
					{
						stat_strength++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_strength == 1 && RNG > 39)
					{
						stat_strength++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_strength == 2 && RNG > 59)
					{
						stat_strength++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_strength == 3)
					{
						updateMaxStat();
					}
					else
					{
						stat_remain--;
						updateFail();
					}
					break;
				case 2:
					if (stat_resist == 0 && RNG > 19)
					{
						stat_resist++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_resist == 1 && RNG > 39)
					{
						stat_resist++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_resist == 2 && RNG > 59)
					{
						stat_resist++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_resist == 3)
					{
						updateMaxStat();
					}
					else
					{
						stat_remain--;
						updateFail();
					}
					break;
				case 3:
					if (stat_intuit == 0 && RNG > 19)
					{
						stat_intuit++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_intuit == 1 && RNG > 39)
					{
						stat_intuit++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_intuit == 2 && RNG > 59)
					{
						stat_intuit++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_intuit == 3)
					{
						updateMaxStat();
					}
					else
					{
						stat_remain--;
						updateFail();
					}
					break;
				case 4:
					if (stat_luck == 0 && RNG > 19)
					{
						stat_luck++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_luck == 1 && RNG > 39)
					{
						stat_luck++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_luck == 2 && RNG > 59)
					{
						stat_luck++;
						stat_remain--;
						updateSuccess();
					}
					else if (stat_luck == 3)
					{
						updateMaxStat();
					}
					else
					{
						stat_remain--;
						updateFail();
					}
					break;
				default:
					break;
			}
			updateText();
		}
		else
		{
			updateStatError();
		}
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

};