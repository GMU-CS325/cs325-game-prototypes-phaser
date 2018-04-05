"use strict";

window.onload = function()
{
	var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

	function preload()
	{		
	    game.load.image('background','assets/temp_bg.jpg');
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

	var player;
	var cursors;

	function create()
	{
		game.add.tileSprite(0, 0, 1300, 650, 'background');
		//game.world.setBounds(0, 0, 1800, 500);
	    cursors = game.input.keyboard.createCursorKeys();

	    button1 = game.add.sprite(250, 500, 'tile', 1);
	    button2 = game.add.sprite(400, 500, 'tile', 1);
	    button3 = game.add.sprite(550, 500, 'tile', 1);
	    button4 = game.add.sprite(700, 500, 'tile', 1);
	    button5 = game.add.sprite(850, 500, 'tile', 1);
	    button6 = game.add.sprite(1000, 500, 'tile', 1);
	    
	    player = game.add.sprite(100, 450, 'man', 1);
	    player.anchor.setTo(0.5, 0.5);
	    player.scale.setTo(1, 1);

	    player.animations.add('run', [1,9,10]);
	    //player.animations.play('run', 3, true);
	}


	function update()
	{			
	    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	    {
	        player.x -= 4;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	    {
	        player.x += 4;
	    }

	    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
	    {
	        player.y -= 4;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	    {
	        player.y += 4;
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