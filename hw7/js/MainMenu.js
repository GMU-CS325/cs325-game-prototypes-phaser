  "use strict";
  var map;
  var Street;
  var Safearea;
  var landingtimer=0;
  var car1;
  var car2;
    var car1member;
  var car2member;
  var i=0;
  var player;
  var cursors;
  var upbutton;
    var downbutton;
      var leftbutton;
        var rightbutton;
        var postoffice;
        var postoffice2_1;
        var postoffice2_2;
        var postoffice2_3;
        var Block;
        var shouwan;
        var wordframe;
        var test;
        var in1=false;
        var health=100;
        var calculation;
        var in2=false;
        var in3=false;
        var live=true;
        var suanshuti;
        var buttona;
        var buttonb;
        var buttonc;
        var dirtymap;
      //  var letter;
        var lettergroup;
        var feelinggood;
        var breakshoud;
        var destination=false;
        var boss;
        var in11=false;
        var sign=false;
        var letternumber;
        var lnumber=0;
        var powermax;
        var playerblood;
        var lettersound;
        var wingame=false;






  GameStates.maingame = function( game, shared ) {
      function fade() {

    //  You can set your own fade color and duration
    game.camera.fade(0x000000, 3000);

}
function randomletter()
{

  for(var i=0;i<15;i++)
  {
      var number1=game.rnd.integerInRange(0, 800);
  var number2=game.rnd.integerInRange(405,1915);
    var letter= lettergroup.create(number1,number2, 'letter');
    letter.scale.setTo(0.1,0.1);
    letter.name = 'asteroid' + i;
              game.physics.enable(letter, Phaser.Physics.ARCADE);
  }    
}
function right()
{
  calculation.visible=false;
  suanshuti.visible=false;
  player.body.moves=true;
  buttona.visible=false;
 buttonb.visible=false;
 buttonc.visible=false;
 dirtymap.visible=false;
 player.body.moves=true;
 sign=true;


}
function notright()
{
 buttona.visible=false;
 buttonb.visible=false;
 buttonc.visible=false;
 player.kill();
 breakshoud.play();
 live=false;
 feelinggood.stop();
 fade();
}
function resetFade() {
  if(live==false)
  {
     game.state.start("dead");
      feelinggood.stop();
  }
  else if(lnumber<10&&destination)
  {
    game.state.start("dead");
    feelinggood.stop();
  }
  else if(wingame)
{
    game.state.start("win");
    feelinggood.stop();
}
}
 function win() 
 {
  wingame=true;
   fade();

 }
    function talking(pointer)  //被攻击
      {
        wordframe.visible=false;
        test.visible=false;
       player.body.moves=true;
       if(lnumber<10&&destination)
       {
        fade();
       }
      }
    function question1()
      { 
      sign=false;
      in11=true
      calculation.visible=false;
      shouwan.visible=true;  
      test.text='First challenge: Muscle challenge, \nuse your muscle to beat this superman. \n PS:Keep press W button '     // player.reset(250,2000)
      player.body.moves=false;
      game.camera.follow(null);
      test.visible=true;
      wordframe.visible=true;
      in1=true;
      postoffice2_1.kill();
      };
      function question2()
      {sign=false;
          test.visible=true;
      wordframe.visible=true;
      test.text='Second challenge: Math ability test, \n do this math question, a good carrier should know\nhow to calculate basic question';
 buttona.visible=true;
 buttonb.visible=true;
 buttonc.visible=true;
    calculation.visible=true;
    suanshuti.visible=true;
      shouwan.visible=false; 
     in2=true;
     player.body.moves=false;
      game.camera.follow(null);
     
      postoffice2_2.kill();
      };
      function getletter(player, letter)
      {

lettersound.play();
    // Removes the star from the screen
    letter.kill();
    lnumber++;
  
        
      }
      function question3()
      { sign=false;  
        test.visible=true;
      wordframe.visible=true;
      test.text='Third challenge: Direction test, as a good carrier,\n you should have a great sense of direction,\n you where is Fairfax?'
        in3=true;
        postoffice2_3.kill();
    calculation.visible=false;
    suanshuti.visible=false;
      shouwan.visible=false;
     dirtymap.visible=true; 
   buttona.visible=true;
   buttonb.visible=true;
   buttonc.visible=true;
   player.body.moves=false;
    buttona.reset(game.camera.x+100 , game.camera.y+400);
    buttonb.reset(game.camera.x+250 , game.camera.y+400);
    buttonc.reset(game.camera.x+400 , game.camera.y+400);
    buttona.scale.setTo(0.8,0.8);
    buttonb.scale.setTo(0.8,0.8);
    buttonc.scale.setTo(0.8,0.8);
      };

      function movingup()
      {    
       health=health+1.5;
      }
        function movingdown()
      {   
          player.body.velocity.y = 1200;
          player.animations.play('down');

      }
        function movingleft()
      {   
      player.body.velocity.x = -  1200;
         player.animations.play('left');

      }
        function movingright()
      {   
        player.body.velocity.x = 1200;
        player.animations.play('right');

      }
   function landingfunction()
    {
      var randomnumber=game.rnd.integerInRange(100, 200)
      landingtimer=game.time.now+100;
       var number1=320;
       var number2=number1+4*32;
             var number3=number2+4*32;
                   var number4=number3+4*32;
                         var number5=number4+4*32;
                               var number6=number5+4*32;
                                     var number7=number6+4*32;
                                           var number8=number7+4*32;
                                            var number9=number8+4*32;
                                             var number10=number9+4*32;
                                              var number11=number10+4*32;
                                               var number12=number11+4*32;
                                                var number13=number12+4*32;
      var numberarray=[number1,number2,number3,number4,number5,number6,number7,number8,number9,number10,number11,number12,number13];

                   var randomcar=game.rnd.integerInRange(1, 12)                           
      if(randomnumber>100&&randomnumber<125)
      {
        car1member= car1.create(0,numberarray[randomcar], 'car1');
        car1member.scale.setTo(0.8,0.8);
        car1member.name = 'asteroid' + i;
      }
      else  if(randomnumber>125&&randomnumber<150)
      {
    car1member= car1.create(0,numberarray[randomcar], 'car2');
        car1member.scale.setTo(0.8,0.8);
        car1member.name = 'asteroid' + i;
     }
     else  if(randomnumber>150&&randomnumber<175)
      {
      car1member= car1.create(0,numberarray[randomcar], 'car3');
          car1member.scale.setTo(0.8,0.8);
        car1member.name = 'asteroid' + i;
     }
     else  if(randomnumber>175&&randomnumber<=200)
      {
     car1member= car1.create(0,numberarray[randomcar], 'car4');
        car1member.scale.setTo(0.8,0.8);
        car1member.name = 'asteroid' + i;
     }
      //  landing.fixedToCamera=true;

      i++;
    }
  return {

    preload: function()
    {
   game.load.image('wordframe','assets/wordframe.png');
   game.load.tilemap('tiletest', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('street1','assets/street2.png');
   game.load.image('street2','assets/street1.png');
   game.load.image('car1','assets/car1.png');
   game.load.image('car2','assets/car2.png');
  game.load.image('car3','assets/car3.png');
            game.load.image('car4','assets/car4.png');
               game.load.image('postoffice','assets/postoffice.png');
              game.load.image('postoffice2','assets/postoffice2.jpg');
              game.load.image('postoffice3','assets/postoffice2.jpg');
              game.load.image('postoffice4','assets/postoffice2.jpg');
              game.load.spritesheet('player','assets/man1.png',32,48,16,0,0);
 //mangroup.children[i].name='choosed';
 game.load.image('shouwan','assets/shouwan.jpg');
  game.load.image('suanshuti','assets/suanshuti.png');
 game.load.image('calculation','assets/calculation.jpg');
  game.load.image('buttona','assets/buttona.jpg');
    game.load.image('buttonb','assets/buttonb.jpg');
      game.load.image('buttonc','assets/buttonc.jpg');
         game.load.image('dirtymap','assets/dirtymap.png');
                 game.load.image('letter','assets/letter.png');


    },

    create: function () {
       in1=false;
         health=100;
        //var calculation;
        in2=false;
         in3=false;
         live=true;
       // var suanshuti;
       // var buttona;
       // var buttonb;
       // var buttonc;
       // var dirtymap;
      //  var letter;
       // var lettergroup;
       // var feelinggood;
       // var breakshoud;
       destination=false;
        // boss;
         in11=false;
         sign=false;
        // letternumber;
         lnumber=0;
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.setBounds(0, 0, 2400,2240);
      map = game.add.tilemap('tiletest',16,16);
      map.addTilesetImage('street1');
      map.addTilesetImage('street2');
      Street=map.createLayer('Street');
      Safearea=map.createLayer('Glass');
      Block=map.createLayer('block');
      game.physics.enable(Block, Phaser.Physics.ARCADE); 
      map.setCollisionBetween(1, 10000, true, Block);
      lettersound=game.add.audio('lettersound');
      car1 = game.add.group();
      car1.enableBody = true;
      car1.physicsBodyType = Phaser.Physics.ARCADE;
      lettergroup = game.add.group();
      lettergroup.enableBody = true;
      lettergroup.physicsBodyType = Phaser.Physics.ARCADE;
      postoffice2_1=game.add.sprite(0,0,'postoffice2');
      postoffice2_2=game.add.sprite(300,0,'postoffice3');
      postoffice2_3=game.add.sprite(600,0,'postoffice4');
       game.physics.enable(postoffice2_1, Phaser.Physics.ARCADE);
                game.physics.enable(postoffice2_2, Phaser.Physics.ARCADE);
                   game.physics.enable(postoffice2_3, Phaser.Physics.ARCADE);
randomletter();
playerblood=game.add.sprite(100,0,'bloodbar');
playerblood.visible=false;
feelinggood=game.add.audio('feelinggood');
feelinggood.play();
breakshoud=game.add.audio('break');
      player=game.add.sprite(370,1965,'player');
      powermax=game.add.sprite(0,400,'powermax');
      powermax.visible=false;
      shouwan=game.add.sprite(390,310,'shouwan');
      shouwan.scale.setTo(1.1,1.1);
      shouwan.anchor.setTo(0.5, 0.5);
      shouwan.visible=false;
      calculation=game.add.sprite(0,0,'calculation');
      calculation.scale.setTo(1.1,1.1);
      suanshuti=game.add.sprite(200,100,'suanshuti');
      dirtymap=game.add.sprite(250,0,'dirtymap');
      dirtymap.scale.setTo(1.5,1.71);
      buttona = game.add.button( game.camera.x+150 , game.camera.y+300, 'buttona', right, this);
      buttonb = game.add.button( game.camera.x+300 , game.camera.y+300, 'buttonb', notright, this);
      buttonc = game.add.button(game.camera.x+450 , game.camera.y+300, 'buttonc', notright, this);
       buttona.visible=false;
 buttonb.visible=false;
 buttonc.visible=false;
 dirtymap.visible=false;
            calculation.visible=false;
            suanshuti.visible=false;
      postoffice=game.add.sprite(250,2000,'postoffice');
       game.physics.enable(player, Phaser.Physics.ARCADE);     
      player.scale.setTo(0.8,0.8);
        player.anchor.setTo(0.5, 0.5);
             player.checkWorldBounds=true;
          cursors = game.input.keyboard.createCursorKeys();
     //game.physics.enable(man1, Phaser.Physics.ARCADE);
      player.animations.add('down', [0,1,2,3], 5, true);
    // player.animations.add('skill', ['skill1','skill2','skill3','skill4'], 5, true);
    player.animations.add('left', [4,5,6,7], 5, true);
    player.animations.add('right', [8,9,10,11], 5, true);
    player.animations.add('up', [12,13,14,15], 5, true);
         player.body.collideWorldBounds=true;
upbutton = game.input.keyboard.addKey(Phaser.Keyboard.W);
upbutton.onDown.add(movingup, this);

    wordframe = game.add.sprite(80, 380, 'wordframe');
    wordframe.inputEnabled = true;
    wordframe.events.onInputDown.add(talking, this);
    wordframe.scale.setTo(0.9,1.05);  
    wordframe.fixedToCamera = true;
    letternumber=game.add.text(0,0,"Letter Number:"+ lnumber );
    letternumber.fixedToCamera=true;
    test = game.add.text(100,380,"Hey, new carrier, take care, there will have another \nchanllenge in the destination\n You should get 10 letter before you arrrive the destaintion, \n otherwise, you get fired", { font: '25px Arial', fill: '#0ff' });
  game.world.bringToTop(test);
      // game.world.bringToTop(treetalk);
      test.fixedToCamera = true;
      //layer=map.createLayer('background');
 
     car1.setAll('outOfBoundsKill', true);
      // wordframe.events.onInputDown.add(talking, this);
    } ,
  

    update: function () {
      letternumber.text="Letter Number:"+ lnumber;
      if(in1&&in2&&in3&&player.body.moves&&sign)
      {
        boss=game.add.sprite(250,100,'boss');
              game.physics.enable(boss, Phaser.Physics.ARCADE);
      }
      if(player.y==390&&destination==false&&lnumber>=10)
      {
        destination=true;
        player.body.moves=false;
        test.visible=true;
        wordframe.visible=true;
        test.text='You arrive here! Then, You boss prepare three chanllenge \nfor you, if you pass it, you will become a formal carrier, \nenter these building!'
      }
    
      else if(player.y==390&&destination==false&&lnumber<10)
      {
        destination=true;
        player.body.moves=false;
        test.visible=true;
        wordframe.visible=true;
        test.text="You do not have enough letter! You are fired!";
      }
      
      game.camera.onFadeComplete.add(resetFade, this);
      if(in11)
      {
          game.world.bringToTop(powermax);
           game.world.bringToTop(playerblood);
    playerblood.visible=true;
    powermax.visible=true;
     health=health-0.05;
    playerblood.scale.setTo(2.15,(health/100)*1);
     if(health>=188)
     { in11=false;
        wordframe.visible=true;
        test.visible=true;
        player.body.moves=true;
        test.text="You win , You pass the muscle Training"
        shouwan.visible=false;
        sign=true;
            playerblood.visible=false;
    powermax.visible=false;

        
     }
      }
      
      game.physics.arcade.collide(player, Block);
      game.physics.arcade.overlap(car1,player,notright,null,this);
      game.physics.arcade.overlap(postoffice2_1,player,question1,null,this);
      game.physics.arcade.overlap(boss,player,win,null,this);
      game.physics.arcade.overlap(postoffice2_2,player,question2,null,this)
     game.physics.arcade.overlap(postoffice2_3,player,question3,null,this)
         game.physics.arcade.overlap(lettergroup,player,getletter,null,this);
      game.camera.follow(player);
      player.body.velocity.setTo(0, 0);
      if(game.time.now>landingtimer)
      {

        landingfunction();
      }
        for(var k=0;k<car1.length;k++)
        {
        var randomnumber=game.rnd.integerInRange(1,5)
          car1.children[k].x+=(4+randomnumber);
        }
    

             if (cursors.up.isDown)
    {

         player.body.velocity.y = -300;
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
        
     
   
         
       }
       else if (cursors.right.isDown)
       {
   
        player.body.velocity.x = 300;
        player.animations.play('right');
      
    
        
      }
     
    
 }
}
    };
