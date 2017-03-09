
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    this.player;
    this.cursors;
    this.npc1;
    this.npc2;  
    this.npc3;
    this.npc4;
    this.walk;
    this.buttona;
    this.buttonb;
    this.buttonc;
    this.buttond;
    this.buttonnext;
    this.statetext;
    this.texttime=0;
    this.blockgroup;
    this.water1;
    this.water2;
    this.brige;
    this.sadmusic;
    this.battlemusic;
    this.lost;
    this.unblock;
    this.q1=false;
    this.q2=false;
    this.q3=false;
    this.q4=false;
    this.queen;
    this.bridgetext;
    this.map;
    this.layer;
    this.ground;
    this.jump;
    this.jumpTimer=0;
    this.door;
    this.doorlocation=295;
    this.doorindex=1;
    this.inroom=false;
    this.nextworld=false;
    this.nextworldcamera=false;
    this.faced='right';
    this.boxgroup;
    this.landingbad;
    this.i=0;
    this.landingbadgroup;
    this.test;
    this.landingtimer=0; 
    this.longisplaying=false;
    this.inquestion=false;
    this.longstop=false;
    this.bombsound;
    this.wordframe;
    this.wordwithframe;
    this.jumpsound;
    this.opendoor;
    this.inroommusic;
    this.longcoming;
  
    




    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    // Create your own variables.

  };

  BasicGame.Game.prototype = {

    create: function () {
         

   // game.load.tilemap('mario', 'assets/haha.json', null, Phaser.Tilemap.TILED_JSON);
        this.map = this.add.tilemap('tiletest',16,16);
        //,'bg_intro01-sheet0'
          this.map.addTilesetImage('bg_world01-sheet0');
        this.map.addTilesetImage('bg_intro01-sheet0');
        this.map.addTilesetImage('bg_world02-sheet0');
          this.map.addTilesetImage('bg_menu01-sheet1');
           this.map.addTilesetImage('door');
             this.map.addTilesetImage('bosslocation');


        this.layer=this.map.createLayer('Tile Layer 1');
        this.ground=this.map.createLayer('ground');
         this.door=this.map.createLayer('door');
       this.player = this.add.sprite(0, 1040.5, 'this.player');
             //this.player = this.add.sprite(2500, 1040.5, 'this.player');
        this.queen = this.add.sprite(3140, 976.5, 'queen');
       this.physics.enable(this.player, Phaser.Physics.ARCADE);
       this.map.setCollisionBetween(1, 10000, true, this.ground);
        this.bombsound=this.add.audio('zhadan');
        this.opendoor=this.add.audio('opendoor');
     // this.test=this.add.sprite(0,0,'bomb');
    //  this.test.scale.setTo(0.1,0.1);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Create a sprite at the center of the screen using the 'logo' image.
        this.q1=false;
        this.q2=false;
        this.q3=false;
        this.q4=false;
       
     this.inroommusic=this.add.audio('inroommusic');
          this.longcoming=this.add.audio('longcoming');

    
        this.walk=this.add.audio('walk');
        this.lost=this.add.audio('lost');
        this.jumpsound=this.add.audio('jumpsound');
    
       //this.landingbad= this.landingbadgroup.create(100,1040, 'bomb');
       // this.ground.moves=false;

       
        this.bridgetext = this.add.text(2010,800,'You must answer 4 questions to pass here', { font: '84px Arial', fill: '#fff' });
        this.bridgetext.anchor.setTo(0.5, 0.5);
        this.bridgetext.scale.setTo(0.25, 0.25);
        this.bridgetext.visible = true;
        
      this.boxgroup=this.add.group();

  





        this.world.setBounds(0, 0, 3200, 1200);

        this.physics.startSystem(Phaser.Physics.P2JS);

   
        
        this.queen.animations.add('down', [0,1,2,3], 5, true);
        this.queen.animations.add('left', [4,5,6,7], 5, true);
        this.queen.animations.add('right', [8,9,10,11], 5, true);
        this.queen.animations.add('up', [12,13,14,15], 5, true);
        this.queen.animations.play('down');
        this.player.scale.setTo(1,1);
        this.queen.scale.setTo(1,1);
    // 0, 0, 
    this.npc1 = this.add.sprite(388.33, 31.67,'laoren');
    this.npc2 = this.add.sprite(0, 1800, 'laoren');
    this.npc3 = this.add.sprite(1800, 0, 'laoren');
    this.npc4 = this.add.sprite(1800, 1800, 'laoren');
    this.npc1.scale.setTo(2,2);
    this.npc2.scale.setTo(2,2);
    this.npc3.scale.setTo(2,2);
    this.npc4.scale.setTo(2,2);
    this.long=this.add.sprite(2900, 300,'long');
    this.long.scale.setTo(1.1,1.1);
        this.landingbadgroup = this.add.group();
      this.physics.enable(this.landingbadgroup, Phaser.Physics.ARCADE);

    //  this.physics.enable(this.landingbadgroup, Phaser.Physics.ARCADE);

    this.physics.enable(this.npc1, Phaser.Physics.ARCADE); 
    this.physics.enable(this.npc2, Phaser.Physics.ARCADE);
    this.physics.enable(this.npc3, Phaser.Physics.ARCADE);
    this.physics.enable(this.npc4, Phaser.Physics.ARCADE); 
       //this.physics.enable(this.test, Phaser.Physics.ARCADE);
    this.physics.enable(this.long, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds=true;

    

    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera.follow(this.player);
      this.wordframe = this.add.sprite(30, 380, 'wordframe');
    this.wordframe.inputEnabled = true;
   this.wordframe.events.onInputDown.add(this.talkingword,this);
    this.wordframe.fixedToCamera = true;
    statetext = this.add.text(100,380,'hello young', { font: '84px Arial', fill: '#fff' });
    statetext.anchor.setTo(0.5, 0.5);
    statetext.scale.setTo(0.5, 0.5);
    statetext.visible = false;
    this.wordwithframe = this.add.text(50,380,"To save your girlfriend, you must beat my four maids,\n enter the secret drak door and feel the deepest fear!!!\n(use cursor to move around and whitespace is to jump) \n(in secret drak door, try to avoid the bomb and reach the maids)", { font: '25px Arial', fill: '#0ff' });
   
     this.world.bringToTop(this.wordwithframe);
      // game.world.bringToTop(treetalk);
      this.wordwithframe.fixedToCamera = true;
    this.player.animations.add('down', [0,1,2], 5, true);
    this.npc1.animations.add('one', [0], 5, true);
    this.npc1.animations.add('two', [0], 5, true);
    this.npc1.animations.add('three', [0], 5, true);
    this.npc1.animations.add('four', [0], 5, true);
    this.player.animations.add('left', [3,4,5], 5, true);
    this.player.animations.add('right', [6,7,8], 5, true);
    this.player.animations.add('up', [9,10,11], 5, true);
    this.long.body.immovable=true;
    this.npc1.animations.play('one');
    this.npc2.animations.play('two');
    this.npc3.animations.play('three');
    this.npc4.animations.play('four');
    this.sadmusic=this.add.audio('sadmusic');
    this.battlemusic=this.add.audio('battlemusic');
    this.sadmusic.play();
    this.player.body.gravity.set(0, 100);
    this.jump = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//this.createbox();
    
    

        // When you click on the sprite, you go back to the MainMenu.
        //this.bouncy.inputEnabled = true;
        //this.bouncy.events.onInputDown.add( function() { this.state.start('MainMenu'); }, this );
      },

      update: function () {
        if(this.player.y>1160)
        {
             this.wordwithframe.viisble=true;
          this.wordwithframe.text='Game Over!';
          this.wordframe.visible=true;
       
        }
        if(this.player.x>2860)
        {
           this.sadmusic.stop();
          this.player.body.moves=false;
          if(this.longisplaying==false)
          {
          this.longcoming.play();
         
        }
          this.longisplaying=true;
          if(this.longstop==false)
          {
          this.long.y+=0.3;
        }
        }
        if(this.long.y>800)
        {
          this.longstop=true;
          this.wordwithframe.visible=true;
          this.wordframe.visible=true;
          this.wordwithframe.text='Most people… blunder round this city, \nand all they see are streets and shops and cars. \nHowevery, only you can finally come here, \nbut you will die! '
        }
        for(var k=0;k<this.landingbadgroup.length;k++)
        {
          this.landingbadgroup.children[k].x+=4;
           //this.physics.arcade.overlap(this.npc1, this.landingbadgroup.children[k], this.collisionHandler1, null, this);
          // this.physics.arcade.overlap(this.player, this.test, this.collisionHandler1, null, this);
        }

      if(this.time.now>this.landingtimer&&this.inquestion==false&&this.inroom)
      {  this.landingfunction();
      }

        if(this.inroom)
        {
 this.player.body.gravity.set(0, 0);
 this.player.body.velocity.setTo(0, 0);
   this.camera.follow(null); 
   // null
        }
        else
        {
           this.player.body.gravity.set(0, 100);
           this.player.body.velocity.x = 0;

        }
        if(this.player.x>1200&&this.nextworld==false&&this.nextworldcamera==false)
        {
          this.camera.follow(null);
        }

        this.physics.arcade.collide(this.player, this.ground);
       
        
        if(this.player.x>=this.doorlocation&&this.player.x<=(this.doorlocation+20)&&this.player.y<=1040.5&&this.player.y>1000)
        {if(this.inroom==false)
          {
               this.sadmusic.stop();
           this.inroommusic.play();
          }
          this.player.body.moves=false;
          this.inroom=true;
          this.opendoor.play();
       
         // this.doorlocation+=200;
        //  this.question1();
        this.fade();
        }
        this.camera.onFadeComplete.add(this.resetFade, this);
       //  this.player.body.velocity.setTo(0,600);
           if(this.player.x<1540&&this.player.x>1530&&this.player.y==1040.5&&this.nextworld==false)
           {
             this.fade();
             this.nextworld=true;
           
           }
                
if(this.jump.isDown&&this.inroom==false&&this.jumpTimer<this.time.now&&this.player.y<1060)
      
    {

        this.jumpTimer = this.time.now + 2000;
        this.player.body.velocity.y = -100;
        this.jumpsound.play();
       //  this.player.animations.play('up');
    }
    else if(this.cursors.up.isDown&&this.inroom)
    {
        this.player.body.velocity.y = -100;
        this.player.animations.play('up');
        
    }
       else if (this.cursors.down.isDown)
       {
        this.player.body.velocity.y = 100;
        this.player.animations.play('down');
        
        
      }

      else if (this.cursors.left.isDown)
      {
       this.player.body.velocity.x = -100;
       this.player.animations.play('left');
       this.faced='left';

       
     }
     else if (this.cursors.right.isDown)
     {
      this.player.body.velocity.x = 100;
      this.player.animations.play('right');
      this.faced='right';
      
    }
    // this.physics.arcade.overlap(this.player, this.door, this.question1, null, this);
    this.physics.arcade.overlap(this.player, this.npc1, this.question1, null, this);
    this.physics.arcade.overlap(this.player, this.npc2, this.question2, null, this);
    this.physics.arcade.overlap(this.player, this.npc3, this.question3, null, this);
    this.physics.arcade.overlap(this.player, this.npc4, this.question4, null, this);

    for(var k=0;k<this.landingbadgroup.length;k++)
        {
             //this.physics.arcade.collide(this.player, this.landingbadgroup.children[k] );
       this.physics.arcade.overlap(this.player, this.landingbadgroup.children[k], this.collisionHandler1, null, this);
       }

    //this.physics.arcade.overlap(this.player, this.long, this.nextgame, null, this);
   // this.physics.arcade.collide(this.player, this.blockgroup);
 //  this.physics.arcade.collide(this.player, );
    
    if(this.q1==true||this.q2==true||this.q3==true||this.q4==true)
    {
     // this.unblock.kill();
      this.bridgetext.text="Go!!!!!!";
    }
     // this.camera.reset(387,510.83);
  },
    fade: function () {

    //  You can set your own fade color and duration
    this.camera.fade(0x000000, 3000);

},
 landingfunction: function()
    {
      var randomnumber=this.rnd.integerInRange(10, 400)
      this.landingtimer=this.time.now+300;
      this.landingbad= this.landingbadgroup.create(0,randomnumber, 'bomb');
        this.landingbad.scale.setTo(0.03,0.03);
      this.physics.enable(this.landingbad, Phaser.Physics.ARCADE);

      this.landingbad.name = 'asteroid' + this.i;
  
    },
  createbox: function()
  {
   
  },
talkingword:  function (pointer)  //被攻击
      {
       this.wordframe.visible=false;
       this.wordwithframe.visible=false;
     //  this.wordwithframe.aplha=0;
       if(this.doorindex>1)
       {
        this.fade();
        this.sadmusic.play();
       }
       if(this.longstop)
       {
             this.sadmusic.stop();
             this.longcoming.stop();
               this.lost.stop();
            this.jumpTimer=0;
    this.doorlocation=295;
    this.doorindex=1;
    this.inroom=false;
    this.nextworld=false;
    this.nextworldcamera=false;
    this.i=0;
    this.landingtimer=0; 
    this.inquestion=false;
    this.longstop=false;  
          this.state.start('shoot');

       }
       if(this.wordwithframe.text=='You answer is wrong, please come back')
       {
        this.restart();
       }
       if(this.wordwithframe.text=='Game Over!')
       {
        this.sadmusic.stop();
        this.restart();
       }
      //  this.player.body.moves=true;
      },
 resetFade:function() {
 


    this.camera.resetFX();
   
    // this.camera.follow(this.player);
  
    if(this.nextworld)
    {
       this.camera.follow(this.player);
       this.player.reset(2023.33,1040.5);
       this.nextworld=false;
       this.nextworldcamera=true;
     //   this.camera.follow(this.player);
    }
    else
    {
    this.camera.reset(387,510.83);
    if(this.inroom)
    {
      this.player.scale.setTo(1,1);
    this.player.reset(380.33,512.5);
  }
  else if(this.doorindex==2&&this.inroom==false)
  {
    this.player.reset(this.doorlocation+5,1040.5);
    this.camera.follow(this.player);
    this.doorlocation=880;
      this.player.scale.setTo(1,1);
        statetext.visible = false;
  }
    else if(this.doorindex==3&&this.inroom==false)
  {
    this.player.reset(this.doorlocation+5,1040.5);
    this.camera.follow(this.player);
    this.doorlocation=2224;
    this.player.scale.setTo(1,1);
     statetext.visible = false;
  }
  else if(this.doorindex==4&&this.inroom==false)
  {
    this.player.reset(this.doorlocation+5,1040.5);
    this.camera.follow(this.player);
    this.doorlocation=2512;
    this.player.scale.setTo(1,1);
      statetext.visible = false;
  }
   else if(this.doorindex==5&&this.inroom==false)
  {
    this.player.reset(this.doorlocation+5,1040.5);
    this.camera.follow(this.player);
    this.doorlocation=3600;
    this.player.scale.setTo(1,1);
      statetext.visible = false;
  }
}
        this.player.body.moves=true;



},

 
 collisionHandler1: function (){

          //  When a bullet hits an alien we kill them both
          this.bombsound.play();
         // this.landingbad.kill();
          this.player.reset(380.33,512.5);

        },


  question1: function () {
    this.inroommusic.stop();
    this.landingbadgroup.removeAll();
     this.wordwithframe.visible=true;
     this.wordwithframe.text='';
    this.inquestion=true;
    this.sadmusic.stop();
    this.battlemusic.play();
    //npc1.kill();
       //statetext.reset(this.camera.x+400,this.camera.y+200);
       statetext.reset(this.camera.x+400,this.camera.y+200);
       statetext.text="      where was C language developed?  \n\n\n             A:Bell Lab  B:GMU  \n   C:Computer Center  D:Who knows";
       statetext.visible = true;

       this.buttona = this.add.button( this.camera.x+100 , this.camera.y+400, 'buttona', this.right, this);
       this.buttonb = this.add.button( this.camera.x+250 , this.camera.y+400, 'buttonb', this.quitGame, this);
       this.buttonc = this.add.button(this.camera.x+400 , this.camera.y+400, 'buttonc', this.quitGame, this);
       this.buttond = this.add.button( this.camera.x+550 , this.camera.y+400, 'buttond', this.quitGame, this);
       this.player.body.moves=false;
       this.q1=true;
     },
     question2: function (player,npc2) {
          this.inroommusic.stop();
          this.landingbadgroup.removeAll();
          this.wordwithframe.visible=true;
     this.wordwithframe.text='';
  this.inquestion=true;
       this.sadmusic.stop();
       this.battlemusic.play();
       npc2.kill();
       statetext.reset(this.camera.x+400,this.camera.y+200);
       statetext.text=" What's the result of j \n   for(int i=0,j=0;i<5;i++)\n             {j=j+1}\n  A:4  B:5  C:0  D:6";
       statetext.visible = true;

       this.buttona = this.add.button( this.camera.x+100 , this.camera.y+400, 'buttona', this.quitGame, this, 'over', 'out', 'down');
       this.buttonb = this.add.button( this.camera.x+250 , this.camera.y+400, 'buttonb', this.right, this, 'over', 'out', 'down');
       this.buttonc = this.add.button(this.camera.x+400 , this.camera.y+400, 'buttonc', this.quitGame, this, 'over', 'out', 'down');
       this.buttond = this.add.button( this.camera.x+550 , this.camera.y+400, 'buttond', this.quitGame, this, 'over', 'out', 'down');
       this.player.body.moves=false;
       this.q2=true;
     },
     question3: function (player,npc3) {
          this.inroommusic.stop();
          this.landingbadgroup.removeAll();
          this.wordwithframe.visible=true;
     this.wordwithframe.text='';
  this.inquestion=true;
       this.sadmusic.stop();
       this.battlemusic.play();
       npc3.kill();
       statetext.reset(this.camera.x+400,this.camera.y+200);
       statetext.text="     The brain of any computer system is  \n\n\n  A:ALU  B:Memory  C:CPU  D:Control unit";
       statetext.visible = true;

       this.buttona = this.add.button( this.camera.x+100 , this.camera.y+400, 'buttona', this.quitGame, this, 'over', 'out', 'down');
       this.buttonb = this.add.button( this.camera.x+250 , this.camera.y+400, 'buttonb', this.quitGame, this, 'over', 'out', 'down');
       this.buttonc = this.add.button(this.camera.x+400 , this.camera.y+400, 'buttonc', this.right, this, 'over', 'out', 'down');
       this.buttond = this.add.button( this.camera.x+550 , this.camera.y+400, 'buttond', this.quitGame, this, 'over', 'out', 'down');
       this.player.body.moves=false;
       this.q3=true;
     },
     question4: function (player,npc4) {
          this.inroommusic.stop();
          this.landingbadgroup.removeAll();
          this.wordwithframe.visible=true;
     this.wordwithframe.text='';
  this.inquestion=true;
       this.sadmusic.stop();
       this.battlemusic.play();
       npc4.kill();
       statetext.reset(this.camera.x+400,this.camera.y+200);
       statetext.text="       What's the 2's complement of 010110  \n\n\n  A:101010  B:101001  C:100001  D:111000";
       statetext.visible = true;

       this.buttona = this.add.button( this.camera.x+100 , this.camera.y+400, 'buttona', this.right, this, 'over', 'out', 'down');
       this.buttonb = this.add.button( this.camera.x+250 , this.camera.y+400, 'buttonb', this.quitGame, this, 'over', 'out', 'down');
       this.buttonc = this.add.button(this.camera.x+400 , this.camera.y+400, 'buttonc', this.quitGame, this, 'over', 'out', 'down');
       this.buttond = this.add.button( this.camera.x+550 , this.camera.y+400, 'buttond', this.quitGame, this, 'over', 'out', 'down');
       this.player.body.moves=false;
       this.q4=true;
     },
     
     
     quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
       // this.state.start('MainMenu');
      /* statetext.reset(this.camera.x+400,this.camera.y+200);
       statetext.text=" GAME OVER \n Click to restart";
       statetext.visible = true;
       this.battlemusic.stop();
       this.sadmusic.stop();
       this.lost.play();

            //the "click to restart" handler
            this.input.onTap.addOnce(this.restart,this);
            */
             this.buttona.kill();
            this.buttonb.kill();
            this.buttonc.kill();
            this.buttond.kill();
            this.sadmusic.play();
            this.battlemusic.stop();
            statetext.text=" Congratulations！";
            statetext.visible = false;
            this.player.body.moves=true;
             this.wordframe.visible=true;
             this.wordwithframe.visble=true;
              this.world.bringToTop(this.wordwithframe);
              this.wordwithframe.text=('You answer is wrong, please come back')



          },
          talking: function(pointer)
          {
              this.fade();
          },
          right: function () {
            this.inquestion=false;
             this.wordframe.visible=true;
             this.wordwithframe.visble=true;
              this.world.bringToTop(this.wordwithframe);
                this.wordwithframe.aplha=1;
            if(this.doorindex==1)
            {
              this.npc1.kill();
              this.npc2.reset(388.33, 31.67);
                this.wordwithframe.visble=true;
              this.wordwithframe.text=('You have passed the first question')


            }
            else if(this.doorindex==2)
            {
              this.npc2.kill();
              this.npc3.reset(388.33, 31.67);
                this.wordwithframe.visble=true;
               this.wordwithframe.text=('You have passed the second question');

            }
           else  if(this.doorindex==3)
            {
              this.npc3.kill();
              this.npc4.reset(388.33, 31.67);
                this.wordwithframe.visble=true;
              this.wordwithframe.text=('You have passed the third question');

            }
            else if (this.doorindex==4)
            {
                this.wordwithframe.visble=true;
              this.wordwithframe.text=('You have passed the fourth question, but you never can beat the dragon!');
            }

        
              this.doorindex++;
             
             this.inroom=false;
           
            this.buttona.kill();
            this.buttonb.kill();
            this.buttonc.kill();
            this.buttond.kill();
            this.sadmusic.play();
            this.battlemusic.stop();
            statetext.text=" Congratulations！";
            statetext.visible = false;
            this.player.body.moves=true;

          },
          restart: function()
          {
            this.lost.stop();
            this.jumpTimer=0;
    this.doorlocation=295;
    this.doorindex=1;
    this.inroom=false;
    this.nextworld=false;
    this.nextworldcamera=false;
    this.i=0;
    this.landingtimer=0; 
    this.inquestion=false;
    this.longstop=false;
            this.state.start('MainMenu');

          },
          nextgame: function () {
           statetext.reset(this.camera.x+400,this.camera.y+200);
           statetext.text=" Finally, you come here  \n but you must beat me!  ";
           statetext.visible = true;
           this.player.body.moves=false;
           this.buttonnext = this.add.button( this.camera.x+350 , this.camera.y+400, 'playButton', this.nextstate, this, 'over', 'out', 'down');
           this.buttonnext.scale.setTo(0.3,0.3);
         },
         nextstate: function(pointer)
         {
          this.sadmusic.stop();

          this.state.start('shoot');
        },


        
      };
      
  


