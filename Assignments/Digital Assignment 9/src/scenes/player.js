var cursors;
var player;
var yoshi_bodies;

class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene.matter.world, x, y, texture, frame);
        var body;

        scene.add.existing(this);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.sprite = this;
        player = this;

        this.scene = scene;
        this.setPosition(x, y);
        this.setTexture(texture);
        this.setFrame(frame);

        this.setData("health", 100);
        yoshi_bodies = scene.cache.json.get('yoshi_bodies');
        body = Phaser.Physics.Matter.PhysicsEditorParser.parseBody(x, y, yoshi_bodies.yoshi_01);
        this.setExistingBody(body);

        this.isTouching = { left: false, right: false, ground: false };
        this.canJump = true;
        this.jumpCooldownTimer = null;

        // Before matter's update, reset the player's count of what surfaces it is touching.
        //scene.matter.world.on("beforeupdate", this.resetTouching, this);

        scene.matterCollision.addOnCollideStart({
            objectA: player,
            callback: this.onSensorCollide,
            context: this
        });
        /*scene.matterCollision.addOnCollideActive({
            objectA: this.body.parts,
            callback: this.onSensorCollide,
            context: this
        });*/

        scene.anims.create({
            key: 'jump',
            frameRate: 5,
            frames: scene.anims.generateFrameNames('yoshi_shapes', {
                prefix: 'yoshi_',
                suffix: '.png',
                start: 10,
                end: 14,
                zeroPad: 2
            })
        });

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

        this.setFixedRotation();
        this.play("idle");

        this.on('animationcomplete', function (animation, frame, gameObject) {
            if (animation.key === 'jump') {
                console.log("He jumpth");
                gameObject.play("idle");
            }
            else if (animation.key === 'run') {
                console.log("He runth");
                gameObject.play("idle");
            }
        }, scene);
    }

    jump() {
        if (this.body.position.y > 610) {
            //this.setTexture("jump");
            this.play('jump');
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

    onSensorCollide() {
        console.log("Collision");
    }

    update(controls) {
        if (controls.left.isDown)
            this.moveLeft();
        else if (controls.right.isDown)
            this.moveRight();
        else {
            this.setVelocityX(0);
            //this.play("idlea");
        }

        if (Phaser.Input.Keyboard.JustDown(controls.up)) {
            if (this.body.position.y > 610) {
                this.play('jump');
                this.setVelocityY(-13);
            }

        }
    }
}