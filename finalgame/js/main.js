var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

game.state.add('end', endState);

function preload() {

    game.load.tilemap('map', 'assets/tile_collision_test.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('ground_1x1', 'assets/ground_1x1.png');
    game.load.image('phaser', 'assets/player.png');
    game.load.spritesheet('player', 'assets/detective.png', 32,32);
    game.load.image('blood', 'assets/blood.png');
    game.load.image('bg', 'assets/background.png');
    game.load.spritesheet('cop', 'assets/cop.png', 32, 32);
    game.load.image('lose', 'assets/lose.png');
}

var map;
var layer;

var sprite;
var bg;
var cops;
var points = 0;


var cursors;

function create() {

	

    game.physics.startSystem(Phaser.Physics.ARCADE);

    bg = game.add.sprite(0,0,'bg');



    map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    map.addTilesetImage('blood');
    //collision with player and walls
    map.setCollisionBetween(1, 14);

    //  Collision with tiles 26-30 which are the evidence tiles
    map.setTileIndexCallback(26, collide, this);
    map.setTileIndexCallback(27, collide, this);
    map.setTileIndexCallback(28, collide, this);
    map.setTileIndexCallback(29, collide, this);
    map.setTileIndexCallback(30, collide, this);

    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    //main character sprite
    sprite = game.add.sprite(260,100, 'player');
    sprite.animations.add('walk', [1,2,3,4,5,6,7], 7, true);

    sprite.anchor.set(0.5,0.5);
    game.physics.enable(sprite);

    sprite.body.setSize(16, 16, 8, 8);
    sprite.body.maxAngular = 800;
    sprite.body.angularDrag = 50;

    //cops
    cops = game.add.group();
    cops.enableBody = true;
    cops.physicsBodyType = Phaser.Physics.ARCADE;

    for(var i = 0; i < 6; i++ ){
    	var c = cops.create(Math.random()*10 + 1200, Math.random()*5 + i*70+ 50, 'cop');
    	c.name = 'cop' + i;
    	c.animations.add('walk', [1,2,3,4,5,6,7], 7, true);
    	c.body.collideWorldBounds = true;
        c.body.bounce.setTo(0.8, 0.8);
        c.body.velocity.setTo(100 + Math.random() * 40, 10 + Math.random() * 40);
        c.animations.play('walk', true);
    }

    game.camera.follow(sprite);


    cursors = game.input.keyboard.createCursorKeys();
    tween = game.add.tween().to( { y: 100 }, 100, null, true);


}

function collide(char, tile) {

    tile.alpha = 0.2;
	if(char == sprite) {
  	 	points++;
  	 	//check if cop is near
  	 	for(var i=0; i<cops.length; i++) { 
		if(Phaser.Math.distance(sprite.x, sprite.y, cops.getAt(i).body.x, cops.getAt(i).body.y) < 150){
			
			end();
		}
	} 

	}
	    layer.dirty = true;
    

    return false;

}


function update() {

    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.collide(cops, layer);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }

    if (cursors.up.isDown)
    {   
        sprite.animations.play('walk', true);
        game.physics.arcade.velocityFromAngle(sprite.angle, 200, sprite.body.velocity);
    } else {
        sprite.animations.stop(null, true);
    }

   

    
	
	for(var i=0; i<cops.length; i++) { 
		//text.setText(Phaser.Math.distance(sprite.x, sprite.y, cops.getAt(i).body.x, cops.getAt(i).body.y));
	} 

}

function end() {
	game.state.start('end');
	var loss = game.add.sprite(0,0,'lose');
}
