
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
      this.block1;
      this.block2;
      this.block3;
      this.block4;
      this.block5;
      this.block6;
      this.block7;
      this.block8;
      this.block9;
      this.block10;
      this.block11;
      this.block12;
      this.block13;
      this.block14;
      this.block15;
      this.block16;
      this.block17;
      this.block18;
      this.block19;
      this.block20;
      this.block21;
      this.block22;
      this.block23;
      this.block24;
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
      this.queen


     




      //  You can use any of these from any function within this State.
      //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
      
      // Create your own variables.

  };

  BasicGame.Game.prototype = {

      create: function () {

          //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
          
          // Create a sprite at the center of the screen using the 'logo' image.
      this.q1=false;
      this.q2=false;
      this.q3=false;
      this.q4=false;
      this.walk=this.add.audio('walk');
      this.lost=this.add.audio('lost');
      this.add.tileSprite(0, 0, 3000, 1920, 'background');
      this.blockgroup = this.add.group()
      this.block1=this.add.tileSprite(0,200,300,80,'block');
      this.block2=this.add.tileSprite(300,200,80,300,'block');
      this.block3=this.add.tileSprite(300,500,150,80,'block');
      this.block4=this.add.tileSprite(450,500,80,900,'block');
      this.block5=this.add.tileSprite(0,950,200,80,'block');
      this.block6=this.add.tileSprite(200,950,80,-200,'block');
       this.block7=this.add.tileSprite(100,1320,350,80,'block');
       this.block8=this.add.tileSprite(320,1600,700,80,'block');
       this.block9=this.add.tileSprite(800,1450,1120,80,'block');
       this.block10=this.add.tileSprite(1200,1600,80,320,'block');
       this.block11=this.add.tileSprite(1280,1700,550,80,'block');
       this.block12=this.add.tileSprite(450,0,80,100,'block');
       this.block13=this.add.tileSprite(450,100,600,80,'block');
      this.block14=this.add.tileSprite(1500,0,80,400,'block');
      this.block15=this.add.tileSprite(1500,400,300,80,'block');
      this.block16=this.add.tileSprite(640,800,1000,80,'block');
      this.block17=this.add.tileSprite(800,960,80,500,'block');
      this.block18=this.add.tileSprite(640,100,80,750,'block');
       this.block19=this.add.tileSprite(960,1600,300,80,'block');
       this.block20=this.add.tileSprite(1280,100,80,700 ,'block');
         this.block21=this.add.tileSprite(1640,800,80,550 ,'block');
          this.block22=this.add.tileSprite(800,960,700,80,'block');
          this.block23=this.add.tileSprite(800,1280,700,80,'block');
          this.block24=this.add.tileSprite(1280,640,400,80,'block');
            this.water1=this.add.tileSprite(1900,0,240,880,'water');
              this.water2=this.add.tileSprite(1900,960,240,960,'water');
             
            this.blockgroup.add(this.block1);
              this.blockgroup.add(this.block2);
                this.blockgroup.add(this.block3);
                  this.blockgroup.add(this.block4);
                    this.blockgroup.add(this.block5);
                      this.blockgroup.add(this.block6);
                        this.blockgroup.add(this.block7);
                          this.blockgroup.add(this.block8);
                            this.blockgroup.add(this.block9);
                              this.blockgroup.add(this.block10);
                                this.blockgroup.add(this.block11);
                                  this.blockgroup.add(this.block12);
                                    this.blockgroup.add(this.block13);
                                      this.blockgroup.add(this.block14);
                                        this.blockgroup.add(this.block15);
                                          this.blockgroup.add(this.block16);
                                              this.blockgroup.add(this.block17);
                                              this.blockgroup.add(this.block18);
                                                this.blockgroup.add(this.block19);
                                                  this.blockgroup.add(this.block20);
                                                     this.blockgroup.add(this.block21);
                                                        this.blockgroup.add(this.block22);
                                                           this.blockgroup.add(this.block23);
                                                              this.blockgroup.add(this.block24);
      this.blockgroup.add(this.water1);
      this.blockgroup.add(this.water2);


      this.brige=this.add.tileSprite(1900,880,1000,80,'brige');
       this.unblock=this.add.tileSprite(2000,880,80,80,'block');
            






      this.world.setBounds(0, 0, 3000, 1920);

      this.physics.startSystem(Phaser.Physics.P2JS);

     this.player = this.add.sprite(this.world.centerX, this.world.centerY+100, 'this.player');
      this.queen = this.add.sprite(2800, this.world.centerY-50, 'queen');

    
       this.queen.animations.add('down', [0,1,2,3], 5, true);
      this.queen.animations.add('left', [4,5,6,7], 5, true);
       this.queen.animations.add('right', [8,9,10,11], 5, true);
        this.queen.animations.add('up', [12,13,14,15], 5, true);
         this.queen.animations.play('down');
     this.player.scale.setTo(2,2);
          this.queen.scale.setTo(2,2);
      // 0, 0, 
      this.npc1 = this.add.sprite(0, 0,'laoren');
      this.npc2 = this.add.sprite(0, 1800, 'laoren');
      this.npc3 = this.add.sprite(1800, 0, 'laoren');
      this.npc4 = this.add.sprite(1800, 1800, 'laoren');
      this.npc1.scale.setTo(2,2);
       this.npc2.scale.setTo(2,2);
        this.npc3.scale.setTo(2,2);
         this.npc4.scale.setTo(2,2);
      this.long=this.add.sprite(2500, this.world.centerY-350,'long');
      this.long.scale.setTo(1.5,1.5);
      this.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.physics.enable(this.npc1, Phaser.Physics.ARCADE); 
      this.physics.enable(this.npc2, Phaser.Physics.ARCADE);
      this.physics.enable(this.npc3, Phaser.Physics.ARCADE);
      this.physics.enable(this.npc4, Phaser.Physics.ARCADE); 
          this.physics.enable(this.unblock, Phaser.Physics.ARCADE); 
      this.physics.enable(this.blockgroup, Phaser.Physics.ARCADE);
      this.physics.enable(this.long, Phaser.Physics.ARCADE);
     this.player.body.collideWorldBounds=true;
   

      this.cursors = this.input.keyboard.createCursorKeys();

      this.camera.follow(this.player);
      statetext = this.add.text(this.camera.x,this.camera.y,' ', { font: '84px Arial', fill: '#fff' });
      statetext.anchor.setTo(0.5, 0.5);
      statetext.scale.setTo(0.5, 0.5);
      statetext.visible = false;
     this.player.animations.add('down', [0,1,2], 5, true);
      this.npc1.animations.add('one', [0], 5, true);
      this.npc1.animations.add('two', [0], 5, true);
      this.npc1.animations.add('three', [0], 5, true);
      this.npc1.animations.add('four', [0], 5, true);
      this.player.animations.add('left', [3,4,5], 5, true);
       this.player.animations.add('right', [6,7,8], 5, true);
        this.player.animations.add('up', [9,10,11], 5, true);
       for (var i = 0, len = this.blockgroup.children.length; i < len; i++) 
          {  this.blockgroup.children[i].body.immovable=true;}
      this.long.body.immovable=true;
      this.unblock.body.immovable=true;
         this.npc1.animations.play('one');
         this.npc2.animations.play('two');
         this.npc3.animations.play('three');
         this.npc4.animations.play('four');
         this.sadmusic=this.add.audio('sadmusic');
         this.battlemusic=this.add.audio('battlemusic');
         this.sadmusic.play();

      
            

          // When you click on the sprite, you go back to the MainMenu.
          //this.bouncy.inputEnabled = true;
          //this.bouncy.events.onInputDown.add( function() { this.state.start('MainMenu'); }, this );
      },

      update: function () {
      this.player.body.velocity.setTo(0, 0);

      if (this.cursors.up.isDown)
      {
         this.player.body.velocity.y = -300;
         this.player.animations.play('up');
     
         
      }
      else if (this.cursors.down.isDown)
      {
        this.player.body.velocity.y = 300;
        this.player.animations.play('down');
       
         
      }

      else if (this.cursors.left.isDown)
      {
         this.player.body.velocity.x = -300;
         this.player.animations.play('left');

         
      }
      else if (this.cursors.right.isDown)
      {
        this.player.body.velocity.x = 300;
        this.player.animations.play('right');
       
        
      }
       this.physics.arcade.overlap(this.player, this.npc1, this.question1, null, this);
       this.physics.arcade.overlap(this.player, this.npc2, this.question2, null, this);
       this.physics.arcade.overlap(this.player, this.npc3, this.question3, null, this);
       this.physics.arcade.overlap(this.player, this.npc4, this.question4, null, this);
        this.physics.arcade.overlap(this.player, this.long, this.nextgame, null, this);
       this.physics.arcade.collide(this.player, this.blockgroup);
       this.physics.arcade.collide(this.player, this.unblock);
     
       if(this.q1==true&&this.q2==true&&this.q3==true&&this.q4==true)
       {
        this.unblock.kill();
       }
      },

     question1: function (player,npc1) {

            this.sadmusic.stop();
         this.battlemusic.play();
          npc1.kill();
         //statetext.reset(this.camera.x+400,this.camera.y+200);
         statetext.reset(this.camera.x+400,this.camera.y+200);
         statetext.text="      where was C language developed?  \n\n\n             A:Bell Lab  B:GMU  \n   C:Computer Center  D:Who knows";
         statetext.visible = true;

          this.buttona = this.add.button( this.camera.x+100 , this.camera.y+400, 'buttona', this.right, this, 'over', 'out', 'down');
         this.buttonb = this.add.button( this.camera.x+250 , this.camera.y+400, 'buttonb', this.quitGame, this, 'over', 'out', 'down');
         this.buttonc = this.add.button(this.camera.x+400 , this.camera.y+400, 'buttonc', this.quitGame, this, 'over', 'out', 'down');
        this.buttond = this.add.button( this.camera.x+550 , this.camera.y+400, 'buttond', this.quitGame, this, 'over', 'out', 'down');
        this.player.body.moves=false;
        this.q1=true;
      },
      question2: function (player,npc2) {

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
             statetext.reset(this.camera.x+400,this.camera.y+200);
          statetext.text=" GAME OVER \n Click to restart";
          statetext.visible = true;
           this.battlemusic.stop();
              this.sadmusic.stop();
              this.lost.play();

              //the "click to restart" handler
              this.input.onTap.addOnce(this.restart,this);


      },
      right: function (pointer) {
          this.buttona.kill();
          this.buttonb.kill();
          this.buttonc.kill();
          this.buttond.kill();
           this.sadmusic.play();
          this.battlemusic.stop();
          statetext.text=" Congratulations！";
          statetext.visible = true;
           this.player.body.moves=true;

      },
      restart: function()
      {
        this.lost.stop();
        this.state.start('Game');

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
      }
     
  };
      



