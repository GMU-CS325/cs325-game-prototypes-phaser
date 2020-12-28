import "./phaser.js";
import {Boot} from "./Boot.js";
import {Game} from "./Game.js";
import {MainMenu} from "./MainMenu.js";
import {Preloader} from "./Preloader.js";

// An object for shared (global) variables, so that them main menu can show
// the high score if you want.
let shared = {};

// For a simpler example with multiple scenes:
// https://phaser.io/examples/v3/view/scenes/changing-scene-es6

// For a way to pass data between scenes without global variables:
// https://phaser.io/examples/v3/view/scenes/passing-data-to-a-scene

// You can have two scenes active at once, which can help separate a UI layer
// from other things on the screen:
// https://phaser.io/examples/v3/view/scenes/ui-scene-es6

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    // The game starts the first scene in the scene array.
    scene: [ Boot, Preloader, MainMenu, Game ],
    physics: { default: 'arcade' },
    });
