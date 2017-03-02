  "use strict";
  var floor;
  var player;
  var cursors;
  var playerattack;
  var playerattackright;
  var fireButton;
  var time=0;
  var setlives=10;
  var monster1;
  var monstergroup;
  var healthtext;
  var timeget=false;
  var round=4;
  var orhealth1=30;
  var orhealth2=60;
  var orhealth3=120;
  var orhealth4=240;
  var playerhealth=10000;
  var orplayer=10000;
  var stateText;
  var gameover=false;
  var lives=10;
  var test;
  var worldtree;
  var word = "csbt325jk";
  var correct = [];
  var bmd;
  var playerblood;
  var wordframe;
  var treetalk;
  var begin=false;
  var leidian;
  var leidianaction;
  var skill1;//button
  var skill2;//button
  var skill3;//button
  var landingbadgroup;
  var landinggoodgroup;
  var landinggood;
  var landingbad;
  var landingtimer=0;  //砸下来的dong xi
  var i=0;
  var skill1cd=0;
  var skill2cd=0;
  var skill3cd=0;
  var xingluosound
  var skill1sound;
  var hitsound;
  var secretskill;
  var secretskillaction;
  var faced="left";
  var blink;
  var zeus;
  var xingluo;
  var wings;
  var bombsound;
  var drinksound;
  var enter;
  var death;
  var gameover;
  var talked=true;
  var extradamage=0;
  var checked=true;
  var skilltext;






  GameStates.maingame = function( game, shared ) {
    function landingfunction()
    {
      var randomnumber=game.rnd.integerInRange(100, 200)
      landingtimer=game.time.now+500;
      if(randomnumber>100&&randomnumber<180)
      {
        landingbad= landingbadgroup.create(game.world.randomX,0, 'bomb');
        landingbad.scale.setTo(0.05,0.05);
        landingbad.name = 'asteroid' + i;
      }
      else
      {
       landinggood= landinggoodgroup.create(game.world.randomX,0, 'xueping');
       landinggood.name = 'asteroid' + i;
     }
      //  landing.fixedToCamera=true;

      i++;
    }
    function playskill1()
    {
     zeus.alpha=0.5;
       //  xingluosound.play();
       skill1sound.play();
       skill1cd=game.time.now+5000;
       leidian.visible=true;
       if(faced=="left")
       {
        leidian.angle=180;
        leidian.reset(player.x-20,player.y+80);
      }
      else
      {
       leidian.angle=0;
       leidian.reset(player.x+70,player.y-40);
     }
     for(var i=0;i<monstergroup.children.length;i++)
     {
      if(game.physics.arcade.distanceBetween(player,monstergroup.children[i].children[0])<200)
      {
        if(faced=="left"&&monstergroup.children[i].children[0].x<player.x)
        {
          monstergroup.children[i].children[0].x-=100;
          monstergroup.children[i].children[0].health-=15;
        }
        else if(faced=="right"&&monstergroup.children[i].children[0].x>player.x)
        {
          monstergroup.children[i].children[0].x+=100;
          monstergroup.children[i].children[0].health-=15;
        }

      }
    }
    leidian.animations.play('skill');
  }

  function playskill2()
  {
    xingluosound.play();
    xingluo.alpha=0.5;
    skill2cd=game.time.now+5000;
    secretskill.visible=true;
    if(faced=="left")
    {
      secretskill.reset(player.x-450,player.y-300);
    }
    else
    {
      secretskill.reset(player.x+200,player.y-300);
    }
    for(var i=0;i<monstergroup.children.length;i++)
    {

      if(game.physics.arcade.distanceBetween(player,monstergroup.children[i].children[0])<400)
      {
  //monstergroup.children[i].children[0].x-=100;
  monstergroup.children[i].children[0].health-=30;
}
}
secretskill.animations.play('skill');
}
function keyPress(char) {

      //  Clear the BMD
      bmd.cls();

      //  Set the x value we'll start drawing the text from
      var x = 64;

      //  Loop through each letter of the word being entered and check them against the key that was pressed
      for (var i = 0; i < word.length; i++)
      {
        var letter = word.charAt(i);

          //  If they pressed one of the letters in the word, flag it as correct
          if (char === letter)
          {
            correct[letter] = true;
          }

          //  Now draw the word, letter by letter, changing colour as required
          if (correct[letter])
          {
            bmd.context.fillStyle = '#ffffff';
          }
          else
          {
            bmd.context.fillStyle = '#ffffff';
          }

          bmd.context.fillText(letter, x, 64);

          x += bmd.context.measureText(letter).width;
        }

      }

      function playskill3()
      {
        blink.alpha=0.5;
        wings.visible=true;
        skill3cd=game.time.now+5000;
        extradamage=10;
      }
      function checkword()
      { var flag=true;
        for (var i = 0; i < word.length; i++)
        {
          if(correct[word[i]] ==false)
          {
            return false;
          } 
        }
        return flag;
      }
      function monsterattack() {

        for(var i=0;i<monstergroup.children.length;i++)
        {
          if(game.physics.arcade.distanceBetween(player,monstergroup.children[i].children[0])<70&&(-10<monstergroup.children[i].children[0].y-player.y<10)&&monstergroup.children[i].children[0].x<player.x&&lives>0)
          {
           monstergroup.children[i].children[0].body.moves=false;
           monstergroup.children[i].children[1].body.moves=false;
           monstergroup.children[i].children[0].play('attack');
           playerhealth=playerhealth-1;
           playerblood.scale.setTo((playerhealth/orplayer)*2,1);



         }
        else  if(game.physics.arcade.distanceBetween(player,monstergroup.children[i].children[0])<70&&(-10<monstergroup.children[i].children[0].y-player.y<10)&&monstergroup.children[i].children[0].x>=player.x&&lives>0)
          {
           monstergroup.children[i].children[0].body.moves=false;
           monstergroup.children[i].children[1].body.moves=false;
           monstergroup.children[i].children[0].play('attackleft');
           playerhealth=playerhealth-1;
           playerblood.scale.setTo((playerhealth/orplayer)*2,1);



         }
         else if(begin)
          {    monstergroup.children[i].children[0].body.moves=true;
            monstergroup.children[i].children[1].body.moves=true;

            game.physics.arcade.moveToObject(monstergroup.children[i].children[0],player,120);
            game.physics.arcade.moveToObject(monstergroup.children[i].children[1],player,120);
            if(monstergroup.children[i].children[0].x<player.x)
            {
            monstergroup.children[i].children[0].play('normal');
          }
         if( monstergroup.children[i].children[0].x>=player.x)
         {
          monstergroup.children[i].children[0].play('normalleft');
         }
          }
        }


      };
      function talking(pointer)  //被攻击
      {
        talked=false;
        wordframe.visible=false;
        test.visible=false;
        begin=true;
        skilltext.visible=true;
      }
      function createmonster (round) {
        monstergroup.removeAll();
        
        for (var y = 0; y < setlives; y++)
        {

          {
            var monsterblood=game.add.group();


            if(round==1)
            {

              var monster=game.add.sprite(0, 50*y,'monster1');
              var blood=game.add.sprite(5, 50*y-10,'bloodbar');
              monster.scale.setTo(1.5,1.5);
              monster.health=20;
              monster.animations.add('attack', [0,1,2,3,4,5], 5, false);
              monster.animations.add('attackleft', [8,7,6,11,10,9], 5, false);
              monster.animations.add('normal', [0], 5, false);
                monster.animations.add('normalleft', [8], 5, false);
              game.physics.enable(monster, Phaser.Physics.ARCADE);
              game.physics.enable(monster, Phaser.Physics.ARCADE);
              game.physics.enable(blood, Phaser.Physics.ARCADE);
              monsterblood.add(monster);
              blood.scale.setTo(0.1,0.1);
              monsterblood.add(blood);
         //  monsterblood.enableBody = true;
          // monsterblood.physicsBodyType = Phaser.Physics.ARCADE;
          monstergroup.add(monsterblood);
        }
        else if(round==2)
        {
          var monster=game.add.sprite(0, 50*y,'monster2');
          var blood=game.add.sprite(5, 50*y-10,'bloodbar');
          monster.scale.setTo(1.5,1.5);
          monster.health=40;
     monster.animations.add('attack', [0,1,2,3,4,5], 5, false);
              monster.animations.add('attackleft', [8,7,6,11,10,9], 5, false);
              monster.animations.add('normal', [0], 5, false);
                monster.animations.add('normalleft', [8], 5, false);
          game.physics.enable(monster, Phaser.Physics.ARCADE);
          monsterblood.add(monster);
          blood.scale.setTo(0.1,0.1);
          monsterblood.add(blood);

          game.physics.enable(monster, Phaser.Physics.ARCADE);
          game.physics.enable(blood, Phaser.Physics.ARCADE);
         //  monsterblood.enableBody = true;
          // monsterblood.physicsBodyType = Phaser.Physics.ARCADE;
          monstergroup.add(monsterblood);
        }
        else  if(round==3)
        {
         var monster=game.add.sprite(0, 50*y,'monster3');
         var blood=game.add.sprite(5, 50*y-10,'bloodbar');
         monster.scale.setTo(1.5,1.5);
         monster.health=80;
 monster.animations.add('attackleft', [0,1,2,3,4,5], 5, false);
              monster.animations.add('attack', [8,7,6,11,10,9], 5, false);
              monster.animations.add('normal', [0], 5, false);
                monster.animations.add('normalleft', [8], 5, false);
         game.physics.enable(monster, Phaser.Physics.ARCADE);
         monsterblood.add(monster);
         blood.scale.setTo(0.1,0.1);
         monsterblood.add(blood);

         game.physics.enable(monster, Phaser.Physics.ARCADE);
         game.physics.enable(blood, Phaser.Physics.ARCADE);
         //  monsterblood.enableBody = true;
          // monsterblood.physicsBodyType = Phaser.Physics.ARCADE;
          monstergroup.add(monsterblood);
        }
        else  if(round==4)
        {
          var monster=game.add.sprite(0, 50*y,'monster4');
          var blood=game.add.sprite(5, 50*y-10,'bloodbar');
          monster.scale.setTo(1.5,1.5);
          monster.health=160;
       monster.animations.add('attack', [0,1,2,3,4,5], 5, false);
              monster.animations.add('attackleft', [8,7,6,11,10,9], 5, false);
              monster.animations.add('normal', [0], 5, false);
                monster.animations.add('normalleft', [8], 5, false);
          game.physics.enable(monster, Phaser.Physics.ARCADE);
          monsterblood.add(monster);
          blood.scale.setTo(0.1,0.1);
          monsterblood.add(blood);

          game.physics.enable(monster, Phaser.Physics.ARCADE);
          game.physics.enable(blood, Phaser.Physics.ARCADE);
         //  monsterblood.enableBody = true;
          // monsterblood.physicsBodyType = Phaser.Physics.ARCADE;
          monstergroup.add(monsterblood);
        }

      /*   else if(round==5)
            {
            var monster=game.add.sprite(0, 50*y,'monster5');
        var blood=game.add.sprite(5, 50*y-10,'bloodbar');
             monster.scale.setTo(1.5,1.5);
          monster.health=20;
              monster.animations.add('attack', [0,1,2,3,4,5], 5, false);
              monster.animations.add('normal', [0], 5, false);
                game.physics.enable(monster, Phaser.Physics.ARCADE);
              monsterblood.add(monster);
                  blood.scale.setTo(0.1,0.1);
             monsterblood.add(blood);

             game.physics.enable(monster, Phaser.Physics.ARCADE);
              game.physics.enable(blood, Phaser.Physics.ARCADE);
         //  monsterblood.enableBody = true;
          // monsterblood.physicsBodyType = Phaser.Physics.ARCADE;
              monstergroup.add(monsterblood);
        }
      
           */  // monster.play('normal');
         }



       }
     };

     function nextround()
     {
      lives=10;
      enter.play();
      round++;
 
      player.reset(game.world.centerX+550, game.world.centerY+250);
      
      player.body.moves=true;
      if(round==2)
      {
        test.text="Oh, my dear hero, you kill all monster in round1???? Ok,\nyou.... you are so good, now I prove you the first skill. \nI would call it Nimbus! So this skill have two effects 1:\nyou can knocks back the monster 2: cause damage. \nNow monsters are becoming stronger. Go, hero!";
      }
      if(round==3)
      {
       test.text=("You save me again! You want a new skill right? Hold on,\n Hold on, man, let me check what can I get for you..... Oh, \nthis one is perfect----Guardian Angel, which can raise your \ndamage significantly in one moment. Go, try to use your \nnew skill to beat monster!")
     }
     if(round==4)
     {
      test.text="OK, last round, hero, we have no choice but to kill them all, \nLet me prove you the most porwerful magic in this world\n---Starstorm!!! A super powerful and big AOE skill, only \none disadvantage is that this skill have a long cooldown.\n Anyway, this is our last battle! Go!"
     // begin=true;
   }
   createmonster (round);


 };
 function end()
 {
  round=1;
  playerhealth=10000;
  game.state.start("loadgame");
  begin=false;
  lives=10;
}

function killmonster()
{
  hitsound.play();
  time=game.time.now+300;
  player.visible=false;
  if(faced=='left')
  {
    playerattack.visible=true;
    player.body.moves=false;
    playerattack.reset(player.x,player.y);
    playerattack.animations.play('attack');
  }
  if(faced=='right')
  {
    playerattackright.visible=true;
    player.body.moves=false;
    playerattackright.reset(player.x,player.y);
    playerattackright.animations.play('attack');
  }


  {

    for(var i=0;i<monstergroup.length;i++)
    {
      if(game.physics.arcade.distanceBetween(player,monstergroup.children[i].children[0])<70)
      {

        monstergroup.children[i].children[0].health= monstergroup.children[i].children[0].health-5-extradamage;


      }
    }
  }
};
function collisionHandler1 (player, landingbad) {

          //  When a bullet hits an alien we kill them both
          bombsound.play();
          landingbad.kill();
          playerhealth=playerhealth-1000;
          playerblood.scale.setTo((playerhealth/orplayer)*2,1);

        };
        function collisionHandler2 (player, landinggood) {

          //  When a bullet hits an alien we kill them both
    // landingbad.kill()
    landinggood.kill();
    drinksound.play();

    if(playerhealth<orplayer)
    {
     playerhealth=playerhealth+1000;
     playerblood.scale.setTo((playerhealth/orplayer)*2,1);
   }
 };
 function checkhealthformonster()
 {
   for(var i=0;i<monstergroup.length;i++)
   {
    var currenthealth=monstergroup.children[i].children[0].health;
    if(currenthealth>=0)
    {
      if(round==1)
      {
        monstergroup.children[i].children[1].scale.setTo((currenthealth/orhealth1)*0.1,0.1);
      }
      else if(round==2)
      {
        monstergroup.children[i].children[1].scale.setTo((currenthealth/orhealth2)*0.1,0.1);
      }
      else  if(round==3)
      {
        monstergroup.children[i].children[1].scale.setTo((currenthealth/orhealth3)*0.1,0.1);
      }
      else  if(round==4)
      {
        monstergroup.children[i].children[1].scale.setTo((currenthealth/orhealth4)*0.1,0.1);
      }
    }
    if(monstergroup.children[i].children[0].health<=0)
    {
         //   monstergroup.children[i].children[1].visible=false;
         monstergroup.removeChildAt(i);
              //    monstergroup.children[i].children[0].kill();
          //  monstergroup.children[i].children[1].kill();
          lives=lives-1;

         //   monstergroup.children[i].kill();
       }
     }
   }

   function checkskill()
   {blink.visible=false;
     zeus.visible=false;
     xingluo.visible=false;
     if(round>1)
     {
      zeus.visible=true;
    }
    if(round>2)
    {
      blink.visible=true;
    }
    if(round>3)
    {
      xingluo.visible=true;
    }
  }

  function animationStopped(sprite)
  {
    sprite.visible=false;
  }


  return {

    preload: function()
    {



    },

    create: function () {

      drinksound=game.add.audio('drink');
      bombsound=game.add.audio('zhadan');
      skill1sound=game.add.audio('skill1sound');
      xingluosound=game.add.audio('xingluosound');
      hitsound=game.add.audio('hitsound');
      enter=game.add.audio('enter');
      enter.play();
      death=game.add.audio('death');
      gameover=game.add.audio('gameover');
      round=1;

      for (var i = 0; i < word.length; i++)
      {
        correct[word[i]] = false;
      }

      //  This is our BitmapData onto which we'll draw the word being entered
      bmd = game.make.bitmapData(game.centerX, game.centerY);
      bmd.context.font = '20px Arial';
      bmd.context.fillStyle = '#ffffff';
      bmd.context.fillText(word, 200, 200);
      bmd.addToWorld();

      //  Capture all key presses
      game.input.keyboard.addCallbacks(this, null, null, keyPress);
      
      fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      skill1 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
      skill2 = game.input.keyboard.addKey(Phaser.Keyboard.W);
      skill3 = game.input.keyboard.addKey(Phaser.Keyboard.E);

      game.physics.startSystem(Phaser.Physics.ARCADE);

      
      floor= game.add.tileSprite(0, 0, 1920,1440, 'background');
      game.world.setBounds(0, 0, 1920,1440);
      worldtree=game.add.sprite(1200,game.world.centerY-200,'worldtree');
      game.world.bringToTop(worldtree);
      worldtree.scale.setTo(1.3,1.3);
      player = game.add.sprite(game.world.centerX+550, game.world.centerY+300, 'player');
      leidian = game.add.sprite(game.world.centerX+550, game.world.centerY+250, 'leidian');
      leidian.visible=false;
      secretskill = game.add.sprite(game.world.centerX+550, game.world.centerY+250, 'secretskill');
     secretskill.visible=false;  //gai 
     secretskill.scale.setTo(1.2,1.2);
     secretskillaction=secretskill.animations.add('skill', [0,1,2,3,4,5,6,7], 8, false);
     secretskillaction.onComplete.add(animationStopped, this);
     playerattack=game.add.sprite(game.world.centerX, game.world.centerY, 'playerattack');
     playerattackright=game.add.sprite(game.world.centerX, game.world.centerY, 'playerattackright');
     leidianaction=leidian.animations.add('skill', [0,1,2,3], 5, false);
     leidianaction.onComplete.add(animationStopped, this);

     monstergroup = game.add.group()


     monstergroup.setAll('checkWorldBounds', true);
     player.checkWorldBounds=true;


     monstergroup.enableBody = true;
     monstergroup.physicsBodyType = Phaser.Physics.ARCADE;
    // fireButton.onDown.add(killmonster, this);
     //skill1.onDown.add(playskill1, this);  //jihao
     player.scale.setTo(2,2);


     playerattack.scale.setTo(2,2);

     playerattack.visible=false;

     playerattackright.scale.setTo(2,2);

     playerattackright.visible=false;

     game.physics.enable(player, Phaser.Physics.ARCADE);
     game.physics.enable(worldtree, Phaser.Physics.ARCADE);
     worldtree.body.moves=false;

     cursors = game.input.keyboard.createCursorKeys();
     playerattack.animations.add('attack', [0,1,2,3,4,5], 20, true);
     playerattackright.animations.add('attack', [2,1,0,5,4,3], 20, true);

     player.animations.add('down', [4,5,6,7], 5, true);
    // player.animations.add('skill', ['skill1','skill2','skill3','skill4'], 5, true);
    player.animations.add('left', [12,13,14,15], 5, true);
    player.animations.add('right', [16,17,18,19], 5, true);
    player.animations.add('up', [8,9,10,11], 5, true);

    player.body.collideWorldBounds=true;
    wings=game.add.sprite(player.x,player.y,'wings');
    wings.visible=false;

    playerblood=game.add.sprite(0, 0,'bloodbar');
    playerblood.scale.setTo(2.15,1);
    playerblood.fixedToCamera=true;
    game.world.bringToTop(playerblood);
    zeus=game.add.sprite(250, 500,'zeus');
    blink=game.add.sprite(350, 500,'blink');
    xingluo=game.add.sprite(450, 500,'xingluo');
    zeus.scale.setTo(0.5,0.5);
    blink.scale.set(0.25,0.24);
    xingluo.scale.set(0.5,0.5);
    zeus.fixedToCamera = true;
    blink.fixedToCamera = true;
    xingluo.fixedToCamera = true;

    wordframe = game.add.sprite(80, 380, 'wordframe');
    wordframe.inputEnabled = true;
    wordframe.events.onInputDown.add(talking, this);
    wordframe.scale.setTo(0.9,1.05);  
    wordframe.fixedToCamera = true;
    test = game.add.text(100,380,"Hello, young brave, thanks for your helping. You shoud \ndefence 4 round mosnter attack to save me. If you win a \nround, I can prove you a new skill,Lol, do you think I am \na snob? I have no choice man , So in this round you can \nonly use the normal attack. Just do it!", { font: '25px Arial', fill: '#0ff' });
    skilltext=game.add.text(280,470,"Q            W            E", { font: '25px Arial', fill: '#0ff' });
    skilltext.fixedToCamera=true;
    skilltext.text=" ";
     // test = game.add.text(100,380,, { font: '25px Arial', fill: '#0ff' });
     
     game.world.bringToTop(test);
      // game.world.bringToTop(treetalk);
      test.fixedToCamera = true;
      landingbadgroup = game.add.group();
      landingbadgroup.enableBody = true;
      landingbadgroup.physicsBodyType = Phaser.Physics.ARCADE;
      landinggoodgroup = game.add.group();
      landinggoodgroup.enableBody = true;
      landinggoodgroup.physicsBodyType = Phaser.Physics.ARCADE;
      
       //if(begin==true)
       //{
         createmonster (round);
         wings.alpha=0.8;
         wings.scale.setTo(0.6,0.6);

      // wordframe.events.onInputDown.add(talking, this);
    },

    update: function () {

if(round==2)
{
  skilltext.text="Q"
}
if(round==3)
{
  skilltext.text="Q            W"
}
if(round==4)
{
 skilltext.text= "Q            W            E"
}
      checkskill();
      //  secretskill.play('skill');
      game.camera.follow(player);
      if(begin==false)
      {
        player.body.moves=false;
      }
      if(begin)
      {
        for(var k=0;k<landingbadgroup.length;k++)
        {
          landingbadgroup.children[k].y+=4;
        }
        for(var k=0;k<landinggoodgroup.length;k++)
        {
          landinggoodgroup.children[k].y+=4;
        }
      }
      wings.reset(player.x-80,player.y-70);

          //  leidian.reset(player.x,player.y);
           // leidian.animations.play('skill');

        //  playerblood.reset(game.camera.x,game.camera.y);
        if(checkword()&&checked)
        {

          playerhealth=10000;
            playerblood.scale.setTo((playerhealth/orplayer)*2,1);
         checked=false;
         wordframe.visible=true;
         test.text="Cheat Code Effect: You get full health!\n(You only can use it once)"
         test.visible=true;

        }
        for(var k=0;k<landingbadgroup.length;k++)
        {
         game.physics.arcade.overlap(player, landingbadgroup.children[k], collisionHandler1, null, this);
       }
       for(var k=0;k<landinggoodgroup.length;k++)
       {
         game.physics.arcade.overlap(player, landinggoodgroup.children[k], collisionHandler2, null, this);
       }
             //game.physics.arcade.overlap(player, landingbad, collisionHandler2, null, this);
           // var skill1playing=leidian.animations.play('skill').isplaying
            //if(skill1playing==false)
           // {
           // leidian.visible=false;;
           // }

           for(var i=0;i<monstergroup.children.length;i++)

           {

             monstergroup.children[i].children[1].reset(monstergroup.children[i].children[0].x,monstergroup.children[i].children[0].y-10);
             for(var j=0;j<monstergroup.children.length-1;j++)
             {
              game.physics.arcade.collide(monstergroup.children[i],monstergroup.children[j+1]);
            }
          }
      // test.text=lives;
      game.physics.arcade.collide(player, monstergroup.children);
      game.physics.arcade.collide(worldtree, monstergroup.children);
      game.physics.arcade.collide(player, worldtree);

      game.physics.arcade.collide(monstergroup);

      monsterattack();
      checkhealthformonster();

      player.body.velocity.setTo(0, 0);

      if(game.time.now>time)
      {
        playerattack.visible=false;
        playerattackright.visible=false
        player.visible=true;
        player.body.moves=true;

        timeget=true;
      }
      if(fireButton.isDown&&game.time.now>time)
      {
        killmonster();
      }

      if(game.time.now>landingtimer&&begin==true)
      {

        landingfunction();
      }
      if((game.time.now>skill1cd))
      {
        zeus.alpha=1;
        if(skill1.isDown&&round>1)
        {
          playskill1();
        }


      }

      if(game.time.now>skill3cd)
      {
       blink.alpha=1;
       if(skill2.isDown&&round>2)
       {
         playskill3();
       }

     }

     if((game.time.now>skill2cd&&round>3))
     {
       xingluo.alpha=1;
       if(skill3.isDown)
       {
         playskill2();
       }


     }
     if((game.time.now+1000>skill3cd))
     {
      wings.visible=false;
      extradamage=0;
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
         faced="left";
         
       }
       else if (cursors.right.isDown)
       {
        faced="right";
        player.body.velocity.x = 300;
        player.animations.play('right');
        
      }
     // var doubleck=false;
     if(playerhealth<0)
      {if(begin)
        {
          gameover.play();
        }
        enter.stop();
        var gameoverpicutre;
        gameoverpicutre=game.add.sprite(0,0,'gameoverpicture');
        gameoverpicutre.fixedToCamera=true;
        gameoverpicutre.scale.setTo(1.05,1.05);
        test.text="Game Over \n Click to restart"
        var gameoverword;
        gameoverword=game.add.sprite(0,100,'gameoverword');
        gameoverword.fixedToCamera=true;
          //  test.visible=true;
          begin=false;
          player.kill();
              //the "click to restart" handler
              game.input.onTap.addOnce(end,this);
            }
            if (lives<=0)
            {
             if(round==4)
             {
              enter.stop();
              if(begin)
              {
                death.play();
              }
              wordframe.reset(300,300);
              begin=false;
              wordframe.visible=false;
              var tree;
              tree=game.add.sprite(90,100,'savetree');
              tree.alpha=0.2;
      //  tree.anchor.setTo(0.5,0.5);
      tree.fixedToCamera=true;
      test.viisble=true;
      var winword;
      winword=game.add.sprite(20,150,'winword');
       winword.fixedToCamera=true;
      test.text="You have saved the World Tree!!";
      player.body.moves=false;
      test.reset(100,100); 
      test.visible=false;
      game.world.bringToTop(test);
      game.input.onTap.addOnce(end,this);
    }
    else
    {
      wordframe.reset(300,300);
      wordframe.visible=true;
      if(begin)
      {
        death.play();
      }
      enter.stop();
      test.text="You win! \n Click to enter next round"
      skilltext.visible=false;
           landingbadgroup.removeAll();
      landinggoodgroup.removeAll();
      test.visible=true;
      player.body.moves=false;
      begin=false;
              //the "click to restart" handler
              game.input.onTap.addOnce(nextround,this);
            }
          }

        },

      };
    };
