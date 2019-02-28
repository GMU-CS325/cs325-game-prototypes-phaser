"use strict";

BasicGame.Hallway = function (game) {

    this.player = null;
    this.hm1;
    this.hm2;

    this.cursors;
    this.throw;
    this.weapon;

    this.timer;

    this.moveAfter = 3000;
    this.lastMove = 0; 

    this.isover = 0;
    this.textglobal;
 
    this.win = 0;
    this.music = null;

    this.caughtTime = 0;


};

BasicGame.Hallway.prototype = {

    
    create: function () {

    	this.music = this.add.audio('hall');
		this.music.play();
      
        this.lastMove = this.game.time.time;

        this.add.sprite(0, 0, 'hall');


        //200
        this.player = this.add.sprite(80, 200, 'player');
        
        //physics TESTING
        this.game.world.setBounds(0,0, 550, 960);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.enable(this.player);


        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.throw = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);



        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        this.player.anchor.setTo(0.5,0.5);
        this.player.fixedRotation = true;


        this.hm1 = this.add.sprite(480, 100, 'monitor');
        //this.hm1.anchor.setTo(0.5,0.5);

        this.hm2 = this.add.sprite(550, 390, 'monitor');
        //this.hm2.anchor.setTo(0.5,0.5);
        

        var lockers = this.game.add.group();
        lockers.enableBody = true;
        lockers.physicsBodyType = Phaser.Physics.P2JS;

        for(var i = 250; i < 700; i+= 200) {
            var row = lockers.create(200, i, '8');
            row.body.mass = 99999;    
        }
        for(var i = 350; i < 800; i+= 200) {
            var row = lockers.create(350, i, '8');
            row.body.mass = 99999;    
        }
       
       
        var style = { font: "25px Verdana", fill: "#000", align: "center" };
        var text = this.game.add.text( this.game.world.centerX, 450, "Avoid the hall monitors! ", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        this.textglobal = text;
    },


    update: function () {

        this.player.body.rotation = 0;

        this.player.body.setZeroVelocity();
        
        if(this.player.x > 525 && (this.player.y > 820 && this.player.y < 890)) {
            this.win = 1;
            this.quitGame();
        }
        

        if(this.isover == 0) {
                    
            if (this.cursors.up.isDown)
            {
                this.player.body.moveUp(150)
            }
            else if (this.cursors.down.isDown)
            {
                this.player.body.moveDown(150);
            }

            if (this.cursors.left.isDown)
            {
                this.player.body.velocity.x = -150;
            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.moveRight(150);
            }

            this.move1();
        	this.isNear(this.hm1);
        	this.isTouching(this.hm2);

        	if(this.hm2.x == 550) {
        		this.move2left();
        	} else if (this.hm2.x == 10) {
        		this.move2right();
        	}

        	this.isTouching();
    
        } else {
        	var current_time = this.game.time.time;
            if(current_time - this.lastMove > 5500) {
                this.quitGame();
            }
        }

    },

    move1: function() {
    	if(this.hm1.y == 100) {
    		this.game.add.tween(this.hm1).to( { x: this.hm1.x, y: 260 }, 1200, Phaser.Easing.Linear.None, true); 
    	} else if (this.hm1.y == 260){
    		this.game.add.tween(this.hm1).to( { x: this.hm1.x, y: 100 }, 1200, Phaser.Easing.Linear.None, true); 
    	}
        //this.game.add.tween(this.hm1).to( { x: this.player.x, y: this.player.y }, 2000, Phaser.Easing.Linear.None, true); 
    },

    move2left: function() {
    	
    	var duration = (Math.random() * 3000) + 1000;
    	this.game.add.tween(this.hm2).to( { x: 10}, duration, Phaser.Easing.Linear.None, true); 	
    	
    },
    move2right: function() {
    	var duration = (Math.random() * 3000) + 2000;
    	this.game.add.tween(this.hm2).to( { x: 550}, duration, Phaser.Easing.Linear.None, true); 
    },

    isNear: function(sprite) {
   		if(sprite.x - this.player.x <= 90) {
   			if(sprite.y > this.player.y) {
   				if(sprite.y - this.player.y <= 50) {
   					this.caught(this.sprite);
   				}
   			} else if(sprite.y <= this.player.y) {
   				if(this.player.y - this.hm1.y <= 50) {
   					this.caught(sprite);
   				} 
   			}
   		}
    },

    isTouching: function() {
    	if(this.player.y > 375 && this.player.y < 425) {
    		if(this.hm2.x > this.player.x) {
    			if(this.hm2.x - this.player.x < 20) {
    				this.isover == 1;
   					this.quitGame();
   				}
   			}
   			if(this.hm2.x < this.player.x) {
    			if(this.player.x - this.hm2.x < 20) {
    				this.isover == 1;
   					this.quitGame();
   				}
   			}
    	}
    },

    caught: function(sprite) {
    	var surp = this.add.audio('surprise');
    	surp.play();

    	this.isover = 1;

    	this.game.add.tween(sprite).to( { x: this.player.x, y: this.player.y - 10 }, 1200, Phaser.Easing.Linear.None, true); 
    	this.caughtTime = this.game.time.time;


    },

    quitGame: function () {
    	this.music.stop();
    	if(this.win == 1) {
        	this.state.start('Win');
        } else if(this.win ==0 ){
        	this.state.start('Lose');
        }

    }

};
