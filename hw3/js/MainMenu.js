"use strict";

GameStates.maingame = function( game, shared ) {

var playGame = {};
var block;
var cursors;
var current_blocks = {};
var next_blocks = {};
var old_blocks;
var text;
 var helpbutton ;
 var stateText;
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
var block;
  var db;
  var helped=false;
  var click=false;
 var backgroundmusic;
  var times=10;
  var helptime;
  var laser;
  var click1;

function pauseGame() {
    
      
    game.paused = true;
      
   



   // document.getElementById("overlay").style.display = "block";
   //  document.getElementById("close-popup-resume").style.display = "block";
}
function stopmusic()
{

    if(click1==false)
    {
        backgroundmusic.stop()
        click1=true;
    }
    else
    {
        backgroundmusic.play();
        click1=false;
    }
}
function restart () {

        //  A new level starts
block.kill();
  helped=false;
   click=false;
   times=10;
   backgroundmusic.stop();
game.state.start("loadgame");

    }
function begin()
{
    game.paused=false;
}
function help() {
    if(click==false&&times>0)
    {
    block.kill();
helptime = game.time.now + 3000;
levelText.text = times;
   helped=true;
   click=true;
   times=times-1;
}
else if(click==true)
{

}
   // document.getElementById("overlay").style.display = "block";
   //  document.getElementById("close-popup-resume").style.display = "block";
}
function initClick(){
    
    
}
function angleIt() {
    if (!angleFlag) {
        //music_move.play();
        var x1, x2, y1, y2;
        for ( var i = 0; i < 4; i++) {
            x1 = current_blocks.data[i].x;
            y1 = current_blocks.data[i].y;
            x1 -= current_blocks.centerX;
            y1 -= current_blocks.centerY;
            x2 = -y1;
            y2 = x1;
            x2 += current_blocks.centerX;
            y2 += current_blocks.centerY;
            current_blocks.data[i].x = x2;
            current_blocks.data[i].y = y2;
        }
        laser.play();
    }

}

function getBlocks(centerX, centerY, type, scale) {
    var fangkuai1;
    var fangkuai2;
    var fangkuai3;
    var fangkuai4;
    var block_type;
    var types = [ 'o', 't', 'l', 'j', 'i', 's', 'z' ];
    if (type) {
        block_type = type;
    } else {
        block_type = types[Math.floor(Math.random() * 7)];
    }
    
    switch (block_type) {
    case 'o':
        fangkuai1 = game.add.sprite(centerX - halfWidth, centerY - halfWidth, 'fangkuai',0);
        fangkuai2 = game.add.sprite(centerX - halfWidth, centerY + halfWidth, 'fangkuai',0);
        fangkuai3 = game.add.sprite(centerX + halfWidth, centerY + halfWidth, 'fangkuai',0);
        fangkuai4 = game.add.sprite(centerX + halfWidth, centerY - halfWidth, 'fangkuai',0);
        break;
    case 't':
        fangkuai1 = game.add.sprite(centerX + halfWidth, centerY - halfWidth, 'fangkuai',1);
        fangkuai2 = game.add.sprite(centerX + halfWidth, centerY + halfWidth, 'fangkuai',1);
        fangkuai3 = game.add.sprite(centerX - halfWidth, centerY + halfWidth, 'fangkuai',1);
        fangkuai4 = game.add.sprite(centerX + halfWidth * 3, centerY + halfWidth, 'fangkuai',1);
        break;
    case 'l':
        fangkuai1 = game.add.sprite(centerX - halfWidth, centerY - halfWidth, 'fangkuai',2);
        fangkuai2 = game.add.sprite(centerX - halfWidth, centerY + halfWidth, 'fangkuai',2);
        fangkuai3 = game.add.sprite(centerX - halfWidth, centerY + halfWidth * 3, 'fangkuai',2);
        fangkuai4 = game.add.sprite(centerX + halfWidth, centerY + halfWidth * 3, 'fangkuai',2);
        break;
    case 'j':
        fangkuai1 = game.add.sprite(centerX + halfWidth, centerY - halfWidth, 'fangkuai',3);
        fangkuai2 = game.add.sprite(centerX + halfWidth, centerY + halfWidth, 'fangkuai',3);
        fangkuai3 = game.add.sprite(centerX + halfWidth, centerY + halfWidth * 3, 'fangkuai',3);
        fangkuai4 = game.add.sprite(centerX - halfWidth, centerY + halfWidth * 3, 'fangkuai',3);
        break;
    case 'i':
        fangkuai1 = game.add.sprite(centerX + halfWidth, centerY - halfWidth * 3, 'fangkuai',4);
        fangkuai2 = game.add.sprite(centerX + halfWidth, centerY - halfWidth, 'fangkuai',4);
        fangkuai3 = game.add.sprite(centerX + halfWidth, centerY + halfWidth, 'fangkuai',4);
        fangkuai4 = game.add.sprite(centerX + halfWidth, centerY + halfWidth * 3, 'fangkuai',4);
        break;
    case 's':
        fangkuai1 = game.add.sprite(centerX + halfWidth * 3, centerY - halfWidth, 'fangkuai',5);
        fangkuai2 = game.add.sprite(centerX + halfWidth, centerY - halfWidth, 'fangkuai',5);
        fangkuai3 = game.add.sprite(centerX + halfWidth, centerY + halfWidth, 'fangkuai',5);
        fangkuai4 = game.add.sprite(centerX - halfWidth, centerY + halfWidth, 'fangkuai',5);
        break;
    case 'z':
        fangkuai1 = game.add.sprite(centerX - halfWidth, centerY - halfWidth, 'fangkuai',6);
        fangkuai2 = game.add.sprite(centerX + halfWidth, centerY - halfWidth, 'fangkuai',6);
        fangkuai3 = game.add.sprite(centerX + halfWidth, centerY + halfWidth, 'fangkuai',6);
        fangkuai4 = game.add.sprite(centerX + halfWidth * 3, centerY + halfWidth, 'fangkuai',6);
        break;
    }

    var blocks = {
        'type' : block_type,
        'data' : [ fangkuai1, fangkuai2, fangkuai3, fangkuai4 ],
        'centerX' : centerX,
        'centerY' : centerY
    };
    
    for ( var i = 0; i < 4; i++) {
        blocks.data[i].anchor.setTo(0.5, 0.5);
        
    }
    if (scale) {
        
        var group = game.add.group();
        group.add(fangkuai1);
        group.add(fangkuai2);
        group.add(fangkuai3);
        group.add(fangkuai4);
        group.scale.setTo(scale,scale);
        
    }
    
    return blocks;
}



function checkLine() {
    var lineFlag = false;
    var obj = {};
    var max = [];
    for ( var i = 0; i < old_blocks.length; i++) {
        if (obj.hasOwnProperty(old_blocks[i].y)) {
            obj[old_blocks[i].y]++;
        } else {
            obj[old_blocks[i].y] = 1;
        }

    }

    
    for ( var o in obj) {
        if (obj[o] == completeNum) {
            max.push(o);
            lineFlag = true;
        }
    }

    if (lineFlag) {
        //music_complete.play();
        for ( var i = 0; i < max.length; i++) {
            for ( var j = 0; j < old_blocks.length; j++) {
                if (old_blocks[j].y == max[i]) {
                    old_blocks[j].kill();
                    old_blocks.splice(j, 1);
                    j--;
                }
            }
        }
        

        for ( var i = 0; i < max.length; i++) {
            for ( var j = 0; j < old_blocks.length; j++) {
                if (old_blocks[j].y < max[i]) {
                    old_blocks[j].y += block_width;
                }

            }
        }
        score += 100;
        scoreText.text = ""+score+"";
        levelText.text = times;
      
        
    }

}
function appendBlocks(){
        for ( var j = 0; j < 4; j++) {
            old_blocks.push(current_blocks.data[j]);
        }

        current_blocks = getBlocks(centerX, areaTop, next_blocks.type);
        for (var i = 0 ; i < 4 ; i++) {
            next_blocks.data[i].kill();
        }
        next_blocks = getBlocks(310/scale, 168 / scale, null, scale);
}
function checkError (){
    for (var i = 0 ; i < 4 ; i++) {
    
            if (current_blocks.data[i].y <= block_width) {
                
                return true;
            }
        }
    return false;
}
function sortArray(a){
    for (var i = 0; i < a.length - 1 ; i++) {
    for (var j = 0 ; j < a.length - i- 1 ; j++) {
        if (parseInt(a[j].index) > parseInt(a[j + 1].index)) {
            var temp = a[j + 1];
            a[j + 1] = a[j];
            a[j] = temp;
        }
        }
    }
    
}
function insertList(){
    var array = [{"index":db.getItem(1).split(' ')[1],"name" : db.getItem(1).split(' ')[0]},{"index" :db.getItem(2).split(' ')[1],"name" :db.getItem(2).split(' ')[0]},{"index":db.getItem(3).split(' ')[1],"name" :db.getItem(3).split(' ')[0]},{"index" :db.getItem(4).split(' ')[1],"name":db.getItem(4).split(' ')[0]}];
    sortArray(array);
    
    var html = "<li><p><span class='range-score'>"+array[3].index+"</span><span class='range-name'>"+array[3].name+"</span></p></li><li><p><span class='range-score'>"+array[2].index+"</span><span class='range-name'>"+array[2].name+"</span></p></li><li><p><span class='range-score'>"+array[1].index+"</span><span class='range-name'>"+array[1].name+"</span></p></li><li><p><span class='range-score'>"+array[0].index+"</span><span class='range-name'>"+array[0].name+"</span></p></li>";
    document.getElementById("range-list").innerHTML = html;
}
var min_sorces;
function autoDown() {
    
        if (checkCollide()) {
            appendBlocks();
        } 
        if (checkCollide() && checkError()) {
           
          stateText.text='  Game Over! \n Click to restart'
          stateText.visible=true;

            game.input.onTap.addOnce(restart,this);
        }
    
    
    
    for ( var i = 0; i < 4; i++) {
        current_blocks.data[i].y += block_width;
    }
    current_blocks.centerY += block_width;

}

function getrotated() {
    var temp_array = new Array();
    var x1, y1, x2, y2;
    for ( var i = 0; i < 4; i++) {
        x1 = current_blocks.data[i].x;
        y1 = current_blocks.data[i].y;
        x1 -= current_blocks.centerX;
        y1 -= current_blocks.centerY;
        x2 = -y1;
        y2 = x1;
        x2 += current_blocks.centerX;
        y2 += current_blocks.centerY;
        temp_array[i * 2] = x2;
        temp_array[i * 2 + 1] = y2;
    }
    return temp_array;
}
function rotatecollide() {
    var arr = getrotated();
    var len = old_blocks.length;
    for ( var i = 0; i < 4; i++) {
        if ((arr[i * 2] < game.world.bounds.x + 10)
                || (arr[i * 2] > areaWidth))
            return true;
        if (arr[i * 2 + 1] > areaHeight)
            return true;
        for ( var j = 0; j < len; j++) {
            if ((Math.abs(arr[i * 2] - old_blocks[j].x) < block_width)
                    && (Math.abs(arr[i * 2 + 1] - old_blocks[j].y) < block_width)) {
                return true;
            }
        }
    }
    return false;
}
function checkCollideForUpdate(type) {
    if (old_blocks.length == 0) {
        if (type == 'left') {
            for ( var i = 0; i < 4; i++) {
                if (current_blocks.data[i].x - halfWidth == areaZero) {
                    return true;
                }
            }
        } else if (type == 'right') {
            for ( var i = 0; i < 4; i++) {
                if (current_blocks.data[i].x + halfWidth == areaWidth) {
                    return true;
                }
            }
        }
    } else {
        if (type == 'left') {
            for ( var i = 0; i < 4; i++) {
                for ( var j = 0; j < old_blocks.length; j++) {
                    if (current_blocks.data[i].x - halfWidth == areaZero
                            || ((current_blocks.data[i].y == old_blocks[j].y) && (current_blocks.data[i].x - block_width == old_blocks[j].x))) {
                        return true;
                    }
                }
            }
        } else if (type == 'right') {
            for ( var i = 0; i < 4; i++) {
                for ( var j = 0; j < old_blocks.length; j++) {
                    if (current_blocks.data[i].x + halfWidth == areaWidth
                            || ((current_blocks.data[i].y == old_blocks[j].y) && (current_blocks.data[i].x + block_width == old_blocks[j].x))) {
                        return true;
                    }

                }
            }
        }

    }
    return false;
}
function checkCollide() {
    if(helped==false)
    {
      block.reset(15,430,250,70); 
    }

   
    if (old_blocks.length == 0) {
        for ( var i = 0; i < 4; i++) {
            if (current_blocks.data[i].y + block_width >= areaHeight) {
                //music_down.play();
                return true;
            }
        }
    } else {

        for ( var i = 0; i < 4; i++) {
            for ( var j = 0; j < old_blocks.length; j++) {
                
                if (current_blocks.data[i].y + block_width >= areaHeight
                        || ((current_blocks.data[i].y + block_width == old_blocks[j].y) && (current_blocks.data[i].x == old_blocks[j].x))) {
                    //music_down.play();
                    return true;
                }
                
            }
        }
    }
    return false;
}

    
    return {

        preload: function()
        {
            
    block = game.load.spritesheet('fangkuai', 'assets/fangkuai.png',20,20);

    
        },
    
        create: function () {
            backgroundmusic=game.add.audio('backgroundmusic');
            backgroundmusic.play();
            laser=game.add.audio('laser');
          
      stateText = game.add.text(100, 200, '', {
        fill : '#ff00f6',
        align : 'center'
    });
     stateText.visible=false;
           old_blocks = [];
    score = 0;
    var bg = game.add.sprite(10,areaTop,'bg');
    //var right_bar = game.add.sprite(288,0,'right_bar');
    //bg.scale.setTo(2,2);
    current_blocks = getBlocks(centerX, 40,null,null);
    next_blocks = getBlocks(310/scale, 168 / scale, null, scale);
    
    //right bar
    var text = game.add.sprite(275, 20, 'scoreText');
    text.scale.setTo(0.4,0.4);
    var next = game.add.sprite(275, 130, 'next');
    block=game.add.tileSprite(15,430,250,70,'block');
    levelText = game.add.sprite(275, 240, 'level');
    levelText.scale.setTo(0.4,0.4);
    var pause = game.add.sprite(285, 360, 'pause');
     helpbutton = game.add.sprite(285, 460, 'helpbutton');
     helpbutton.scale.setTo(0.2,0.2);
    pause.inputEnabled = true;
    pause.events.onInputDown.add(pauseGame, this);
    game.input.onDown.add(begin, self);
    helpbutton.inputEnabled = true;
    helpbutton.events.onInputDown.add(help, this);

    var sound = game.add.sprite(285, 420, 'sound');
    pause.scale.setTo(0.7,0.7);
    sound.scale.setTo(0.6,0.6);
      sound.inputEnabled = true;
    sound.events.onInputDown.add(stopmusic, this);
    scoreText = game.add.text(290, 60, '0', {
        fill : '#ff00f6',
        align : 'center'
    });
    var levelDegree = ((1000 - level) / 100) + 1;
    // music_down = new Media('/android_asset/www/assets/audio/1996.wav', function(){}, function(e){});
    // music_move = new Media('/android_asset/www/assets/audio/14061.wav', function(){}, function(e){});
    // music_complete = new Media('/android_asset/www/assets/audio/3901.wav', function(){}, function(e){});
    levelText = game.add.text(290, 290, ""+levelDegree+"", {
        fill : '#1b00ff',
        align : 'center'
    });
    
    //game control
    
    leftBtn = game.add.sprite(20, 515, 'left');
    leftBtn.inputEnabled = true;
    rightBtn = game.add.sprite(115, 515, 'right');
    rightBtn.inputEnabled = true;
    downBtn = game.add.sprite(70, 565, 'down');
    downBtn.inputEnabled = true;
    rotateBtn = game.add.sprite(200, 520, 'rotate');
    rotateBtn.inputEnabled = true;
    
    timeEvent = game.time.events.loop(level, autoDown);
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(angleIt);
    initClick();
    
        },
    
        update: function () {
              if(game.time.now>helptime)
   {
  //  block=game.add.tileSprite(15,430,250,70,'block');
    helped=false;
    click=false;
   }
            if(score>=5000)
            {
         stateText.visible = true;
           stateText.text=" You Win! \n Click to restart";
          
           
            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
            }
                levelText.text = times;
            
            game.world.bringToTop(block);
            game.world.bringToTop(stateText);
              checkLine();
    angleFlag = rotatecollide();
    if (cursors.left.isDown) {
        if (game.time.now > interval_time && !checkCollideForUpdate('left')) {
            for ( var i = 0; i < 4; i++) {
                current_blocks.data[i].x -= block_width;
            }
            current_blocks.centerX -= block_width;
            interval_time = game.time.now + 100;
        }
    }
    if (cursors.right.isDown) {
        if (game.time.now > interval_time && !checkCollideForUpdate('right')) {
            for ( var i = 0; i < 4; i++) {
                current_blocks.data[i].x += block_width;
            }
            current_blocks.centerX += block_width;
            interval_time = game.time.now + 100;
        }
    }
    if (cursors.down.isDown) {
        if (game.time.now > interval_time) {
            autoDown();

     

            interval_time = game.time.now + 50;
        }
    } 
    
        }
        
    };
};
