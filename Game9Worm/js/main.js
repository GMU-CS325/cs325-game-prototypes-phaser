"use strict";

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render : render });
    
function preload() {

    game.stage.backgroundColor = '#007236';

    game.load.image('book', 'assets/book.png');
//    game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');
    game.load.image('phaser', 'assets/sprites/phaser1.png');
    game.load.spritesheet('player', 'assets/worm.png', 50, 50);
    game.load.audio('music', ['assets/music.mp3']);
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

var instructions= "Eat Books!!!\nArrow Keys to Move\nStand on top of a Book\nPress X to start eating\nGet 5000 Points to win!."



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
    
    

    
    
    

}
function update() {
    
    touch = game.physics.arcade.overlap(books, player);
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
    if(score == 5000)
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

}
function render() {

//    game.debug.cameraInfo(game.camera, 32, 32);

}

function eatBook (player, book) {
    
    // Removes the star from the screen
    book.kill();

    //  Add and update the score

}