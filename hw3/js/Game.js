
var block;
var cursors;
var current_blocks = {};
var next_blocks = {};
var old_blocks;
var text;
var centerX = 276 / 2;//areaZero(increase) * 2
var areaWidth = 258;
var areaHeight = 500;
var areaZero = 18;
var areaTop = 20;
var interval_time = 0;
var angleFlag = true;
var block_width = 20;
var halfWidth = 10;
var completeNum = 240 / 20;
var score;
var level = 1000;
var scale = 0.7;
var scoreText;
var levelText;
var timeEvent;
var music_move;
var music_down;
var music_complete;
var leftBtn;
var rightBtn;
var downBtn;
var rotateBtn;
var logo;
var titlegroup;
var fudai;
var welcome;
GameStates.loadgame = function( game ) 
{
   

function beginGame() {
 welcome.stop();
        //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        game.state.start("maingame");

    }
   return {
      preload: function () {
    game.load.spritesheet('fangkuai', '../images/fangkuai.png',20,20);
    game.load.image('logo', 'assets/logo.png');
    game.load.image('begin', 'assets/begin.jpg');
    
},
create: function () {
    //game.world.setBounds(0, 0, window.document.body.scrollWidth, window.document.body.scrollHeight);
    var fang;
    welcome=game.add.audio('welcome');
    welcome.play();
    for (var i = 0 ; i < 20 ; i++) {
        fang = game.add.sprite(2 + i* 25, 60, 'fangkuai',Math.floor(Math.random() * 7));
        game.physics.enable(fang, Phaser.Physics.ARCADE);
        fang.body.bounce.y = Math.random();
        fang.body.gravity.y = 300 + Math.round(Math.random()*100);
        fang.body.collideWorldBounds = true;
    }
  
             game.titlegroup=game.add.group();
                game.titlegroup.create(0,0,'logo');
                game.fudai=game.titlegroup.create(300, 50, 'fudai')
             
                    game.titlegroup.x = 80;
             game.titlegroup.y = 100;
             game.add.tween(game.titlegroup).to({ y: 10 },1000,null,true,0,Number.MAX_VALUE,true); 
    var begin = game.add.sprite(200, 400, 'begin');
    begin.scale.setTo(0.5,0.5);
    begin.inputEnabled = true;
    begin.events.onInputDown.add(beginGame, this);
    
},

};
};
