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
	    game.load.spritesheet('border','assets/Border.png', 500, 2);
	    
	}

	var button1;
	var button2;
	var button3;
	var button4;
	var button5;
	var button_play;

	var text;
	var text2;

	var husky1;
	var husky2;
	var husky3;
	var husky4;
	var husky5;

	var boundaries;
	var huskies;

	var bound1;
	var bound2;
	var bound3;
	var bound4;
	var bound5;
	var bound6;

	var bound7;
	var bound8;
	var finish;

	var player;
	var cursors;
	var input = -1;
	var rng = Math.floor(Math.random() * 5) + 1;

	function create()
	{
		game.add.tileSprite(0, 0, 1800, 600, 'background');
		game.world.setBounds(0, 0, 1800, 500);
		game.physics.startSystem(Phaser.Physics.P2JS);
	    game.physics.p2.setImpactEvents(true);

	    boundaries = game.physics.p2.createCollisionGroup();
	    huskies = game.physics.p2.createCollisionGroup();
	    game.physics.p2.updateBoundsCollisionGroup();

	    var boundary = game.add.group();
		boundary.enableBody = true;
		boundary.physicsBodyType = Phaser.Physics.P2JS;

		bound1 = boundary.create(0, 0, 'border');
		bound1.body.setRectangle(500, 2);
		bound2 = boundary.create(0, 100, 'border');
		bound2.body.setRectangle(500, 2);
		bound3 = boundary.create(0, 200, 'border');
		bound3.body.setRectangle(500, 2);
		bound4 = boundary.create(0, 300, 'border');
		bound4.body.setRectangle(500, 2);
		bound5 = boundary.create(0, 400, 'border');
		bound5.body.setRectangle(500, 2);
		bound6 = boundary.create(0, 500, 'border');
		bound6.body.setRectangle(500, 2);

	    bound1.body.setCollisionGroup(boundaries);
	    bound2.body.setCollisionGroup(boundaries);
	    bound3.body.setCollisionGroup(boundaries);
	    bound4.body.setCollisionGroup(boundaries);
	    bound5.body.setCollisionGroup(boundaries);
	    bound6.body.setCollisionGroup(boundaries);

	    bound1.body.collides([boundaries, huskies]);
	    bound2.body.collides([boundaries, huskies]);
	    bound3.body.collides([boundaries, huskies]);
	    bound4.body.collides([boundaries, huskies]);
	    bound5.body.collides([boundaries, huskies]);
	    bound6.body.collides([boundaries, huskies]);

	    var husky = game.add.group();
		husky.enableBody = true;
		husky.physicsBodyType = Phaser.Physics.P2JS;

		husky1 = husky.create(150, 30, 'husky', 10);
		husky1.body.setRectangle(90, 58);
		husky2 = husky.create(150, 130, 'husky', 10);
		husky2.body.setRectangle(90, 58);
		husky3 = husky.create(150, 230, 'husky', 10);
		husky3.body.setRectangle(90, 58);
		husky4 = husky.create(150, 330, 'husky', 10);
		husky4.body.setRectangle(90, 58);
		husky5 = husky.create(150, 430, 'husky', 10);
		husky5.body.setRectangle(90, 58);
		

		/*
	    husky1 = game.add.sprite(150, 30, 'husky', 10);
	    husky2 = game.add.sprite(150, 130, 'husky', 10);
	    husky3 = game.add.sprite(150, 230, 'husky', 10);
	    husky4 = game.add.sprite(150, 330, 'husky', 10);
	    husky5 = game.add.sprite(150, 430, 'husky', 10);
	    */
	    
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

    	/*
    	huskies = game.add.group();
    	huskies.add(husky1);
    	huskies.add(husky2);
    	huskies.add(husky3);
    	huskies.add(husky4);
    	huskies.add(husky5);
    	*/
    	husky1.body.setCollisionGroup(huskies);
    	husky2.body.setCollisionGroup(huskies);
    	husky3.body.setCollisionGroup(huskies);
    	husky4.body.setCollisionGroup(huskies);
    	husky5.body.setCollisionGroup(huskies);

    	husky1.body.collides(boundaries, slow_down, this);
    	husky2.body.collides(boundaries, slow_down, this);
    	husky3.body.collides(boundaries, slow_down, this);
    	husky4.body.collides(boundaries, slow_down, this);
    	husky5.body.collides(boundaries, slow_down, this);

    	//game.physics.p2.enable(huskies);

    	//game.physics.arcade.enable(boundaries);
	    
	    //game.physics.p2.enable(bound1);
	    

	    //game.physics.p2.enable(bound2);

	    //bound2.body.kinematic = false;
	    //game.physics.p2.enable(bound3);
	    //game.physics.p2.enable(bound4);
	    //game.physics.p2.enable(bound5);
	    //game.physics.p2.enable(bound6);
	    
	    
	    /*
	    bound1.enableBody = true;
	    bound2.enableBody = true;
	    bound3.enableBody = true;
	    bound4.enableBody = true;
	    bound5.enableBody = true;
	    bound6.enableBody = true;
	    */

	    /*
	    bound1.body.immovable = true;
	    bound2.body.immovable = true;
	    bound3.body.immovable = true;
	    bound4.body.immovable = true;
	    bound5.body.immovable = true;
	    bound6.body.immovable = true;

	    bound1.body.moves = false;
	    bound2.body.moves = false;
	    bound3.body.moves = false;
	    bound4.body.moves = false;
	    bound5.body.moves = false;
	    bound6.body.moves = false;

		bound1.body.allowGravity = false;
		bound2.body.allowGravity = false;
		bound3.body.allowGravity = false;
		bound4.body.allowGravity = false;
		bound5.body.allowGravity = false;
		bound6.body.allowGravity = false;
		*/

	    cursors = game.input.keyboard.createCursorKeys();
	    
	    // new Button(game [, x] [, y] [, key] [, callback] [, callbackContext] [, overFrame] [, outFrame] [, downFrame] [, upFrame])
	    button1 = game.add.button(0, 25, 'arrow', actionOnClick1, this, 0, 1, 0);
		button2 = game.add.button(0, 125, 'arrow', actionOnClick2, this, 0, 1, 0);
		button3 = game.add.button(0, 225, 'arrow', actionOnClick3, this, 0, 1, 0);
		button4 = game.add.button(0, 325, 'arrow', actionOnClick4, this, 0, 1, 0);
		button5 = game.add.button(0, 425, 'arrow', actionOnClick5, this, 0, 1, 0);
		button_play = game.add.button(150, 510, 'button', click_play, this, 0, 0, 1, 0);
		button_play.visible = false;

		

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

	    text = game.add.text(100, 520, 'Select one of the 5 Arrows to choose your character.');
	    text.font = 'Arial Black';
	    text.fill = '#000000';

	    text2 = game.add.text(100, 520, 'Use the arrow keys to move your character');
	    text2.visible = false;
	    text2.font = 'Arial Black';
	    text2.fill = '#000000';	    
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

		game.physics.arcade.collide(huskies, boundaries, slow_down, null, this);
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
		text.visible = false;
		button_play.visible = true;

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
		text.visible = false;
		button_play.visible = true;
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
		text.visible = false;
		button_play.visible = true;
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
		text.visible = false;
		button_play.visible = true;
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
		text.visible = false;
		button_play.visible = true;
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

			button_play.inputEnabled = false;
			button_play.visible = false;
			text2.visible = true;
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

	function slow_down()
	{
		console.log('Collision');
	}
};