var scene = new Phaser.Scene("game");

import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';
import PreloadScene from './preloadScene.js';

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();
var preloadScene = new PreloadScene();

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    physics: {
        default: "matter",
        matter: {
            debug: true
        },
        gravity: {
            y: 30
        }
    }
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('preloadScene', preloadScene);
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start('preloadScene');