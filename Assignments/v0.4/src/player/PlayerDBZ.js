import Phaser from "phaser"
import phaserControls from "../plugins/phaserControlsPlugin";
var Machine = require('./Machine.js')
var StateMachine = new Machine.StateMachine();
var State = new Machine.State();
var IdleState = new Machine.IdleState();
var MoveState = new Machine.MoveState();

export default class PlayerDBZ {
    constructor(scene, x, y) {
        this.scene = scene;
        const anims = scene.anims;
        console.log(scene.controls)

        anims.create({
            key: "test-1",
            frames: anims.generateFrameNumbers("player", { start: 0, end: 3}),
            frameRate: 3,
            repeat: -1
        });

        // cursor keys set active, add to schemes array, pass no data, add onActive function
        scene.controls.createWasdKeys(true, true, null, function(scene, scheme){
            console.log('Cursor Keys is active!');
        });
        console.log(scene.controls.getActive())

        // scene.anims.create({
        //     key: 'test-1',
        //     frameRate: 5,
        //     frames: scene.anims.generateFrameNames('yoshi_shapes', {
        //         prefix: 'yoshi_',
        //         suffix: '.png',
        //         start: 10,
        //         end: 14,
        //         zeroPad: 2
        //     })
        // });

        this.sprite = scene.matter.add.sprite(500,50, "player", 0);
        const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
        const { width: w, height: h } = this.sprite;
        const mainBody = Bodies.rectangle(x, y, w * 0.4, h * 0.7);
        this.sprite.setExistingBody(mainBody).setScale(2);

        this.StateMachine = new Machine.StateMachine('idle', {
            idle: new Machine.IdleState(),
            move: new Machine.MoveState(),
        }, [scene, this.sprite, scene.controls])
    }

    update() {
        //console.log(this.scene.controls.recordKeys());
        this.StateMachine.step();
    }
}