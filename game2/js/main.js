"use strict";

window.onload = function() {


var game = new Phaser.Game(1000, 500, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('wraith', 'assets/Wraith.png', 45, 45);

    game.load.image('bg', 'assets/grunge-tileset.png');

    game.load.spritesheet('guy', 'assets/guy.png', 96, 96);

    game.load.audio('music', 'assets/goaman_intro.mp3');

    game.load.audio('step', 'assets/steps2.mp3');
    game.load.audio('dying', 'assets/player_death.wav');
}

var text;   //player 1 text
var toX = 450.0;    //helper variable to determine where the mouse is clicked

var main;   //main character
var bg;     //background art
var wraith;

var text2;  //player 2 text
var textStatus; //for telling if door has been chosen or not
var duration;

//helper variable to check direction main is facing
var isRight = 1;

//variable to determine which choice player 2 chooses 
//-1 is null state, 0 is left door, 1 is right door
var death = -1;

var isGameOver = 0;

//all the sounds
var music;
var step;
var dying;


function create() {

    game.stage.backgroundColor = 'black';
    bg = game.add.sprite(0,0, 'bg');
    bg.scale.setTo(2,2);

    bg.fixedToCamera = true;

    //death is spawned yet transparent
    wraith = game.add.sprite(100, 210, 'wraith');
    wraith.anchor.setTo(0.5, 0.5);
    wraith.scale.setTo(3,3);
    wraith.animations.add('ani');
    wraith.alpha = 0;
    
    //player 1
    main = game.add.sprite(450,240,'guy');
    main.anchor.setTo(0.5,0.5);
    main.animations.add('walk', [5,6,7,8,9,10], 10, true);

    //sounds
    music = game.add.audio('music');
    step = game.add.audio('step');
    dying = game.add.audio('dying');
 
    music.play();

    //Player 1 header
    var playerText = game.add.text(150, 300, 'Player 1', { 
        font: 'comic sans',
        fontSize: '20px',
        fill: '#FFF'
     });
    //default state of action
    text = game.add.text(150, 330, 'Action: none', { 
        font: 'comic sans',
        fontSize: '20px',
        fill: '#FFF'
     });
    //player 2 header + choices
    text2 = game.add.text(550, 300, 'Player 2\nWhich door is Death hiding behind?\nDoor 1: Left arrow \nDoor 2: Right Arrow', { 
        fontSize: '20px',
        fill: '#FFF',
        font: 'Comic Sans'
     });

    //status of whether door has been chosen or not
    textStatus = game.add.text(150, 300, '', { 
        fontSize: '20px',
        fill: '#FFF',
        font: 'Comic Sans'
     });
    
    game.input.onDown.add(move, this);
}



function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        if(death == -1) {
            death = 0;
        }
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        if(death == -1) {
            death = 1;
        }
    }

    //check if facing right, flip if trying to go left and facing right
    if(toX < main.x & isRight == 1) {
        main.scale.x *= -1;
        isRight = 0
    } 
    //check if facing left, flip if trying to right and facing left
    if(toX > main.x & isRight == 0) {
        main.scale.x *= -1;
        isRight = 1;
    }
    //animate if moving
    if(toX != main.x) {
        main.animations.play('walk', true);
        //game.time.events.loop(100, steps, this);
        var frame = -1;
    }  else {
        main.animations.stop(null, true);
    }

    //footsteps sounds
    if(main.animations.frame == 7 || main.animations.frame == 9) {
            step.play();
    }

    //game state to check if the game is over or not
    if(isGameOver == 0) {
        if(death != -1) {
        text2.text = "Player 2\nDeath is hiding...";
    }
    //check bounds if character is near the first door
    if(main.x > 100 & main.x < 220) {
        if(game.input.activePointer.x > 133 & game.input.activePointer.x < 186 & game.input.activePointer.y > 120 & game.input.activePointer.y  < 260) {
            text.text = "Action: open door #1";
            //selecting the door
            if(game.input.activePointer.isDown & death == 0) {
                die();
                isGameOver = 1;
            } else if(game.input.activePointer.isDown & death == 1) { 
                live();
                isGameOver = 1;
            } else if(game.input.activePointer.isDown & death == -1) { 
                textStatus.text = "\n\nBe patient! Death is still deciding";
            }
        } else {
            text.text = "Action: none";
        }
    }

    //check bounds if character is near the second door
    if(main.x > 650 & main.x < 800) {
        if(game.input.activePointer.x > 700 & game.input.activePointer.x < 770 & game.input.activePointer.y > 120 & game.input.activePointer.y  < 260) {
            text.text = "Action: open door #2";
            //selecting the door
            if(game.input.activePointer.isDown & death == 1) { 
                die();
                isGameOver = 1;
            } else if(game.input.activePointer.isDown & death == 0) { 
                live();
                isGameOver = 1;
            } else if(game.input.activePointer.isDown & death == -1) { 
                textStatus.text = "\n\nBe patient! Death is still deciding";
            }
        } else {
            text.text = "Action: none";
        }
    }
}

}


function die(){
    wraith.x = main.x + 30;
    game.add.tween(wraith).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

    wraith.animations.play('ani', 6,  true);
    text.text = "You died!";
    text2.text = "Player 2\nYou win!";

    dying.play();

    game.time.events.add(2000, end, this);
}

function live() {
    text.text = "You live this time...";
    text2.text = "Player 2\nYou lose!";
    
    game.time.events.add(2000, end, this);
}

function end() {
    game.camera.fade(0x000000, 6000);

}

function move() {
    toX = game.input.activePointer.x;
    //variable to alter the duration of the tween depending on distance
    duration = ((toX - main.x) / 300) * 1000;
    //make duration positive if negative
    if(duration < 0) {
        duration = -duration;
    }
    if(isGameOver == 0)
    game.add.tween(main).to( { x: toX }, duration, Phaser.Easing.Linear.None, true);   
}


};
