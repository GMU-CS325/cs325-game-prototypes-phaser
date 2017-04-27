  "use strict";
var map;
var block;
var cursors;
 var bullets;
var bulletTime = 0;
    var  fireButton;
    var man;
    var blackgroup;
    var lightball;
    var level='a';
    var test;
    var current;
    var current1;
    var looktimer=11500;
    var enter=true;
    var count=0;
    var huoba;
    var kanjian=false;
    var zhaomingdan;
    var getzhaoming;
    var face='up';
    var wordframe;
    var begin=false;
    var timefinished=false;
    var timer;
    var timerEvent;
    var black1;
    var black2;
    var black3;
    var blue;
    var cuole;
    var duile;
    var kongbumusic1;
    var getitem;

 GameStates.maingame = function( game, shared ) {
    function fade() {

    //  You can set your own fade color and duration
    game.camera.fade(0x000000, 3000);

}
function talking(pointer)  //被攻击
      {
        begin=true;
        wordframe.visible=false;
        test.visible=false;
       player.body.moves=true;
    
      }
function resetFade() {
    count=0;
      enter=true;
  level++;
  kongbumusic1.stop();
  if(timefinished)
  {
    level=1000;
    enter=true;
    timefinished=false;
    game.state.start("dead");
  }
 else  if(cuole)
    {
       level=1000;
    enter=true;
      timefinished=false;
      game.state.start("dead");
    }
    else if(duile)
    {
       level=1000;
    enter=true;
          timefinished=false;
      game.state.start("win")
    }
  
 else if(level==1004)
  {
     level=1000;
    enter=true;
        timefinished=false;
      game.state.start("win");
  }
  }

  function blublackgroup()
  {
    if(level==1000)
    {
     blackgroup = game.add.group();
        blackgroup.enableBody = true;
        blackgroup.physicsBodyType = Phaser.Physics.ARCADE;
     for(var i=0;i<800;i=i+25)
      for(var j=0;j<600;j=j+25)
      {
       var black=blackgroup.create(i,j, 'black');
      }
  }
  else if(level==1001)
    {
     blackgroup = game.add.group();
        blackgroup.enableBody = true;
        blackgroup.physicsBodyType = Phaser.Physics.ARCADE;
     for(var i=0;i<800;i=i+25)
      for(var j=0;j<600;j=j+25)
      {
       var black=blackgroup.create(i+1050,j, 'black');
      }
  }
  else if(level==1002)
    {
     blackgroup = game.add.group();
        blackgroup.enableBody = true;
        blackgroup.physicsBodyType = Phaser.Physics.ARCADE;
     for(var i=0;i<800;i=i+25)
      for(var j=0;j<600;j=j+25)
      {
       var black=blackgroup.create(i+2008,j, 'black');
      }
  }
}


  function seteverything()
  {
    if(level==1000)
    {
    player.reset(122,582);
    lightball.reset(672,18);
  }
   else if(level==1001)
   {
       player.reset(1452,335);
         player.reset(1177,570);
    lightball.reset(1742,80);
   }
   else if(level==1002)
   {
        player.reset(2400,347);
  
         player.reset(2040,472);
    lightball.reset(2650,20);
   }
   else if(level==1003)
   {
        player.reset(2400,347);
         player.reset(2040,472);
    lightball.reset(2650,20);
   }

  }
  function nextlevel()
  {
    begin=false;
    fade();
    
  

  }

  function fireBullet()
  {
   if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
           var  bullet = bullets.getFirstExists(false);

            if (bullet)
            {
                //  And fire it
               
                bullet.reset(player.x, player.y + 8);
                if(face=='up')
                bullet.body.velocity.y = -400;  //shang
                else if(face=='down')
                bullet.body.velocity.y = 400;  //xia
               else if(face=='left')
                bullet.body.velocity.x = -400;  //zuo
               else if(face=='right')
                bullet.body.velocity.x = 400;  //you

                bulletTime = game.time.now + 200;
                
  
            }
        }
 //   game.physics.arcade.moveToObject(daozi1,player,120);
  }
