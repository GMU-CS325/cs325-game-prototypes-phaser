  "use strict";
  var map;
  var leidian;  //dianyantexiao
  var player;
  var man1;
  var distance;
  var attack;
  var cursors; 
  var faced='right';
  var mangroup; 
  var saved=-1;
  var layer;
  var floor;
  var weapon;
  var playerblood;
  var playerhealth=1000;
  var current=1000;
  var focused;
  var jiantou;
  var minumber=0;
  var timer, timerEvent;
  var kiss;
  var insidemusic;
  var girlgroup;
  var daozi1;
  var daozi2;
  var daozi3;
  var daozi4;
  var attacktime=0;
  var timefinished=false;
  var get;
  var win;





  GameStates.maingame = function( game, shared ) {
    function dianyan()
    {

    leidian.visible=false;
  
   //  distance=game.physics.arcade.distanceBetween(player, man1);
   //  if(saved<10000)
     {
      for(var index=0;index<mangroup.length;index++)
      {
        if(mangroup.children[index].name=='choosed')
        {
          saved=index;
          weapon.fire(player,mangroup.children[index].x,mangroup.children[index].y);
  //game.physics.arcade.moveToObject(leidian,mangroup.children[index],120);
  //player.reset(0,0);
}
}
}

   //  leidian.scale.setTo(distance/375,1);
   //  leidian.animations.play('skill');
    }
     function fade() {

    //  You can set your own fade color and duration
    game.camera.fade(0x000000, 3000);

}

function resetFade() {
    playerhealth=1000;
   current=1000;

   minumber=0;

   attacktime=0;

  if(timefinished)
  {
  insidemusic.stop();
     timefinished=false;
         game.state.start("winf");
  }
  else
  {
  insidemusic.stop();
     timefinished=false;
         game.state.start("dead");
       }


}
    function createman()
    {
       for (var y = 0; y < 10; y++)
        {
          var man; 
           var randomnumber=game.rnd.integerInRange(1,4)
           if(randomnumber==1)
          man=mangroup.create(100+300*y,game.world.randomY,'man1');
          if(randomnumber==2)
           man=mangroup.create(100+300*y,game.world.randomY,'man2');
           if(randomnumber==3)
            man=mangroup.create(100+300*y,game.world.randomY,'man3');
            if(randomnumber==4)
             man=mangroup.create(100+300*y,game.world.randomY,'man4');
         
          man.animations.add('down', [0,1,2,3], 5, true);
    // player.animations.add('skill', ['skill1','skill2','skill3','skill4'], 5, true);
          man.animations.add('left', [4,5,6,7], 5, true);
          man.animations.add('right', [8,9,10,11], 5, true);
          man.animations.add('up', [12,13,14,15], 5, true);
          man.scale.setTo(2,2);
          game.physics.enable(man, Phaser.Physics.ARCADE);
          man.body.moves=false;
          man.anchor.setTo(0.5, 0.5);
        }
    }
    function creategirl()
    {
       for (var y = 0; y < 4; y++)
        {
          var girl; 
           var randomnumber=game.rnd.integerInRange(1,4)
           if(randomnumber==1)
          girl=girlgroup.create(game.world.randomX,game.world.randomY,'girl1');
          if(randomnumber==2)
           girl=girlgroup.create(game.world.randomX,game.world.randomY,'girl2');
           if(randomnumber==3)
            girl=girlgroup.create(game.world.randomX,game.world.randomY,'girl3');
            if(randomnumber==4)
             girl=girlgroup.create(game.world.randomX,game.world.randomY,'girl1');
         
       
          girl.scale.setTo(2,2);
          game.physics.enable(girl, Phaser.Physics.ARCADE);
          girl.body.moves=false;
          girl.anchor.setTo(0.5, 0.5);
        }
    }
    function choose()
    {
    focused=true;
    
    jiantou=game.add.sprite(this.x-15,this.y-60,'jiantou');
    jiantou.scale.setTo(0.05,0.05);
    this.name='choosed';
    playerblood.visible=true;
    playerblood.scale.setTo((current/playerhealth)*2.15,1);
   // saved=getChildIndex(this);
   
    }
 
 function collisionHandler1()
 {
    current=current-10;
  playerblood.scale.setTo((current/playerhealth)*2.15,1);
 }  
 function daoziattack()
 {
  player.kill();
  fade();

 }
  function timerEnd()
    {
    //  game.state.start('loadgame');
      timefinished=true;
      fade();
    }
    function girlattack(index)
    {
      attacktime=game.time.now+3000;
      if(index==0)
      {
      daozi1.reset(girlgroup.children[0].x,girlgroup.children[0].y)
      game.physics.arcade.moveToObject(daozi1,player,120);
    }
      if(index==1)
      {
     daozi2.reset(girlgroup.children[1].x,girlgroup.children[1].y)
     game.physics.arcade.moveToObject(daozi2,player,120);
   }
    if(index==2)
    {
     daozi3.reset(girlgroup.children[2].x,girlgroup.children[2].y)
     game.physics.arcade.moveToObject(daozi3,player,120);
    }
    if(index==3){
  daozi4.reset(girlgroup.children[3].x,girlgroup.children[3].y)
  game.physics.arcade.moveToObject(daozi4,player,120);
}
    }
  return {

    preload: function()
    {
   
 
 //mangroup.children[i].name='choosed';


    },

    create: function () {

        game.world.setBounds(0, 0, 2500,600);
      map = game.add.tilemap('tiletest',16,16);
      get=game.add.audio('get');
       map.addTilesetImage('wutai1');
      layer=map.createLayer('background');
    //  floor=map.createLayer('floor');
    cursors = game.input.keyboard.createCursorKeys();
      game.physics.startSystem(Phaser.Physics.ARCADE);
      attack=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      player=game.add.sprite(0,530,'player');
      player.scale.setTo(2,2);
        player.anchor.setTo(0.5, 0.5);
      daozi1=game.add.sprite(0,0,'daozi');
      daozi1.visible=false;
      daozi1.scale.setTo(0.2,0.2);
         daozi2=game.add.sprite(0,0,'daozi');
      daozi2.visible=false;
          daozi2.scale.setTo(0.2,0.2);
         daozi3=game.add.sprite(0,0,'daozi');
      daozi3.visible=false;
          daozi3.scale.setTo(0.2,0.2);
         daozi4=game.add.sprite(0,0,'daozi');
      daozi4.visible=false;
          daozi4.scale.setTo(0.2,0.2);
             game.physics.enable(daozi1, Phaser.Physics.ARCADE);
                game.physics.enable(daozi2, Phaser.Physics.ARCADE);
                   game.physics.enable(daozi3, Phaser.Physics.ARCADE);
                      game.physics.enable(daozi4, Phaser.Physics.ARCADE);
                      daozi1.anchor.setTo(0.5, 0.5);
                      daozi2.anchor.setTo(0.5, 0.5);
                      daozi3.anchor.setTo(0.5, 0.5);
                      daozi4.anchor.setTo(0.5, 0.5);

      mangroup=game.add.group();
       girlgroup=game.add.group();
 createman();
  creategirl();
    playerblood=game.add.sprite(0, 0,'bloodbar');
    playerblood.scale.setTo(2.15,1);
    playerblood.fixedToCamera=true;
    playerblood.visible=false;

     weapon = game.add.weapon(30, 'leidian');

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 60;

    //  Add a variance to the bullet angle by +- this value
    weapon.bulletAngleVariance = 1;
     weapon.trackSprite(player, 14, 0);
      for(var i=0;i<mangroup.length;i++)
      {
      mangroup.children[i].inputEnabled = true;
      mangroup.children[i].events.onInputDown.add(choose, mangroup.children[i]);
      }
       game.physics.enable(player, Phaser.Physics.ARCADE);
        player.checkWorldBounds=true;
      
     //game.physics.enable(man1, Phaser.Physics.ARCADE);

    kiss=game.add.audio('kiss');
      leidian = game.add.sprite(0,0, 'leidian');
   leidian.scale.setTo(0.5,0.5);
      leidian.visible=true;
          game.physics.enable(leidian, Phaser.Physics.ARCADE);
      player.animations.add('down', [0,1,2,3], 5, true);
    // player.animations.add('skill', ['skill1','skill2','skill3','skill4'], 5, true);
    player.animations.add('left', [4,5,6,7], 5, true);
    player.animations.add('right', [8,9,10,11], 5, true);
    player.animations.add('up', [12,13,14,15], 5, true);
      timer = game.time.create();
          timerEvent = timer.add(Phaser.Timer.MINUTE * 2, timerEnd, this);
          timer.start();
     // leidian.animations.add('skill', [0,1,2,3], 5, true);
    // leidianaction.onComplete.add(animationStopped, this);
      // man1.inputEnabled = true;
    //man1.events.onInputDown.add(dianyan, this);

 insidemusic=game.add.audio('insidemusic');
     insidemusic.play();
     player.body.collideWorldBounds=true;

      // wordframe.events.onInputDown.add(talking, this);
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
       game.camera.onFadeComplete.add(resetFade, this);
  game.physics.arcade.overlap(daozi1,player,daoziattack,null,this);
    game.physics.arcade.overlap(daozi2,player,daoziattack,null,this)
      game.physics.arcade.overlap(daozi3,player,daoziattack,null,this)
        game.physics.arcade.overlap(daozi4,player,daoziattack,null,this)
         // game.physics.arcade.collide(player, mangroup);
             game.physics.arcade.collide(mangroup);
      
if(focused)
{
      for(var index=0;index<mangroup.length;index++)
      {
        if(mangroup.children[index].name=='choosed')
        {
          saved=index;
        }
      }
    }
        game.camera.follow(player);
        player.body.velocity.setTo(0, 0);
        leidian.animations.play('skill');

if(attack.isDown&&focused==true)
{
  
  kiss.play();
  dianyan();
  player.body.moves=false;

}
else
{
  leidian.visible=false;
  player.body.moves=true;
}
if(player.body.moves==false&&game.time.now>attacktime)
{
  if(girlgroup.children[0].inCamera)
  {
    girlattack(0);
  }
  if(girlgroup.children[1].inCamera)
  {
    girlattack(1);
  }
  if(girlgroup.children[2].inCamera)
  {
    girlattack(2);
  }
  if(girlgroup.children[3].inCamera)
  {
    girlattack(3);
  }
}
for(var i=0;i<mangroup.length;i++)
{
  if(mangroup.children[i].name=='delete'&&game.physics.arcade.distanceBetween(mangroup.children[i],player)>minumber*20)
  {
game.physics.arcade.moveToObject(mangroup.children[i],player,120);
  }
}
if(focused)

{  for(var i=0;i<weapon.bullets.length;i++)
{
if((player.x<mangroup.children[saved].x))
{
if(weapon.bullets.children[i].x>mangroup.children[saved].x)
{
game.physics.arcade.overlap(weapon.bullets.children[i], mangroup.children[saved], collisionHandler1, null, this);
  weapon.bullets.children[i].kill();

}
}

else if(player.x>mangroup.children[saved].x)
{
  if(weapon.bullets.children[i].x<mangroup.children[saved].x)
 {
game.physics.arcade.overlap(weapon.bullets.children[i], mangroup.children[saved], collisionHandler1, null, this);
weapon.bullets.children[i].kill();

}
}
}
}
if(current<0)
{
  get.play();
  minumber++;
  current=1000;
  mangroup.children[saved].name='delete';
  mangroup.children[saved].alpha=0.5;
  mangroup.children[saved].body.moves=true;
  mangroup.children[saved].reset(player.x-minumber*70,player.y);
         mangroup.children[saved].inputEnabled = false;

 // mangroup.children[saved].kill();
focused=false;
jiantou.kill();
}




         if (cursors.up.isDown)
    {

      player.body.velocity.y = -300;
          //        player.animations.play('skill');
          player.animations.play('up');

          
        }
        else if (cursors.down.isDown)
        {
          player.body.velocity.y = 300;
          player.animations.play('down');
          
          
        }

        else if (cursors.left.isDown)
        {
         player.body.velocity.x = -300;
         player.animations.play('left');
         faced='left';
   
         
       }
       else if (cursors.right.isDown)
       {
   
        player.body.velocity.x = 300;
        player.animations.play('right');
        faced='right';
        
      }

    },

}

    };
