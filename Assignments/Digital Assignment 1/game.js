var scene = new Phaser.Scene("game");

import GameScene from './gameScene.js';
import PreloadScene from './preloadScene.js';

var gameScene = new GameScene();
var preloadScene = new PreloadScene();

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
        },
    },
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

game.scene.add('preloadScene', preloadScene);
game.scene.add("gameScene", gameScene);

game.scene.start('preloadScene');
