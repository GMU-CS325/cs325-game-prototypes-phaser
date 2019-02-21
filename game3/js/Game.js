"use strict";

BasicGame.Game = function (game) {

    this.player = null;
    this.cursors;
    this.teacher;
    this.timer;

    this.moveAfter = 3000;
    this.lastMove = 0; 

    this.textglobal;
    this.isover = 0;

    this.win = 0;

};

BasicGame.Game.prototype = {

    
    create: function () {
      
        this.lastMove = this.game.time.time;

        this.add.sprite(0, 0, 'background');



        this.player = this.add.sprite(200, 630, 'player');
        
        this.teacher = this.add.sprite(100, 100, 'teach');
        this.teacher.frame = 0;
        this.teacher.scale.setTo(2,2);
        this.teacher.enableBody = true;
        this.teacher.physicsBodyType = Phaser.Physics.P2JS;
        //this.teacher.body.mass = 10000;
        //this.game.physics.p2.enable(this.teacher);

        //physics TESTING
        this.game.world.setBounds(0,0, 673, 665);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.enable(this.player);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        this.player.anchor.setTo(0.5,0.5);
        this.player.fixedRotation = true;

        var kids = this.game.add.group();
        kids.enableBody = true;
        kids.physicsBodyType = Phaser.Physics.P2JS;

        var desks = this.game.add.group();
        desks.enableBody = true;
        desks.physicsBodyType = Phaser.Physics.P2JS;

        //spawn the desks
        for(var i = 120; i < 680; i += 80) {
            for(var j = 280; j < 680; j += 80) {
                var desk = desks.create(i, j, 'desk');
                desk.body.mass = 9999999;
                desk.body.fixedRotation = true;

                var randomValue = this.game.rnd.integerInRange(0, 10);
                if(randomValue < 4){
                    var kid = kids.create(i, j + 40, 'kid');
                    kid.body.mass = 9999;
                    kid.body.fixedRotation = true;
                }
            }
        }
       
        var style = { font: "25px Verdana", fill: "#000", align: "center" };
        var text = this.game.add.text( this.game.world.centerX, 15, "WELCOME TO DETENTION HAHAH", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        this.textglobal = text;
    },

    move: function() {
        var randomValue = this.game.rnd.integerInRange(0, 3);
        this.teacher.frame = randomValue;

        if(this.teacher.frame == 0) {  
            this.textglobal.text = "I'M WATCHING YOU";
        } else {
            this.textglobal.text = "YOU BETTER NOT BE MOVING!";
        }
       
    },

    isCaught: function() {
        //check if player is "behind a desk"
        if((this.player.x > 105 && this.player.x < 135) || 
            (this.player.x > 185 && this.player.x < 215) ||
            (this.player.x > 265 && this.player.x < 295) ||
            (this.player.x > 345 && this.player.x < 375) ||
            (this.player.x > 425 && this.player.x < 455) ||
            (this.player.x > 505 && this.player.x < 535) ||
            (this.player.x > 585 && this.player.x < 615)) {
            if(this.player.y < 260) {
                this.caught();
            }
        } else {
            this.caught();
        }
    },

    caught: function() {
        this.textglobal.text = "I CAUGHT YOU";
        this.game.add.tween(this.teacher).to( { x: this.player.x, y: this.player.y }, 2000, Phaser.Easing.Linear.None, true);   
        this.isover = 1
    
    },
    

    update: function () {

        this.player.body.rotation = 0;

        this.player.body.setZeroVelocity();

        if(this.player.x > 650 && (this.player.y > 195 && this.player.y <255)) {
            this.textglobal.text = "YOU ESCAPED SUCCESSFULLY!!";
            this.win = 1;
            this.quitGame();
        }

        if(this.isover == 0) {
            //when teacher is looking down, check if you are behind a desk
            if(this.teacher.frame == 0){
                    this.isCaught();
            }
            
            //in the case that the player is above desks and teacher is looking right
            if(this.player.y < 260 && this.teacher.frame == 2) {
                    this.caught();
            }
            

            if (this.cursors.up.isDown)
            {
                this.player.body.moveUp(150)
                if(this.teacher.frame == 0){
                    this.isCaught();
                }
            }
            else if (this.cursors.down.isDown)
            {
                this.player.body.moveDown(150);
                if(this.teacher.frame == 0){
                    this.isCaught();
                }
            }

            if (this.cursors.left.isDown)
            {
                this.player.body.velocity.x = -150;
                if(this.teacher.frame == 0){
                    this.isCaught();
                }
            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.moveRight(150);
                if(this.teacher.frame == 0){
                    this.isCaught();
                }
            }
            
            
            //teacher movements
            var current_time = this.game.time.time;
            if(current_time - this.lastMove > this.moveAfter) {
                this.moveAfter = Math.random() * 2000 + 1000;
                this.lastMove = current_time;
                this.move();
            }
        } else { //ending conditions + delay of time before change in game state
            var current_time = this.game.time.time;
            if(current_time - this.lastMove > 4000) {
                this.quitGame();
            }
        }

    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.     


        //  Then let's go back to the main menu.
        this.textglobal.text = "HOW DARE YOU TRY TO LEAVE MY DETENTION!";
        this.state.start('End', true, false, this.win);

    },


};
