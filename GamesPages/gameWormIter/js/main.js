"use strict";

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render : render });
    
function preload() {

    game.stage.backgroundColor = '#007236';

    game.load.image('book', 'assets/book.png');
//    game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');
    game.load.image('phaser', 'assets/sprites/phaser1.png');
    game.load.spritesheet('player', 'assets/worm.png', 50, 50);
    game.load.audio('music', ['assets/music.mp3']);
    
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('ship', 'assets/shmup-ship.png');
}

var music;
var cursors;    
var player;
var books;
var topAlign = 10;

var touchText;
var touch = false;

var bookText;
var bookHealth = 100;

var scoreText;
var score = 0;

var middleText;

var textStyle = { font: "32px Arial", fill: "#ffffff", align: "center" };

var instructions= "Eat Books!!!\nArrow Keys to Move\nStand on top of a Book\nPress X to start eating\nGet 2000 Points to win!.\nNEW BULLLET HITS DEDUCT POINTS!!!"

var sprite;
var bullets;
var fireButton;

var targetRight = true;
var targetDown = true;

var delay = 0;



function create() {
    music = game.add.audio('music');

    music.play();

    //  Modify the world and camera bounds
    game.world.setBounds(-1000, -1000, 2000, 2000);
    cursors = game.input.keyboard.createCursorKeys();
    
    //BOOKS
    books = game.add.group();
    books.enableBody = true;

    for (var i = 0; i < 100; i++)
    {
        var xAxis = game.world.randomX;
        var yAxis = game.world.randomY;
        while(xAxis > 600 || xAxis < -600)
            {
                xAxis = game.world.randomX;
                
            }
        while(yAxis > 700 || yAxis < -700)
            {
                yAxis = game.world.randomY;
            }
        var book = books.create(xAxis, yAxis, 'book');
        book.health = 100;
        book.scale.setTo(.1);
    }
//PLAYER SETUP
    player = game.add.sprite(0, 0, 'player');
    player.fixedToCamera = true;
    player.cameraOffset.setTo(400, 300);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.animations.add('down', [0, 1, 2, 3], 10, true);
    player.animations.add('left', [4, 5, 6, 7], 10, true);
    player.animations.add('right', [8, 9, 10, 11], 10, true);
    player.animations.add('up', [12, 13, 14, 15], 10, true);
    
    
//TEXT
    scoreText = game.add.text(0, 0, ("Score: " + score), textStyle);
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(600, topAlign);
    
    touchText = game.add.text(0, 0, touch, textStyle);
    touchText.fixedToCamera = true;
    touchText.cameraOffset.setTo(5, 560);
    
    bookText = game.add.text(0, 0, " ", textStyle);
    bookText.fixedToCamera = true;
    bookText.cameraOffset.setTo(20, topAlign);
    
    middleText = game.add.text(0,0,instructions,textStyle);
    middleText.fixedToCamera = true;
    middleText.anchor.setTo(.5 , .5);
    middleText.cameraOffset.setTo(400,300);
    
    
//WEAPON ADDITION
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    
    
    
    
//    weapon = game.add.weapon(50, 'bullet');
//    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
//    weapon.bulletAngleOffset = 90;
//    weapon.bulletSpeed = 400;
    sprite = this.add.sprite(game.world.randomX, game.world.randomX, 'ship');
    game.physics.arcade.enable(sprite);
    
    sprite.body.collideWorldBounds = true;
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.bounce.x = 200;
    sprite.body.bounce.y = 100;
//    weapon.trackSprite(sprite, 14, 0);
//    weapon.bulletAngleVariance = 360;
//    //fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    

    
    
    

}
function update() {
    
    delay++;
    if(delay > 10)
        {
            fireBullet();
            delay = 0;
        }
    
//    weapon.fire();
//    fireBullet();
    touch = game.physics.arcade.overlap(books, player);
    game.physics.arcade.overlap(books, books, eatBook, null, this);
    game.physics.arcade.collide(bullets, books, eatBook, null, this);
    game.physics.arcade.collide(bullets, player, hitPoint, null, this);
    if(touch)
    {
        bookText.visible = true;
        if(game.input.keyboard.isDown(Phaser.Keyboard.X))
        {
           bookHealth -= 1;
           score += 1;
          
        }
        if(bookHealth < 1)
            {
                game.physics.arcade.overlap(player, books, eatBook, null, this);
                
            }
    }
    else{
        bookText.visible = false;
        
    }
    if(bookHealth < 1)
        bookHealth = 100;
    if(score == 2000)
        {
            middleText.text = "YOU WIN!!!!";
        }
    
    
    
    
    
    touchText.text = touch;
     scoreText.text = "Score: " + score;
    bookText.text = "Book Health: " + bookHealth;
    

    if (cursors.up.isDown)
    {
        middleText.text = "";
        game.camera.y -= 4;
        player.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        middleText.text = "";
        game.camera.y += 4;
        player.animations.play('down');
    }

    if (cursors.left.isDown)
    {
        middleText.text = "";
        game.camera.x -= 4;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        middleText.text = "";
        game.camera.x += 4;
        player.animations.play('right');
    }
    
    
    
//ShipMovement
    
    sprite.body.velocity.x = targetRight? 250:-250;
        if (sprite.body.blocked.right){
            targetRight = false;
            sprite.scale.x = -1;
//            target.body.velocity.x = -250;
        }
        if(sprite.body.blocked.left){
            targetRight = true;
//            target.body.velocity.x = 250;
        }
    
    sprite.body.velocity.y = targetDown? 350:-350;
        if (sprite.body.blocked.right){
            targetDown = false;
//            sprite.scale.x = -1;
//            target.body.velocity.x = -250;
        }
        if(sprite.body.blocked.left){
            targetDown = true;
//            target.body.velocity.x = 250;
        }

}
function render() {

//    game.debug.cameraInfo(game.camera, 32, 32);

}

function eatBook (player, book) {
    
    // Removes the star from the screen
    book.kill();

    //  Add and update the score

}

function hitPoint (player, bullets) {
    
    // Removes the star from the screen
    score-=100;
    bullets.kill();

    //  Add and update the score

}

function fireBullet() {
    var bullet = bullets.getFirstExists(false);

    if (bullet)
    {
        //  And fire it
        bullet.reset(sprite.x, sprite.y + 8);
        
        var minSpeed = 600;
        
        var ySpeed = Math.floor((Math.random() * 800) + 1) - Math.floor((Math.random() * 400) + 1);
        while(ySpeed > minSpeed && ySpeed<-minSpeed)
            {
                ySpeed = Math.floor((Math.random() * 800) + 1) - Math.floor((Math.random() * 400) + 1);
            }
        var xSpeed = Math.floor((Math.random() * 800) + 1) - Math.floor((Math.random() * 400) + 1);
        while(xSpeed > minSpeed && xSpeed < -minSpeed)
            {
                xSpeed = Math.floor((Math.random() * 800) + 1) - Math.floor((Math.random() * 400) + 1);
            }
        
        bullet.body.velocity.y = ySpeed;
        bullet.body.velocity.x = xSpeed;
    }
}