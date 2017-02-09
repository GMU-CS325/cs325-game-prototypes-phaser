var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('arrow', 'assets/asteroid_shooter.png');
    game.load.image('bullet', 'assets/cowboy_bullet.png');
//    game.load.image('star', 'assets/star.png');
    game.load.audio('boden', ['assets/F-Zero - Death Wind.mp3']);
    
}

var sprite;
var bullets;

var fireRate = 100;
var nextFire = 0;

var music;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#313131';

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
    
    music = game.add.audio('boden');

    music.play();

    game.input.onDown.add(changeVolume, this);

}

function changeVolume(pointer) {

    if (pointer.y < 100)
    {
        music.mute = false;
    }
    else if (pointer.y < 300)
    {
        music.volume += 0.1;
    }
    else
    {
        music.volume -= 0.1;
    }

}

function update() {

    sprite.rotation = game.physics.arcade.angleToPointer(sprite);

    if (game.input.activePointer.isDown)
    {
        fire();
    }

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

function render() {

    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
//    game.debug.soundInfo(music, 20, 450);
//    game.debug.spriteInfo(sprite, 32, 450);

}

//window.onload = function() {
//    // You might want to start with a template that uses GameStates:
//    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
//    
//    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
//    // You will need to change the fourth parameter to "new Phaser.Game()" from
//    // 'phaser-example' to 'game', which is the id of the HTML element where we
//    // want the game to go.
//    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
//    // You will need to change the paths you pass to "game.load.image()" or any other
//    // loading functions to reflect where you are putting the assets.
//    // All loading functions will typically all be found inside "preload()".
//    
//    "use strict";
//    
//    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
//    
//    function preload() {
//        // Load an image and call it 'logo'.
//        game.load.image( 'logo', 'assets/phaser.png' );
//    }
//    
//    var bouncy;
//    
//    function create() {
//        // Create a sprite at the center of the screen using the 'logo' image.
//        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
//        // Anchor the sprite at its center, as opposed to its top-left corner.
//        // so it will be truly centered.
//        bouncy.anchor.setTo( 0.5, 0.5 );
//        
//        // Turn on the arcade physics engine for this sprite.
//        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
//        // Make it bounce off of the world bounds.
//        bouncy.body.collideWorldBounds = true;
//        
//        // Add some text using a CSS style.
//        // Center it in X, and position its top 15 pixels from the top of the world.
//        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
//        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
//        text.anchor.setTo( 0.5, 0.0 );
//    }
//    
//    function update() {
//        // Accelerate the 'logo' sprite towards the cursor,
//        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
//        // in X or Y.
//        // This function returns the rotation angle that makes it visually match its
//        // new trajectory.
//        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
//    }
//};
