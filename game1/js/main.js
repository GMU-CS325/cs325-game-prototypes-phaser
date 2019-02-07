"use strict";

window.onload = function() {
    




var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {

    game.load.image('sky', 'assets/deepblue.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('saw', 'assets/saw.png');
    game.load.image('fire', 'assets/fire.png');
    game.load.image('hp', 'assets/firstaid.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('win', 'assets/sky4.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);


}

var player;
var platforms;
var cursors;

var saws;
var hps;
var diamonds;

var health = 5;
var healthText;

var score = 0;
var scoreText;

var timer;

function create() {

    //  enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground 
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);

    ground.body.immovable = true;

    

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  Enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //make a group for saws
    saws = game.add.group();
    saws.enableBody = true;

    //make a group for med kits
    hps = game.add.group();
    hps.enableBody = true;

    //make a group for diamnonds
    diamonds = game.add.group();
    diamonds.enableBody=true;

    //  Here we'll randomly generate Saws for every 2 seconds

    timer = game.time.create(false);

    timer.loop(2000, spawnSaws, this);

    timer.start();

    //  The health
    healthText = game.add.text(650, 16, 'Lives: 5', { 
        fontSize: '30px',
        fill: '#000',
        backgroundColor: "white"
     });

    //the Score
    scoreText = game.add.text(100, 16, 'Score: 0', { 
        fontSize: '30px',
        fill: '#000',
        backgroundColor: "white"
     });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function spawnSaws() {
    for (var i = 0; i < 5; i++)
    {
        //  create saws
        var saw = saws.create((Math.random() * 800), 0, 'saw');
       
        //  Let gravity do its thing
        saw.body.gravity.y = 200;

    }
    var temp = (Math.random() * 800);

    if(temp < 150) {
        var hp = hps.create(Math.random() * 800, 400, 'hp');
    }

    var temp2 = (Math.random() * 800);

    if(temp2 < 400) {
        var diamond = diamonds.create(Math.random() * 800, 0, 'diamond');
        diamond.body.gravity.y = 320;
    }


     
    
}

function update() {

  
    //  Collide the player with the platform
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    

    //  Checks to see if the player overlaps
    game.physics.arcade.overlap(player, saws, getHit, null, this);
    game.physics.arcade.overlap(player, hps, heal, null, this);
    game.physics.arcade.overlap(player, diamonds, addScore, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -300;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 300;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

    if(health <= 0) {
        game.add.sprite(0,0,'fire');
        var end = game.add.text(100,200, 'GAME OVER', {
            font: 'Verdana',
            fontSize: '100px',
            fill: '#000',

        });
    }

    if(score == 10) {
        game.add.sprite(0,0,'win');
        var end = game.add.text(150,200, 'YOU WIN', {
            font: 'Verdana',
            fontSize: '100px',
            fill: '#000',

        });
    }
}

function getHit (player, saw) {
    
    // Removes the star from the screen
    saw.kill();
    //  Add and update the score
    health--;

    healthText.text = 'Lives:' + health;
}

function heal (player, hp) {
    
    // Removes the star from the screen
    hp.kill();
    //  Add and update the score
    health++;
    healthText.text = 'Lives:' + health;
}

function addScore(player, diamond) {
    diamond.kill();
    score++;
    scoreText.text = 'Score:' + score;
}
    


};
