"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */

    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.char = null;

    this.SPEED = 150;

    this.objects = [0];

    this.food;

    this.score = 1;

    this.ctr = 0;

    this.text;

    this.scoreup = new Audio('assets/menuhit.wav');
    this.scoredown = new Audio('assets/taiko-normal-hitclap.wav');
    this.death = new Audio('assets/taiko-normal-hitfinish.wav');
    
};

BasicGame.Game.prototype = {

    create: function () {

     
        this.char = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'char1' );

        this.char.anchor.setTo( 0.5, 0.5 );

        this.game.physics.enable( this.char, Phaser.Physics.ARCADE );

        this.char.body.collideWorldBounds = true;

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        this.ctr = 0; 

        var enemy = this.game.add.sprite(Math.random()*this.game.world.width, Math.random()*this.game.world.height, 'blueParticle2');
            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
            var yVelocity = (Math.random()*this.SPEED/5)-(this.SPEED/10);
            var xVelocity = Math.sqrt(((this.SPEED*this.SPEED)/5)-(yVelocity*yVelocity));
            enemy.body.collideWorldBounds = false;
            this.objects.push(enemy);

        while(this.ctr < 7){
            var enemy = this.game.add.sprite((Math.random()*this.game.world.width), (Math.random()*this.game.world.height), 'blueParticle1');
            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.anchor.setTo(0.5,0.5);
            var yVelocity = (Math.random()*this.SPEED)-(this.SPEED/2);
            var xVelocity = Math.sqrt(((this.SPEED*this.SPEED)/2)-(yVelocity*yVelocity));
            enemy.body.velocity.x = xVelocity;
            enemy.body.velocity.y = yVelocity;
            enemy.body.collideWorldBounds = false;

            this.objects.push(enemy);
            this.ctr++;
        }
        var food = this.game.add.sprite((Math.random()*this.game.world.width), Math.random()*this.game.world.height, 'greenParticle');
        this.game.physics.enable(food, Phaser.Physics.ARCADE);
        food.anchor.setTo(0.5,0.5);
        var yVelocity = (Math.random*this.SPEED/4)-(this.SPEED/8);
        var xVelocity = (Math.random*this.SPEED/4)-(this.SPEED/8);
        food.body.velocity.x = xVelocity;
        food.body.velocity.y = yVelocity;
        food.body.collideWorldBounds = false;
        this.food = food;

        /*var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        this.text = this.game.add.text( 15, 15, 'Score: 0', style );
        this.text.anchor.setTo( 0.5, 0.0 );*/

    },

    update: function () {
        //this.text.setText('Score: ' + this.score);
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            // If the LEFT key is down, move left
            this.char.body.velocity.x = -this.SPEED;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            // If the RIGHT key is down, move right
            this.char.body.velocity.x = this.SPEED;
        }else{
            this.char.body.velocity.x = 0;
        } if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            // If the UP key is down, move up
            this.char.body.velocity.y = -this.SPEED;
        } else if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            // If the DOWN key is... down, move.. well down. Betcha' didn't see that coming.
            this.char.body.velocity.y = this.SPEED;
        } else {
            // Stop moving
            this.char.body.velocity.y = 0;
        }
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.ctr = 0;
        while(this.ctr< this.objects.length){
            var temp = this.objects[this.ctr];
            this.game.physics.arcade.overlap(this.char, temp, this.damage, null, this);
            if (temp.x > this.game.width){
                 this.objects[this.ctr].body.velocity.x = -temp.body.velocity.x;
                 this.objects[this.ctr].x = this.game.width-10;
            }else if(temp.x < 0){
                this.objects[this.ctr].body.velocity.x = -temp.body.velocity.x;
                this.objects[this.ctr].x = 10; 
            }
            if (temp.y > this.game.height){
                this.objects[this.ctr].body.velocity.y = -temp.body.velocity.y;
                this.objects[this.ctr].y = this.game.height-10;
            }else if(temp.y < 0){
                this.objects[this.ctr].body.velocity.y = -temp.body.velocity.y;
                this.objects[this.ctr].y = 10;
            }
            this.ctr++;
            
        }
        this.game.physics.arcade.overlap(this.char, this.food, this.point, null, this);
        if (this.food.x > this.game.width){
            this.food.body.velocity.x = -this.food.body.velocity.x;
            this.food.x = this.game.width-10;
        }else if(this.food.x < 0){
            this.food.body.velocity.x = -this.food.body.velocity.x;
            this.food.x = 10;
        }
        if (this.food.y > this.game.height){
            this.food.body.velocity.y = -this.food.body.velocity.y;
            this.food.y = this.game.height-10;
        }else if(this.food.y < 0){
            this.food.body.velocity.y = -this.food.body.velocity.y;
            this.food.y = 10;
        }
     
    },

    damage: function() {
        this.score--;
        if(this.ctr == 0){
            this.quitGame();
        }
        this.scoredown.play();
        this.objects[this.ctr].destroy();
        this.objects[this.ctr] = this.objects[0];
        switch(this.score){
            case 0:
               // this.death.play();
                this.quitGame();
                this.state.start('Fail');
                break;
            default:
                this.char.loadTexture('char1', 0, false);
                if(this.score< 0){
                    this.quitGame();
                    this.state.start('Fail');
                }else{
                    this.score = 1;
                }
            }
            this.char.resetFrame();
            this.char.anchor.setTo(0.5,0.5);
           // this.scoredown.play();
    },

    point: function(){
        this.score++;
        this.scoreup.play();
        var ctr = 0;
        while(ctr < 10){
            var enemy = this.game.add.sprite((Math.random()*this.game.world.width), (Math.random()*this.game.world.height), 'blueParticle1');
            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.anchor.setTo(0.5,0.5);
            var yVelocity = (Math.random()*this.SPEED)-(this.SPEED/2);
            var xVelocity = Math.sqrt((this.SPEED*this.SPEED)-(yVelocity*yVelocity));
            enemy.body.velocity.x = xVelocity;
            enemy.body.velocity.y = yVelocity;
            enemy.body.collideWorldBounds = false;
            ctr++;
        }
            this.objects.push(enemy);
        this.food.destroy();
        var food = this.game.add.sprite((Math.random()*this.game.world.width), (Math.random()*this.game.world.height), 'greenParticle');
        this.game.physics.enable(food, Phaser.Physics.ARCADE);
        food.anchor.setTo(0.5,0.5);
        var yVelocity = (Math.random()*this.SPEED/4)-(this.SPEED/8);
        var xVelocity = (Math.random()*this.SPEED/4)-(this.SPEED/8);
        food.body.velocity.x = xVelocity;
        food.body.velocity.y = yVelocity;
        food.body.collideWorldBounds = false;
        this.food = food;
        switch(this.score){
            case 2:
                this.char.loadTexture('char2', 0, false);
                break;      
            case 3:
                this.char.loadTexture('char3', 0, false);
                break;
            case 4:
                this.char.loadTexture('char4', 0, false);
                break;
            case 5:
                this.quitGame();
                this.state.start('Win');
                break;
            default:
                this.char.loadTexture('char4', 0, false);
            }
           this.char.resetFrame();
           this.char.anchor.setTo(0.5,0.5);
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.food.destroy();
        this.char.destroy();
        var ctr = 0;
        objects = [];

    }

};
