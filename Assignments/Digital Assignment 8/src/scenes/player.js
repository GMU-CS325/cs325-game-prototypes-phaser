var cursors;
var player;
class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene.matter.world, x, y, texture, frame);
        scene.add.existing(this);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.sprite = this;
        player = this;
        console.log(this.sprite);
        this.scene = scene;
        this.setPosition(x, y);
        this.setTexture(texture);
        this.setFrame(frame);

        cursors = scene.input.keyboard.createCursorKeys();
        //this.setBody("rectangle");
        this.setData("health", 100);

        scene.anims.create({
            key: 'jumpa',
            frameRate: 10,
            frames: scene.anims.generateFrameNames('testsheet', {
                prefix: 'bjack_',
                suffix: '.png',
                start: 21,
                end: 29,
                zeroPad: 2
            })
        });

        scene.anims.create({
            key: 'runa',
            frameRate: 6,
            frames: scene.anims.generateFrameNames('testsheet', {
                prefix: 'bjack_',
                suffix: '.png',
                start: 1,
                end: 5,
                zeroPad: 2
            })
        });

        scene.anims.create({
            key: 'idlea',
            frameRate: 60,
            frames: scene.anims.generateFrameNames('testsheet', {
                prefix: 'bjack_',
                suffix: '.png',
                start: 5,
                end: 5,
                zeroPad: 2
            })
        });

        this.play("idle");
        this.on('animationcomplete', function (animation, frame) {
            if (animation.key === 'jumpa') {
                console.log("He jumpth");
            }
            else if (animation.key === 'runa') {
                console.log("He runth");
                player.play("idlea");
            }
        }, scene);
    }

    //In create function, do this.children.add(new EnemyRobot(this, 264, 250, name of texture));

    create() {
        
    }

    jump() {
        if (this.body.position.y > 610) {
            //this.setTexture("jump");
            this.play('jumpa');
            this.setVelocityY(-13);
        }
        
    }

    moveLeft() {
        this.x += -7;
        this.setFlipX(true);
        if (this.body.position.y > 610) {
            if (this.anims.getCurrentKey() != 'runa') {
                //this.setTexture("run");
                this.play('runa');
            }
        }
    }

    moveRight() {
        this.x += 7;
        this.setFlipX(false);
        if (this.body.position.y > 610) {
            if (this.anims.getCurrentKey() != 'runa') {
                //this.setTexture("run");
                this.play('runa');
            }
        }
    }

    update(time, delta) {
        //console.log(this.anims.getCurrentKey());
        if (cursors.left.isDown)
            this.moveLeft();
        else if (cursors.right.isDown)
            this.moveRight();
        else {
            this.setVelocityX(0);
            //this.play("idlea");
        }

        /*if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if (this.body.position.y > 610) {
                this.play('jump');
                this.setVelocityY(-13);
            }

        }*/
    }
}