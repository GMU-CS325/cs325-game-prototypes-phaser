"use strict";

BasicGame.Hallway = function (game) {

    this.player = null;
    this.hm;

    this.cursors;

    this.timer;

    this.moveAfter = 3000;
    this.lastMove = 0; 

    this.textglobal;
    this.isover = 0;

    this.win = 0;

};

BasicGame.Hallway.prototype = {

    
    create: function () {
      
        this.lastMove = this.game.time.time;

        this.add.sprite(0, 0, 'hall');



        this.player = this.add.sprite(80, 200, 'player');
        
        //physics TESTING
        this.game.world.setBounds(0,0, 550, 960);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.enable(this.player);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        this.player.anchor.setTo(0.5,0.5);
        this.player.fixedRotation = true;

        this.hm = this.add.sprite(140, 200, 'monitor');

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
        var text = this.game.add.text( this.game.world.centerX, 15, "Hallway", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        this.textglobal = text;
    },


    update: function () {

        this.player.body.rotation = 0;

        this.player.body.setZeroVelocity();
        /*
        if(this.player.x > 650 && (this.player.y > 195 && this.player.y <255)) {
            this.textglobal.text = "YOU ESCAPED SUCCESSFULLY!!";
            this.win = 1;
            this.quitGame();
        }
        */

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
    
        } 
    },

    quitGame: function () {
        this.textglobal.text = "HOW DARE YOU TRY TO LEAVE MY DETENTION!";
        this.state.start('End', true, false, this.win);
    },



};
