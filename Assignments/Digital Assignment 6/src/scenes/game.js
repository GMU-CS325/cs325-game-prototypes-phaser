var scene = new Phaser.Scene("game");

import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';
import PreloadScene from './preloadScene.js';
import endScene from './endScene.js';

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();
var preloadScene = new PreloadScene();

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    parent: 'game',
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
    }
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('preloadScene', preloadScene);
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);
game.scene.add("endScene", endScene);

preloadScene.makeText = function() {
    console.log("Yippee!");
}

function makeText () {
    console.log("Yippee!");
}

// start title
game.scene.start('preloadScene');