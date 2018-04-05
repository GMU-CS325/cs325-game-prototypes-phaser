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
	    game.load.image('background','assets/temp_bg');
	}

	var button1;

	var player;
	var cursors;
	var input = -1;
	var rng = Math.floor(Math.random() * 5) + 1;

	function create()
	{
		game.add.tileSprite(0, 0, 1800, 600, 'background');
		game.world.setBounds(0, 0, 1800, 500);
	    cursors = game.input.keyboard.createCursorKeys();    	    
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

	function click_play()
	{
		console.log("Play");
	}

	function slow_down()
	{
		console.log('Collision');
	}
};