import Phaser from "phaser"
import phaserControls from "../plugins/phaserControlsPlugin";
var Machine = require('./Machine.js')

export default class PlayerDBZ {
    constructor(scene, x, y) {
        this.scene = scene;
        const anims = scene.anims;

        this.sprite = scene.matter.add.sprite(500,50, "player", 0);
        var player = this;
        const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
        const { width: w, height: h } = this.sprite;
        const mainBody = Bodies.rectangle(x, y, w * 0.4, h * 0.7);
        this.sprite.setExistingBody(mainBody).setScale(2).setFixedRotation();
        
        this.StateMachine = new Machine.StateMachine('idle', {
            idle: new Machine.IdleState(),
            move: new Machine.MoveState(),
            guard: new Machine.GuardState(),
            dash: new Machine.DashState(),
            punch: new Machine.PunchState(),
            kick: new Machine.KickState(),
        }, [scene, this.sprite, scene.controls])
        this.sprite.StateMachine = this.StateMachine;

        anims.create({
            key: "move",
            frames: anims.generateFrameNumbers("player", { start: 29, end: 34}),
            frameRate: 8,
            repeat: 0
        });

        anims.create({
            key: "idle",
            frames: anims.generateFrameNumbers("player", { frames: [0] } ), //0,4,3,1
            frameRate: 10,
            repeat: 0
        });

        anims.create({
            key: "guard",
            frames: anims.generateFrameNumbers("player", { frames: [54] } ),
            frameRate: 10,
            repeat: 0
        });

        anims.create({
            key: "punch",
            frames: anims.generateFrameNumbers("player", { frames: [37,36,36,37,42,42,42,,37,37,38,38,38,37,39,39,43,43,43,43] } ),
            frameRate: 10,
            repeat: 0
        });

        anims.create({
            key: "kick",
            frames: anims.generateFrameNumbers("player", { frames: [46,46,47,47,  55,  45,45,45,  55,  46,46,47,47,  66,66,  48,49,48,49,48,49,48,49] } ),
            frameRate: 10,
            repeat: 0
        });

        anims.create({
            key: "dash",
            frames: anims.generateFrameNumbers("player", { frames: [19, 19, 19] } ),
            frameRate: 10,
            repeat: 0
        });

        let dashLeft = scene.controls.createCombo({
            combo: 'aa',
            resetOnMatch: true,
            maxKeyDelay: 400,
            onMatch: function(scene, event) {
                player.StateMachine.transition('dash')
            }
        });

        let dashRight = scene.controls.createCombo({
            combo: 'dd',
            resetOnMatch: true,
            maxKeyDelay: 400,
            onMatch: function(scene, event) {
                player.StateMachine.transition('dash')
            }
        })

        // cursor keys set active, add to schemes array, pass no data, add onActive function
        scene.controls.createWasdKeys(true, true, null, function(scene, scheme){
        });
        console.log(scene.controls.getActive())

        // scene.anims.create({key: 'test-1',frameRate: 5, frames: scene.anims.generateFrameNames('player', {
            // prefix: 'yoshi_',suffix: '.png',start: 10,end: 14,zeroPad: 2})
        // });
    }

    update() {
        //console.log(this.scene.controls.recordKeys());
        this.StateMachine.step();
    }
}