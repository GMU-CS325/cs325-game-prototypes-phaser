window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
	var game = new Phaser.Game(700, 500, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

	function preload() {

		//Add my spirites and background image
		game.load.spritesheet('yume', 'assets/nurse.png', 32, 48);
	    game.load.image('background', 'assets/city_background.png');
		game.load.image('effectie', 'assets/1.png');
		game.load.image('rOne', 'assets/1.png');
		game.load.image('rTwo', 'assets/2.png');
		game.load.image('rThree', 'assets/3.png');
		game.load.image('rFour', 'assets/4.png');
		game.load.image('rFive', 'assets/5.png');
		game.load.audio('sfx', 'assets/sounds.ogg');

	}

	var effect;
	var player;
	var grav;
	var facing = 'left';
	var jumpTimer = 0;
	var score = 1;
	var cursors;
	var bg;
	var scoreText;
	var latinNumber;
	var introText;
	var fx;
	var timer=0;
	var stateText;
	var arr = ["rOne", "rTwo", "rThree","rFour","rFive"];

	function create() {

	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    bg = game.add.tileSprite(0, 0, 700, 500, 'background');

		grav = 55; //starting slow gravity
		game.physics.arcade.gravity.y = grav;

	    player = game.add.sprite(350, 500, 'yume');
		
	    game.physics.enable(player, Phaser.Physics.ARCADE);

	    player.body.bounce.y = 0.1;
	    player.body.collideWorldBounds = true;
		player.body.gravity.y=100;
	    player.body.setSize(20, 32, 5, 16);
		
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('turn', [4], 20, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);
		
	    cursors = game.input.keyboard.createCursorKeys();
		
		fx = game.add.audio('sfx');
		fx.allowMultiple = true;
		
		fx.addMarker('destroy', 0, 0.37);
		fx.addMarker('over', 0.37, 0.69);
		
		scoreText = game.add.text(32, 10, 'score: 1', { font: "20px Arial", fill: "#ff0000", align: "left" });
		latinNumber = game.add.text(200, 30, 'Collect Organs \n'+lNumber, { font: "30px Arial Black", fill: "#ff0000", align: "center" });
		introText = game.add.text(game.world.centerX, 300, '- instructions to play game - \n the game is simple \n collect the correct organs\n of the number and get a point \n collect the wrong and loose a point  \n if you get to 5 points you win the game \n if you get to 0 you loose the game \n ......\n click to start and good luck!!',
		 
		 { font: "25px Arial Black", fill: "#0000FF", align: "center" });
		introText.anchor.setTo(0.5, 0.5);
		
		game.input.onDown.add(createEffect, this);

		//  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = true;

	}

	function update() {

	    game.physics.arcade.collide(player, effect, collisionHandler, null, this);
	 
		player.body.velocity.x = 0;

		if(effect!=null){
			if( effect.body.onFloor() ){
				effect.kill(); //destroy effect
				createEffect();
			}
		}

		if (cursors.left.isDown)
	    {
	        player.body.velocity.x = -250;

	        if (facing != 'left')
	        {
	            player.animations.play('left');
	            facing = 'left';
	        }
	    }
	    else if (cursors.right.isDown)
	    {
	        player.body.velocity.x = 250;

	        if (facing != 'right')
	        {
	            player.animations.play('right');
	            facing = 'right';
	        }
	    }
	    else
	    {
	        if (facing != 'idle')
	        {
	            player.animations.stop();

	            if (facing == 'left')
	            {
	                player.frame = 0;
	            }
	            else
	            {
	                player.frame = 5;
	            }

	            facing = 'idle';
	        }
	    }

	}
	var rNumber = 0;
	var lNumber = Math.floor((Math.random() * 5) + 1);
	
	function createEffect(){
		//This function randomly creates an Effect and drops it randomly.
		introText.visible = false;
		rNumber = Math.floor((Math.random() * 5) + 1);
		
		if(rNumber == 0){
			effect = game.add.sprite(game.world.randomX, 0, 'rOne');
		}else if (rNumber == 1){
			effect = game.add.sprite(game.world.randomX, 0, 'rOne');
		}else if (rNumber == 2){
			effect = game.add.sprite(game.world.randomX, 0, 'rTwo');
		}else if (rNumber == 3){
			effect = game.add.sprite(game.world.randomX, 0, 'rThree');
		}else if (rNumber == 4){
			effect = game.add.sprite(game.world.randomX, 0, 'rFour');
		}else if (rNumber == 5){
			effect = game.add.sprite(game.world.randomX, 0, 'rFive');
		}else 
			effect = game.add.sprite(game.world.randomX, 0, arr[lNumber-1]);
		
		game.physics.enable(effect, Phaser.Physics.ARCADE);
		effect.body.collideWorldBounds = true;
		effect.body.gravity.y=50;
		game.physics.arcade.gravity.y = grav;
	}
	
	function collisionHandler(_player, _effect) {

		_effect.kill(); //destroy effect
		if (rNumber == rNumber){
			score ++; //increment score
			if(score >4){
				gameOver();
			}
			lNumber = Math.floor((Math.random() * 5) + 1);			
			latinNumber.text = 'Collect Organ \n'+lNumber; //display new score
		}
		else {
			score --;
			if(score <=0){
				gameOver();
			}
		}
		scoreText.text = 'score: ' + score; //display new score
		
		fx.play('destroy');
		
		if(score%20==0){
			grav=grav*1.25;
		}
		createEffect();

	}

	
	// function gameOver() {
	// 	fx.play('over');
	// 	introText.text = "gameOver";

	// 	introText.visible = true;

	// }

	function gameOver() 
	{
    
		player.kill();
    	effect.kill();
	    fx.play('over');
	    if(score > 4){
        	stateText.text=" CONGRATS!! \n YOU WON\n Click to restart";
	    }else
        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
        game.input.onTap.addOnce(restart,this);

	}

	function render() {
        //Add 

	}

	function restart () {

    //  A new level starts
    
    //resets the life count
    // lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    // aliens.removeAll();
    // createAliens();

    //revives the player
    // player.revive();
    //hides the text
    stateText.visible = false;
    score = 1;
    player.revive();

}
    
};