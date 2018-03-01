"use strict";

window.onload = function()
{
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    // mods by Patrick OReilly 
    // twitter: @pato_reilly

	var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

	function preload()
	{
		game.load.spritesheet('button', 'assets/Play.png', 200, 90);
		game.load.spritesheet('arrow', 'assets/Arrow.png', 101, 50);
	    game.load.image('background','assets/Background.png');
	    game.load.spritesheet('husky','assets/Husky.png', 90, 58, 3);
	    
	}

	var button1;
	var button2;
	var button3;
	var button4;
	var button5;
	var buttonS;

	var husky1;
	var husky2;
	var husky3;
	var husky4;
	var husky5;

	var bound1;
	var bound2;
	var bound3;
	var bound4;
	var bound5;

	var player;
	var cursors;
	var input = -1;
	var rng = Math.floor(Math.random() * 5) + 1;

	function create()
	{
	    game.add.tileSprite(0, 0, 1800, 600, 'background');

	    game.world.setBounds(0, 0, 1800, 500);

	    game.physics.startSystem(Phaser.Physics.P2JS);

	    husky1 = game.add.sprite(150, 50, 'husky', 10);
	    husky2 = game.add.sprite(150, 150, 'husky', 10);
	    husky3 = game.add.sprite(150, 250, 'husky', 10);
	    husky4 = game.add.sprite(150, 350, 'husky', 10);
	    husky5 = game.add.sprite(150, 450, 'husky', 10);

	    husky1.animations.add('wag');
    	husky1.animations.play('wag', 8, true);
    	husky2.animations.add('wag');
    	husky2.animations.play('wag', 8, true);
    	husky3.animations.add('wag');
    	husky3.animations.play('wag', 8, true);
    	husky4.animations.add('wag');
    	husky4.animations.play('wag', 8, true);
    	husky5.animations.add('wag');
    	husky5.animations.play('wag', 8, true);

	    game.physics.p2.enable(husky1);
	    game.physics.p2.enable(husky2);
	    game.physics.p2.enable(husky3);
	    game.physics.p2.enable(husky4);
	    game.physics.p2.enable(husky5);

	    bound1 = new Phaser.Rectangle(100, 0, 1700, 100);
	    bound2 = new Phaser.Rectangle(100, 100, 1700, 100);
	    bound3 = new Phaser.Rectangle(100, 200, 1700, 100);
	    bound4 = new Phaser.Rectangle(100, 300, 1700, 100);
	    bound5 = new Phaser.Rectangle(100, 400, 1700, 100);

	    cursors = game.input.keyboard.createCursorKeys();
	    
	    // new Button(game [, x] [, y] [, key] [, callback] [, callbackContext] [, overFrame] [, outFrame] [, downFrame] [, upFrame])
	    button1 = game.add.button(0, 25, 'arrow', actionOnClick1, this, 0, 1, 0);
		button2 = game.add.button(0, 125, 'arrow', actionOnClick2, this, 0, 1, 0);
		button3 = game.add.button(0, 225, 'arrow', actionOnClick3, this, 0, 1, 0);
		button4 = game.add.button(0, 325, 'arrow', actionOnClick4, this, 0, 1, 0);
		button5 = game.add.button(0, 425, 'arrow', actionOnClick5, this, 0, 1, 0);
		buttonS = game.add.button(150, 510, 'button', click_play, this, 0, 0, 1, 0);

	    button1.onInputOver.add(over, this);
	    button1.onInputOut.add(out, this);
	    button1.onInputUp.add(up, this);

		button2.onInputOver.add(over, this);
	    button2.onInputOut.add(out, this);
	    button2.onInputUp.add(up, this);

		button3.onInputOver.add(over, this);
	    button3.onInputOut.add(out, this);
	    button3.onInputUp.add(up, this);

		button4.onInputOver.add(over, this);
	    button4.onInputOut.add(out, this);
	    button4.onInputUp.add(up, this);

		button5.onInputOver.add(over, this);
	    button5.onInputOut.add(out, this);
	    button5.onInputUp.add(up, this);


	    husky1.inputEnabled = true;
	    husky1.input.boundsRect = bound1;
	    husky2.input.boundsRect = bound2;
	    husky3.input.boundsRect = bound3;
	    husky4.input.boundsRect = bound4;
	    husky5.input.boundsRect = bound5;

	}

	function update()
	{
		if (player != null)
		{
		    player.body.setZeroVelocity();

		    if (cursors.up.isDown)
		    {
		        player.body.moveUp(300)
		    }
		    else if (cursors.down.isDown)
		    {
		        player.body.moveDown(300);
		    }

		    if (cursors.left.isDown)
		    {
		        player.body.velocity.x = -300;
		    }
		    else if (cursors.right.isDown)
		    {
		        player.body.moveRight(300);
		    }
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

	function actionOnClick1()
	{
		console.log('click 1');

		button1.setFrames(1, 0, 0, 0);

		switch (input)
		{
			case 2:
				button2.setFrames(0, 1, 0);
				button2.inputEnabled = true;
				break;
			case 3:
				button3.setFrames(0, 1, 0);
				button3.inputEnabled = true;
				break;
			case 4:
				button4.setFrames(0, 1, 0);
				button4.inputEnabled = true;
				break;
			case 5:
				button5.setFrames(0, 1, 0);
				button5.inputEnabled = true;
				break;
			default:
				break;
		}
	    
		button1.inputEnabled = false;
		input = 1;
	}

	function actionOnClick2()
	{
		console.log('click 2');

		button2.setFrames(1, 0, 0, 0);

		switch (input)
		{
			case 1:
				button1.setFrames(0, 1, 0);
				button1.inputEnabled = true;
				break;
			case 3:
				button3.setFrames(0, 1, 0);
				button3.inputEnabled = true;
				break;
			case 4:
				button4.setFrames(0, 1, 0);
				button4.inputEnabled = true;
				break;
			case 5:
				button5.setFrames(0, 1, 0);
				button5.inputEnabled = true;
				break;
			default:
				break;
		}
	    
		button2.inputEnabled = false;
		input = 2;
	}

	function actionOnClick3()
	{
		console.log('click 3');

		button3.setFrames(1, 0, 0, 0);

		switch (input)
		{
			case 1:
				button1.setFrames(0, 1, 0);
				button1.inputEnabled = true;
				break;
			case 2:
				button2.setFrames(0, 1, 0);
				button2.inputEnabled = true;
				break;
			case 4:
				button4.setFrames(0, 1, 0);
				button4.inputEnabled = true;
				break;
			case 5:
				button5.setFrames(0, 1, 0);
				button5.inputEnabled = true;
				break;
			default:
				break;
		}
	    
		button3.inputEnabled = false;
		input = 3;
	}

	function actionOnClick4()
	{
		console.log('click 4');

		button4.setFrames(1, 0, 0, 0);

		switch (input)
		{
			case 1:
				button1.setFrames(0, 1, 0);
				button1.inputEnabled = true;
				break;
			case 2:
				button2.setFrames(0, 1, 0);
				button2.inputEnabled = true;
				break;
			case 3:
				button3.setFrames(0, 1, 0);
				button3.inputEnabled = true;
				break;
			case 5:
				button5.setFrames(0, 1, 0);
				button5.inputEnabled = true;
				break;
			default:
				break;
		}
	    
		button4.inputEnabled = false;
		input = 4;
	}

	function actionOnClick5()
	{
		console.log('click 5');

		button5.setFrames(1, 0, 0, 0);

		switch (input)
		{
			case 1:
				button1.setFrames(0, 1, 0);
				button1.inputEnabled = true;
				break;
			case 2:
				button2.setFrames(0, 1, 0);
				button2.inputEnabled = true;
				break;
			case 3:
				button3.setFrames(0, 1, 0);
				button3.inputEnabled = true;
				break;
			case 4:
				button4.setFrames(0, 1, 0);
				button4.inputEnabled = true;
				break;
			default:
				break;
		}
	    
		button5.inputEnabled = false;
		input = 5;
	}

	function click_play()
	{
		console.log("Play");

		if (input == -1)
		{
			//Do nothing.
		}
		else
		{
			switch (input)
			{
				case 1:
					player = husky1;
					break;
				case 2:
					player = husky2;
					break;
				case 3:
					player = husky3;
					break;
				case 4:
					player = husky4;
					break;
				case 5:
					player = husky5;
					break;
				default:
					break;
			}

			buttonS.inputEnabled = false;	
		    //  Notice that the sprite doesn't have any momentum at all,
		    //  it's all just set by the camera follow type.
		    //  0.1 is the amount of linear interpolation to use.
		    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
		    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		    player.body.fixedRotation = true;

			husky1.body.moveRight(300);
			husky2.body.moveRight(300);
			husky3.body.moveRight(300);
			husky4.body.moveRight(300);
			husky5.body.moveRight(300);

		}
	}
};