import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import phaserControls from "./plugins/phaserControlsPlugin.min.js";

import TitleScene from './scenes/titleScene';
import GameScene from './scenes/gameScene';
import PreloadScene from './scenes/preloadScene';
import EndScene from './scenes/endScene';

var gameScene = new GameScene();
var titleScene = new TitleScene();
var preloadScene = new PreloadScene();
var endScene = new EndScene();

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
    }
      
    create ()
    {
        console.log(this)
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1200,
    height: 720,
    tileBias: 64,
    scene: MyGame,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "matter",
        matter: {
            debug: true,
            showBody: true,
            showStaticBody: true
        },
        gravity: {
            y: 30
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin, //The plugin class
                key: "matterCollision", //Where to store in Scene.systems, such as scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            },
            {
                plugin: phaserControls,
                key: 'phaserControls',
                mapping: 'controls'
            }
        ]
    }
};

const game = new Phaser.Game(config);

game.scene.add('preloadScene', preloadScene);
game.scene.add('titleScene', titleScene);
game.scene.add("gameScene", gameScene);
game.scene.add("endScene", endScene);
game.scene.start('preloadScene');