function kandejianfunction()
{
  for(var i=0;i<blackgroup.length;i++)
  {
  if(game.physics.arcade.distanceBetween(player, blackgroup.children[i]) < 40)
  {
    blackgroup.children[i].visible=false;
  }
  else
  {
    blackgroup.children[i].visible=true;
  }
}
}
function getskill()
{
  huoba.kill();
  kanjian=true;
  getitem.play();
}
function getskill1()
{
  zhaomingdan.kill();
  getzhaoming=true;
  getitem.play();
}
function zhaomingdanfunction()
{
  for(var i=0;i<blackgroup.length;i++)
  {
  if(game.physics.arcade.distanceBetween(bullets.children[0], blackgroup.children[i]) < 20)
  {
    blackgroup.children[i].visible=false;
  }
  else
  {
     if(blackgroup.children[i].visible!=false)
    blackgroup.children[i].visible=true;
  }
}
}
function timerEnd()
    {
     // game.state.start('loadgame');
      timefinished=true;
      fade();
    }

function wrong()
{
  fade();
  cuole=true;

}
function right()
{
  fade();
  duile=true;
}

  return {

    preload: function()
    {
   

    },

    create: function () {
if(level==1002)
{
  kanjian=false;
}

  game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.setBounds(0, 0, 3000,600);
      map = game.add.tilemap('tiletest',16,16);
      map.addTilesetImage('block');
      map.addTilesetImage('cao');
      block=map.createLayer('block');
      game.physics.enable(block, Phaser.Physics.ARCADE);
         map.setCollisionBetween(1, 10000, true, block); 
      player=game.add.sprite(0,0,'player');
      lightball=game.add.sprite(300,300,'aixin');
      lightball.scale.setTo(0.2,0.2);
      lightball.anchor.setTo(0.5, 0.5);
      game.physics.enable(lightball, Phaser.Physics.ARCADE);
        game.physics.enable(player, Phaser.Physics.ARCADE);
          player.anchor.setTo(0.5, 0.5); 
           wordframe = game.add.sprite(80, 380, 'wordframe');
    wordframe.inputEnabled = true;
    wordframe.events.onInputDown.add(talking, this);
    wordframe.scale.setTo(0.9,1.05);  
    wordframe.fixedToCamera = true;
    

             getitem=game.add.audio('getitem');
             player.checkWorldBounds=true;
                    seteverything();
          cursors = game.input.keyboard.createCursorKeys();
          current=game.add.sprite(1452,335,'block');
          current.scale.setTo(0.1,0.1);
                  game.physics.enable(current, Phaser.Physics.ARCADE);
                          current1=game.add.sprite(2400,347,'block');
          current1.scale.setTo(0.1,0.1);
                  game.physics.enable(current1, Phaser.Physics.ARCADE);
       huoba=game.add.sprite(1480,62,'huoba');
       huoba.scale.setTo(0.05,0.05);
       huoba.anchor.setTo(0.5,0.5);
          game.physics.enable(huoba, Phaser.Physics.ARCADE);
          zhaomingdan=game.add.sprite(2250,314,'zhaomingdan');
          zhaomingdan.anchor.setTo(0.5,0.5);
          zhaomingdan.scale.setTo(0.5,0.5);
     game.physics.enable(zhaomingdan, Phaser.Physics.ARCADE);
      player.animations.add('down', [0,1,2], 5, true);
   player.body.collideWorldBounds=true;
     bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(1, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
       game.world.bringToTop(player);
       test = game.add.text(100,380,"Look that lightball, which is your goal. \nRemind you again! You have 5 second to rememebr the maze\n and you have limited time!!! \n trust me, maze is not so hard, but you only have 40s, Enjoy!!!\n(before world enter drak, you cannot move\n upper left corner is your time)", { font: '25px Arial', fill: '#0ff' }); 


     test.fixedToCamera=true;
     if(level==1001)
     {
      test.text="Look this fire, this is your tool! \n You would get this fire firstly, it will give you a little bit light!"
     }

      if(level==1002)
     {
      test.text="Look this item kind like bomb, this is your tool! \n Then you can shoot light buttle!  Try to press Whitespace \nThe direction of bullet is based on your last input\n(up,down,left,right)\n and you have unlimited bullets"
     }
     if(level==1003)
     {
      test.text='test if you are cheating to pass this game!\n if you do pass three drak maze, you must familiar with drak\n so , tell me which one is not drak color! \n I mean... You might took picture of mazes'
     }
         timer = game.time.create();
          timerEvent = timer.add(Phaser.Timer.MINUTE * 0.8, timerEnd, this);
          timer.start();

      if(level==1003)
      {
      black1=game.add.button(2000,100,'black1',wrong,this);
      black2=game.add.button(2200,100,'black1',wrong,this);
      black3=game.add.button(2400,100,'black1',wrong,this);
      blue=game.add.button(2600,100,'blue',right,this);
      player.kill();
    
      zhaomingdan.kill();
      lightball.kill();
      }
     kongbumusic1=game.add.audio('kongbumusic1');
     kongbumusic1.play();


  
    } ,
    render: function () 
        {
          if (timer.running) 
    game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 25, 25, '#ffffff');
      },
      formatTime: function(s) 
      {
          var minutes = "0" + Math.floor(s / 60);
          var seconds = "0" + (s - minutes * 60);
          return minutes.substr(-2) + ":" + seconds.substr(-2);   
      },
   
  

    update: function () {
     
     if(getzhaoming)
     {
      zhaomingdanfunction();
     }
      if(begin)
      {
        block.visible=true;
        player.body.moves=true;
      }
      else
      {
        block.visible=false;
        player.body.moves=false;
      }
       if(level==1003)
      {
          block.visible=false;
        game.world.bringToTop(black1);
        game.world.bringToTop(black2);
           game.world.bringToTop(black3);
        game.world.bringToTop(blue);
      }
      if(kanjian)
      {
        kandejianfunction();
      }
       if(getzhaoming)
      {
         if (fireButton.isDown)
            {
                fireBullet();
             
            }
      }
      if(begin)
      {
count++;
}
      if(count>350&&enter)
      {
       blublackgroup();
            game.world.bringToTop(player);
                 game.world.bringToTop(lightball);
                 enter=false;
      }
        if(count<350)
        {
            player.body.moves=false;
        }
        else
        {
            player.body.moves=true;
        }

            game.world.bringToTop(test);
        
      if(level==1001)
      {
          game.camera.follow(current); 
      }
      if(level==1002||level==1003)
      {
          game.camera.follow(current1); 
      }
           game.camera.onFadeComplete.add(resetFade, this);

      game.physics.arcade.overlap(lightball,player,nextlevel,null,this);
            game.physics.arcade.overlap(huoba,player,getskill,null,this);
                     game.physics.arcade.overlap(zhaomingdan,player,getskill1,null,this);
      game.physics.arcade.collide(player, block);
        player.body.velocity.setTo(0, 0);
        if (cursors.up.isDown)
    {

         player.body.velocity.y = -300;
          player.animations.play('down');
          face='up';
           
          
        }
        else if (cursors.down.isDown)
        {
          player.body.velocity.y = 300;
          player.animations.play('down');
           face='down';
          
          
        }

        else if (cursors.left.isDown)
        {
         player.body.velocity.x = -300;
         player.animations.play('down');
           face='left';
     
   
         
       }
       else if (cursors.right.isDown)
       {
   
        player.body.velocity.x = 300;
        player.animations.play('down');
       face='right';
    
        
      }
        
     
}
    };
  }
