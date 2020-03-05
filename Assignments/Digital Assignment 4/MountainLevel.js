class MountainLevel extends Phaser.Scene {

    constructor() {
        super("MountainLevel"); //inherit from Scene class, just like Java
    }

    preload() {
        this.load.image('background', 'Assets/background.png');
        this.load.image('ground', 'Assets/afloor.png');
        this.load.image('koopa', 'Assets/koopa.png');
        this.load.atlas('player', 'sprites.png', 'sprites.json');
        this.load.atlas('slide', 'roll.png', 'roll.json');
    }

    create() {
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setScrollFactor(0, 0); //Makes it work

        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, 48, 'ground');
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
        this.bg_2.y = game.config.height - 114;
        this.bg_2.setScale(1, 2.5);

        this.player = this.add.sprite(100, 830, 'player');
        this.physics.world.enable(this.player);
        this.physics.world.enable(this.bg_2);
        this.physics.world.enable(this.bg_1);
        this.bg_1.body.setImmovable(true);
        this.bg_2.body.setImmovable(true);
        this.player.body.setGravityY(200);
        this.player.setScale(5, 5);

        this.physics.add.collider(this.player, this.bg_1);
        this.physics.add.collider(this.player, this.bg_2);

        this.anims.create({
            key: 'run',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'sprites_',
                suffix: '.png',
                start: 51,
                end: 58,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'up',
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'jump_',
                suffix: '.png',
                start: 1,
                end: 15,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'down',
            frameRate: 10,
            frames: this.anims.generateFrameNames('slide', {
                prefix: 'roll_',
                suffix: '.png',
                start: 1,
                end: 28,
                zeroPad: 2
            })
        });

        this.player.emitter = new Phaser.Events.EventEmitter();
        //this.player.on('animationcomplete-up', handler);


        this.player.anims.play('run');

        this.cursors = this.input.keyboard.createCursorKeys();

        // set world bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

        // making the camera follow the player
        this.myCam.startFollow(this.bg_2);
    }

    update() {

        // move the player when the arrow keys are pressed
        this.player.x = this.myCam.scrollX + 100;
        //this.player.x = this.myCam.scrollX;
        this.bg_2.tilePositionX += 7;

        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX += 2; //The .3 means that we scroll slower than how fast our camera, set to follow our player, is moving

        //Setting it to a higher number will make the background go faster
        //this.bg_2.tilePositionX += 3; //The ground will go as fast as we are moving

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && (this.player.anims.getCurrentKey() == 'run')) {
            this.player.anims.stop();
            this.player.anims.play('up');

            this.player.body.setVelocityY(-300);
            this.player.once('animationcomplete', () => {
                this.time.addEvent({
                    delay: 1500, // in ms
                    callback: () => {
                        this.player.play('run');
                    }
                })
            });
        }

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && (this.player.anims.getCurrentKey() == 'run')) {
            this.player.anims.stop();
            this.player.anims.play('down');
            this.player.setScale(3.5, 3.5);
            this.time.addEvent({
                delay: 2200,
                callback: () => {
                    this.player.setScale(5, 5);
                    this.player.setX(100);
                    this.player.setY(830);
                }
            })
            
            this.player.once('animationcomplete', () => {
                   this.player.play('run');
            })
        }

    }
}