window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'
        game.load.image( 'groundLeft', 'assets/dirtLeft.png' );
        game.load.image( 'groundMiddle', 'assets/dirtMid.png' );
        game.load.image( 'dirtRight', 'assets/dirtRight.png' );
        game.load.image( 'plat', 'assets/grassHalf.png' );
        game.load.image( 'sprite', 'assets/sprite.png' );
        game.load.image('key', 'assets/asteroid.png')
    }
    
    var sprite;
    var ground;
    var platforms;
    var items;
    
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        // The sprite and its settings
        
        sprite = game.add.sprite(32, game.world.height - 400, 'sprite');

        //  We need to enable physics on the sprite
        game.physics.arcade.enable(sprite);

        //  sprite physics properties. Give the little guy a slight bounce.
        sprite.body.bounce.y = 0.2;
        sprite.body.gravity.y = 400;
        sprite.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        sprite.scale.setTo(0.25,0.25);
        
        platforms = game.add.group();
        platforms.enableBody = true;
        ground = platforms.create(0,535, 'groundLeft');
        ground.scale.setTo(100, 1);
        ground.body.immovable = true;
        
        var ledge1 = platforms.create(400,400, 'plat');
        ledge1.scale.setTo(3,1);
        ledge1.body.immovable = true;
         var ledge2 = platforms.create(50,300, 'plat');
        ledge2.scale.setTo(3,1);
        ledge2.body.immovable = true;
        
        var ledge3 = platforms.create(500,200, 'plat');
        ledge3.scale.setTo(3,1);
        ledge3.body.immovable = true;
        
        items = game.add.group();
        items.enableBody = true;
         for (var i = 0; i < 4; i++)
        {
           
            var key = items.create(i * 200, 0, 'key');

            key.body.gravity.y = 6;
        }
        
        sprite.inputEnabled = true;
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.arcade.enable(sprite);
        // Make it bounce off of the world bounds.
        sprite.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
       
        
    }
    
   
    function update() {
         var hitPlatform = game.physics.arcade.collide(sprite, platforms);
          var hitkey = game.physics.arcade.collide(items, platforms);
        var getkeys = game.physics.arcade.overlap(sprite, items, collectKey, null, this);
             var cursors = game.input.keyboard.createCursorKeys();
         //  Reset the sprites velocity (movement)
    sprite.body.velocity.x = 0;
        
    sprite.body.velocity.x = 0;


    if (cursors.left.isDown)
    {
        //  Move to the left
        sprite.body.velocity.x = -150;

       
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        sprite.body.velocity.x = 150;

       
    }
    else{

        sprite.body.velocity.x = 0;
    }

    //  Allow the sprite to jump if they are touching the ground.
    if (cursors.up.isDown && sprite.body.touching.down && hitPlatform)
    {
        sprite.body.velocity.y = -350;
    }
       
         //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && sprite.body.touching.down && hitPlatform)
    {
        sprite.body.velocity.y = -350;
    }
        
    }
    
  
   
}
 function collectKey (sprite, key) {

    // Removes the star from the screen
        key.kill();
    }
