window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'brain', 'assets/brain.png' );
        game.load.image( 'player', 'assets/evil_guy.png' );
        game.load.image( 'evil_heart', 'assets/evil_heart.png' );
        game.load.image( 'heart', 'assets/heart.png' );
        game.load.image( 'liver', 'assets/liver.png' );
        game.load.image( 'neuron', 'assets/neuron.png' );
        game.load.image( 'shooter', 'assets/shooter.png' );
        game.load.image( 'background', 'assets/background.png' );
        game.load.image( 'bullet', 'assets/bullet.png' );
        game.load.audio( 'bgmusic', ['assets/Car_Park_Throwdown .mp3']);
    }
    
//    var bouncy;
    var bullets;
    var fireRate = 100;
    var nextFire = 0;
    var music;
    var bullet;
    var mainChar;
    
    function create() {
        
        //background
        game.background = this.game.add.sprite(0, 0, 'background');
        
        //music
        music = game.add.audio('bgmusic');
//        music.play();
        
        //physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //player
        this.player = this.game.add.sprite(60, 450, 'player');
        this.player.anchor.setTo(0.5,0);
        game.physics.enable( mainChar, Phaser.Physics.ARCADE );
        this.player.allowRotation = false;
        
        //bullet
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        
        // Make it bounce off of the world bounds.
//        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
//        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
//        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
//        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
//        this.player.rotation = game.physics.arcade.angleToPointer(player);
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
//        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
    
    function fire() {

        if (game.time.now > nextFire && bullets.countDead() > 0)
        {
            nextFire = game.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(sprite.x - 8, sprite.y - 8);

            game.physics.arcade.moveToPointer(bullet, 300);
        }

    }
};
