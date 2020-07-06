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
        this.setData("health", 100);

        /*scene.anims.create({
            key: 'jump',
            frameRate: 10,
            frames: scene.anims.generateFrameNames('yoshi_shapes', {
                prefix: 'bjack_',
                suffix: '.png',
                start: 21,
                end: 29,
                zeroPad: 2
            })
        });*/

        scene.anims.create({
            key: 'run',
            frameRate: 7,
            //repeat: -1,
            frames: scene.anims.generateFrameNames('yoshi_shapes', {
                prefix: 'yoshi_',
                suffix: '.png',
                start: 285,
                end: 292,
                zeroPad: 3
            })
        });

        scene.anims.create({
            key: 'idle',
            frameRate: 3,
            repeat: -1,
            frames: scene.anims.generateFrameNames('yoshi_shapes', {
                prefix: 'yoshi_',
                suffix: '.png',
                start: 1,
                end: 6,
                zeroPad: 2
            })
        });

        this.play("idle");

        this.on('animationcomplete', function (animation, frame) {
            //if (animation.key === 'jack-jump') {
            //    console.log("He jumpth");
           // }
            if (animation.key === 'run') {
                console.log("He runth");
                player.play("idle");
            }
        }, scene);
    }

    jump() {
        if (this.body.position.y > 610) {
            //this.setTexture("jump");
            //this.play('jack-jump');
            this.setVelocityY(-13);
        }
        
    }

    moveLeft() {
        this.x += -7;
        this.setFlipX(true);
        if (this.body.position.y > 610) {
            this.play('run', true);
        }
    }

    moveRight() {
        this.x += 7;
        this.setFlipX(false);
        if (this.body.position.y > 610) {
                this.play('run', true);
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