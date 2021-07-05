var scene = new Phaser.Scene("game");

import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';
import PreloadScene from './preloadScene.js';
import endScene from './endScene.js';
//s
var gameScene = new GameScene();
var titleScene = new TitleScene();
var preloadScene = new PreloadScene();

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    parent: 'game',
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
            }
        ]
    }
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('preloadScene', preloadScene);
game.scene.add('titleScene', titleScene);
game.scene.add("gameScene", gameScene);
game.scene.add("endScene", endScene);
game.scene.start('preloadScene');