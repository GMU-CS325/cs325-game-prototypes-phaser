
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
var loading;
var player;
var secretskill;

GameStates.loadgame = function( game ) 
{
   

function beginGame() {

        //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        game.state.start("information");
        

    }
   return {
      preload: function () {
    game.load.spritesheet('fangkuai', 'assets/fangkuai.png',20,20);
    game.load.image('logo', 'assets/logo.png');

    
},
create: function () {
    //game.world.setBounds(0, 0, window.document.body.scrollWidth, window.document.body.scrollHeight);
     loading=game.add.sprite(0,0,'loading');
    
     loading.scale.setTo(0.5,0.5);
   game.titlegroup=game.add.group();
   game.titlegroup.create(0,0,'logo');
    welcome=game.add.audio('welcome');
    welcome.play();
    player=game.titlegroup.create(550, 10, 'tree');
    
    player.scale.setTo(0.2,0.2);

                    game.titlegroup.x = 60;
             game.titlegroup.y = 100;
             game.add.tween(game.titlegroup).to({ y: 10 },1000,null,true,0,Number.MAX_VALUE,true); 
    var begin = game.add.sprite(300, 400, 'playButton');
    begin.scale.setTo(0.5,0.5);
    begin.inputEnabled = true;
    begin.events.onInputDown.add(beginGame, this);
    
},

};
};
